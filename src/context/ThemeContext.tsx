
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Verificar se existe AuthContext antes de tentar usar
  let authContext;
  try {
    const AuthContext = React.createContext(undefined);
    const { useAuth } = require('@/context/AuthContext');
    authContext = useAuth();
  } catch (error) {
    console.log('AuthContext não disponível ainda, usando valores padrão');
    authContext = null;
  }

  useEffect(() => {
    // Inicializar tema baseado no localStorage primeiro
    const savedTheme = localStorage.getItem('viverSolidarioTheme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
    setIsInitialized(true);
  }, []);

  // Atualizar tema quando o usuário mudar (se disponível)
  useEffect(() => {
    if (authContext?.user?.theme && isInitialized) {
      const userTheme = authContext.user.theme === 'dark';
      if (userTheme !== isDarkMode) {
        setIsDarkMode(userTheme);
        if (userTheme) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  }, [authContext?.user?.theme, isDarkMode, isInitialized]);

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
      
      // Atualizar preferência do usuário se disponível
      if (authContext?.updateUserProfile) {
        authContext.updateUserProfile({ theme: newTheme ? 'dark' : 'light' }).catch(console.error);
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
