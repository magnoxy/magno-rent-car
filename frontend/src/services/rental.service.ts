import { Car, Rental, RentalStatus, User } from '../types';

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
