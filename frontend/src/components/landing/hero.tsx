'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Hero: React.FC = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-slate-950 text-slate-50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            Sua Jornada Começa Aqui
                        </h1>
                        <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl">
                            Alugue os melhores carros com facilidade e segurança. Experiência premium, preços justos e liberdade total.
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Button size="lg" className="bg-slate-50 text-slate-950 hover:bg-slate-200" asChild>
                            <Link href="/signup">Começar Agora</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-slate-50 border-slate-700 hover:bg-slate-900" asChild>
                            <Link href="/login">Saiba Mais</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
