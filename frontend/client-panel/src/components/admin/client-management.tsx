'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Settings, Activity, CreditCard } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Client {
  id: string;
  name: string;
  plan: 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'trial' | 'suspended';
  users: number;
  lastActive: string;
  nextBilling: string;
}

export function ClientManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [clients] = useState<Client[]>([
    {
      id: '1',
      name: 'Empresa ABC',
      plan: 'pro',
      status: 'active',
      users: 15,
      lastActive: '2024-04-14',
      nextBilling: '2024-05-01'
    },
    {
      id: '2',
      name: 'Startup XYZ',
      plan: 'basic',
      status: 'trial',
      users: 5,
      lastActive: '2024-04-13',
      nextBilling: '2024-04-20'
    },
    {
      id: '3',
      name: 'Corporación 123',
      plan: 'enterprise',
      status: 'active',
      users: 50,
      lastActive: '2024-04-14',
      nextBilling: '2024-05-01'
    }
  ]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const planColors = {
    basic: 'bg-blue-100 text-blue-800',
    pro: 'bg-purple-100 text-purple-800',
    enterprise: 'bg-green-100 text-green-800'
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    trial: 'bg-yellow-100 text-yellow-800',
    suspended: 'bg-red-100 text-red-800'
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gestión de Clientes</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Cliente
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-medium">{client.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className={planColors[client.plan]}>
                    {client.plan === 'basic' ? 'Básico' :
                     client.plan === 'pro' ? 'Pro' :
                     'Enterprise'}
                  </Badge>
                  <Badge variant="outline" className={statusColors[client.status]}>
                    {client.status === 'active' ? 'Activo' :
                     client.status === 'trial' ? 'Prueba' :
                     'Suspendido'}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {client.users} usuarios
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Próximo pago: {client.nextBilling}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Activity className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <CreditCard className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 