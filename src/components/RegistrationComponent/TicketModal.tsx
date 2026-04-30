import { X } from 'lucide-react';
import type { InterfaceRegistration } from '../../types/Registration/TypeRegistration';

type TicketModalProps = {
    registration: InterfaceRegistration;
    onClose: () => void;
};

export function TicketModal({ registration, onClose }: TicketModalProps) {
    const Icon = registration.icon;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Ingresso</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col items-center">
                    <div className="bg-gray-50 rounded-2xl p-6 w-full mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-black p-2 rounded-xl">
                                <Icon className="text-white" size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-black">{registration.eventName}</h3>
                                <p className="text-sm text-gray-500">
                                    {new Date(registration.date).toLocaleDateString('pt-BR')}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 mb-4 flex items-center justify-center">
                            <div className="relative w-48 h-48">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <rect x="0" y="0" width="100" height="100" fill="white"/>
                                    <rect x="5" y="5" width="10" height="10" fill="black"/>
                                    <rect x="20" y="5" width="5" height="5" fill="black"/>
                                    <rect x="30" y="5" width="5" height="5" fill="black"/>
                                    <rect x="40" y="5" width="10" height="10" fill="black"/>
                                    <rect x="70" y="5" width="5" height="5" fill="black"/>
                                    <rect x="85" y="5" width="10" height="10" fill="black"/>
                                    <rect x="5" y="20" width="5" height="5" fill="black"/>
                                    <rect x="25" y="20" width="5" height="5" fill="black"/>
                                    <rect x="35" y="20" width="10" height="10" fill="black"/>
                                    <rect x="60" y="20" width="5" height="5" fill="black"/>
                                    <rect x="85" y="20" width="5" height="5" fill="black"/>
                                    <rect x="5" y="30" width="5" height="5" fill="black"/>
                                    <rect x="15" y="30" width="10" height="10" fill="black"/>
                                    <rect x="40" y="30" width="5" height="5" fill="black"/>
                                    <rect x="50" y="30" width="10" height="10" fill="black"/>
                                    <rect x="70" y="30" width="5" height="5" fill="black"/>
                                    <rect x="85" y="30" width="5" height="5" fill="black"/>
                                    <rect x="5" y="45" width="15" height="5" fill="black"/>
                                    <rect x="30" y="45" width="5" height="5" fill="black"/>
                                    <rect x="45" y="45" width="10" height="10" fill="black"/>
                                    <rect x="65" y="45" width="5" height="5" fill="black"/>
                                    <rect x="75" y="45" width="15" height="5" fill="black"/>
                                    <rect x="10" y="55" width="5" height="5" fill="black"/>
                                    <rect x="25" y="55" width="10" height="10" fill="black"/>
                                    <rect x="50" y="55" width="5" height="5" fill="black"/>
                                    <rect x="70" y="55" width="10" height="10" fill="black"/>
                                    <rect x="5" y="65" width="5" height="5" fill="black"/>
                                    <rect x="20" y="65" width="10" height="10" fill="black"/>
                                    <rect x="40" y="65" width="15" height="5" fill="black"/>
                                    <rect x="65" y="65" width="5" height="5" fill="black"/>
                                    <rect x="85" y="65" width="10" height="10" fill="black"/>
                                    <rect x="5" y="75" width="10" height="10" fill="black"/>
                                    <rect x="30" y="75" width="5" height="5" fill="black"/>
                                    <rect x="50" y="75" width="10" height="10" fill="black"/>
                                    <rect x="70" y="75" width="5" height="5" fill="black"/>
                                    <rect x="5" y="85" width="10" height="10" fill="black"/>
                                    <rect x="25" y="85" width="5" height="5" fill="black"/>
                                    <rect x="40" y="85" width="10" height="10" fill="black"/>
                                    <rect x="60" y="85" width="5" height="5" fill="black"/>
                                    <rect x="75" y="85" width="5" height="5" fill="black"/>
                                    <rect x="85" y="85" width="10" height="10" fill="black"/>
                                </svg>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">ID do Ingresso</p>
                            <p className="font-mono text-sm font-semibold">UJAD-{registration.id.toString().padStart(6, '0')}</p>
                        </div>
                    </div>

                    <div className="w-full space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Valor:</span>
                            <span className="font-semibold">R$ {registration.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className="font-semibold text-green-600">Confirmado</span>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full mt-6 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}
