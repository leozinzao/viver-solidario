
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "@/components/icons";
import { Phone, Mail } from "lucide-react";
import VolunteerGroups from "@/components/volunteer/VolunteerGroups";
import VolunteerForm from "@/components/volunteer/VolunteerForm";

const VolunteerScreen: React.FC = () => {
  return (
    <div className="flutter-screen bg-background p-4">
      <h1 className="text-2xl font-bold text-viver-yellow text-center mb-6">
        Seja um Voluntário
      </h1>

      {/* Formulário de Cadastro */}
      <div className="mb-8">
        <VolunteerForm />
      </div>

      {/* Trabalhe Conosco */}
      <Card className="flutter-card mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow-medium" />
            Trabalhe Conosco
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Se você tem interesse no terceiro setor e quer fazer parte do time de funcionários da Viver,
            envie seu currículo para nosso departamento de gestão de pessoas.
          </p>
          <Button 
            className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black"
            onClick={() => window.open('mailto:gestaodepessoas@ongviver.org.br')}
          >
            <Mail className="mr-2 h-4 w-4" />
            Enviar Currículo
          </Button>
          <div className="flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Dúvidas? Ligue para&nbsp;
              <a href="tel:+554333150923" className="underline text-viver-yellow">
                (43) 3315‑0923
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Grupos de Voluntariado */}
      <Card className="flutter-card mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
            Grupos de Voluntariado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4 text-muted-foreground">
            Conheça os diferentes grupos de trabalho voluntário da ONG Viver:
          </p>
          <VolunteerGroups />
        </CardContent>
      </Card>

      {/* Como se Inscrever */}
      <Card className="flutter-card mb-20">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
            Como se Inscrever
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Para se tornar um voluntário da ONG Viver, preencha o formulário acima ou entre em contato conosco:
          </p>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.open('tel:+554333150923')}
            >
              <Phone className="mr-2 h-4 w-4" />
              (43) 3315-0923
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.open('mailto:voluntarios@ongviver.org.br')}
            >
              <Mail className="mr-2 h-4 w-4" />
              voluntarios@ongviver.org.br
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Nossa equipe entrará em contato para agendar uma conversa e conhecer melhor seu perfil.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VolunteerScreen;
