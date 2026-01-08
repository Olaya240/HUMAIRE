import React, { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load current user if token exists
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await api.me();
        if (mounted) setUser(res.user);
      } catch (err) {
        api.setToken(null);
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, []);

  const login = async (creds) => {
    const res = await api.login(creds);
    if (res.user) setUser(res.user);
    return res;
  };

  const register = async (data) => {
    const res = await api.register(data);
    if (res.user) setUser(res.user);
    return res;
  };

  const logout = () => {
    api.setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
