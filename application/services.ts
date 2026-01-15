
import { Car, Rental, CarStatus, RentalStatus, User } from '../domain/entities';

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

export class RentalService {
  static createRental(car: Car, client: User, days: number = 3): Rental {
    //todo call the repository 
    return {
      id: Math.random().toString(36).substr(2, 9),
      carId: car.id,
      clientId: client.id,
      ownerId: car.ownerId,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 86400000 * days).toISOString(),
      totalPrice: car.pricePerDay * days,
      status: RentalStatus.ACTIVE,
      paymentStatus: 'PAID'
    };
  }

  static completeRental(rental: Rental): Rental {
    return {
      ...rental,
      status: RentalStatus.COMPLETED
    };
  }
}
