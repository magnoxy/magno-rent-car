'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Car, Mail, Lock, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login
        console.log('Logging in with:', { email, password });
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="max-w-md w-full p-8 space-y-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <Link
                        className="p-3 bg-slate-900 rounded-xl cursor-pointer"
                        href="/"
                    >
                        <Car className="h-8 w-8 text-white" />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Bem-vindo de volta</h1>
                    <p className="text-sm text-slate-500">Entre com suas credenciais para acessar sua conta</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                id="email"
                                placeholder="nome@exemplo.com"
                                type="email"
                                className="pl-10"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                            Senha
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        Entrar
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-500">Ou continue com</span>
                    </div>
                </div>

                <p className="px-8 text-center text-sm text-slate-500">
                    Não tem uma conta?{" "}
                    <Link
                        className="underline underline-offset-4 hover:text-slate-900 cursor-pointer"
                        href="/signup"
                    >
                        Cadastre-se
                    </Link>
                </p>

                <Button
                    variant="ghost"
                    className="w-full gap-2"
                    asChild
                >
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        Voltar para Home
                    </Link>
                </Button>
            </Card>
        </div>
    );
};
