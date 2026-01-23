import { Car, CarStatus, User } from '../types';

export class CarService {
    static createCar(data: Partial<Car>, owner: User): Car {
        //todo call the repository 
        return {
            id: Math.random().toString(36).substr(2, 9),
            ownerId: owner.id,
            brand: data.brand || '',
            model: data.model || '',
            year: data.year || new Date().getFullYear(),
            pricePerDay: data.pricePerDay || 0,
            status: CarStatus.AVAILABLE,
            imageUrl: data.imageUrl || `https://picsum.photos/seed/${data.brand}${data.model}/800/600`,
            description: data.description || '',
            location: data.location || ''
        };
    }
}
