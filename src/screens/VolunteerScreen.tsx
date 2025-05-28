
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "@/components/icons";
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

      {/* Grupos de Voluntariado */}
      <Card className="flutter-card mb-20">
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
    </div>
  );
};

export default VolunteerScreen;
