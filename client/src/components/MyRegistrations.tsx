import {
    FileText,
    CheckCircle,
    Clock,
    X,
    CreditCard,
    Calendar,
    PartyPopper,
    Camera,
    TreePine,
    Gamepad2,
    Briefcase,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { registrationService, type RegistrationRaw } from '../services/registrationService'
import { eventService, type Event } from '../services/eventService'
import { useAuth } from '../contexts/AuthContext'

const iconMap: Record<string, React.ElementType> = {
    Camera,
    PartyPopper,
    TreePine,
    Gamepad2,
    Briefcase,
    Calendar,
}

// Combined view model joining registration + event data
interface RegistrationView extends RegistrationRaw {
    event: Event | null
}

export function MyRegistrations() {
    const { currentUser } = useAuth()
    const [registrations, setRegistrations] = useState<RegistrationView[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedReg, setSelectedReg] = useState<RegistrationView | null>(null)
    const [paymentAmount, setPaymentAmount] = useState('')
    const [ticketToView, setTicketToView] = useState<RegistrationView | null>(null)
    const [isPaying, setIsPaying] = useState(false)
    const [paymentData, setPaymentData] = useState<{ qrCodeBase64: string | null; brCode: string | null } | null>(null)

    const fetchData = async () => {
        if (!currentUser) return
        try {
            // Fetch both in parallel
            const [allRegs, allEvents] = await Promise.all([
                registrationService.getAll(),
                eventService.getAll(),
            ])

            // Build event lookup map
            const eventMap: Record<string, Event> = {}
            allEvents.forEach((e) => { eventMap[e.eve_id] = e })

            // Filter to current user and join event data
            const mine: RegistrationView[] = allRegs
                .filter((r) => r.user_id === currentUser.user_id)
                .map((r) => ({ ...r, event: eventMap[r.eve_id] ?? null }))

            setRegistrations(mine)
        } catch (err: any) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: err?.response?.data?.message || 'Não foi possível carregar as inscrições',
                confirmButtonColor: '#000',
            })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [currentUser])

    // Total paid = sum of (event price - remaining)
    const totalPaid = registrations.reduce((sum, r) => {
        const price = r.event?.eve_price ?? 0
        return sum + (price - r.reg_remain_value)
    }, 0)

    const totalPending = registrations.reduce((sum, r) => sum + r.reg_remain_value, 0)

    const handleOpenPayment = (reg: RegistrationView) => {
        setSelectedReg(reg)
        setPaymentAmount('')
    }

    const handleCloseModal = () => {
        setSelectedReg(null)
        setPaymentAmount('')
        setPaymentData(null)
    }

    const handlePayment = async () => {
        if (!selectedReg) return

        const amount = parseFloat(paymentAmount)
        const remaining = selectedReg.reg_remain_value

        if (isNaN(amount) || amount <= 0 || amount > remaining) {
            Swal.fire({
                icon: 'warning',
                title: 'Valor inválido',
                text: `Digite um valor entre R$ 0,01 e R$ ${remaining.toFixed(2)}`,
                confirmButtonColor: '#000',
            })
            return
        }

        setIsPaying(true)
        try {
            console.log('💰 Gerando pagamento PIX para:', amount)
            const responseCreateBill = await registrationService.payment(selectedReg.reg_id, amount)
            console.log('✅ Pagamento criado:', responseCreateBill)

            // Armazena dados do pagamento (QR Code e código PIX)
            if (responseCreateBill) {
                console.log("qrcode: ", responseCreateBill.data.qrCodeBase64, "\n brCode: ", responseCreateBill.data.brCode)
                setPaymentData({
                    qrCodeBase64: responseCreateBill.data.brCodeBase64 || null,
                    brCode: responseCreateBill.data.brCode || null,
                })
            }
        } catch (err: any) {
            console.error('❌ Erro ao processar pagamento:', err)
            Swal.fire({
                icon: 'error',
                title: 'Erro ao processar pagamento',
                text: err?.response?.data?.message || 'Não foi possível registrar o pagamento',
                confirmButtonColor: '#000',
            })
        } finally {
            setIsPaying(false)
        }
    }

    const handleCopyPixCode = async () => {
        if (!paymentData?.brCode) return

        try {
            await navigator.clipboard.writeText(paymentData.brCode)
            Swal.fire({
                icon: 'success',
                title: 'Código PIX copiado!',
                text: 'Cole o código no seu aplicativo bancário',
                timer: 2000,
                showConfirmButton: false,
                confirmButtonColor: '#000',
            })
        } catch (err) {
            console.error('❌ Erro ao copiar código:', err)
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Não foi possível copiar o código PIX',
                confirmButtonColor: '#000',
            })
        }
    }

    return (
        <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-full">
            <div className="flex items-center gap-3">
                <div className="bg-black p-2 rounded-xl">
                    <FileText className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-semibold">Inscrições</h1>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="bg-black text-white rounded-2xl p-4 shadow-sm">
                    <div className="text-xs mb-2 opacity-80">Total Pago</div>
                    <div className="text-2xl font-bold">R$ {totalPaid.toFixed(2)}</div>
                </div>
                <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-sm">
                    <div className="text-xs text-gray-600 mb-2">Pendente</div>
                    <div className="text-2xl font-bold text-black">R$ {totalPending.toFixed(2)}</div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <span className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                </div>
            ) : registrations.length === 0 ? (
                <div className="text-center text-gray-500 py-12">Nenhuma inscrição encontrada</div>
            ) : (
                <div className="flex flex-col gap-3">
                    {registrations.map((reg) => {
                        const price = reg.event?.eve_price ?? 0
                        const remaining = reg.reg_remain_value
                        const amountPaid = price - remaining
                        const isPaid = remaining <= 0
                        const Icon = iconMap[reg.event?.eve_icon ?? ''] || Calendar

                        return (
                            <div
                                key={reg.reg_id}
                                onClick={() => isPaid && setTicketToView(reg)}
                                className={`bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all ${isPaid ? 'cursor-pointer' : ''}`}
                            >
                                <div className="flex gap-4">
                                    <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                                        <Icon size={24} className="text-black" />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-semibold text-black mb-2">
                                            {reg.event?.eve_nome ?? 'Evento'}
                                        </h3>
                                        <div className="text-sm text-gray-500 mb-3">
                                            {reg.event?.eve_data_and_time
                                                ? new Date(reg.event.eve_data_and_time).toLocaleDateString('pt-BR')
                                                : '—'}
                                        </div>

                                        <div className="flex items-center justify-between mb-2">
                                            <div className="text-lg font-bold text-black">R$ {price.toFixed(2)}</div>

                                            {isPaid ? (
                                                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                                                    <CheckCircle size={16} className="text-black" />
                                                    <span className="text-sm font-medium">Pago</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                                                    <Clock size={16} className="text-gray-600" />
                                                    <span className="text-sm font-medium text-gray-600">Pendente</span>
                                                </div>
                                            )}
                                        </div>

                                        {!isPaid && amountPaid > 0 && (
                                            <div className="text-sm text-gray-600">
                                                Pago: R$ {amountPaid.toFixed(2)} | Falta: R$ {remaining.toFixed(2)}
                                            </div>
                                        )}

                                        {isPaid && (
                                            <div className="text-xs text-gray-400 mt-2">Clique para ver o ingresso</div>
                                        )}
                                    </div>
                                </div>

                                {!isPaid && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleOpenPayment(reg) }}
                                        className="w-full mt-4 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm"
                                    >
                                        Pagar Agora
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Payment Modal */}
            {selectedReg && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-black p-2 rounded-xl">
                                    <CreditCard className="text-white" size={20} />
                                </div>
                                <h2 className="text-xl font-semibold">
                                    {paymentData ? 'PIX Gerado' : 'Pagamento'}
                                </h2>
                            </div>
                            <button
                                onClick={() => {
                                    handleCloseModal()
                                    setPaymentData(null)
                                }}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold text-black mb-2">{selectedReg.event?.eve_nome}</h3>
                            <div className="text-sm text-gray-600 mb-4">
                                {selectedReg.event?.eve_data_and_time
                                    ? new Date(selectedReg.event.eve_data_and_time).toLocaleDateString('pt-BR')
                                    : '—'}
                            </div>

                            {!paymentData ? (
                                // ============ TELA 1: ANTES DO PAGAMENTO ============
                                <>
                                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-gray-600">Valor total:</span>
                                            <span className="font-semibold">R$ {(selectedReg.event?.eve_price ?? 0).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-gray-600">Já pago:</span>
                                            <span className="font-semibold text-green-600">
                                                R$ {((selectedReg.event?.eve_price ?? 0) - selectedReg.reg_remain_value).toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="h-px bg-gray-300 my-2" />
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Falta pagar:</span>
                                            <span className="font-bold text-lg">R$ {selectedReg.reg_remain_value.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <label className="text-sm text-gray-600 mb-2 block">Quanto deseja pagar?</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        max={selectedReg.reg_remain_value}
                                        value={paymentAmount}
                                        onChange={(e) => setPaymentAmount(e.target.value)}
                                        placeholder="0,00"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-black mb-4"
                                    />

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                handleCloseModal()
                                                setPaymentData(null)
                                            }}
                                            className="flex-1 bg-white text-black border-2 border-black py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handlePayment}
                                            disabled={isPaying || !paymentAmount}
                                            className="flex-1 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm disabled:opacity-60"
                                        >
                                            {isPaying ? (
                                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto block" />
                                            ) : (
                                                'Gerar PIX'
                                            )}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                // ============ TELA 2: DEPOIS DO PAGAMENTO ============
                                <>
                                    {/* QR Code */}
                                    <div className="bg-white rounded-xl p-4 mb-4 flex flex-col items-center border-2 border-gray-200">
                                        {paymentData.qrCodeBase64 ? (
                                            <>
                                                <img
                                                    src={`${paymentData.qrCodeBase64}`}
                                                    alt="PIX QR Code"
                                                    className="max-w-xs w-full h-auto rounded-lg"
                                                />
                                                <p className="text-xs text-gray-500 mt-3">Escaneie com seu celular</p>
                                            </>
                                        ) : (
                                            <div className="text-center py-6">
                                                <p className="text-gray-600">QR Code não disponível</p>
                                                <p className="text-sm text-gray-500 mt-1">Use o código PIX abaixo</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Código PIX */}
                                    {paymentData.brCode && (
                                        <>
                                            <label className="text-sm text-gray-600 mb-2 block">Código PIX (Copia e Cola)</label>
                                            <div className="bg-gray-50 rounded-xl p-3 mb-3 flex gap-2">
                                                <input
                                                    type="text"
                                                    value={paymentData.brCode}
                                                    readOnly
                                                    className="flex-1 bg-transparent font-mono text-xs text-gray-700 focus:outline-none overflow-hidden text-ellipsis"
                                                />
                                                <button
                                                    onClick={handleCopyPixCode}
                                                    className="px-3 py-2 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-all shrink-0"
                                                >
                                                    Copiar
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                                        <p className="text-sm text-blue-900">
                                            ✓ PIX gerado com sucesso! Abra seu app bancário e cole o código para pagar.
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            handleCloseModal()
                                            setPaymentData(null)
                                        }}
                                        className="w-full bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all"
                                    >
                                        Fechar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Ticket Modal */}
            {ticketToView && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Ingresso</h2>
                            <button onClick={() => setTicketToView(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="bg-gray-50 rounded-2xl p-6 w-full mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-black p-2 rounded-xl">
                                        {(() => {
                                            const Icon = iconMap[ticketToView.event?.eve_icon ?? ''] || Calendar
                                            return <Icon className="text-white" size={20} />
                                        })()}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-black">{ticketToView.event?.eve_nome}</h3>
                                        <p className="text-sm text-gray-500">
                                            {ticketToView.event?.eve_data_and_time
                                                ? new Date(ticketToView.event.eve_data_and_time).toLocaleDateString('pt-BR')
                                                : '—'}
                                        </p>
                                    </div>
                                </div>

                                {/* QR Code - removido SVG fixo, mostrar apenas ID do ingresso */}
                                <div className="bg-white rounded-xl p-6 mb-4 flex items-center justify-center min-h-[200px]">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-3">Ingresso Confirmado</p>
                                        <p className="text-2xl font-bold text-green-600 mb-2">✓</p>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className="text-xs text-gray-500 mb-1">ID do Ingresso</p>
                                    <p className="font-mono text-sm font-semibold">
                                        UJAD-{ticketToView.reg_id.slice(0, 6).toUpperCase()}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Valor:</span>
                                    <span className="font-semibold">R$ {(ticketToView.event?.eve_price ?? 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <span className="font-semibold text-green-600">Confirmado</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setTicketToView(null)}
                                className="w-full mt-6 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
