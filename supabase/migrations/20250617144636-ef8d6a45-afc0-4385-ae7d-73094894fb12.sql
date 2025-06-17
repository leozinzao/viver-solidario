
-- Habilitar Row Level Security na tabela voluntarios
ALTER TABLE public.voluntarios ENABLE ROW LEVEL SECURITY;

-- Política para permitir que usuários vejam seu próprio perfil
CREATE POLICY "Usuários podem ver seu próprio perfil" 
  ON public.voluntarios 
  FOR SELECT 
  TO authenticated 
  USING (id = auth.uid());

-- Política para permitir que usuários criem/atualizem seu próprio perfil
CREATE POLICY "Usuários podem criar/atualizar seu próprio perfil" 
  ON public.voluntarios 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (id = auth.uid());

CREATE POLICY "Usuários podem atualizar seu próprio perfil" 
  ON public.voluntarios 
  FOR UPDATE 
  TO authenticated 
  USING (id = auth.uid());

-- Política para administradores verem todos os perfis
CREATE POLICY "Administradores podem ver todos os perfis" 
  ON public.voluntarios 
  FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM public.voluntarios v 
    WHERE v.id = auth.uid() 
    AND v.role IN ('admin', 'internal')
  ));

-- Criar tabela testimonials se não existir
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  depoimento text NOT NULL,
  aprovado boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Habilitar RLS na tabela testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Política para todos verem depoimentos aprovados
CREATE POLICY "Todos podem ver depoimentos aprovados" 
  ON public.testimonials 
  FOR SELECT 
  USING (aprovado = true);

-- Política para usuários autenticados criarem depoimentos
CREATE POLICY "Usuários autenticados podem criar depoimentos" 
  ON public.testimonials 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Política para administradores verem todos os depoimentos
CREATE POLICY "Administradores podem ver todos os depoimentos" 
  ON public.testimonials 
  FOR SELECT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM public.voluntarios v 
    WHERE v.id = auth.uid() 
    AND v.role IN ('admin', 'internal')
  ));

-- Política para administradores atualizarem depoimentos
CREATE POLICY "Administradores podem atualizar depoimentos" 
  ON public.testimonials 
  FOR UPDATE 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM public.voluntarios v 
    WHERE v.id = auth.uid() 
    AND v.role IN ('admin', 'internal')
  ));
