import { ScanLine, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { registrationService, type RegistrationRaw } from '../services/registrationService'
import { eventService, type Event } from '../services/eventService'
import { userService, type User } from '../services/userService'

type ScanResultType = {
    type: 'success' | 'error' | 'warning'
    message: string
    registration?: RegistrationRaw
    event?: Event
    user?: User
}

export function CheckIn() {
    const [ticketId, setTicketId] = useState('')
    const [scanResult, setScanResult] = useState<ScanResultType | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleScan = async () => {
        const input = ticketId.trim().toUpperCase()

        if (!input) {
            setScanResult({ type: 'error', message: 'Por favor, digite o código do ingresso' })
            return
        }

        setIsLoading(true)
        setScanResult(null)

        try {
            const all = await registrationService.getAll()

            // Match by "UJAD-XXXXXX" where XXXXXX = first 6 chars of reg_id (uppercase)
            const found = all.find((r) => {
                const code = `UJAD-${r.reg_id.slice(0, 6).toUpperCase()}`
                return code === input || r.reg_id.toUpperCase() === input
            })

            if (!found) {
                setScanResult({ type: 'error', message: 'Ingresso não encontrado' })
                return
            }

            // Fetch event and user info for display
            const [eventData, userData] = await Promise.all([
                eventService.getById(found.eve_id).catch(() => null),
                userService.getById(found.user_id).catch(() => null),
            ])

            // reg_is_valid starts as false (not yet validated).
            // toggleIsValid validates it only when remain_value === 0 AND reg_is_valid === false.
            // After validation, reg_is_valid becomes true = "checked in".

            if (found.reg_is_valid === true) {
                // Already checked in
                setScanResult({
                    type: 'warning',
                    message: 'Check-in já realizado anteriormente',
                    registration: found,
                    event: eventData ?? undefined,
                    user: userData ?? undefined,
                })
                return
            }

            if (found.reg_remain_value > 0) {
                setScanResult({
                    type: 'error',
                    message: `Pagamento pendente: R$ ${found.reg_remain_value.toFixed(2)} em aberto`,
                    registration: found,
                    event: eventData ?? undefined,
                    user: userData ?? undefined,
                })
                return
            }

            // Fully paid and not yet checked in — perform check-in
            const checkInResult = await registrationService.checkIn(found.reg_id)

            setScanResult({
                type: 'success',
                message: `${checkInResult.message} (+${checkInResult.pointsAdded} pontos)`,
                registration: { ...found, reg_is_valid: true },
                event: eventData ?? undefined,
                user: userData ?? undefined,
            })

            setTimeout(() => {
                setTicketId('')
                setScanResult(null)
            }, 5000)
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                'Erro ao verificar ingresso'
            setScanResult({ type: 'error', message: msg })
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleScan()
    }

    return (
        <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-full">
            <div className="flex items-center gap-3">
                <div className="bg-black p-2 rounded-xl">
                    <ScanLine className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-semibold">Check-in de Ingressos</h1>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <label className="text-sm text-gray-600 mb-3 block">
                    Digite o código do ingresso
                </label>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={ticketId}
                        onChange={(e) => setTicketId(e.target.value.toUpperCase())}
                        onKeyDown={handleKeyDown}
                        placeholder="UJAD-XXXXXX"
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black font-mono text-lg"
                    />
                    <button
                        onClick={handleScan}
                        disabled={isLoading}
                        className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2 disabled:opacity-60"
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <ScanLine size={20} />
                                Verificar
                            </>
                        )}
                    </button>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                    Formato: UJAD-XXXXXX (primeiros 6 caracteres do ID da inscrição)
                </div>
            </div>

            {scanResult && (
                <div
                    className={`rounded-2xl p-6 shadow-sm ${scanResult.type === 'success'
                        ? 'bg-green-50 border-2 border-green-200'
                        : scanResult.type === 'warning'
                            ? 'bg-yellow-50 border-2 border-yellow-200'
                            : 'bg-red-50 border-2 border-red-200'
                        }`}
                >
                    <div className="flex items-center gap-3 mb-4">
                        {scanResult.type === 'success' && <CheckCircle size={32} className="text-green-600" />}
                        {scanResult.type === 'warning' && <AlertCircle size={32} className="text-yellow-600" />}
                        {scanResult.type === 'error' && <XCircle size={32} className="text-red-600" />}
                        <h3
                            className={`text-xl font-semibold ${scanResult.type === 'success'
                                ? 'text-green-800'
                                : scanResult.type === 'warning'
                                    ? 'text-yellow-800'
                                    : 'text-red-800'
                                }`}
                        >
                            {scanResult.message}
                        </h3>
                    </div>

                    {(scanResult.registration || scanResult.event || scanResult.user) && (
                        <div className="bg-white rounded-xl p-4 space-y-2 text-sm">
                            {scanResult.registration && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Código:</span>
                                    <span className="font-mono font-semibold">
                                        UJAD-{scanResult.registration.reg_id.slice(0, 6).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            {scanResult.event && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Evento:</span>
                                    <span className="font-semibold">{scanResult.event.eve_nome}</span>
                                </div>
                            )}
                            {scanResult.user && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Participante:</span>
                                    <span className="font-semibold">{scanResult.user.user_name}</span>
                                </div>
                            )}
                            {scanResult.registration && (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Pagamento:</span>
                                        <span className={`font-semibold ${scanResult.registration.reg_remain_value <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {scanResult.registration.reg_remain_value <= 0
                                                ? 'Quitado'
                                                : `R$ ${scanResult.registration.reg_remain_value.toFixed(2)} pendente`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className={`font-semibold ${scanResult.registration.reg_is_valid ? 'text-green-600' : 'text-gray-600'}`}>
                                            {scanResult.registration.reg_is_valid ? 'Check-in realizado' : 'Aguardando check-in'}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Instruções:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Digite o código no formato UJAD-XXXXXX</li>
                    <li>• O ingresso deve estar com pagamento quitado para fazer check-in</li>
                    <li>• Cada ingresso pode fazer check-in apenas uma vez</li>
                    <li>• O sistema verifica automaticamente a validade e o pagamento</li>
                </ul>
            </div>
        </div>
    )
}
