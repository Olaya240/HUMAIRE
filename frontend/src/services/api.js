// Simple API client for frontend to communicate with HUMAIRE backend
const BASE = import.meta.env.VITE_API_URL || '';

function getToken() {
  return localStorage.getItem('humaire_token');
}

function setToken(token) {
  if (token) localStorage.setItem('humaire_token', token);
  else localStorage.removeItem('humaire_token');
}

async function request(path, opts = {}) {
  const headers = opts.headers || {};
  headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...opts, headers });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(body.message || 'API Error');
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

export async function register({ name, email, password }) {
  const body = await request('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
  if (body.token) setToken(body.token);
  return body;
}

export async function login({ email, password }) {
  const body = await request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  if (body.token) setToken(body.token);
  return body;
}

export async function me() {
  return request('/api/auth/me');
}

export async function aiQuery(prompt) {
  return request('/api/ai/query', { method: 'POST', body: JSON.stringify({ prompt }) });
}

export async function aiHistory() {
  return request('/api/ai/history');
}

export async function adminGetUsers() {
  return request('/api/admin/users');
}

export async function adminGetLogs() {
  return request('/api/admin/logs');
}

export { getToken, setToken };
