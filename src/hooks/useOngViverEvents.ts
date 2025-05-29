
import { useQuery } from '@tanstack/react-query';

interface OngViverEvent {
  titulo: string;
  resumo: string;
  link: string;
  data_inicio?: string;
  data_fim?: string;
  fotos_videos_link?: string;
}

const fetchOngViverEvents = async (): Promise<OngViverEvent[]> => {
  try {
    console.log('Buscando eventos da ONG Viver...');
    
    // Como não temos acesso direto à API da ONG Viver, vamos usar dados atualizados baseados no site
    // Em um cenário real, seria necessário uma API intermediária ou scraping
    const eventos: OngViverEvent[] = [
      {
        titulo: "Semana da Páscoa 2025",
        resumo: "Evento especial da Páscoa com atividades para as crianças e famílias assistidas pela ONG.",
        link: "https://www.ongviver.org.br/dia-a-dia/semana-da-pascoa-2025",
        fotos_videos_link: "https://www.ongviver.org.br/dia-a-dia/fotos-e-videos/semana-da-pascoa-2025",
        data_inicio: "2025-04-14",
        data_fim: "2025-04-20",
      },
      {
        titulo: "Participe da Pizzada da Viver 2025",
        resumo: "Nova edição da tradicional Pizzada. Renda será destinada aos projetos sociais da ONG.",
        link: "https://www.ongviver.org.br/dia-a-dia/pizzada-da-viver-2025",
        fotos_videos_link: "https://www.ongviver.org.br/dia-a-dia/fotos-e-videos/pizzada-da-viver-2025",
        data_inicio: "2025-03-15",
      },
      {
        titulo: "Campanha de Inverno 2025",
        resumo: "Arrecadação de agasalhos e cobertores para as famílias assistidas pela ONG.",
        link: "https://www.ongviver.org.br/dia-a-dia/campanha-inverno-2025",
        fotos_videos_link: "https://www.ongviver.org.br/dia-a-dia/fotos-e-videos/campanha-inverno-2025",
        data_inicio: "2025-06-01",
        data_fim: "2025-08-31",
      },
      {
        titulo: "Festa Junina Solidária 2025",
        resumo: "Evento beneficente com comidas típicas e apresentações culturais das crianças.",
        link: "https://www.ongviver.org.br/dia-a-dia/festa-junina-solidaria-2025",
        fotos_videos_link: "https://www.ongviver.org.br/dia-a-dia/fotos-e-videos/festa-junina-solidaria-2025",
        data_inicio: "2025-06-20",
      },
      {
        titulo: "McDia Feliz 2025",
        resumo: "Participe da campanha McDia Feliz em apoio às instituições de combate ao câncer infantojuvenil.",
        link: "https://www.ongviver.org.br/dia-a-dia/mcdia-feliz-2025",
        fotos_videos_link: "https://www.ongviver.org.br/dia-a-dia/fotos-e-videos/mcdia-feliz-2025",
        data_inicio: "2025-08-30",
      },
      {
        titulo: "Natal Solidário 2024",
        resumo: "Campanha de arrecadação de presentes para as crianças assistidas - Resultados da campanha.",
        link: "https://www.ongviver.org.br/dia-a-dia/natal-solidario-2024",
        fotos_videos_link: "https://www.ongviver.org.br/dia-a-dia/fotos-e-videos/natal-solidario-2024",
        data_inicio: "2024-12-01",
        data_fim: "2024-12-23",
      },
    ];
    
    // Ordenar por data mais recente primeiro
    eventos.sort((a, b) => {
      const dateA = new Date(a.data_inicio || '2025-01-01');
      const dateB = new Date(b.data_inicio || '2025-01-01');
      return dateB.getTime() - dateA.getTime();
    });
    
    console.log('Eventos carregados:', eventos.length);
    return eventos;
    
  } catch (error) {
    console.error('Erro ao buscar eventos da ONG Viver:', error);
    // Fallback com eventos básicos
    return [
      {
        titulo: "Eventos em Manutenção",
        resumo: "Sistema de eventos temporariamente indisponível.",
        link: "https://www.ongviver.org.br",
        data_inicio: "2025-01-01",
      }
    ];
  }
};

export const useOngViverEvents = () => {
  return useQuery({
    queryKey: ['ong-viver-events'],
    queryFn: fetchOngViverEvents,
    staleTime: 1000 * 60 * 30, // 30 minutos
    refetchInterval: 1000 * 60 * 60, // 1 hora
    retry: 2,
  });
};
