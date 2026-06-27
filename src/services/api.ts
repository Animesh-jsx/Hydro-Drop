const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to get auth token
const getToken = (): string | null => localStorage.getItem('hydradrop_token');

// Generic fetch wrapper
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    request<{ _id: string; name: string; email: string; role: string; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    request<{ _id: string; name: string; email: string; role: string; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getProfile: () => request<any>('/auth/profile'),

  updateProfile: (data: any) =>
    request<any>('/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),
};

// Products API
export const productsAPI = {
  getAll: (category?: string, search?: string) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    return request<any[]>(`/products?${params.toString()}`);
  },

  getById: (id: string) => request<any>(`/products/${id}`),

  // Admin
  create: (data: any) =>
    request<any>('/products', { method: 'POST', body: JSON.stringify(data) }),

  update: (id: string, data: any) =>
    request<any>(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  delete: (id: string) =>
    request<any>(`/products/${id}`, { method: 'DELETE' }),

  getAllAdmin: () => request<any[]>('/products/admin/all'),

  getLowStock: () => request<any[]>('/products/admin/low-stock'),
};

// Orders API
export const ordersAPI = {
  create: (data: any) =>
    request<any>('/orders', { method: 'POST', body: JSON.stringify(data) }),

  getMyOrders: () => request<any[]>('/orders/my-orders'),

  getById: (id: string) => request<any>(`/orders/${id}`),

  // Admin
  getAll: (status?: string, search?: string) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    return request<any[]>(`/orders/admin/all?${params.toString()}`);
  },

  updateStatus: (id: string, status: string) =>
    request<any>(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

// Customers API (Admin)
export const customersAPI = {
  getAll: (status?: string, search?: string) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    return request<{ customers: any[]; total: number }>(`/customers?${params.toString()}`);
  },

  getById: (id: string) => request<any>(`/customers/${id}`),

  create: (data: any) =>
    request<any>('/customers', { method: 'POST', body: JSON.stringify(data) }),

  update: (id: string, data: any) =>
    request<any>(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// Customization API
export const customizationAPI = {
  submit: (formData: FormData) =>
    fetch(`${API_BASE}/customization`, { method: 'POST', body: formData }).then((r) => r.json()),

  // Admin
  getAll: (status?: string) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    return request<any[]>(`/customization/admin/all?${params.toString()}`);
  },

  getById: (id: string) => request<any>(`/customization/${id}`),

  updateStatus: (id: string, status: string, adminNotes?: string) =>
    request<any>(`/customization/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, adminNotes }),
    }),
};

// Inquiries API
export const inquiriesAPI = {
  submit: (data: any) =>
    request<any>('/inquiries', { method: 'POST', body: JSON.stringify(data) }),

  // Admin
  getAll: () => request<any[]>('/inquiries'),

  updateStatus: (id: string, status: string) =>
    request<any>(`/inquiries/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

// Dashboard API (Admin)
export const dashboardAPI = {
  getMetrics: () => request<any>('/dashboard/metrics'),
  getRecentOrders: () => request<any[]>('/dashboard/recent-orders'),
  getInventoryAlerts: () => request<any[]>('/dashboard/inventory-alerts'),
  getSalesChart: () => request<any[]>('/dashboard/sales-chart'),
};
