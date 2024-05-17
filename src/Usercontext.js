import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user_id, setUser_id] = useState(() => {
    // Check local storage for the user_id when initializing state
    return localStorage.getItem('user_id') || null;
  });

  useEffect(() => {
    if (user_id) {
      // Save user_id to local storage whenever it changes
      localStorage.setItem('user_id', user_id);
    } else {
      // Remove user_id from local storage if it is null
      localStorage.removeItem('user_id');
    }
  }, [user_id]);

  return (
    <UserContext.Provider value={{ user_id, setUser_id }}>
      {children}
    </UserContext.Provider>
  );
};
