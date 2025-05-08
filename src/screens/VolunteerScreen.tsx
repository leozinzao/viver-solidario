import React from "react";
import { Heart } from "@/components/icons";

const VolunteerScreen: React.FC = () => {
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
    <div className="flutter-screen bg-background p-4">
      <h1 className="text-2xl font-bold text-viver-yellow text-center mb-6">
        Seja um Voluntário
      </h1>

      {/* Trabalhe Conosco */}
      <section className="mb-8">
        <h2 className="flex items-center text-lg font-semibold mb-2">
          <Heart className="mr-2 h-5 w-5 text-viver-yellow-medium" />
          Trabalhe Conosco
        </h2>
        <p className="text-sm">
          Se você tem interesse no terceiro setor e quer fazer parte do time de funcionários da Viver,
          envie seu currículo para&nbsp;
          <a
            href="mailto:gestaodepessoas@ongviver.org.br"
            className="underline"
          >
            gestaodepessoas@ongviver.org.br
          </a>
          . Ele será analisado e, quando tivermos uma oportunidade, entraremos em contato.
        </p>
        <p className="text-sm mt-2">
          Dúvidas? Ligue para&nbsp;
          <a href="tel:+554333150923" className="underline">
            (43)3315‑0923
          </a>
          .
        </p>
      </section>

      {/* Lista de grupos */}
      <ul className="space-y-4 mb-20">
        {grupos.map((g) => (
          <li key={g.titulo}>
            <h3 className="flex items-center text-lg font-semibold">
              <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
              {g.titulo}
            </h3>
            <p className="text-sm ml-7">{g.descricao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerScreen;
