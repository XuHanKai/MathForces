import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context to manage authentication
const AuthContext = createContext();

// Create a provider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false); // Default is false (not logged in)
  const [user, setUser] = useState(null); // Store user info

  // Check for the user's login state in localStorage when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuth(true);
      setUser(JSON.parse(storedUser)); // Parse user data from localStorage
    }
  }, []);

  const login = (userInfo) => {
    setAuth(true);
    setUser(userInfo); // Store the user info when logging in
    localStorage.setItem('user', JSON.stringify(userInfo)); // Save user data to localStorage
  };

  const logout = () => {
    setAuth(false);
    setUser(null); // Clear user info when logging out
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ auth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication state
export const useAuth = () => useContext(AuthContext);
