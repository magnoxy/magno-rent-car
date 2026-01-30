'use client';

import React from 'react';
import { User, UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, LayoutDashboard, Search, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

interface Props {
    user: User;
    setView: (v: 'EXPLORE' | 'DASHBOARD') => void;
    currentView: string;
}

export const Navbar: React.FC<Props> = ({ user, setView, currentView }) => {
    const router = useRouter();
    const isClient = user.role === UserRole.CLIENT;

    const handleLogout = () => {
        AuthService.logout();
        router.push('/login');
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div
                        className={cn("flex items-center gap-2 font-bold text-slate-900 tracking-tight", isClient ? "cursor-pointer" : "cursor-default")}
                        onClick={() => isClient && setView('EXPLORE')}
                    >
                        <Car className="w-5 h-5 text-indigo-600" />
                        <span>DriveShare</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {isClient && (
                            <button
                                onClick={() => setView('EXPLORE')}
                                className={cn("transition-colors", currentView === 'EXPLORE' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900')}
                            >
                                Explorar
                            </button>
                        )}
                        <button
                            onClick={() => setView('DASHBOARD')}
                            className={cn("transition-colors", currentView === 'DASHBOARD' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900')}
                        >
                            Dashboard
                        </button>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 mr-2">
                        <Badge variant="secondary" className="hidden sm:inline-flex capitalize">{user.role?.toLowerCase()}</Badge>
                    </div>
                    <div 
                        className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs cursor-pointer hover:bg-slate-200 transition-colors"
                        onClick={handleLogout}
                        title="Sair"
                    >
                        {user.name?.[0] || 'U'}
                    </div>
                </div>
            </div>
        </header>
    );
};