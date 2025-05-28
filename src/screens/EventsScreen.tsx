
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Plus } from "lucide-react";
import { UserRole } from "@/lib/permissions";
import EventCard from "@/components/events/EventCard";

const eventos = [
  {
    titulo: "Participe da Pizzada da Viver 2022",
    resumo:
      "Edição acontece em 12/03. Renda será destinada à compra de leite integral para as crianças assistidas.",
    link: "https://www.ongviver.org.br/dia-a-dia/participe-da-pizzada-da-viver-2022",
    data_inicio: "2022-03-12",
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
    data_inicio: "2020-12-15",
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
    data_inicio: "2019-11-20",
  },
  {
    titulo: "Edital de Tomada de Preços 005/2024",
    resumo: "Publicação oficial sobre contratação de serviços.",
    link: "https://www.ongviver.org.br/dia-a-dia/edital-de-tomada-de-preco-005-2024",
    data_inicio: "2024-05-10",
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
          <EventCard key={ev.titulo} evento={ev} />
        ))}
      </div>

      {/* FAB para adicionar eventos (apenas para admin/internal) */}
      {hasPermission(UserRole.internal) && (
        <div className="fixed bottom-20 right-4">
          <button
            onClick={() => setShowEventForm(true)}
            className="p-4 rounded-full bg-viver-yellow text-black shadow-lg hover:bg-viver-yellow/90 transition-colors"
            aria-label="Adicionar evento"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      )}
      
      {/* Modal placeholder */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4 text-center text-viver-yellow">
              Adicionar Evento
            </h2>
            <p className="text-center text-muted-foreground mb-4">
              Funcionalidade em desenvolvimento
            </p>
            <Button 
              onClick={() => setShowEventForm(false)}
              className="w-full"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsScreen;
