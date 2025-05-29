
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

  const ensureUserProfile = async (authUser: User): Promise<UserInfo> => {
    try {
      console.log('Verificando perfil do usuário:', authUser.email);
      
      const { data: existingProfile, error: fetchError } = await supabase
        .from('voluntarios')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Erro ao buscar perfil:', fetchError);
        throw fetchError;
      }

      let userProfile;

      if (!existingProfile) {
        console.log('Criando novo perfil para:', authUser.email);
        
        const newProfile = {
          id: authUser.id,
          nome: authUser.user_metadata?.full_name || 
                authUser.user_metadata?.nome || 
                authUser.email?.split('@')[0] || 'Usuário',
          email: authUser.email || '',
          role: determineRole(authUser.email || ''),
          theme: 'light' as Theme
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('voluntarios')
          .insert(newProfile)
          .select()
          .single();

        if (createError) {
          console.error('Erro ao criar perfil:', createError);
          throw createError;
        }

        userProfile = createdProfile;
        console.log('Perfil criado com sucesso:', userProfile);
      } else {
        userProfile = existingProfile;
        console.log('Perfil existente encontrado:', userProfile);
      }

      return {
        id: authUser.id,
        name: userProfile.nome || authUser.email?.split('@')[0] || 'Usuário',
        email: authUser.email || '',
        role: (userProfile.role as UserRole) || UserRole.donor,
        theme: (userProfile.theme as Theme) || 'light'
      };

    } catch (error) {
      console.error('Erro ao garantir perfil do usuário:', error);
      
      return {
        id: authUser.id,
        name: authUser.user_metadata?.full_name || 
              authUser.user_metadata?.nome || 
              authUser.email?.split('@')[0] || 'Usuário',
        email: authUser.email || '',
        role: determineRole(authUser.email || ''),
        theme: 'light' as Theme
      };
    }
  };

  useEffect(() => {
    console.log('AuthState: Inicializando...');
    
    let mounted = true;

    const handleAuthStateChange = async (event: string, session: Session | null) => {
      console.log('AuthState: Auth state change:', event, session?.user?.email);
      
      if (!mounted) return;
      
      try {
        if (session?.user) {
          const userProfile = await ensureUserProfile(session.user);
          
          if (mounted) {
            setUser(userProfile);
            setIsAuthenticated(true);
            console.log('AuthState: Usuário autenticado:', userProfile);
          }
        } else {
          if (mounted) {
            setUser(null);
            setIsAuthenticated(false);
            console.log('AuthState: Usuário desconectado');
          }
        }
      } catch (error) {
        console.error('AuthState: Erro no processamento:', error);
        if (mounted) {
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    const checkInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('AuthState: Sessão inicial:', session?.user?.email);
        
        if (session) {
          await handleAuthStateChange('INITIAL_SESSION', session);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('AuthState: Erro ao verificar sessão inicial:', error);
        setLoading(false);
      }
    };

    checkInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    loading,
    ensureUserProfile
  };
};
