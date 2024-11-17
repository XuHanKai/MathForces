import React, { createContext, useState, useContext } from 'react';

// Create a context to manage authentication
const AuthContext = createContext();

// Create a provider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false); // Default is false (not logged in)
  const [user, setUser] = useState(null); // Store user info

  const login = (userInfo) => {
    setAuth(true);
    setUser(userInfo); // Store the user info when logging in
  };

  const logout = () => {
    setAuth(false);
    setUser(null); // Clear user info when logging out
  };


  return (
    <AuthContext.Provider value={{ auth,user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication state
export const useAuth = () => useContext(AuthContext);
