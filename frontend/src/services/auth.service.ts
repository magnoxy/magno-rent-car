import { api } from '../api/axios';
import { User } from '../types';

export class AuthService {
    static async login(email: string, password: string): Promise<User> {
        const response = await api.post('/auth/login', { email, password });
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }

    static async register(userData: Partial<User> & { password: string }): Promise<User> {
        const response = await api.post('/user', userData);
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }
    
    static async getMe(): Promise<User> {
        const response = await api.get('/auth/me'); 
        return response.data;
    }

    static getCurrentUser(): User | null {
        if (typeof window === 'undefined') return null;
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        return JSON.parse(userStr);
    }

    static logout() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
        }
    }
}