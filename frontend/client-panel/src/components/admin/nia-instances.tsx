'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface Instance {
  id: string;
  client: string;
  status: 'active' | 'maintenance' | 'error';
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
  lastBackup: string;
  integrations: {
    whatsapp: boolean;
    email: boolean;
    calendar: boolean;
    docs: boolean;
  };
}

export function NiaInstances() {
  const [instances] = useState<Instance[]>([
    {
      id: '1',
      client: 'Empresa ABC',
      status: 'active',
      cpuUsage: 45,
      memoryUsage: 60,
      storageUsage: 30,
      lastBackup: '2024-04-14 03:00',
      integrations: {
        whatsapp: true,
        email: true,
        calendar: true,
        docs: false
      }
    },
    {
      id: '2',
      client: 'Startup XYZ',
      status: 'maintenance',
      cpuUsage: 15,
      memoryUsage: 30,
      storageUsage: 20,
      lastBackup: '2024-04-14 03:00',
      integrations: {
        whatsapp: true,
        email: false,
        calendar: false,
        docs: false
      }
    },
    {
      id: '3',
      client: 'Corporación 123',
      status: 'error',
      cpuUsage: 90,
      memoryUsage: 85,
      storageUsage: 75,
      lastBackup: '2024-04-13 03:00',
      integrations: {
        whatsapp: true,
        email: true,
        calendar: true,
        docs: true
      }
    }
  ]);

  const statusIcons = {
    active: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    maintenance: <Settings className="h-4 w-4 text-yellow-500" />,
    error: <AlertCircle className="h-4 w-4 text-red-500" />
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Instancias de NIA</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {instances.map((instance) => (
            <div
              key={instance.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{instance.client}</h3>
                  {statusIcons[instance.status]}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">CPU:</span>
                    <Progress value={instance.cpuUsage} className="w-[100px]" />
                    <span className="text-sm">{instance.cpuUsage}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Memoria:</span>
                    <Progress value={instance.memoryUsage} className="w-[100px]" />
                    <span className="text-sm">{instance.memoryUsage}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Almacenamiento:</span>
                    <Progress value={instance.storageUsage} className="w-[100px]" />
                    <span className="text-sm">{instance.storageUsage}%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Último backup: {instance.lastBackup}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    {instance.integrations.whatsapp && (
                      <span className="text-sm text-green-500">WhatsApp</span>
                    )}
                    {instance.integrations.email && (
                      <span className="text-sm text-green-500">Email</span>
                    )}
                    {instance.integrations.calendar && (
                      <span className="text-sm text-green-500">Calendario</span>
                    )}
                    {instance.integrations.docs && (
                      <span className="text-sm text-green-500">Docs</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Activity className="h-4 w-4" />
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