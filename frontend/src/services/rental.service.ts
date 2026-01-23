import { api } from '../api/axios';
import { Rental } from '../types';

export class RentalService {
    static async createRental(data: Partial<Rental>): Promise<Rental> {
        const response = await api.post('/rentals', data);
        return response.data;
    }

    static async getRentals(): Promise<Rental[]> {
        const response = await api.get('/rentals');
        return response.data;
    }

    static async getRentalById(id: string): Promise<Rental> {
        const response = await api.get(`/rentals/${id}`);
        return response.data;
    }

    static async updateRental(id: string, data: Partial<Rental>): Promise<Rental> {
        const response = await api.patch(`/rentals/${id}`, data);
        return response.data;
    }
}