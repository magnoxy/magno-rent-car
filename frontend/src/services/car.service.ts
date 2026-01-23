import { api } from '../api/axios';
import { Car } from '../types';

export class CarService {
    static async createCar(data: Partial<Car>): Promise<Car> {
        const response = await api.post('/cars', data);
        return response.data;
    }

    static async getCars(): Promise<Car[]> {
        const response = await api.get('/cars');
        return response.data;
    }

    static async getCarById(id: string): Promise<Car> {
        const response = await api.get(`/cars/${id}`);
        return response.data;
    }

    static async updateCar(id: string, data: Partial<Car>): Promise<Car> {
        const response = await api.patch(`/cars/${id}`, data);
        return response.data;
    }

    static async deleteCar(id: string): Promise<void> {
        await api.delete(`/cars/${id}`);
    }
}