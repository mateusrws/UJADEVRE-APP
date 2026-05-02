import { CreditCard, X } from 'lucide-react';
import type { InterfaceRegistration } from '../../types/Registration/TypeRegistration';

type PaymentModalProps = {
    registration: InterfaceRegistration;
    paymentAmount: string;
    onAmountChange: (value: string) => void;
    onConfirm: () => void;
    onClose: () => void;
};

export function PaymentModal({ registration, paymentAmount, onAmountChange, onConfirm, onClose }: PaymentModalProps) {
    const remaining = registration.price - registration.amountPaid;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-black p-2 rounded-xl">
                            <CreditCard className="text-white" size={20} />
                        </div>
                        <h2 className="text-xl font-semibold">Pagamento</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold text-black mb-2">{registration.eventName}</h3>
                    <div className="text-sm text-gray-600 mb-4">
                        {new Date(registration.date).toLocaleDateString('pt-BR')}
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">Valor total:</span>
                            <span className="font-semibold">R$ {registration.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">Já pago:</span>
                            <span className="font-semibold text-green-600">R$ {registration.amountPaid.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-gray-300 my-2"></div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Falta pagar:</span>
                            <span className="font-bold text-lg">R$ {remaining.toFixed(2)}</span>
                        </div>
                    </div>

                    <label className="text-sm text-gray-600 mb-2 block">Quanto deseja pagar?</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max={remaining}
                        value={paymentAmount}
                        onChange={(e) => onAmountChange(e.target.value)}
                        placeholder="0,00"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-white text-black border-2 border-black py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
