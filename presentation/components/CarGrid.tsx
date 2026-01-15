
import React from 'react';
import { Car } from '../../domain/entities';
import { Card, Button, Badge } from './ui/atoms';
import { MapPin, Info } from 'lucide-react';

interface Props {
  cars: Car[];
  onRent: (c: Car) => void;
}

export const CarGrid: React.FC<Props> = ({ cars, onRent }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {cars.map(car => (
      <Card key={car.id} className="overflow-hidden flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={car.imageUrl} 
            alt={car.model} 
            className="object-cover w-full h-full transition-transform hover:scale-105 duration-300" 
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/90 text-slate-900 border-none shadow-sm backdrop-blur">
              ${car.pricePerDay}/dia
            </Badge>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-slate-900">{car.brand} {car.model}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {car.location || 'São Paulo, SP'}
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {car.description}
          </p>
          <div className="mt-auto pt-4 flex gap-2">
            <Button className="flex-grow gap-2" onClick={() => onRent(car)}>
              Alugar Agora
            </Button>
            <Button variant="outline" className="w-10 px-0">
              <Info className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    ))}
    {cars.length === 0 && (
      <div className="col-span-full py-20 text-center">
        <p className="text-slate-400">Nenhum veículo disponível no momento.</p>
      </div>
    )}
  </div>
);
