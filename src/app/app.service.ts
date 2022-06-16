import axios from 'axios';
import { API_BASE_URL } from '@/app/app.config';
import queryString, { StringifiableRecord } from 'query-string';

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

export const queryStringProcess = (queryStringObject: StringifiableRecord) => {
  Object.keys(queryStringObject).forEach((key) => {
    if (queryStringObject[key] == undefined || queryStringObject[key] === '') {
      delete queryStringObject[key];
    }
  });

  return queryString.stringify(queryStringObject);
};
