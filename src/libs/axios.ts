import axios from 'axios';
import { useAuthStore } from '../store/auth';

const authApi = axios.create({
  //baseURL: 'http://localhost:4000',
  withCredentials: true,
});

// adding the token in the header
authApi.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${useAuthStore.getState().authToken}`,
    'X-Init-Token' : `Bearer ${useAuthStore.getState().initToken}`
  }

  return config;
});

export default authApi;