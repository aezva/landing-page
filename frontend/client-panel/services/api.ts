import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    const response = await api.post('/auth/token', formData);
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  },

  register: async (data: {
    email: string;
    password: string;
    name: string;
    company: string;
  }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export const chatService = {
  sendMessage: async (message: string) => {
    const response = await api.post('/chat', {
      content: message,
      role: 'user',
    });
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get('/chat/history');
    return response.data;
  },
};

export const businessService = {
  getInfo: async () => {
    const response = await api.get('/business/info');
    return response.data;
  },

  updateInfo: async (info: any) => {
    const response = await api.put('/business/info', info);
    return response.data;
  },
}; 