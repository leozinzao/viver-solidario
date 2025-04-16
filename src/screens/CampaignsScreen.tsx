
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Campaign } from '@/components/icons';

const CampaignsScreen: React.FC = () => {
  const campaigns = [
    {
      id: 1,
      title: 'Campanha de Inverno',
      description: 'Doação de cobertores e agasalhos para pessoas em situação de rua',
      date: '01/06 - 31/07'
    },
    {
      id: 2,
      title: 'Alimentos Solidários',
      description: 'Arrecadação de alimentos não-perecíveis para famílias carentes',
      date: '15/05 - 15/06'
    },
    {
      id: 3,
      title: 'Doe Sangue, Salve Vidas',
      description: 'Campanha de doação de sangue em parceria com hemocentros locais',
      date: '01/06 - 30/06'
    }
  ];

  return (
    <div className="flutter-screen p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6">Campanhas em Andamento</h1>
      
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="flutter-card">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="p-2 rounded-full bg-solidario-purple/10 text-solidario-purple">
              <Campaign size={24} />
            </div>
            <div>
              <CardTitle className="text-lg">{campaign.title}</CardTitle>
              <CardDescription>{campaign.date}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{campaign.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CampaignsScreen;
