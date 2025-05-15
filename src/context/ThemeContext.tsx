
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateUserProfile } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(user?.theme === 'dark');

  useEffect(() => {
    // Initialize theme based on user preference
    if (user?.theme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, [user?.theme]);

  const toggleTheme = async () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      
      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('viverSolidarioTheme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('viverSolidarioTheme', 'light');
      }
      
      // Update user preference in the backend if authenticated
      if (user) {
        updateUserProfile({ theme: newTheme ? 'dark' : 'light' }).catch(console.error);
      }
      
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
