
import React from 'react';
import { User, Car, Rental, RentalStatus } from '../types';

interface DashboardProps {
  user: User;
  cars: Car[];
  rentals: Rental[];
}

export const Dashboard: React.FC<DashboardProps> = ({ user, cars, rentals }) => {
  const isOwner = user.role === 'OWNER';
  
  // Filter relevant data
  const userCars = cars.filter(c => c.ownerId === user.id);
  const relevantRentals = isOwner 
    ? rentals.filter(r => r.ownerId === user.id)
    : rentals.filter(r => r.clientId === user.id);

  const totalEarnings = isOwner 
    ? relevantRentals.reduce((sum, r) => sum + r.totalPrice, 0)
    : 0;

  const getCarDetails = (carId: string) => cars.find(c => c.id === carId);

  return (
    <div className="space-y-10">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-sm">
          <p className="text-indigo-100 text-sm font-medium mb-1">{isOwner ? 'Total Earnings' : 'Total Spent'}</p>
          <p className="text-3xl font-bold">${isOwner ? totalEarnings : relevantRentals.reduce((s, r) => s + r.totalPrice, 0)}</p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <p className="text-slate-500 text-sm font-medium mb-1">Active Rentals</p>
          <p className="text-3xl font-bold text-slate-900">
            {relevantRentals.filter(r => r.status === RentalStatus.ACTIVE).length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <p className="text-slate-500 text-sm font-medium mb-1">{isOwner ? 'Your Cars' : 'Places Visited'}</p>
          <p className="text-3xl font-bold text-slate-900">{isOwner ? userCars.length : '3'}</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Active Transactions List */}
        <section>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            Recent Activity
          </h3>
          <div className="space-y-4">
            {relevantRentals.length === 0 ? (
              <p className="text-slate-400 bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center">
                No activity yet. {isOwner ? 'Rentals will appear here when customers book your cars.' : 'Your rentals will appear here.'}
              </p>
            ) : (
              relevantRentals.map(rental => {
                const car = getCarDetails(rental.carId);
                return (
                  <div key={rental.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 hover:shadow-sm transition-shadow">
                    <img src={car?.imageUrl} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-grow">
                      <h4 className="font-bold text-slate-900">{car?.brand} {car?.model}</h4>
                      <p className="text-xs text-slate-500">Status: <span className="text-indigo-600 font-semibold">{rental.status}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">${rental.totalPrice}</p>
                      <p className="text-xs text-green-600 font-bold uppercase">{rental.paymentStatus}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Ownership Management */}
        {isOwner && (
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              My Fleet
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {userCars.length === 0 ? (
                <p className="text-slate-400 bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center">
                  You haven't listed any cars yet.
                </p>
              ) : (
                userCars.map(car => (
                  <div key={car.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${car.status === 'RENTED' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                      <div>
                        <h4 className="font-bold text-slate-900">{car.brand} {car.model}</h4>
                        <p className="text-xs text-slate-500">{car.status}</p>
                      </div>
                    </div>
                    <button className="text-indigo-600 text-sm font-bold hover:underline">Track GPS</button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
