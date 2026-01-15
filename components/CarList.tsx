
import React from 'react';
import { Car } from '../types';

interface CarListProps {
  cars: Car[];
  onRent: (car: Car) => void;
}

export const CarList: React.FC<CarListProps> = ({ cars, onRent }) => {
  if (cars.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-lg">No cars available at the moment. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car) => (
        <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
          <div className="relative h-64 overflow-hidden">
            <img 
              src={car.imageUrl} 
              alt={`${car.brand} ${car.model}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold shadow-sm">
              ${car.pricePerDay}/day
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold">{car.brand} {car.model}</h3>
                <p className="text-slate-500 text-sm">{car.year} • {car.location}</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-6 line-clamp-2">{car.description}</p>
            <button 
              onClick={() => onRent(car)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Rent Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
