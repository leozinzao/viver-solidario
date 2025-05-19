
import { supabase, supabaseAuth } from '@/lib/supabase';
import { UserInfo } from '@/types/auth';
import { UserRole } from '@/lib/permissions';
import { Theme } from '@/context/ThemeContext';

export const determineRole = (email: string): UserRole => {
  if (email.includes('interno') || email.includes('admin')) {
    return UserRole.internal;
  } else if (email.includes('voluntario')) {
    return UserRole.volunteer;
  }
  return UserRole.donor;
};

export const fetchUserProfile = async (userId: string): Promise<UserInfo | null> => {
  try {
    const { data: profile } = await supabase
      .from('voluntarios')
      .select('nome, email, role, theme')
      .eq('id', userId)
      .single();
    
    if (!profile) return null;
    
    return {
      id: userId,
      name: profile.nome || '',
      email: profile.email || '',
      role: (profile.role as UserRole) || UserRole.donor,
      theme: (profile.theme as Theme) || 'light'
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const loginUser = async (email: string, password: string) => {
  return await supabaseAuth.signIn(email, password);
};

export const logoutUser = async () => {
  return await supabaseAuth.signOut();
};

export const updateProfile = async (userId: string, data: { name?: string; email?: string; theme?: Theme }) => {
  // Update email in auth if provided and different
  if (data.email) {
    await supabase.auth.updateUser({
      email: data.email,
    });
  }
  
  // Update profile in database
  const { data: updateData, error } = await supabase
    .from('voluntarios')
    .update({
      nome: data.name,
      email: data.email,
      theme: data.theme,
    })
    .eq('id', userId)
    .select()
    .single();
    
  if (error) throw error;
  return updateData;
};

export const updateUserPassword = async (email: string, currentPassword: string, newPassword: string) => {
  // First authenticate with current password
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });
  
  if (signInError) throw signInError;
  
  // Update password
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });
  
  if (updateError) throw updateError;
};

export const applyTheme = (theme: Theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
