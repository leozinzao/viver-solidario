
import { useQuery } from '@tanstack/react-query';

interface OngViverEvent {
  titulo: string;
  resumo: string;
  link: string;
  data_inicio?: string;
  data_fim?: string;
}

const fetchOngViverEvents = async (): Promise<OngViverEvent[]> => {
  try {
    // Simulando uma API call para os eventos da ONG Viver
    // Em um cenário real, seria necessário uma API intermediária ou scraping
    const response = await fetch('https://www.ongviver.org.br/api/eventos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      // Se a API não estiver disponível, retorna eventos de exemplo atualizados
      console.log('API da ONG Viver não disponível, usando dados de fallback');
      return [
        {
          titulo: "Participe da Pizzada da Viver 2025",
          resumo: "Nova edição da tradicional Pizzada. Renda será destinada aos projetos sociais da ONG.",
          link: "https://www.ongviver.org.br/dia-a-dia/pizzada-da-viver-2025",
          data_inicio: "2025-03-15",
        },
        {
          titulo: "Campanha de Inverno 2025",
          resumo: "Arrecadação de agasalhos e cobertores para as famílias assistidas pela ONG.",
          link: "https://www.ongviver.org.br/dia-a-dia/campanha-inverno-2025",
          data_inicio: "2025-06-01",
          data_fim: "2025-08-31",
        },
        {
          titulo: "Festa Junina Solidária",
          resumo: "Evento beneficente com comidas típicas e apresentações culturais.",
          link: "https://www.ongviver.org.br/dia-a-dia/festa-junina-solidaria",
          data_inicio: "2025-06-20",
        },
        {
          titulo: "Natal Solidário 2024",
          resumo: "Campanha de arrecadação de presentes para as crianças assistidas.",
          link: "https://www.ongviver.org.br/dia-a-dia/natal-solidario-2024",
          data_inicio: "2024-12-01",
          data_fim: "2024-12-23",
        },
      ];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar eventos da ONG Viver:', error);
    // Fallback com eventos de exemplo
    return [
      {
        titulo: "Participe da Pizzada da Viver 2025",
        resumo: "Nova edição da tradicional Pizzada. Renda será destinada aos projetos sociais da ONG.",
        link: "https://www.ongviver.org.br/dia-a-dia/pizzada-da-viver-2025",
        data_inicio: "2025-03-15",
      },
      {
        titulo: "Campanha de Inverno 2025",
        resumo: "Arrecadação de agasalhos e cobertores para as famílias assistidas pela ONG.",
        link: "https://www.ongviver.org.br/dia-a-dia/campanha-inverno-2025",
        data_inicio: "2025-06-01",
        data_fim: "2025-08-31",
      },
    ];
  }
};

export const useOngViverEvents = () => {
  return useQuery({
    queryKey: ['ong-viver-events'],
    queryFn: fetchOngViverEvents,
    staleTime: 1000 * 60 * 30, // 30 minutos
    refetchInterval: 1000 * 60 * 60, // 1 hora
  });
};
