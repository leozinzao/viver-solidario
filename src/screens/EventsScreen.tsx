
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Plus, RefreshCw } from "lucide-react";
import { UserRole } from "@/lib/permissions";
import EventCard from "@/components/events/EventCard";
import { useOngViverEvents } from "@/hooks/useOngViverEvents";

const EventsScreen: React.FC = () => {
  const { hasPermission } = useAuth();
  const [showEventForm, setShowEventForm] = useState(false);
  const { data: eventos, isLoading, error, refetch } = useOngViverEvents();

  const handleRefresh = () => {
    refetch();
  };
  
  return (
    <div className="flutter-screen bg-background p-4 relative">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-viver-yellow text-center flex-1">
          Eventos
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-viver-yellow" />
            <p className="text-muted-foreground">Carregando eventos...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            Não foi possível carregar os eventos mais recentes. Mostrando eventos em cache.
          </p>
        </div>
      )}

      <div className="space-y-6 mb-20">
        {eventos?.map((evento, index) => (
          <EventCard key={`${evento.titulo}-${index}`} evento={evento} />
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
