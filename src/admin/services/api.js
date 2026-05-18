const API_URL = import.meta.env.VITE_API_URL;

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});

// Payments
export const paymentsAPI = {
  getPayments: async (token, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/api/payments?${query}`, {
      headers: getHeaders(token),
    });
    return response.json();
  },

  getPaymentDetails: async (token, paymentId) => {
    const response = await fetch(`${API_URL}/api/payments/${paymentId}`, {
      headers: getHeaders(token),
    });
    return response.json();
  },

  refundPayment: async (token, paymentId, data) => {
    const response = await fetch(`${API_URL}/api/payments/${paymentId}/refund`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  verifyPayment: async (data) => {
    const response = await fetch(`${API_URL}/api/payments/verify`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  createDonationOrder: async (data) => {
    const response = await fetch(`${API_URL}/api/payments/create-donation-order`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  createPoojaOrder: async (data) => {
    const response = await fetch(`${API_URL}/api/payments/create-pooja-order`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  createDarshanOrder: async (data) => {
    const response = await fetch(`${API_URL}/api/payments/create-darshan-order`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

// Donations
export const donationsAPI = {
  getDonations: async (token, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/api/donations?${query}`, {
      headers: getHeaders(token),
    });
    return response.json();
  },

  getDonationStats: async (token, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/api/donations/stats?${query}`, {
      headers: getHeaders(token),
    });
    return response.json();
  },

  getDonationById: async (token, donationId) => {
    const response = await fetch(`${API_URL}/api/donations/${donationId}`, {
      headers: getHeaders(token),
    });
    return response.json();
  },

  updateDonation: async (token, donationId, data) => {
    const response = await fetch(`${API_URL}/api/donations/${donationId}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  sendAcknowledgment: async (token, donationId, data) => {
    const response = await fetch(`${API_URL}/api/donations/${donationId}/send-acknowledgment`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteDonation: async (token, donationId) => {
    const response = await fetch(`${API_URL}/api/donations/${donationId}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    return response.json();
  },
};

// Pooja Bookings
export const poojaAPI = {
  getBookings: async (token, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/api/pooja-bookings?${query}`, {
      headers: getHeaders(token),
    });
    return response.json();
  },

  getStats: async (token, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/api/pooja-bookings/stats?${query}`, {
      headers: getHeaders(token),
    });
    return response.json();
  },

  getBookingById: async (token, bookingId) => {
    const response = await fetch(`${API_URL}/api/pooja-bookings/${bookingId}`, {
      headers: getHeaders(token),
    });
    return response.json();
  },

  updateBooking: async (token, bookingId, data) => {
    const response = await fetch(`${API_URL}/api/pooja-bookings/${bookingId}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  sendConfirmation: async (token, bookingId, data) => {
    const response = await fetch(`${API_URL}/api/pooja-bookings/${bookingId}/send-confirmation`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  sendReminder: async (token, bookingId) => {
    const response = await fetch(`${API_URL}/api/pooja-bookings/${bookingId}/send-reminder`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({}),
    });
    return response.json();
  },

  deleteBooking: async (token, bookingId) => {
    const response = await fetch(`${API_URL}/api/pooja-bookings/${bookingId}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    return response.json();
  },
};

// Darshan Bookings
export const darshanAPI = {
  getBookings: async (token, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/api/darshan-bookings?${query}`, {
      headers: getHeaders(token),
    });
    return response.json();
  },

  getStats: async (token, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/api/darshan-bookings/stats?${query}`, {
      headers: getHeaders(token),
    });
    return response.json();
  },

  getBookingById: async (token, bookingId) => {
    const response = await fetch(`${API_URL}/api/darshan-bookings/${bookingId}`, {
      headers: getHeaders(token),
    });
    return response.json();
  },

  updateBooking: async (token, bookingId, data) => {
    const response = await fetch(`${API_URL}/api/darshan-bookings/${bookingId}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  sendConfirmation: async (token, bookingId, data) => {
    const response = await fetch(`${API_URL}/api/darshan-bookings/${bookingId}/send-confirmation`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  sendReminder: async (token, bookingId) => {
    const response = await fetch(`${API_URL}/api/darshan-bookings/${bookingId}/send-reminder`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({}),
    });
    return response.json();
  },

  deleteBooking: async (token, bookingId) => {
    const response = await fetch(`${API_URL}/api/darshan-bookings/${bookingId}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    return response.json();
  },
};
