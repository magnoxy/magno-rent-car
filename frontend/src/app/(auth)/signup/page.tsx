'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Car, Mail, Lock, User, FileText, ArrowLeft } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate signup
        console.log('Signing up with:', formData);
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
                    <h1 className="text-2xl font-bold tracking-tight">Criar sua conta</h1>
                    <p className="text-sm text-slate-500">Junte-se à maior rede de aluguel de carros</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="name">
                            Nome Completo
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                id="name"
                                placeholder="Seu nome"
                                className="pl-10"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="email">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                id="email"
                                placeholder="nome@exemplo.com"
                                type="email"
                                className="pl-10"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-4 pt-2">
                        <h3 className="text-sm font-semibold flex items-center gap-2 border-b pb-2">
                            <FileText className="h-4 w-4" />
                            Documentação Necessária
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500 uppercase font-bold">CNH</label>
                                <Input type="file" className="text-xs" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500 uppercase font-bold">RG</label>
                                <Input type="file" className="text-xs" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500 uppercase font-bold">Comprovante de Residência</label>
                                <Input type="file" className="text-xs" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="password">
                            Senha
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        Criar Conta
                    </Button>
                </form>

                <p className="px-8 text-center text-sm text-slate-500">
                    Já tem uma conta?{" "}
                    <Link
                        className="underline underline-offset-4 hover:text-slate-900 cursor-pointer"
                        href="/login"
                    >
                        Entrar
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
