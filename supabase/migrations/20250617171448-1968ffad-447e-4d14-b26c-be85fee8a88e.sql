
-- Primeiro, criar as funções Security Definer necessárias
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.voluntarios 
    WHERE id = user_id 
    AND role IN ('admin', 'internal')
  );
$$;

-- Criar função para verificar se é o próprio usuário
CREATE OR REPLACE FUNCTION public.is_own_profile(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT user_id = auth.uid();
$$;

-- Criar função para verificar acesso admin (incluindo voluntários)
CREATE OR REPLACE FUNCTION public.has_admin_access(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.voluntarios 
    WHERE id = user_id 
    AND role IN ('admin', 'internal', 'volunteer')
  );
$$;
