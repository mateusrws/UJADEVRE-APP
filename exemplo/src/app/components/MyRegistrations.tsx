import { FileText, CheckCircle, Clock, Camera, PartyPopper, TreePine, Gamepad2, Briefcase, X, CreditCard } from 'lucide-react';
import { useState } from 'react';

interface Registration {
  id: number;
  eventName: string;
  date: string;
  price: number;
  amountPaid: number;
  icon: any;
}

const initialRegistrations: Registration[] = [
  {
    id: 1,
    eventName: 'Workshop de Fotografia',
    date: '2026-05-08',
    price: 50.0,
    amountPaid: 50.0,
    icon: Camera,
  },
  {
    id: 2,
    eventName: 'Encontro Mensal - Abril',
    date: '2026-04-15',
    price: 30.0,
    amountPaid: 30.0,
    icon: PartyPopper,
  },
  {
    id: 3,
    eventName: 'Caminhada Ecológica',
    date: '2026-05-22',
    price: 25.0,
    amountPaid: 0,
    icon: TreePine,
  },
  {
    id: 4,
    eventName: 'Noite de Jogos',
    date: '2026-05-29',
    price: 20.0,
    amountPaid: 0,
    icon: Gamepad2,
  },
  {
    id: 5,
    eventName: 'Palestra de Empreendedorismo',
    date: '2026-03-20',
    price: 40.0,
    amountPaid: 40.0,
    icon: Briefcase,
  },
];

export function MyRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>(initialRegistrations);
  const [selectedEvent, setSelectedEvent] = useState<Registration | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [ticketToView, setTicketToView] = useState<Registration | null>(null);

  const totalPaid = registrations.reduce((sum, r) => sum + r.amountPaid, 0);
  const totalPending = registrations.reduce((sum, r) => sum + (r.price - r.amountPaid), 0);

  const handleOpenPayment = (registration: Registration) => {
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

    setRegistrations(registrations.map(r =>
      r.id === selectedEvent.id
        ? { ...r, amountPaid: r.amountPaid + amount }
        : r
    ));

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
          <div className="text-2xl font-bold">
            R$ {totalPaid.toFixed(2)}
          </div>
        </div>
        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-sm">
          <div className="text-xs text-gray-600 mb-2">Pendente</div>
          <div className="text-2xl font-bold text-black">
            R$ {totalPending.toFixed(2)}
          </div>
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
              className={`bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all ${
                isPaid ? 'cursor-pointer' : ''
              }`}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-black p-2 rounded-xl">
                  <CreditCard className="text-white" size={20} />
                </div>
                <h2 className="text-xl font-semibold">Pagamento</h2>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-black mb-2">{selectedEvent.eventName}</h3>
              <div className="text-sm text-gray-600 mb-4">
                {new Date(selectedEvent.date).toLocaleDateString('pt-BR')}
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Valor total:</span>
                  <span className="font-semibold">R$ {selectedEvent.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Já pago:</span>
                  <span className="font-semibold text-green-600">R$ {selectedEvent.amountPaid.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-300 my-2"></div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Falta pagar:</span>
                  <span className="font-bold text-lg">R$ {(selectedEvent.price - selectedEvent.amountPaid).toFixed(2)}</span>
                </div>
              </div>

              <label className="text-sm text-gray-600 mb-2 block">Quanto deseja pagar?</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max={selectedEvent.price - selectedEvent.amountPaid}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="0,00"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 bg-white text-black border-2 border-black py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {ticketToView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Ingresso</h2>
              <button
                onClick={() => setTicketToView(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-50 rounded-2xl p-6 w-full mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-black p-2 rounded-xl">
                    {(() => {
                      const Icon = ticketToView.icon;
                      return <Icon className="text-white" size={20} />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-black">{ticketToView.eventName}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(ticketToView.date).toLocaleDateString('pt-BR')}
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
                  <p className="font-mono text-sm font-semibold">UJAD-{ticketToView.id.toString().padStart(6, '0')}</p>
                </div>
              </div>

              <div className="w-full space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor:</span>
                  <span className="font-semibold">R$ {ticketToView.price.toFixed(2)}</span>
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
  );
}
