import axios from 'axios';
import { getAuthStore } from '../stores/auth';
import { mockUsers } from './mockData';

// Mock API for development
const api = {
  post: async (url: string, data: any) => {
    // Mock login endpoint
    if (url === '/auth/login') {
      const user = mockUsers.find(u => 
        u.email === data.email && data.password === 'admin123456789'
      );
      
      if (user) {
        return {
          data: {
            user: { ...user, password: undefined },
            token: 'mock-jwt-token'
          }
        };
      }
      throw new Error('Invalid credentials');
    }
    
    // For other endpoints, simulate API call
    return { data: {} };
  },
  
  get: async (url: string) => {
    // Mock data for committees
    if (url === '/committees') {
      return {
        data: [
          {
            id: '1',
            name: 'Comité Départemental Olympique et Sportif du Tarn',
            siret: '12345678901234',
            rna: 'W123456789',
            email: 'contact@cdos81.fr',
            phone: '0563123456',
            address: {
              street: '148 Avenue Dembourg',
              city: 'Albi',
              postalCode: '81000'
            },
            stats: {
              totalMembers: 1500,
              totalClubs: 25,
              lastUpdated: new Date().toISOString()
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      };
    }

    // Mock data for clubs
    if (url === '/clubs') {
      return {
        data: [
          {
            id: '1',
            name: 'US Albi',
            committeeId: '1',
            siret: '98765432101234',
            rna: 'W987654321',
            email: 'contact@usalbi.fr',
            phone: '0563789456',
            address: {
              street: '283 Avenue Colonel Teyssier',
              city: 'Albi',
              postalCode: '81000',
              location: {
                lat: 43.9277,
                lng: 2.1478
              }
            },
            tags: ['Football', 'Formation'],
            stats: {
              totalMembers: 350,
              lastUpdated: new Date().toISOString()
            },
            features: {
              handicapAccess: true,
              sportHealth: true
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      };
    }

    return { data: [] };
  },

  put: async () => ({ data: {} }),
  delete: async () => ({ data: {} })
};

export default api;