'use client';

import React, { useState } from 'react';
import { User, Car, Rental, RentalStatus, UserRole } from '@/types';
import { StatsOverview, RentalList, FleetList } from './dashboard-components';

interface Props {
    user: User;
    cars: Car[];
    rentals: Rental[];
    onCompleteRental: (rental: Rental) => void;
}

export const Dashboard: React.FC<Props> = ({ user, cars, rentals, onCompleteRental }) => {
    const isOwner = user.role === UserRole.OWNER;
    // Note: ownerId in rental is not strictly in the type interface I defined earlier but present in the entity, 
    // I will check if I need to update the interface or if I can use a different field.
    // Based on the entity, owner should be reachable through the car relation in the backend.
    // For now, I'll stick to the logic but I might need to adjust based on the Car relation.
    const myRentals = isOwner ? rentals : rentals.filter(r => r.clientId === user.id);
    const myCars = cars.filter(c => c.ownerId === user.id);

    const [activeTab, setActiveTab] = useState<'rentals' | 'fleet'>('rentals');

    const activeRentalsCount = myRentals.filter(r => r.status === RentalStatus.ACTIVE).length;
    const totalRevenue = myRentals.reduce((a, b) => a + Number(b.totalPrice), 0);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-slate-500">Gerencie suas atividades e acompanhe seus veículos.</p>
            </div>

            <StatsOverview
                isOwner={isOwner}
                activeRentalsCount={activeRentalsCount}
                totalRevenue={totalRevenue}
                fleetCount={myCars.length}
            />

            <div className="space-y-4">
                <div className="flex gap-4 border-b border-slate-200">
                    <button
                        onClick={() => setActiveTab('rentals')}
                        className={`pb-2 text-sm font-semibold transition-colors ${activeTab === 'rentals' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-slate-500'}`}
                    >
                        Histórico de Aluguéis
                    </button>
                    {isOwner && (
                        <button
                            onClick={() => setActiveTab('fleet')}
                            className={`pb-2 text-sm font-semibold transition-colors ${activeTab === 'fleet' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-slate-500'}`}
                        >
                            Minha Frota
                        </button>
                    )}
                </div>

                <div className="mt-4">
                    {activeTab === 'rentals' ? (
                        <RentalList rentals={myRentals} cars={cars} onCompleteRental={onCompleteRental} />
                    ) : (
                        <FleetList cars={myCars} />
                    )}
                </div>
            </div>
        </div>
    );
};