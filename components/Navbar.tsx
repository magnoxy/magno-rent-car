
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  currentView: string;
  setView: (v: 'EXPLORE' | 'LIST' | 'DASHBOARD') => void;
  user: User;
  onToggleRole: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, user, onToggleRole }) => {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="text-2xl font-bold text-indigo-600 cursor-pointer flex items-center gap-2"
          onClick={() => setView('EXPLORE')}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          DriveShare
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView('EXPLORE')}
            className={`font-medium ${currentView === 'EXPLORE' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Explore
          </button>
          {user.role === 'OWNER' && (
            <button 
              onClick={() => setView('LIST')}
              className={`font-medium ${currentView === 'LIST' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              List a Car
            </button>
          )}
          <button 
            onClick={() => setView('DASHBOARD')}
            className={`font-medium ${currentView === 'DASHBOARD' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Dashboard
          </button>
          
          <div className="h-8 w-px bg-slate-200"></div>

          <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">{user.role}</span>
            <button 
              onClick={onToggleRole}
              className="text-xs font-medium text-slate-500 hover:text-indigo-600 underline"
            >
              Switch Role
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
