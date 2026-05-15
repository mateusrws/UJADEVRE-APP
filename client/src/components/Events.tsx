import {
    Calendar,
    MapPin,
    Users,
    Clock,
    PartyPopper,
    Camera,
    TreePine,
    Gamepad2,
    Star,
    Plus,
    X,
    Music,
    Coffee,
    Dumbbell,
    Trash2,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { eventService, type Event } from '../services/eventService'
import { registrationService } from '../services/registrationService'
import { addressService } from '../services/addressService'
import { useAuth } from '../contexts/AuthContext'

const iconMap: Record<string, React.ElementType> = {
    PartyPopper,
    Camera,
    TreePine,
    Gamepad2,
    Music,
    Coffee,
    Dumbbell,
    Calendar,
}

const eventIconOptions = [
    { value: 'PartyPopper', icon: PartyPopper, label: 'Festa' },
    { value: 'Camera', icon: Camera, label: 'Câmera' },
    { value: 'TreePine', icon: TreePine, label: 'Natureza' },
    { value: 'Gamepad2', icon: Gamepad2, label: 'Jogos' },
    { value: 'Music', icon: Music, label: 'Música' },
    { value: 'Coffee', icon: Coffee, label: 'Café' },
    { value: 'Dumbbell', icon: Dumbbell, label: 'Esporte' },
    { value: 'Calendar', icon: Calendar, label: 'Evento' },
]

export function Events() {
    const { isAdmin, currentUser } = useAuth()
    const [events, setEvents] = useState<Event[]>([])
    // Map eve_id -> reg_id for the current user's registrations
    const [registrationMap, setRegistrationMap] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    // Form state
    const [newEventTitle, setNewEventTitle] = useState('')
    const [newEventDate, setNewEventDate] = useState('')
    const [newEventTime, setNewEventTime] = useState('')
    const [newEventDesc, setNewEventDesc] = useState('')
    const [newEventMaxParticipants, setNewEventMaxParticipants] = useState('')
    const [newEventPoints, setNewEventPoints] = useState('')
    const [newEventPrice, setNewEventPrice] = useState('')
    const [selectedEventIconIndex, setSelectedEventIconIndex] = useState(0)

    // Address form state
    const [newEventStreet, setNewEventStreet] = useState('')
    const [newEventNumber, setNewEventNumber] = useState('')
    const [newEventComplement, setNewEventComplement] = useState('')
    const [newEventNeighborhood, setNewEventNeighborhood] = useState('')
    const [newEventCity, setNewEventCity] = useState('')
    const [newEventState, setNewEventState] = useState('')
    const [newEventZipCode, setNewEventZipCode] = useState('')

    const fetchData = async () => {
        try {
            const [eventsData, registrationsData] = await Promise.all([
                eventService.getAll(),
                registrationService.getAll(),
            ])
            setEvents(eventsData)

            if (currentUser) {
                const myRegs = registrationsData.filter((r) => r.user_id === currentUser.user_id)
                const map: Record<string, string> = {}
                myRegs.forEach((r) => { map[r.eve_id] = r.reg_id })
                setRegistrationMap(map)
            }
        } catch (err: any) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: err?.response?.data?.message || 'Não foi possível carregar os eventos',
                confirmButtonColor: '#000',
            })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [currentUser])

    const handleRegister = async (event: Event) => {
        if (!currentUser) return

        const isRegistered = event.eve_id in registrationMap

        if (isRegistered) {
            const result = await Swal.fire({
                icon: 'warning',
                title: 'Cancelar inscrição?',
                text: 'Deseja cancelar sua inscrição neste evento?',
                showCancelButton: true,
                confirmButtonColor: '#000',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Sim, cancelar',
                cancelButtonText: 'Não',
            })
            if (!result.isConfirmed) return

            try {
                const reg_id = registrationMap[event.eve_id]
                await registrationService.delete(reg_id)
                setRegistrationMap((prev) => {
                    const next = { ...prev }
                    delete next[event.eve_id]
                    return next
                })
                // Refresh events to get updated participant count from backend
                await fetchData()
                Swal.fire({ icon: 'success', title: 'Inscrição cancelada', timer: 1500, showConfirmButton: false })
            } catch (err: any) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: err?.response?.data?.message || 'Não foi possível cancelar a inscrição',
                    confirmButtonColor: '#000',
                })
            }
        } else {
            if (event.eve_participants >= event.eve_max_participants) {
                Swal.fire({ icon: 'warning', title: 'Evento lotado', text: 'Não há mais vagas disponíveis', confirmButtonColor: '#000' })
                return
            }

            try {
                // reg_term_url requires a valid URL — use a placeholder
                const reg = await registrationService.create({
                    eve_id: event.eve_id,
                    user_id: currentUser.user_id,
                    reg_term_url: 'https://ujadevre.com/termo',
                })
                setRegistrationMap((prev) => ({ ...prev, [event.eve_id]: reg.reg_id }))
                // Refresh events to get updated participant count from backend
                await fetchData()
                Swal.fire({ icon: 'success', title: 'Inscrição realizada!', timer: 1500, showConfirmButton: false })
            } catch (err: any) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: err?.response?.data?.message || 'Não foi possível realizar a inscrição',
                    confirmButtonColor: '#000',
                })
            }
        }
    }

    const handleCreateEvent = async () => {
        if (
            !newEventTitle.trim() ||
            !newEventDate ||
            !newEventTime ||
            !newEventDesc.trim() ||
            !newEventMaxParticipants ||
            !newEventPoints ||
            !newEventStreet.trim() ||
            !newEventNumber.trim() ||
            !newEventNeighborhood.trim() ||
            !newEventCity.trim() ||
            !newEventState.trim() ||
            !newEventZipCode.trim()
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos obrigatórios',
                text: 'Por favor, preencha todos os campos obrigatórios!',
                confirmButtonColor: '#000',
            })
            return
        }

        const maxPart = parseInt(newEventMaxParticipants)
        const points = parseInt(newEventPoints)
        const price = parseFloat(newEventPrice || '0')

        if (isNaN(maxPart) || maxPart <= 0 || isNaN(points) || points <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Valores inválidos',
                text: 'Valores inválidos para participantes ou pontos!',
                confirmButtonColor: '#000',
            })
            return
        }

        setIsSaving(true)
        try {
            // Step 1: Create address for the event
            const address = await addressService.create({
                add_rua: newEventStreet,
                add_bairro: newEventNeighborhood,
                add_cidade: newEventCity,
                add_uf: newEventState,
                add_cep: newEventZipCode,
                add_number: newEventNumber,
                add_comp: newEventComplement || undefined,
            })

            console.log('✅ Address created:', address.add_id)
            console.log('📍 Address ID:', address.add_id)

            // Step 2: Create event with the address ID
            const dateTime = `${newEventDate}T${newEventTime}:00.000Z`

            const eventPayload = {
                eve_nome: newEventTitle,
                eve_data_and_time: dateTime,
                eve_desc: newEventDesc,
                eve_price: price,
                eve_point: points,
                eve_participants: 0,
                eve_max_participants: maxPart,
                eve_icon: eventIconOptions[selectedEventIconIndex].value,
                end_id: address.add_id,
            }

            console.log('📤 Sending event payload:', eventPayload)

            const created = await eventService.create(eventPayload)

            console.log('✅ Event created:', created)

            setEvents((prev) => [...prev, created])
            setIsModalOpen(false)
            resetForm()
            Swal.fire({
                icon: 'success',
                title: 'Evento criado!',
                text: `Endereço e evento cadastrados com sucesso`,
                timer: 2000,
                showConfirmButton: false
            })
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || err?.message || 'Erro desconhecido'

            // Check if error occurred during address creation or event creation
            const isAddressError = errorMessage.toLowerCase().includes('endereço') ||
                errorMessage.toLowerCase().includes('address') ||
                errorMessage.toLowerCase().includes('cep') ||
                errorMessage.toLowerCase().includes('rua')

            Swal.fire({
                icon: 'error',
                title: isAddressError ? 'Erro ao criar endereço' : 'Erro ao criar evento',
                text: errorMessage,
                confirmButtonColor: '#000',
            })
        } finally {
            setIsSaving(false)
        }
    }

    const handleDeleteEvent = async (eve_id: string) => {
        const result = await Swal.fire({
            icon: 'warning',
            title: 'Excluir evento?',
            text: 'Esta ação não pode ser desfeita.',
            showCancelButton: true,
            confirmButtonColor: '#000',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar',
        })
        if (!result.isConfirmed) return

        try {
            await eventService.delete(eve_id)
            setEvents((prev) => prev.filter((e) => e.eve_id !== eve_id))
            Swal.fire({ icon: 'success', title: 'Evento excluído!', timer: 1500, showConfirmButton: false })
        } catch (err: any) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: err?.response?.data?.message || 'Não foi possível excluir o evento',
                confirmButtonColor: '#000',
            })
        }
    }

    const resetForm = () => {
        setNewEventTitle('')
        setNewEventDate('')
        setNewEventTime('')
        setNewEventDesc('')
        setNewEventMaxParticipants('')
        setNewEventPoints('')
        setNewEventPrice('')
        setSelectedEventIconIndex(0)
        setNewEventStreet('')
        setNewEventNumber('')
        setNewEventComplement('')
        setNewEventNeighborhood('')
        setNewEventCity('')
        setNewEventState('')
        setNewEventZipCode('')
    }

    return (
        <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-black p-2 rounded-xl">
                        <Calendar className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-semibold">Eventos</h1>
                </div>
                {isAdmin() && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-all shadow-sm"
                    >
                        <Plus size={20} />
                    </button>
                )}
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <span className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                </div>
            ) : events.length === 0 ? (
                <div className="text-center text-gray-500 py-12">Nenhum evento encontrado</div>
            ) : (
                <div className="flex flex-col gap-4">
                    {events.map((event) => {
                        const isRegistered = event.eve_id in registrationMap
                        const Icon = iconMap[event.eve_icon] || Calendar
                        const progress = event.eve_max_participants > 0
                            ? (event.eve_participants / event.eve_max_participants) * 100
                            : 0

                        return (
                            <div key={event.eve_id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                                <div className="flex gap-4 mb-4">
                                    <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                                        <Icon size={28} className="text-black" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            {/* Backend returns eve_nome */}
                                            <h3 className="font-semibold text-black text-lg flex-1">{event.eve_nome}</h3>
                                            <div className="flex items-center gap-2">
                                                <div className="bg-black text-white px-3 py-1 rounded-full flex items-center gap-1 shrink-0">
                                                    <Star size={14} fill="white" />
                                                    <span className="text-sm font-semibold">{event.eve_point}</span>
                                                </div>
                                                {isAdmin() && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.eve_id) }}
                                                        className="p-2 hover:bg-red-50 rounded-xl transition-all text-red-600"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} />
                                                {/* Backend returns eve_data_and_time */}
                                                <span>{new Date(event.eve_data_and_time).toLocaleDateString('pt-BR')}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} />
                                                <span>
                                                    {new Date(event.eve_data_and_time).toLocaleTimeString('pt-BR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} />
                                                <span>{event.eve_desc}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                        <div className="flex items-center gap-2">
                                            <Users size={16} />
                                            <span>{event.eve_participants}/{event.eve_max_participants} inscritos</span>
                                        </div>
                                        <span>{Math.round(progress)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-black h-2 rounded-full transition-all"
                                            style={{ width: `${Math.min(progress, 100)}%` }}
                                        />
                                    </div>
                                </div>

                                {!isAdmin() && (
                                    <button
                                        onClick={() => handleRegister(event)}
                                        className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${isRegistered
                                            ? 'bg-white text-black border-2 border-black hover:bg-gray-50'
                                            : 'bg-black text-white hover:bg-gray-800 shadow-sm'
                                            }`}
                                    >
                                        {isRegistered ? 'Cancelar Inscrição' : 'Inscrever-se'}
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Create Event Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh]">
                        {/* Header - Fixed */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <div className="flex items-center gap-3">
                                <div className="bg-black p-2 rounded-xl">
                                    <Calendar className="text-white" size={20} />
                                </div>
                                <h2 className="text-xl font-semibold">Novo Evento</h2>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Título do Evento *</label>
                                    <input
                                        type="text"
                                        value={newEventTitle}
                                        onChange={(e) => setNewEventTitle(e.target.value)}
                                        placeholder="Ex: Workshop de Fotografia"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Descrição / Local *</label>
                                    <input
                                        type="text"
                                        value={newEventDesc}
                                        onChange={(e) => setNewEventDesc(e.target.value)}
                                        placeholder="Ex: Clube Central, Rua das Flores"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-sm text-gray-600 mb-2 block">Data *</label>
                                        <input
                                            type="date"
                                            value={newEventDate}
                                            onChange={(e) => setNewEventDate(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-600 mb-2 block">Horário *</label>
                                        <input
                                            type="time"
                                            value={newEventTime}
                                            onChange={(e) => setNewEventTime(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-sm text-gray-600 mb-2 block">Máx. Participantes *</label>
                                        <input
                                            type="number"
                                            value={newEventMaxParticipants}
                                            onChange={(e) => setNewEventMaxParticipants(e.target.value)}
                                            placeholder="Ex: 30"
                                            min="1"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-600 mb-2 block">Pontos *</label>
                                        <input
                                            type="number"
                                            value={newEventPoints}
                                            onChange={(e) => setNewEventPoints(e.target.value)}
                                            placeholder="Ex: 50"
                                            min="1"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Preço (R$)</label>
                                    <input
                                        type="number"
                                        value={newEventPrice}
                                        onChange={(e) => setNewEventPrice(e.target.value)}
                                        placeholder="0,00"
                                        min="0"
                                        step="0.01"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Ícone</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {eventIconOptions.map((option, index) => {
                                            const IconComponent = option.icon
                                            return (
                                                <button
                                                    key={option.value}
                                                    onClick={() => setSelectedEventIconIndex(index)}
                                                    className={`p-3 rounded-xl transition-all ${selectedEventIconIndex === index
                                                        ? 'bg-black text-white'
                                                        : 'bg-gray-100 text-black hover:bg-gray-200'
                                                        }`}
                                                >
                                                    <IconComponent size={20} />
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Address Section */}
                                <div className="border-t pt-4 mt-2">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Endereço do Evento</h3>

                                    <div className="grid grid-cols-3 gap-3 mb-3">
                                        <div className="col-span-2">
                                            <label className="text-sm text-gray-600 mb-2 block">Rua / Logradouro *</label>
                                            <input
                                                type="text"
                                                value={newEventStreet}
                                                onChange={(e) => setNewEventStreet(e.target.value)}
                                                placeholder="Ex: Rua das Flores"
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600 mb-2 block">Número *</label>
                                            <input
                                                type="text"
                                                value={newEventNumber}
                                                onChange={(e) => setNewEventNumber(e.target.value)}
                                                placeholder="123"
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="text-sm text-gray-600 mb-2 block">Complemento</label>
                                        <input
                                            type="text"
                                            value={newEventComplement}
                                            onChange={(e) => setNewEventComplement(e.target.value)}
                                            placeholder="Apto, Sala, Bloco..."
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div>
                                            <label className="text-sm text-gray-600 mb-2 block">Bairro *</label>
                                            <input
                                                type="text"
                                                value={newEventNeighborhood}
                                                onChange={(e) => setNewEventNeighborhood(e.target.value)}
                                                placeholder="Centro"
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600 mb-2 block">CEP *</label>
                                            <input
                                                type="text"
                                                value={newEventZipCode}
                                                onChange={(e) => setNewEventZipCode(e.target.value)}
                                                placeholder="00000-000"
                                                maxLength={9}
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="col-span-2">
                                            <label className="text-sm text-gray-600 mb-2 block">Cidade *</label>
                                            <input
                                                type="text"
                                                value={newEventCity}
                                                onChange={(e) => setNewEventCity(e.target.value)}
                                                placeholder="São Paulo"
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600 mb-2 block">UF *</label>
                                            <input
                                                type="text"
                                                value={newEventState}
                                                onChange={(e) => setNewEventState(e.target.value.toUpperCase().slice(0, 2))}
                                                placeholder="SP"
                                                maxLength={2}
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer - Fixed */}
                        <div className="p-6 border-t bg-white">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => { setIsModalOpen(false); resetForm() }}
                                    className="flex-1 bg-white text-black border-2 border-black py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleCreateEvent}
                                    disabled={isSaving}
                                    className="flex-1 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm disabled:opacity-60"
                                >
                                    {isSaving ? (
                                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto block" />
                                    ) : (
                                        'Criar'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
