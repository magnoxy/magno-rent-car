import React, { useState } from 'react';
import { Car } from '../../domain/entities';
import { Button, Card, Input } from './ui/atoms';
import { X, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface Props {
    car: Car;
    onClose: () => void;
    onConfirm: (days: number) => void;
}

export const PaymentModal: React.FC<Props> = ({ car, onClose, onConfirm }) => {
    const [processing, setProcessing] = useState(false);
    const [step, setStep] = useState<'DETAILS' | 'PROCESSING' | 'SUCCESS'>('DETAILS');
    const [days, setDays] = useState(3);

    const handlePayment = async () => {
        setProcessing(true);
        setStep('PROCESSING');

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        setStep('SUCCESS');
        setTimeout(() => {
            onConfirm(days);
        }, 1500);
    };

    const total = car.pricePerDay * days;

    if (step === 'SUCCESS') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                <Card className="w-full max-w-sm shadow-2xl p-8 flex flex-col items-center text-center space-y-4 animate-in zoom-in-95 duration-200">
                    <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Pagamento Confirmado!</h2>
                        <p className="text-slate-500 text-sm mt-1">Sua reserva foi realizada com sucesso.</p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row">
                {/* Car Summary Side */}
                <div className="w-full md:w-5/12 bg-slate-50 p-6 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col gap-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-indigo-600" />
                            Resumo do Pedido
                        </h3>

                        <div className="aspect-video w-full rounded-lg bg-slate-200 overflow-hidden relative group">
                            <img src={car.imageUrl} alt={car.model} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
                                <p className="text-white font-bold text-sm">{car.brand} {car.model}</p>
                                <p className="text-white/80 text-xs">{car.year}</p>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-slate-500">
                                <span>Diária</span>
                                <span>${car.pricePerDay}</span>
                            </div>
                            <div className="flex justify-between text-slate-500 items-center">
                                <span>Dias</span>
                                <input
                                    type="number"
                                    min="1"
                                    max="30"
                                    value={days}
                                    onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 h-7 text-right border rounded px-1"
                                />
                            </div>
                            <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900 text-base">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Form Side */}
                <div className="flex-1 p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-semibold tracking-tight">Pagamento</h2>
                            <p className="text-sm text-slate-500">Insira os dados do cartão para finalizar.</p>
                        </div>
                        <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0" disabled={processing}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="space-y-4 flex-1">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-slate-500">Número do Cartão</label>
                            <div className="relative">
                                <Input placeholder="0000 0000 0000 0000" disabled={processing} />
                                <CreditCard className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-slate-500">Validade</label>
                                <Input placeholder="MM/AA" disabled={processing} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-slate-500">CVC</label>
                                <Input placeholder="123" type="password" disabled={processing} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-slate-500">Nome no Cartão</label>
                            <Input placeholder="Como está no cartão" disabled={processing} />
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose} disabled={processing}>Cancelar</Button>
                        <Button onClick={handlePayment} disabled={processing} className="min-w-[140px]">
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Processando
                                </span>
                            ) : (
                                `Pagar $${total} `
                            )}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
