import React from 'react';
import { Shield, Clock, Zap } from 'lucide-react';

export const Features: React.FC = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="p-4 bg-white rounded-full shadow-sm border">
                            <Shield className="h-6 w-6 text-slate-900" />
                        </div>
                        <h3 className="text-xl font-bold">Segurança Total</h3>
                        <p className="text-slate-500">
                            Todos os veículos passam por revisões rigorosas e possuem seguro completo para sua tranquilidade.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="p-4 bg-white rounded-full shadow-sm border">
                            <Clock className="h-6 w-6 text-slate-900" />
                        </div>
                        <h3 className="text-xl font-bold">Rapidez no Aluguel</h3>
                        <p className="text-slate-500">
                            Processo 100% digital. Escolha seu carro, assine o contrato e retire em minutos.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="p-4 bg-white rounded-full shadow-sm border">
                            <Zap className="h-6 w-6 text-slate-900" />
                        </div>
                        <h3 className="text-xl font-bold">Frota Premium</h3>
                        <p className="text-slate-500">
                            Desde compactos econômicos até SUVs de luxo, temos o carro perfeito para cada ocasião.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
