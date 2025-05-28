
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from '@/components/icons';

const PhysicalDonations: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Brechó do Bem */}
      <Card className="flutter-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
            Brechó do Bem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            Doe roupas, calçados, acessórios, livros e brinquedos em bom estado
            e ajude a gerar recursos para a instituição.
          </p>

          <p className="text-sm font-semibold">Locais de entrega:</p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>
              <a
                href="https://www.google.com/maps?q=Rua+Ataulpho+de+Paiva,+234"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Rua Ataulpho de Paiva, 234, Jd. Monções
              </a>{" "}
              — seg-sex 8h30 – 12h
            </li>
            <li>
              <a
                href="https://www.google.com/maps?q=Rua+Bernardo+Sayão,+319"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Rua Bernardo Sayão, 319, Jd. Petrópolis
              </a>{" "}
              — seg-sex 8h30 – 12h
            </li>
          </ul>

          <Button className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black">
            Seguir no Instagram
          </Button>
        </CardContent>
      </Card>

      {/* Lacres e Tampinhas */}
      <Card className="flutter-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow-medium" />
            Lacres & Tampinhas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            Doe lacres de alumínio e tampinhas plásticas ou promova a coleta na
            sua empresa ou condomínio.
          </p>
          <p className="text-sm">
            Você pode trazer sua doação na 
            <a
              href="https://www.google.com/maps?q=Rua+Bernardo+Sayão,+319"
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-1"
            >
              Sede da Viver – Rua Bernardo Sayão, 319, Jd. Petrópolis
            </a>
            , seg-sex 8h30 – 17h.
          </p>
          <Button className="w-full mt-3 bg-viver-yellow-medium hover:bg-viver-yellow-medium/90 text-black">
            Solicitar Material de Apoio
          </Button>
        </CardContent>
      </Card>

      {/* Cestas & Leite */}
      <Card className="flutter-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow-medium" />
            Cestas Básicas & Leite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Doe alimentos não perecíveis e leite integral. Sua doação garante
            alimento mensal às famílias assistidas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhysicalDonations;
