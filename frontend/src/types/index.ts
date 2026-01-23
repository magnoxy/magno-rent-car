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

export enum UserRole {
  OWNER = 'OWNER',
  CLIENT = 'CLIENT',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  cnhUrl?: string;
  rgUrl?: string;
  proofOfResidencyUrl?: string;
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
  startDate: string; // ISO Date string
  endDate: string; // ISO Date string
  totalPrice: number;
  status: RentalStatus;
  paymentStatus: 'PAID' | 'UNPAID';
}