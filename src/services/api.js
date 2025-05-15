const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.error || 'An error occurred',
      response.status,
      data
    );
  }
  
  return data;
};

export const api = {
  // Auth endpoints
  login: (credentials) =>
    fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    }).then(handleResponse),

  register: (userData) =>
    fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    }).then(handleResponse),

  // Guide endpoints
  getGuides: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetch(`${API_URL}/api/guides?${queryString}`, {
      headers: getHeaders(),
    }).then(handleResponse);
  },

  getGuideById: (id) =>
    fetch(`${API_URL}/api/guides/${id}`, {
      headers: getHeaders(),
    }).then(handleResponse),

  createGuide: (guideData) =>
    fetch(`${API_URL}/api/guides`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(guideData),
    }).then(handleResponse),

  updateGuide: (id, guideData) =>
    fetch(`${API_URL}/api/guides/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(guideData),
    }).then(handleResponse),

  // Product endpoints
  getProducts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetch(`${API_URL}/api/products?${queryString}`, {
      headers: getHeaders(),
    }).then(handleResponse);
  },

  getProductById: (id) =>
    fetch(`${API_URL}/api/products/${id}`, {
      headers: getHeaders(),
    }).then(handleResponse),

  // User endpoints
  getUserProfile: () =>
    fetch(`${API_URL}/api/users/profile`, {
      headers: getHeaders(),
    }).then(handleResponse),

  updateUserProfile: (userData) =>
    fetch(`${API_URL}/api/users/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    }).then(handleResponse),

  // Image upload
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new ApiError('Failed to upload image', response.status, data);
    }

    return data;
  },
};

export { ApiError }; 