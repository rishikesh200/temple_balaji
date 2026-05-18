import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const api = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token for admin pages if needed
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

let razorpayScriptPromise = null;
export const loadRazorpayScript = () => {
  if (typeof window === 'undefined') {
    return Promise.resolve(false);
  }

  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  if (razorpayScriptPromise) {
    return razorpayScriptPromise;
  }

  razorpayScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => reject(false);
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
};

export const paymentAPI = {
  createDonationOrder: async (data) => {
    const response = await api.post('/payments/create-donation-order', data);
    return response.data;
  },
  createPoojaOrder: async (data) => {
    const response = await api.post('/payments/create-pooja-order', data);
    return response.data;
  },
  createDarshanOrder: async (data) => {
    const response = await api.post('/payments/create-darshan-order', data);
    return response.data;
  },
  verifyPayment: async (data) => {
    const response = await api.post('/payments/verify', data);
    return response.data;
  },
};

export default api;
