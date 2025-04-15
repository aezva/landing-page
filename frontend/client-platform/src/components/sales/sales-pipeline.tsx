'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  customer: string;
  amount: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  probability: number;
}

export function SalesPipeline() {
  const opportunities: Opportunity[] = [
    {
      id: '1',
      title: 'Implementación de CRM',
      customer: 'Empresa ABC',
      amount: 15000,
      stage: 'proposal',
      probability: 75
    },
    {
      id: '2',
      title: 'Desarrollo de App Móvil',
      customer: 'Startup XYZ',
      amount: 25000,
      stage: 'negotiation',
      probability: 60
    },
    {
      id: '3',
      title: 'Consultoría Digital',
      customer: 'Corporación 123',
      amount: 8000,
      stage: 'qualified',
      probability: 40
    }
  ];

  const stages = {
    lead: { name: 'Lead', color: 'bg-blue-100 text-blue-800' },
    qualified: { name: 'Calificado', color: 'bg-purple-100 text-purple-800' },
    proposal: { name: 'Propuesta', color: 'bg-yellow-100 text-yellow-800' },
    negotiation: { name: 'Negociación', color: 'bg-orange-100 text-orange-800' },
    closed: { name: 'Cerrado', color: 'bg-green-100 text-green-800' }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pipeline de Ventas</CardTitle>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Oportunidad
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-medium">{opportunity.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {opportunity.customer}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">${opportunity.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">
                    {opportunity.probability}% de probabilidad
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  stages[opportunity.stage].color
                }`}>
                  {stages[opportunity.stage].name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 