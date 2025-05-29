
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

  const createUserProfile = async (authUser: User): Promise<UserInfo> => {
    console.log('Criando perfil simples para:', authUser.email);
    
    const userProfile: UserInfo = {
      id: authUser.id,
      name: authUser.user_metadata?.full_name || 
            authUser.user_metadata?.nome || 
            authUser.email?.split('@')[0] || 'Usuário',
      email: authUser.email || '',
      role: determineRole(authUser.email || ''),
      theme: 'light' as Theme
    };

    // Tentar inserir no banco, mas não falhar se der erro
    try {
      const { error } = await supabase
        .from('voluntarios')
        .upsert({
          id: authUser.id,
          nome: userProfile.name,
          email: userProfile.email,
          role: userProfile.role,
          theme: userProfile.theme
        }, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.warn('Aviso ao salvar perfil (não crítico):', error.message);
      } else {
        console.log('Perfil salvo com sucesso');
      }
    } catch (error) {
      console.warn('Erro ao salvar perfil (continuando mesmo assim):', error);
    }

    return userProfile;
  };

  useEffect(() => {
    console.log('AuthState: Inicializando sistema simplificado...');
    
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    // Timeout de segurança para evitar loading infinito
    const safetyTimeout = setTimeout(() => {
      if (mounted) {
        console.warn('AuthState: Timeout de segurança - forçando fim do loading');
        setLoading(false);
      }
    }, 10000); // 10 segundos máximo

    const handleAuthStateChange = async (event: string, session: Session | null) => {
      if (!mounted) return;
      
      console.log('AuthState: Mudança de estado:', event, session?.user?.email || 'sem usuário');
      
      try {
        if (session?.user) {
          console.log('AuthState: Processando usuário autenticado...');
          
          const userProfile = await createUserProfile(session.user);
          
          if (mounted) {
            setUser(userProfile);
            setIsAuthenticated(true);
            console.log('AuthState: Usuário configurado:', userProfile.email);
          }
        } else {
          console.log('AuthState: Usuário desconectado');
          if (mounted) {
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('AuthState: Erro no processamento (continuando):', error);
        
        // Em caso de erro, ainda assim configurar usuário básico se existir
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
          console.log('AuthState: Usuário configurado via fallback');
        }
      } finally {
        if (mounted) {
          setLoading(false);
          clearTimeout(safetyTimeout);
        }
      }
    };

    // Verificar sessão inicial
    const checkInitialSession = async () => {
      try {
        console.log('AuthState: Verificando sessão inicial...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthState: Erro ao verificar sessão:', error);
          setLoading(false);
          return;
        }
        
        console.log('AuthState: Sessão inicial encontrada:', !!session);
        
        if (session) {
          await handleAuthStateChange('INITIAL_SESSION', session);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('AuthState: Erro crítico na verificação inicial:', error);
        setLoading(false);
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
      console.log('AuthState: Cleanup realizado');
    };
  }, []);

  const ensureUserProfile = async (authUser: User): Promise<UserInfo> => {
    return createUserProfile(authUser);
  };

  return {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    loading,
    ensureUserProfile
  };
};
