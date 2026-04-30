import { useState } from 'react';
import { ScanLine, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Ticket {
  id: string;
  eventName: string;
  userName: string;
  date: string;
  valid: boolean;
  checkedIn: boolean;
}

const mockTickets: Record<string, Ticket> = {
  'UJAD-000001': {
    id: 'UJAD-000001',
    eventName: 'Workshop de Fotografia',
    userName: 'João Silva',
    date: '2026-05-08',
    valid: true,
    checkedIn: false,
  },
  'UJAD-000002': {
    id: 'UJAD-000002',
    eventName: 'Encontro Mensal - Abril',
    userName: 'João Silva',
    date: '2026-04-15',
    valid: true,
    checkedIn: false,
  },
  'UJAD-000005': {
    id: 'UJAD-000005',
    eventName: 'Palestra de Empreendedorismo',
    userName: 'João Silva',
    date: '2026-03-20',
    valid: false,
    checkedIn: false,
  },
};

export function CheckIn() {
  const [ticketId, setTicketId] = useState('');
  const [tickets, setTickets] = useState(mockTickets);
  const [scanResult, setScanResult] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
    ticket?: Ticket;
  } | null>(null);

  const handleScan = () => {
    if (!ticketId.trim()) {
      setScanResult({
        type: 'error',
        message: 'Por favor, digite o código do ingresso',
      });
      return;
    }

    const ticket = tickets[ticketId];

    if (!ticket) {
      setScanResult({
        type: 'error',
        message: 'Ingresso não encontrado',
      });
      return;
    }

    if (!ticket.valid) {
      setScanResult({
        type: 'error',
        message: 'Ingresso inválido ou cancelado',
        ticket,
      });
      return;
    }

    if (ticket.checkedIn) {
      setScanResult({
        type: 'warning',
        message: 'Check-in já realizado anteriormente',
        ticket,
      });
      return;
    }

    setTickets({
      ...tickets,
      [ticketId]: { ...ticket, checkedIn: true },
    });

    setScanResult({
      type: 'success',
      message: 'Check-in realizado com sucesso!',
      ticket: { ...ticket, checkedIn: true },
    });

    setTimeout(() => {
      setTicketId('');
      setScanResult(null);
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleScan();
    }
  };

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
            onKeyPress={handleKeyPress}
            placeholder="UJAD-000001"
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black font-mono text-lg"
          />
          <button
            onClick={handleScan}
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2"
          >
            <ScanLine size={20} />
            Verificar
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Códigos de teste: UJAD-000001 (válido), UJAD-000002 (válido), UJAD-000005 (inválido)
        </div>
      </div>

      {scanResult && (
        <div
          className={`rounded-2xl p-6 shadow-sm ${
            scanResult.type === 'success'
              ? 'bg-green-50 border-2 border-green-200'
              : scanResult.type === 'warning'
              ? 'bg-yellow-50 border-2 border-yellow-200'
              : 'bg-red-50 border-2 border-red-200'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            {scanResult.type === 'success' && (
              <CheckCircle size={32} className="text-green-600" />
            )}
            {scanResult.type === 'warning' && (
              <AlertCircle size={32} className="text-yellow-600" />
            )}
            {scanResult.type === 'error' && (
              <XCircle size={32} className="text-red-600" />
            )}
            <h3
              className={`text-xl font-semibold ${
                scanResult.type === 'success'
                  ? 'text-green-800'
                  : scanResult.type === 'warning'
                  ? 'text-yellow-800'
                  : 'text-red-800'
              }`}
            >
              {scanResult.message}
            </h3>
          </div>

          {scanResult.ticket && (
            <div className="bg-white rounded-xl p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Código:</span>
                <span className="font-mono font-semibold">{scanResult.ticket.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Evento:</span>
                <span className="font-semibold">{scanResult.ticket.eventName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Participante:</span>
                <span className="font-semibold">{scanResult.ticket.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data:</span>
                <span className="font-semibold">
                  {new Date(scanResult.ticket.date).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`font-semibold ${
                    scanResult.ticket.valid ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {scanResult.ticket.valid ? 'Válido' : 'Inválido'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4">Instruções:</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Digite o código do ingresso ou escaneie o QR code</li>
          <li>• Apenas ingressos válidos podem fazer check-in</li>
          <li>• Cada ingresso pode fazer check-in apenas uma vez</li>
          <li>• O sistema verifica automaticamente a validade</li>
        </ul>
      </div>
    </div>
  );
}
