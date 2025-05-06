import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatHistory {
  messages: Message[];
}

export interface ChatResponse {
  message: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  company: string;
}

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    const response = await api.post<AuthResponse>('/auth/token', formData);
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  },

  register: async (data: {
    email: string;
    password: string;
    name: string;
    company: string;
  }): Promise<UserResponse> => {
    const response = await api.post<UserResponse>('/auth/register', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<UserResponse> => {
    const response = await api.get<UserResponse>('/auth/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export const chatService = {
  sendMessage: async (message: string): Promise<ChatResponse> => {
    const response = await api.post<ChatResponse>('/chat', {
      content: message,
      role: 'user',
    });
    return response.data;
  },

  getHistory: async (): Promise<ChatHistory> => {
    const response = await api.get<ChatHistory>('/chat/history');
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