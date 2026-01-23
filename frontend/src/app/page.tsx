'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { ParallaxCar } from '@/components/landing/parallax-car';
import Link from 'next/link';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center gap-2 cursor-pointer" href="/">
          <Car className="h-6 w-6 text-slate-900" />
          <span className="font-bold text-xl tracking-tighter">Magno Rent Cars</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Criar Conta</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <Hero />
        <ParallaxCar />
        <Features />
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-slate-500">© 2026 Magno Rent Cars. Todos os direitos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 cursor-pointer">Termos de Serviço</Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 cursor-pointer">Privacidade</Link>
        </nav>
      </footer>
    </div>
  );
};
