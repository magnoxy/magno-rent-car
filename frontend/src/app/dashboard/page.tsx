'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Car, Rental, User, CarStatus, UserRole, RentalStatus } from '@/types';
import { CarService } from '@/services/car.service';
import { RentalService } from '@/services/rental.service';
import { AuthService } from '@/services/auth.service';
import { Navbar } from '@/components/dashboard/navbar';
import { CarGrid } from '@/components/dashboard/car-grid';
import { Dashboard } from '@/components/dashboard/dashboard';
import { ListingModal } from '@/components/dashboard/listing-modal';
import { PaymentModal } from '@/components/dashboard/payment-modal';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    const [cars, setCars] = useState<Car[]>([]);
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [view, setView] = useState<'EXPLORE' | 'DASHBOARD'>('EXPLORE');
    const [isListingOpen, setIsListingOpen] = useState(false);
    const [selectedCarForRent, setSelectedCarForRent] = useState<Car | null>(null);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            router.push('/login');
        } else {
            setUser(currentUser);
            setIsLoadingUser(false);
            loadData();
        }
    }, [router]);

    const loadData = async () => {
        try {
            const [fetchedCars, fetchedRentals] = await Promise.all([
                CarService.getCars(),
                RentalService.getRentals()
            ]);
            setCars(fetchedCars);
            setRentals(fetchedRentals);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    };

    const handleRent = (car: Car) => {
        setSelectedCarForRent(car);
    };

    const handlePaymentConfirm = async (days: number) => {
        if (!selectedCarForRent || !user) return;

        try {
            const rentalData: Partial<Rental> = {
                carId: selectedCarForRent.id,
                clientId: user.id,
                startDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 86400000 * days).toISOString(),
                totalPrice: selectedCarForRent.pricePerDay * days,
                status: RentalStatus.ACTIVE,
                paymentStatus: 'PAID'
            };

            const newRental = await RentalService.createRental(rentalData);
            
            // Update local state
            setRentals([...rentals, newRental]);
            setCars(cars.map(c => c.id === selectedCarForRent.id ? { ...c, status: CarStatus.RENTED } : c));
            setView('DASHBOARD');
            setSelectedCarForRent(null);
        } catch (error) {
            console.error('Error creating rental:', error);
        }
    };

    const handleCompleteRental = async (rental: Rental) => {
        try {
            const updatedRental = await RentalService.updateRental(rental.id, {
                status: RentalStatus.COMPLETED
            });
            
            setRentals(rentals.map(r => r.id === rental.id ? updatedRental : r));
            setCars(cars.map(c => c.id === rental.carId ? { ...c, status: CarStatus.AVAILABLE } : c));
        } catch (error) {
            console.error('Error completing rental:', error);
        }
    };

    const handleAddCar = async (carData: Partial<Car>) => {
        if (!user) return;
        try {
            const newCar = await CarService.createCar({
                ...carData,
                ownerId: user.id,
                status: CarStatus.AVAILABLE
            });
            setCars([...cars, newCar]);
            setIsListingOpen(false);
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    const handleLogout = () => {
        AuthService.logout();
        router.push('/login');
    };

    if (isLoadingUser || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-slate-900" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Navbar
                user={user}
                onSwitchRole={() => setUser({ ...user, role: user.role === UserRole.CLIENT ? UserRole.OWNER : UserRole.CLIENT })}
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
                            {user.role === UserRole.OWNER && (
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
