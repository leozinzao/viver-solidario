
import React from "react";
import { Heart } from "@/components/icons";

const VolunteerGroups: React.FC = () => {
  const grupos = [
    {
      titulo: "Acolhida",
      descricao:
        "Acolhe crianças, adolescentes e famílias, oferecendo orientação, afeto e alento.",
    },
    {
      titulo: "Artesanato",
      descricao:
        "Produz peças artesanais vendidas em eventos e no Brechó do Bem, gerando renda para a instituição.",
    },
    {
      titulo: "Brechó do Bem",
      descricao:
        "Faz triagem, organização das doações e atendimento ao público no Brechó.",
    },
    {
      titulo: "Cozinha",
      descricao:
        "Auxilia no preparo de alimentos e na rotina da cozinha semi‑industrial da Viver.",
    },
    {
      titulo: "Estoque",
      descricao:
        "Organiza alimentos e monta cestas básicas para as famílias assistidas.",
    },
    {
      titulo: "Eventos",
      descricao:
        "Atua na organização e execução de eventos da Viver ou de parceiros.",
    },
    {
      titulo: "Nota do Bem",
      descricao:
        "Recolhe, organiza e lança cupons fiscais no Programa Nota Paraná.",
    },
    {
      titulo: "Recreação",
      descricao:
        "Planeja e desenvolve atividades recreativas com as crianças e adolescentes.",
    },
  ];

  return (
    <ul className="space-y-4">
      {grupos.map((g) => (
        <li key={g.titulo} className="bg-white/50 p-4 rounded-lg shadow-sm">
          <h3 className="flex items-center text-lg font-semibold mb-2">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
            {g.titulo}
          </h3>
          <p className="text-sm ml-7 text-gray-700">{g.descricao}</p>
        </li>
      ))}
    </ul>
  );
};

export default VolunteerGroups;
