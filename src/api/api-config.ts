import axios from "axios";
import {AuthResponse} from "./types";


export const API_URL = `http://localhost:5000/api`
export const DADATA_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/'

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

const token = '4796a1d6394e4b8c879ae29cd0d5b46f0339c0ff'

export const daData = axios.create({
  baseURL: DADATA_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Token " + token
  },
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
      localStorage.setItem('token', response.data.accessToken);
      return $api.request(originalRequest);
    } catch(err) {
       console.warn('ПОЛЬЗОВАТЕЛЬ НЕ АВТОРИЗИВАН');
    }
  }
  throw error;
})