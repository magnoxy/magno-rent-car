import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar, Wallet, Car as CarIcon, Navigation } from 'lucide-react';
import { User, Car, Rental, RentalStatus } from '@/types';

interface StatsOverviewProps {
    isOwner: boolean;
    activeRentalsCount: number;
    totalRevenue: number;
    fleetCount: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ isOwner, activeRentalsCount, totalRevenue, fleetCount }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500">
                    <span className="text-sm font-medium">Aluguéis Ativos</span>
                    <Calendar className="w-4 h-4" />
                </div>
                <div className="mt-4">
                    <div className="text-2xl font-bold">{activeRentalsCount}</div>
                </div>
            </Card>

            <Card className="p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500">
                    <span className="text-sm font-medium">{isOwner ? 'Receita Total' : 'Total Gasto'}</span>
                    <Wallet className="w-4 h-4" />
                </div>
                <div className="mt-4">
                    <div className="text-2xl font-bold">${totalRevenue}</div>
                </div>
            </Card>

            {isOwner && (
                <Card className="p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-slate-500">
                        <span className="text-sm font-medium">Sua Frota</span>
                        <CarIcon className="w-4 h-4" />
                    </div>
                    <div className="mt-4">
                        <div className="text-2xl font-bold">{fleetCount} veículos</div>
                    </div>
                </Card>
            )}
        </div>
    );
};

interface RentalListProps {
    rentals: Rental[];
    cars: Car[];
    onCompleteRental: (rental: Rental) => void;
}

export const RentalList: React.FC<RentalListProps> = ({ rentals, cars, onCompleteRental }) => {
    return (
        <div className="space-y-4">
            {rentals.map(r => {
                const car = cars.find(c => c.id === r.carId);
                const isActive = r.status === RentalStatus.ACTIVE;
                return (
                    <Card key={r.id} className="p-4 flex items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={car?.imageUrl} className="w-16 h-16 rounded-md object-cover border" alt={`${car?.brand} ${car?.model}`} />
                        <div className="flex-grow">
                            <h4 className="font-semibold text-sm">{car?.brand} {car?.model}</h4>
                            <p className="text-xs text-slate-500">
                                {isActive ? `Término: ${new Date(r.endDate).toLocaleDateString()}` : 'Finalizado'}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Badge variant={isActive ? 'outline' : 'secondary'}> {/* Changed success to secondary as Shadcn doesn't have success by default */}
                                {isActive ? 'Ativo' : 'Concluído'}
                            </Badge>
                            {isActive && (
                                <Button variant="outline" onClick={() => onCompleteRental(r)} className="h-8">
                                    Devolver
                                </Button>
                            )}
                        </div>
                    </Card>
                );
            })}
            {rentals.length === 0 && (
                <div className="py-12 text-center text-slate-400 border border-dashed rounded-lg">
                    Nenhuma atividade registrada.
                </div>
            )}
        </div>
    );
};

interface FleetListProps {
    cars: Car[];
}

export const FleetList: React.FC<FleetListProps> = ({ cars }) => {
    return (
        <div className="grid gap-4">
            {cars.map(car => (
                <Card key={car.id} className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className={cn("w-2 h-2 rounded-full", car.status === 'RENTED' ? 'bg-amber-500' : 'bg-emerald-500')} />
                        <div>
                            <h4 className="font-semibold text-sm">{car.brand} {car.model}</h4>
                            <p className="text-xs text-slate-500">{car.status === 'RENTED' ? 'Alugado agora' : 'Disponível'}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" className="h-8 px-2">
                            <Navigation className="w-4 h-4 mr-2" />
                            Rastrear
                        </Button>
                        <Button variant="outline" className="h-8 px-2">Configurar</Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};
