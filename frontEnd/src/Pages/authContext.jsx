// context/AuthContext.jsx
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  // axios interceptor
  axios.interceptors.request.use(config => {
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  axios.interceptors.response.use(null, async error => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const r = await axios.post('/auth/refresh'); // cookie will be sent automatically
        setAccessToken(r.data.accessToken);
        error.config.headers.Authorization = `Bearer ${r.data.accessToken}`;
        return axios(error.config);
      } catch (e) {
        // navigate to login
        setAccessToken(null);
        setUser(null);
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  });

  return <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>{children}</AuthContext.Provider>;
}
