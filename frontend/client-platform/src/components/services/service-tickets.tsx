'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  customer: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  assignedTo: string;
}

export function ServiceTickets() {
  const [tickets] = useState<Ticket[]>([
    {
      id: '1',
      title: 'Problema con la facturación',
      customer: 'Juan Pérez',
      status: 'in-progress',
      priority: 'high',
      createdAt: '2024-04-14',
      assignedTo: 'María García'
    },
    {
      id: '2',
      title: 'Solicitud de nueva funcionalidad',
      customer: 'Empresa ABC',
      status: 'open',
      priority: 'medium',
      createdAt: '2024-04-13',
      assignedTo: 'Carlos López'
    },
    {
      id: '3',
      title: 'Error en el sistema',
      customer: 'Startup XYZ',
      status: 'resolved',
      priority: 'urgent',
      createdAt: '2024-04-12',
      assignedTo: 'Ana Martínez'
    }
  ]);

  const statusColors = {
    open: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800'
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tickets de Servicio</CardTitle>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Ticket
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-medium">{ticket.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Cliente: {ticket.customer}
                </p>
                <p className="text-sm text-muted-foreground">
                  Asignado a: {ticket.assignedTo}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  statusColors[ticket.status]
                }`}>
                  {ticket.status === 'open' ? 'Abierto' :
                   ticket.status === 'in-progress' ? 'En Progreso' :
                   ticket.status === 'resolved' ? 'Resuelto' :
                   'Cerrado'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  priorityColors[ticket.priority]
                }`}>
                  {ticket.priority === 'low' ? 'Baja' :
                   ticket.priority === 'medium' ? 'Media' :
                   ticket.priority === 'high' ? 'Alta' :
                   'Urgente'}
                </span>
                <span className="text-sm text-muted-foreground">
                  Creado: {ticket.createdAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 