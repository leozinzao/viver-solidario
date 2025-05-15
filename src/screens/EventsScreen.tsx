import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Calendar, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const eventos = [
  {
    titulo: "Participe da Pizzada da Viver 2022",
    resumo:
      "Edição acontece em 12/03. Renda será destinada à compra de leite integral para as crianças assistidas.",
    link: "https://www.ongviver.org.br/dia-a-dia/participe-da-pizzada-da-viver-2022",
  },
  {
    titulo: "Dupla Manu e Gabriel realiza Live para a ONG Viver",
    resumo:
      "Ação arrecadou cestas básicas, doações em dinheiro e muita alegria.",
    link: "https://www.ongviver.org.br/dia-a-dia/dupla-manu-e-gabriel-realiza-live",
  },
  {
    titulo: "Pizzada da Viver 2.020",
    resumo:
      "Primeira edição do ano foi diferente, mas bateu recorde de vendas.",
    link: "https://www.ongviver.org.br/dia-a-dia/pizzada-da-viver-2020",
  },
  {
    titulo: "Pizzada da Viver – Arapongas",
    resumo: "Edição especial da Pizzada da Viver em Arapongas.",
    link: "https://www.ongviver.org.br/dia-a-dia/pizzada-da-viver-arapongas",
  },
  {
    titulo: "Pizzada da Viver 2019",
    resumo: "Confira o resultado da Pizzada Viver 2019.",
    link: "https://www.ongviver.org.br/dia-a-dia/pizzada-da-viver-2019",
  },
  {
    titulo: "Edital de Tomada de Preços 005/2024",
    resumo: "Publicação oficial sobre contratação de serviços.",
    link: "https://www.ongviver.org.br/dia-a-dia/edital-de-tomada-de-preco-005-2024",
  },
];

const EventsScreen: React.FC = () => {
  const { hasPermission } = useAuth();
  const [showEventForm, setShowEventForm] = useState(false);
  
  return (
    <div className="flutter-screen bg-background p-4 relative">
      <h1 className="text-2xl font-bold text-viver-yellow text-center mb-6">
        Eventos
      </h1>

      <div className="space-y-6 mb-20">
        {eventos.map((ev) => (
          <Card key={ev.titulo} className="flutter-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Calendar className="mr-2 h-6 w-6 shrink-0 text-viver-yellow"/> 
                {ev.titulo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">{ev.resumo}</p>
              <a
                href={ev.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold underline text-viver-yellow"
              >
                Saiba mais
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAB para adicionar eventos (apenas para admin) */}
      {hasPermission("internal") && (
        <button
          onClick={() => setShowEventForm(true)}
          className="absolute bottom-20 right-4 p-4 rounded-full bg-viver-yellow text-black shadow-lg hover:bg-viver-yellow/90 transition-colors"
          aria-label="Adicionar evento"
        >
          <Plus className="h-6 w-6" />
        </button>
      )}
      
      {/* Modal de cadastro de eventos */}
      {showEventForm && <EventForm onClose={() => setShowEventForm(false)} />}
    </div>
  );
};

// Componente de formulário para adicionar/editar eventos
interface EventFormProps {
  onClose: () => void;
  event?: {
    titulo: string;
    resumo: string;
    link: string;
    data_inicio?: string;
    data_fim?: string;
  };
}

const EventForm: React.FC<EventFormProps> = ({ onClose, event }) => {
  const [formData, setFormData] = useState({
    titulo: event?.titulo || "",
    resumo: event?.resumo || "",
    link: event?.link || "",
    data_inicio: event?.data_inicio || "",
    data_fim: event?.data_fim || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui enviaríamos para API
    // Exemplo: api.post('/events', formData)
    
    // Mostrar toast de sucesso
    toast({
      title: "Evento salvo",
      description: "O evento foi salvo com sucesso!"
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-center text-viver-yellow">
            {event ? "Editar Evento" : "Novo Evento"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Resumo</label>
              <textarea
                name="resumo"
                value={formData.resumo}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Link</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Data de Início</label>
              <input
                type="date"
                name="data_inicio"
                value={formData.data_inicio}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Data de Fim</label>
              <input
                type="date"
                name="data_fim"
                value={formData.data_fim}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
            
            <div className="flex gap-2 justify-end pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-viver-yellow hover:bg-viver-yellow/90 text-black">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventsScreen;
