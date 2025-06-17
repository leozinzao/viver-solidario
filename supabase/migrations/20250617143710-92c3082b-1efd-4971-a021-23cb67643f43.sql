
-- Habilitar Row Level Security na tabela eventos
ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;

-- Política para permitir que usuários autenticados vejam todos os eventos
CREATE POLICY "Usuários autenticados podem ver eventos" 
  ON public.eventos 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Política para permitir que usuários autenticados criem eventos
CREATE POLICY "Usuários autenticados podem criar eventos" 
  ON public.eventos 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Política para permitir que usuários autenticados atualizem eventos
CREATE POLICY "Usuários autenticados podem atualizar eventos" 
  ON public.eventos 
  FOR UPDATE 
  TO authenticated 
  USING (true);

-- Política para permitir que usuários autenticados excluam eventos
CREATE POLICY "Usuários autenticados podem excluir eventos" 
  ON public.eventos 
  FOR DELETE 
  TO authenticated 
  USING (true);
