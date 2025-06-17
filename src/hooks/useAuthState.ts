
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserInfo } from '@/types/auth';
import { UserRole } from '@/lib/permissions';
import { Theme } from '@/context/ThemeContext';

const determineRole = (email: string): UserRole => {
  if (email.includes('interno') || email.includes('admin')) {
    return UserRole.internal;
  } else if (email.includes('voluntario')) {
    return UserRole.volunteer;
  }
  return UserRole.donor;
};

export const useAuthState = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const createSimpleUserProfile = (authUser: User): UserInfo => {
    return {
      id: authUser.id,
      name: authUser.user_metadata?.full_name || 
            authUser.user_metadata?.nome || 
            authUser.email?.split('@')[0] || 'Usuário',
      email: authUser.email || '',
      role: determineRole(authUser.email || ''),
      theme: 'light' as Theme
    };
  };

  const saveUserProfileAsync = async (userProfile: UserInfo) => {
    // Salvar no banco de forma assíncrona sem bloquear a UI
    try {
      await supabase
        .from('voluntarios')
        .upsert({
          id: userProfile.id,
          nome: userProfile.name,
          email: userProfile.email,
          role: userProfile.role,
          theme: userProfile.theme
        }, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });
    } catch (error) {
      // Silencioso - não bloqueia a UI
    }
  };

  useEffect(() => {
    let mounted = true;

    // Timeout de segurança para evitar loading infinito
    const safetyTimeout = setTimeout(() => {
      if (mounted) {
        setLoading(false);
      }
    }, 3000);

    const handleAuthStateChange = (event: string, session: Session | null) => {
      if (!mounted) return;
      
      try {
        if (session?.user) {
          // Criar perfil simples imediatamente
          const userProfile = createSimpleUserProfile(session.user);
          
          if (mounted) {
            setUser(userProfile);
            setIsAuthenticated(true);
            setLoading(false);
            clearTimeout(safetyTimeout);
            
            // Salvar no banco de forma assíncrona
            saveUserProfileAsync(userProfile);
          }
        } else {
          if (mounted) {
            setUser(null);
            setIsAuthenticated(false);
            setLoading(false);
            clearTimeout(safetyTimeout);
          }
        }
      } catch (error) {
        // Em caso de erro, ainda assim configurar usuário básico se existir sessão
        if (session?.user && mounted) {
          const fallbackUser: UserInfo = {
            id: session.user.id,
            name: session.user.email?.split('@')[0] || 'Usuário',
            email: session.user.email || '',
            role: UserRole.donor,
            theme: 'light'
          };
          setUser(fallbackUser);
          setIsAuthenticated(true);
          setLoading(false);
          clearTimeout(safetyTimeout);
        }
      }
    };

    // Verificar sessão inicial
    const checkInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          if (mounted) {
            setLoading(false);
            clearTimeout(safetyTimeout);
          }
          return;
        }
        
        handleAuthStateChange('INITIAL_SESSION', session);
        
      } catch (error) {
        if (mounted) {
          setLoading(false);
          clearTimeout(safetyTimeout);
        }
      }
    };

    // Configurar listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    // Verificar sessão inicial
    checkInitialSession();

    return () => {
      mounted = false;
      clearTimeout(safetyTimeout);
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    loading
  };
};
