'use client';

import React from 'react';
import { User } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, LayoutDashboard, Search, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    user: User;
    onSwitchRole: () => void;
    setView: (v: 'EXPLORE' | 'DASHBOARD') => void;
    currentView: string;
}

export const Navbar: React.FC<Props> = ({ user, onSwitchRole, setView, currentView }) => (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <div
                    className="flex items-center gap-2 font-bold text-slate-900 cursor-pointer tracking-tight"
                    onClick={() => setView('EXPLORE')}
                >
                    <Car className="w-5 h-5 text-indigo-600" />
                    <span>DriveShare</span>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <button
                        onClick={() => setView('EXPLORE')}
                        className={cn("transition-colors", currentView === 'EXPLORE' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900')}
                    >
                        Explorar
                    </button>
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
                    <Badge variant="secondary" className="hidden sm:inline-flex capitalize">{user.role}</Badge>
                    <Button variant="ghost" onClick={onSwitchRole} className="text-xs h-8 px-2">Alternar</Button>
                </div>
                <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                    {user.name[0]}
                </div>
            </div>
        </div>
    </header>
);
