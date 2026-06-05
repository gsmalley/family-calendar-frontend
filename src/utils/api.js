const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const token = localStorage.getItem('auth_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  // Events
  getEvents: (params = {}) => request(`/events?${new URLSearchParams(params)}`),
  getEvent: (id) => request(`/events/${id}`),
  createEvent: (data) => request('/events', { method: 'POST', body: JSON.stringify(data) }),
  updateEvent: (id, data) => request(`/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteEvent: (id) => request(`/events/${id}`, { method: 'DELETE' }),

  // Tasks
  getTasks: (params = {}) => request(`/tasks?${new URLSearchParams(params)}`),
  getTask: (id) => request(`/tasks/${id}`),
  createTask: (data) => request('/tasks', { method: 'POST', body: JSON.stringify(data) }),
  updateTask: (id, data) => request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTask: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),

  // Homework
  getHomework: (params = {}) => request(`/homework?${new URLSearchParams(params)}`),
  createHomework: (data) => request('/homework', { method: 'POST', body: JSON.stringify(data) }),
  updateHomework: (id, data) => request(`/homework/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Meals
  getMeals: (params = {}) => request(`/meals?${new URLSearchParams(params)}`),
  createMeal: (data) => request('/meals', { method: 'POST', body: JSON.stringify(data) }),
  updateMeal: (id, data) => request(`/meals/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Classes
  getClasses: () => request('/classes'),

  // Family Members
  getFamilyMembers: () => request('/family-members'),

  // Leaderboard
  getLeaderboard: () => request('/leaderboard'),

  // Auth
  login: (credentials) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  logout: () => { localStorage.removeItem('auth_token'); },

  // Health
  health: () => request('/health'),
};