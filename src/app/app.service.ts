import axios from 'axios';
import { API_BASE_URL } from './app.config';

/**
 * HTTP 客户端
 */
export const apiHttpClient = axios.create({
  baseURL: API_BASE_URL,
});

// eslint-disable-next-line
export const setStorages = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getStorages = (key: string) => {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : null;
};
