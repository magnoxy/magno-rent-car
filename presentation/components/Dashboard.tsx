
import React, { useState } from 'react';
import { User, Car, Rental, RentalStatus } from '../../domain/entities';
// Fix: added cn to imports from atoms
import { Card, Badge, Button, cn } from './ui/atoms';
import { Calendar, Wallet, Car as CarIcon, CheckCircle2, Navigation } from 'lucide-react';

interface Props {
  user: User;
  cars: Car[];
  rentals: Rental[];
  onCompleteRental: (rental: Rental) => void;
}

export const Dashboard: React.FC<Props> = ({ user, cars, rentals, onCompleteRental }) => {
  const isOwner = user.role === 'OWNER';
  const myRentals = isOwner ? rentals.filter(r => r.ownerId === user.id) : rentals.filter(r => r.clientId === user.id);
  const myCars = cars.filter(c => c.ownerId === user.id);
  
  const [activeTab, setActiveTab] = useState<'rentals' | 'fleet'>('rentals');

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-slate-500">Gerencie suas atividades e acompanhe seus veículos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Aluguéis Ativos</span>
            <Calendar className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{myRentals.filter(r => r.status === RentalStatus.ACTIVE).length}</div>
          </div>
        </Card>
        
        <Card className="p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">{isOwner ? 'Receita Total' : 'Total Gasto'}</span>
            <Wallet className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">${myRentals.reduce((a, b) => a + b.totalPrice, 0)}</div>
          </div>
        </Card>

        {isOwner && (
          <Card className="p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-sm font-medium">Sua Frota</span>
              <CarIcon className="w-4 h-4" />
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold">{myCars.length} veículos</div>
            </div>
          </Card>
        )}
      </div>

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
          {activeTab === 'rentals' && (
            <div className="space-y-4">
              {myRentals.map(r => {
                const car = cars.find(c => c.id === r.carId);
                const isActive = r.status === RentalStatus.ACTIVE;
                return (
                  <Card key={r.id} className="p-4 flex items-center gap-4">
                    <img src={car?.imageUrl} className="w-16 h-16 rounded-md object-cover border" />
                    <div className="flex-grow">
                      <h4 className="font-semibold text-sm">{car?.brand} {car?.model}</h4>
                      <p className="text-xs text-slate-500">
                        {isActive ? `Término: ${new Date(r.endDate).toLocaleDateString()}` : 'Finalizado'}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={isActive ? 'outline' : 'success'}>
                        {isActive ? 'Ativo' : 'Concluído'}
                      </Badge>
                      {isActive && (
                        // Fix: removed size="sm" as it's not supported by the Button atom
                        <Button variant="outline" onClick={() => onCompleteRental(r)} className="h-8">
                          Devolver
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
              {myRentals.length === 0 && (
                <div className="py-12 text-center text-slate-400 border border-dashed rounded-lg">
                  Nenhuma atividade registrada.
                </div>
              )}
            </div>
          )}

          {activeTab === 'fleet' && (
            <div className="grid gap-4">
              {myCars.map(car => (
                <Card key={car.id} className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {/* Fix: cn is now properly imported */}
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
          )}
        </div>
      </div>
    </div>
  );
};
