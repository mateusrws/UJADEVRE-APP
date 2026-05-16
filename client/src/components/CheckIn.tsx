import { ScanLine, CheckCircle, XCircle, AlertCircle, Upload } from 'lucide-react'
import { useState } from 'react'
import { registrationService, type RegistrationRaw } from '../services/registrationService'
import { eventService, type Event } from '../services/eventService'
import { userService, type User } from '../services/userService'
import { archiveService } from '../services/archiveService'
import Swal from 'sweetalert2'

type ScanResultType = {
    type: 'success' | 'error' | 'warning'
    message: string
    registration?: RegistrationRaw
    event?: Event
    user?: User
    reg_term_url?: string
    needsTermUpload?: boolean
}

export function CheckIn() {
    const [ticketId, setTicketId] = useState('')
    const [scanResult, setScanResult] = useState<ScanResultType | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleScan = async () => {
        const input = ticketId.trim().toUpperCase()

        if (!input) {
            setScanResult({ type: 'error', message: 'Por favor, digite o código do ingresso' })
            return
        }

        setIsLoading(true)
        setScanResult(null)
        setSelectedFile(null)

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

            if (found.reg_is_valid === true) {
                // Already checked in
                setScanResult({
                    type: 'warning',
                    message: 'Check-in já realizado anteriormente',
                    registration: found,
                    event: eventData ?? undefined,
                    user: userData ?? undefined,
                    reg_term_url: found.reg_term_url,
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
                message: `${checkInResult.message} (+${checkInResult.points_added} pontos)`,
                registration: { ...found, reg_is_valid: true },
                event: eventData ?? undefined,
                user: userData ?? undefined,
                reg_term_url: checkInResult.reg_term_url,
            })

            setTimeout(() => {
                setTicketId('')
                setScanResult(null)
            }, 10000)
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                'Erro ao verificar ingresso'

            // Check if error is about missing term
            const needsTermUpload = msg.includes('termo não foi assinado') || msg.includes('termo não foi salvo')

            // Fetch registration data for term upload
            let registration: RegistrationRaw | undefined
            let eventData: Event | undefined
            let userData: User | undefined

            if (needsTermUpload) {
                try {
                    const all = await registrationService.getAll()
                    const found = all.find((r) => {
                        const code = `UJAD-${r.reg_id.slice(0, 6).toUpperCase()}`
                        return code === ticketId.trim().toUpperCase() || r.reg_id.toUpperCase() === ticketId.trim().toUpperCase()
                    })

                    if (found) {
                        registration = found
                        const [evt, usr] = await Promise.all([
                            eventService.getById(found.eve_id).catch(() => null),
                            userService.getById(found.user_id).catch(() => null),
                        ])
                        eventData = evt ?? undefined
                        userData = usr ?? undefined
                    }
                } catch {
                    // Ignore errors fetching data
                }
            }

            setScanResult({
                type: 'error',
                message: msg,
                needsTermUpload,
                registration,
                event: eventData,
                user: userData,
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
        if (!validTypes.includes(file.type)) {
            Swal.fire({
                icon: 'error',
                title: 'Formato inválido',
                text: 'Por favor, envie um arquivo PDF ou imagem (JPG, PNG)',
            })
            return
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024
        if (file.size > maxSize) {
            Swal.fire({
                icon: 'error',
                title: 'Arquivo muito grande',
                text: 'O arquivo deve ter no máximo 10MB',
            })
            return
        }

        setSelectedFile(file)
    }

    const handleUploadTerm = async () => {
        if (!selectedFile || !scanResult?.registration) return

        setIsUploading(true)

        try {
            await archiveService.uploadTerm(scanResult.registration.reg_id, { file: selectedFile })

            await Swal.fire({
                icon: 'success',
                title: 'Termo enviado!',
                text: 'O termo foi enviado com sucesso. Realizando check-in...',
                timer: 2000,
                showConfirmButton: false,
            })

            // Retry check-in after successful upload
            setSelectedFile(null)
            await handleScan()
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || 'Erro ao enviar termo'
            Swal.fire({
                icon: 'error',
                title: 'Erro no upload',
                text: msg,
            })
        } finally {
            setIsUploading(false)
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

                    {/* File upload for missing term */}
                    {scanResult.needsTermUpload && scanResult.registration && (
                        <div className="mt-4 bg-white rounded-xl p-4 border-2 border-red-300">
                            <div className="flex items-center gap-2 mb-3">
                                <Upload size={20} className="text-red-600" />
                                <h4 className="font-semibold text-red-800">Enviar Termo Assinado</h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                                Por favor, faça upload do termo de responsabilidade assinado para continuar com o check-in.
                            </p>
                            <div className="space-y-3">
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 file:cursor-pointer"
                                />
                                {selectedFile && (
                                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                        <span className="text-sm text-gray-700">{selectedFile.name}</span>
                                        <button
                                            onClick={handleUploadTerm}
                                            disabled={isUploading}
                                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all text-sm flex items-center gap-2 disabled:opacity-60"
                                        >
                                            {isUploading ? (
                                                <>
                                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    <Upload size={16} />
                                                    Enviar
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Formatos aceitos: PDF, JPG, PNG (máx. 10MB)
                            </p>
                        </div>
                    )}

                    {/* Show term iframe on success or warning (already checked in) */}
                    {(scanResult.type === 'success' || scanResult.type === 'warning') && scanResult.reg_term_url && (
                        <div className="mt-4 bg-white rounded-xl p-4 border-2 border-green-300">
                            <h4 className="font-semibold text-green-800 mb-3">Termo de Responsabilidade</h4>
                            <div className="w-full h-96 border-2 border-gray-300 rounded-lg overflow-hidden">
                                <iframe
                                    src={scanResult.reg_term_url}
                                    className="w-full h-full"
                                    title="Termo de Responsabilidade"
                                    onError={() => {
                                        Swal.fire({
                                            icon: 'warning',
                                            title: 'Erro ao carregar termo',
                                            text: 'Não foi possível exibir o termo. Verifique o link.',
                                        })
                                    }}
                                />
                            </div>
                            <a
                                href={scanResult.reg_term_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                            >
                                Abrir termo em nova aba →
                            </a>
                        </div>
                    )}
                </div>
            )}

            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Instruções:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Digite o código no formato UJAD-XXXXXX</li>
                    <li>• O ingresso deve estar com pagamento quitado para fazer check-in</li>
                    <li>• O termo de responsabilidade deve estar assinado e enviado</li>
                    <li>• Cada ingresso pode fazer check-in apenas uma vez</li>
                    <li>• O sistema verifica automaticamente a validade e o pagamento</li>
                </ul>
            </div>
        </div>
    )
}
