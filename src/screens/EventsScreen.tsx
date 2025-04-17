import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/icons";

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
  return (
    <div className="flutter-screen bg-background p-4">
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
    </div>
  );
};

export default EventsScreen;
