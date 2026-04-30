import { FileText, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import type { InterfaceRegistration } from '../types/Registration/TypeRegistration';
import { getMyRegistrations } from '../api/Registrations/getMyRegistrations';
import { processPayment } from '../api/payment/processPayment';
import { PaymentModal } from '../components/RegistrationComponent/PaymentModal';
import { TicketModal } from '../components/RegistrationComponent/TicketModal';


export function Registration(){
    const [registrations, setRegistrations] = useState<InterfaceRegistration[]>(getMyRegistrations());
    const [selectedEvent, setSelectedEvent] = useState<InterfaceRegistration | null>(null);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [ticketToView, setTicketToView] = useState<InterfaceRegistration | null>(null);

    const totalPaid = registrations.reduce((sum, r) => sum + r.amountPaid, 0);
    const totalPending = registrations.reduce((sum, r) => sum + (r.price - r.amountPaid), 0);

    const handleOpenPayment = (registration: InterfaceRegistration) => {
        setSelectedEvent(registration);
        setPaymentAmount('');
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
        setPaymentAmount('');
    };

    const handlePayment = () => {
        if (!selectedEvent) return;

        const amount = parseFloat(paymentAmount);
        const remaining = selectedEvent.price - selectedEvent.amountPaid;

        if (isNaN(amount) || amount <= 0 || amount > remaining) {
            alert('Valor inválido! Digite um valor entre R$ 0,01 e R$ ' + remaining.toFixed(2));
            return;
        }

        setRegistrations(processPayment(registrations, selectedEvent.id, amount));
        handleCloseModal();
    };

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

            <div className="flex flex-col gap-3">
                {registrations.map((registration) => {
                    const Icon = registration.icon;
                    const isPaid = registration.amountPaid >= registration.price;
                    const remaining = registration.price - registration.amountPaid;

                    return (
                        <div
                            key={registration.id}
                            onClick={() => isPaid && setTicketToView(registration)}
                            className={`bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all ${isPaid ? 'cursor-pointer' : ''}`}
                        >
                            <div className="flex gap-4">
                                <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                                    <Icon size={24} className="text-black" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-black mb-2">{registration.eventName}</h3>
                                    <div className="text-sm text-gray-500 mb-3">
                                        {new Date(registration.date).toLocaleDateString('pt-BR')}
                                    </div>

                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-lg font-bold text-black">
                                            R$ {registration.price.toFixed(2)}
                                        </div>

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

                                    {!isPaid && registration.amountPaid > 0 && (
                                        <div className="text-sm text-gray-600">
                                            Pago: R$ {registration.amountPaid.toFixed(2)} | Falta: R$ {remaining.toFixed(2)}
                                        </div>
                                    )}

                                    {isPaid && (
                                        <div className="text-xs text-gray-400 mt-2">
                                            Clique para ver o ingresso
                                        </div>
                                    )}
                                </div>
                            </div>

                            {!isPaid && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenPayment(registration);
                                    }}
                                    className="w-full mt-4 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm"
                                >
                                    Pagar Agora
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {selectedEvent && (
                <PaymentModal
                    registration={selectedEvent}
                    paymentAmount={paymentAmount}
                    onAmountChange={setPaymentAmount}
                    onConfirm={handlePayment}
                    onClose={handleCloseModal}
                />
            )}

            {ticketToView && (
                <TicketModal
                    registration={ticketToView}
                    onClose={() => setTicketToView(null)}
                />
            )}
        </div>
    );
}
