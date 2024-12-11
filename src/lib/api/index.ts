import { clubApi } from './club';
import { committeeApi } from './committee';

const api = {
  get: async (url: string) => {
    if (url === '/clubs') {
      return clubApi.getAll();
    }
    if (url === '/committees') {
      return committeeApi.getAll();
    }
    throw new Error(`Unhandled GET request for URL: ${url}`);
  },

  post: async (url: string, data: any) => {
    if (url === '/clubs') {
      return clubApi.create(data);
    }
    if (url === '/committees') {
      return committeeApi.create(data);
    }
    throw new Error(`Unhandled POST request for URL: ${url}`);
  },

  put: async (url: string, data: any) => {
    const clubMatch = url.match(/^\/clubs\/([^/]+)$/);
    if (clubMatch) {
      return clubApi.update(clubMatch[1], data);
    }
    const committeeMatch = url.match(/^\/committees\/([^/]+)$/);
    if (committeeMatch) {
      return committeeApi.update(committeeMatch[1], data);
    }
    throw new Error(`Unhandled PUT request for URL: ${url}`);
  },

  delete: async (url: string) => {
    const clubMatch = url.match(/^\/clubs\/([^/]+)$/);
    if (clubMatch) {
      return clubApi.delete(clubMatch[1]);
    }
    const committeeMatch = url.match(/^\/committees\/([^/]+)$/);
    if (committeeMatch) {
      return committeeApi.delete(committeeMatch[1]);
    }
    throw new Error(`Unhandled DELETE request for URL: ${url}`);
  }
};

export default api;