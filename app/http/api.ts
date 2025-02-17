import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL +
    '/api/' +
    process.env.EXPO_PUBLIC_API_VERSION,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('unbordo@token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
