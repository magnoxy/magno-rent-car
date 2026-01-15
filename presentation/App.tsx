
import React, { useState } from 'react';
import { Car, Rental, User, CarStatus, RentalStatus } from '../domain/entities';
import { CarService, RentalService } from '../application/services';
import { AIService } from '../infrastructure/ai.service';
import { Navbar } from './components/Navbar';
import { CarGrid } from './components/CarGrid';
import { Dashboard } from './components/Dashboard';
import { ListingModal } from './components/ListingModal';
import { PaymentModal } from './components/PaymentModal';
import { Button } from './components/ui/atoms';
import { Plus } from 'lucide-react';

const App: React.FC = () => {
  //todo receive this from authservice
  const [user, setUser] = useState<User>({ id: 'u1', name: 'Alex Thompson', role: 'CLIENT' });
  //todo receive this from carservice
  const [cars, setCars] = useState<Car[]>([]);
  //todo receive this from rentalservice
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [view, setView] = useState<'EXPLORE' | 'DASHBOARD'>('EXPLORE');
  const [isListingOpen, setIsListingOpen] = useState(false);
  const [selectedCarForRent, setSelectedCarForRent] = useState<Car | null>(null);

  const handleRent = (car: Car) => {
    setSelectedCarForRent(car);
  };

  const handlePaymentConfirm = (days: number) => {
    if (!selectedCarForRent) return;

    const rental = RentalService.createRental(selectedCarForRent, user, days);
    setRentals([...rentals, rental]);
    setCars(cars.map(c => c.id === selectedCarForRent.id ? { ...c, status: CarStatus.RENTED } : c));
    setView('DASHBOARD');
    setSelectedCarForRent(null);
  };

  const handleCompleteRental = (rental: Rental) => {
    const updatedRental = RentalService.completeRental(rental);
    setRentals(rentals.map(r => r.id === rental.id ? updatedRental : r));
    setCars(cars.map(c => c.id === rental.carId ? { ...c, status: CarStatus.AVAILABLE } : c));
  };

  const handleAddCar = (carData: Partial<Car>) => {
    const newCar = CarService.createCar(carData, user);
    setCars([...cars, newCar]);
    setIsListingOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar
        user={user}
        onSwitchRole={() => setUser({ ...user, role: user.role === 'CLIENT' ? 'OWNER' : 'CLIENT' })}
        setView={setView}
        currentView={view}
      />

      <main className="container mx-auto px-4 py-10 max-w-7xl">
        {view === 'EXPLORE' ? (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Explore nossa frota</h1>
                <p className="text-slate-500">Veículos premium selecionados para sua melhor experiência.</p>
              </div>
              {user.role === 'OWNER' && (
                <Button onClick={() => setIsListingOpen(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Novo Anúncio
                </Button>
              )}
            </div>
            <CarGrid cars={cars.filter(c => c.status === CarStatus.AVAILABLE)} onRent={handleRent} />
          </div>
        ) : (
          <Dashboard
            user={user}
            cars={cars}
            rentals={rentals}
            onCompleteRental={handleCompleteRental}
          />
        )}
      </main>

      {isListingOpen && (
        <ListingModal
          onClose={() => setIsListingOpen(false)}
          onSubmit={handleAddCar}
          aiService={AIService}
        />
      )}

      {selectedCarForRent && (
        <PaymentModal
          car={selectedCarForRent}
          onClose={() => setSelectedCarForRent(null)}
          onConfirm={handlePaymentConfirm}
        />
      )}
    </div>
  );
};

export default App;
