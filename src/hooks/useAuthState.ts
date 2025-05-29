
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
    console.log('Criando perfil simples para:', authUser.email);
    
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
      console.log('Perfil salvo no banco com sucesso');
    } catch (error) {
      console.warn('Erro ao salvar perfil no banco (não crítico):', error);
    }
  };

  useEffect(() => {
    console.log('AuthState: Inicializando sistema simplificado...');
    
    let mounted = true;

    // Timeout de segurança para evitar loading infinito
    const safetyTimeout = setTimeout(() => {
      if (mounted) {
        console.warn('AuthState: Timeout de segurança - forçando fim do loading');
        setLoading(false);
      }
    }, 5000); // Reduzido para 5 segundos

    const handleAuthStateChange = (event: string, session: Session | null) => {
      if (!mounted) return;
      
      console.log('AuthState: Mudança de estado:', event, session?.user?.email || 'sem usuário');
      
      try {
        if (session?.user) {
          console.log('AuthState: Processando usuário autenticado...');
          
          // Criar perfil simples imediatamente
          const userProfile = createSimpleUserProfile(session.user);
          
          if (mounted) {
            setUser(userProfile);
            setIsAuthenticated(true);
            setLoading(false);
            clearTimeout(safetyTimeout);
            console.log('AuthState: Usuário configurado imediatamente:', userProfile.email);
            
            // Salvar no banco de forma assíncrona
            saveUserProfileAsync(userProfile);
          }
        } else {
          console.log('AuthState: Usuário desconectado');
          if (mounted) {
            setUser(null);
            setIsAuthenticated(false);
            setLoading(false);
            clearTimeout(safetyTimeout);
          }
        }
      } catch (error) {
        console.error('AuthState: Erro no processamento:', error);
        
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
          console.log('AuthState: Usuário configurado via fallback');
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
          if (mounted) {
            setLoading(false);
            clearTimeout(safetyTimeout);
          }
          return;
        }
        
        console.log('AuthState: Sessão inicial encontrada:', !!session);
        handleAuthStateChange('INITIAL_SESSION', session);
        
      } catch (error) {
        console.error('AuthState: Erro crítico na verificação inicial:', error);
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
      console.log('AuthState: Cleanup realizado');
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
