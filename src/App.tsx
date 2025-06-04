
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationProvider } from '@/context/NavigationContext';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import ViverSolidarioApp from '@/components/ViverSolidarioApp';
import '@/App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="viver-theme">
        <AuthProvider>
          <NavigationProvider>
            <div className="min-h-screen bg-gray-50">
              {/* Container móvel centralizado */}
              <div className="mx-auto max-w-sm min-h-screen bg-white shadow-xl relative overflow-hidden">
                <ViverSolidarioApp />
              </div>
            </div>
            <Toaster />
          </NavigationProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
