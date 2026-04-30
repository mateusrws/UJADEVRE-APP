import { Calendar, Camera, Clock, Gamepad2, MapPin, PartyPopper, Plus, Star, TreePine, Users, X } from "lucide-react";
import { getInitialEvents } from "../types/Event/getInitialevents";
import type { InterfaceEvent } from "../types/Event/EventInterface";
import { useState } from "react";


export function Events(){

    const [events, setEvents] = useState<InterfaceEvent[]>(getInitialEvents());
    const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDate, setNewEventDate] = useState('');
    const [newEventTime, setNewEventTime] = useState('');
    const [newEventLocation, setNewEventLocation] = useState('');
    const [newEventMaxParticipants, setNewEventMaxParticipants] = useState('');
    const [newEventPoints, setNewEventPoints] = useState('');
    const [selectedEventIconIndex, setSelectedEventIconIndex] = useState(0);

    const eventIconOptions = [
        { value: 'PartyPopper', icon: PartyPopper, label: 'Festa' },
        { value: 'Camera', icon: Camera, label: 'Câmera' },
        { value: 'TreePine', icon: TreePine, label: 'Natureza' },
        { value: 'Gamepad2', icon: Gamepad2, label: 'Jogos' },
        { value: 'Star', icon: Star, label: 'Estrela' },
    ];

    const handleRegister = (eventId: number) => {
        if (registeredEvents.includes(eventId)) {
            setRegisteredEvents(registeredEvents.filter((id) => id !== eventId));
        } else {
            setRegisteredEvents([...registeredEvents, eventId]);
        }
    };

    const handleCreateEvent = () => {
        if (!newEventTitle.trim() || !newEventDate || !newEventTime || !newEventLocation.trim() || !newEventMaxParticipants || !newEventPoints) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const maxPart = parseInt(newEventMaxParticipants);
        const points = parseInt(newEventPoints);

        if (isNaN(maxPart) || maxPart <= 0 || isNaN(points) || points <= 0) {
            alert('Valores inválidos para participantes ou pontos!');
            return;
        }

        const [year, month, day] = newEventDate.split('-').map(Number);
        const [hours, minutes] = newEventTime.split(':').map(Number);
        const eventDate = new Date(year, month - 1, day, hours, minutes);

        const newEvent: InterfaceEvent = {
            id: Math.max(...events.map(e => e.id)) + 1,
            name: newEventTitle,
            date: eventDate,
            location: newEventLocation,
            participants: 0,
            maxParticipants: maxPart,
            points: points,
            icon: eventIconOptions[selectedEventIconIndex].icon,
        };

        setEvents([...events, newEvent]);
        setIsModalOpen(false);
        setNewEventTitle('');
        setNewEventDate('');
        setNewEventTime('');
        setNewEventLocation('');
        setNewEventMaxParticipants('');
        setNewEventPoints('');
        setSelectedEventIconIndex(0);
    };

    return(
        <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-black p-2 rounded-xl">
                        <Calendar className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-semibold">Eventos</h1>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-all shadow-sm"
                >
                    <Plus size={20} />
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {events.map((event: InterfaceEvent) => {
                    const isRegistered = registeredEvents.includes(event.id);
                    const Icon = event.icon;
                    const progress = (event.participants / event.maxParticipants) * 100;

                    return (
                        <div
                            key={event.id}
                            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex gap-4 mb-4">
                                <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                                    <Icon size={28} className="text-black" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-semibold text-black text-lg">{event.name}</h3>
                                        <div className="bg-black text-white px-3 py-1 rounded-full flex items-center gap-1 shrink-0 ml-2">
                                            <Star size={14} fill="white" />
                                            <span className="text-sm font-semibold">{event.points}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} />
                                            <span>{new Date(event.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Users size={16} />
                                        <span>{event.participants}/{event.maxParticipants} inscritos</span>
                                    </div>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-black h-2 rounded-full transition-all"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => handleRegister(event.id)}
                                className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${
                                    isRegistered
                                        ? 'bg-white text-black border-2 border-black hover:bg-gray-50'
                                        : 'bg-black text-white hover:bg-gray-800 shadow-sm'
                                }`}
                            >
                                {isRegistered ? 'Cancelar Inscrição' : 'Inscrever-se'}
                            </button>
                        </div>
                    );
                })}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-black p-2 rounded-xl">
                                    <Calendar className="text-white" size={20} />
                                </div>
                                <h2 className="text-xl font-semibold">Novo Evento</h2>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4 mb-6">
                            <div>
                                <label className="text-sm text-gray-600 mb-2 block">Título</label>
                                <input
                                    type="text"
                                    value={newEventTitle}
                                    onChange={(e) => setNewEventTitle(e.target.value)}
                                    placeholder="Nome do evento"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="text-sm text-gray-600 mb-2 block">Data</label>
                                    <input
                                        type="date"
                                        value={newEventDate}
                                        onChange={(e) => setNewEventDate(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm text-gray-600 mb-2 block">Hora</label>
                                    <input
                                        type="time"
                                        value={newEventTime}
                                        onChange={(e) => setNewEventTime(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 mb-2 block">Local</label>
                                <input
                                    type="text"
                                    value={newEventLocation}
                                    onChange={(e) => setNewEventLocation(e.target.value)}
                                    placeholder="Local do evento"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="text-sm text-gray-600 mb-2 block">Máx. participantes</label>
                                    <input
                                        type="number"
                                        value={newEventMaxParticipants}
                                        onChange={(e) => setNewEventMaxParticipants(e.target.value)}
                                        placeholder="Ex: 50"
                                        min="1"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm text-gray-600 mb-2 block">Pontos</label>
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
                                <label className="text-sm text-gray-600 mb-2 block">Ícone</label>
                                <div className="grid grid-cols-5 gap-2">
                                    {eventIconOptions.map((option, index) => {
                                        const IconComponent = option.icon;
                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => setSelectedEventIconIndex(index)}
                                                className={`p-3 rounded-xl transition-all ${
                                                    selectedEventIconIndex === index
                                                        ? 'bg-black text-white'
                                                        : 'bg-gray-100 text-black hover:bg-gray-200'
                                                }`}
                                            >
                                                <IconComponent size={20} />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 bg-white text-black border-2 border-black py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateEvent}
                                className="flex-1 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm"
                            >
                                Criar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
