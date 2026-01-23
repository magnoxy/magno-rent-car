
export enum CarStatus {
  AVAILABLE = 'AVAILABLE',
  RENTED = 'RENTED',
  MAINTENANCE = 'MAINTENANCE'
}

export enum RentalStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface User {
  id: string;
  name: string;
  role: 'OWNER' | 'CLIENT';
}

export interface Car {
  id: string;
  ownerId: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  status: CarStatus;
  imageUrl: string;
  description: string;
  location: string;
}

export interface Rental {
  id: string;
  carId: string;
  clientId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: RentalStatus;
  paymentStatus: 'PAID' | 'UNPAID';
}
