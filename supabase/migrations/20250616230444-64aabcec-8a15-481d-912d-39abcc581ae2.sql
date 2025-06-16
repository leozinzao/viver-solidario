
-- Criar função RPC para calcular estatísticas de impacto das doações entregues
CREATE OR REPLACE FUNCTION public.get_estatisticas_impacto()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
  total_doacoes_entregues integer;
  total_pessoas_impactadas integer;
  total_localidades integer;
  categorias_data jsonb;
  tipos_beneficiario_data jsonb;
BEGIN
  -- Contar total de doações entregues
  SELECT COUNT(*) INTO total_doacoes_entregues
  FROM doacoes_fisicas_novas 
  WHERE status = 'entregue';
  
  -- Somar total de pessoas impactadas
  SELECT COALESCE(SUM(pessoas_impactadas), 0) INTO total_pessoas_impactadas
  FROM doacoes_fisicas_novas 
  WHERE status = 'entregue' AND pessoas_impactadas IS NOT NULL;
  
  -- Contar total de localidades únicas atendidas
  SELECT COUNT(DISTINCT localidade_entrega) INTO total_localidades
  FROM doacoes_fisicas_novas 
  WHERE status = 'entregue' AND localidade_entrega IS NOT NULL AND localidade_entrega != '';
  
  -- Estatísticas por categoria
  SELECT jsonb_agg(
    jsonb_build_object(
      'categoria', COALESCE(cd.nome, 'Sem categoria'),
      'quantidade_doacoes', categoria_stats.quantidade,
      'pessoas_impactadas', categoria_stats.pessoas
    )
  ) INTO categorias_data
  FROM (
    SELECT 
      dfn.categoria_id,
      COUNT(*) as quantidade,
      COALESCE(SUM(dfn.pessoas_impactadas), 0) as pessoas
    FROM doacoes_fisicas_novas dfn
    WHERE dfn.status = 'entregue'
    GROUP BY dfn.categoria_id
  ) categoria_stats
  LEFT JOIN categorias_doacoes cd ON cd.id = categoria_stats.categoria_id;
  
  -- Estatísticas por tipo de beneficiário
  SELECT jsonb_agg(
    jsonb_build_object(
      'tipo', COALESCE(tipo_beneficiario, 'Não informado'),
      'quantidade', COUNT(*),
      'pessoas_impactadas', COALESCE(SUM(pessoas_impactadas), 0)
    )
  ) INTO tipos_beneficiario_data
  FROM doacoes_fisicas_novas
  WHERE status = 'entregue'
  GROUP BY tipo_beneficiario;
  
  -- Construir resultado final
  result := jsonb_build_object(
    'total_doacoes_entregues', total_doacoes_entregues,
    'total_pessoas_impactadas', total_pessoas_impactadas,
    'total_localidades_atendidas', total_localidades,
    'por_categoria', COALESCE(categorias_data, '[]'::jsonb),
    'por_tipo_beneficiario', COALESCE(tipos_beneficiario_data, '[]'::jsonb)
  );
  
  RETURN result;
END;
$$;
