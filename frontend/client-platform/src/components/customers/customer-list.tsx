'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'lead';
  lastInteraction: string;
}

export function CustomerList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      status: 'active',
      lastInteraction: '2024-04-14'
    },
    {
      id: '2',
      name: 'María García',
      email: 'maria@example.com',
      status: 'lead',
      lastInteraction: '2024-04-13'
    },
    {
      id: '3',
      name: 'Carlos López',
      email: 'carlos@example.com',
      status: 'inactive',
      lastInteraction: '2024-04-10'
    }
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Clientes</CardTitle>
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
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-medium">{customer.name}</h3>
                <p className="text-sm text-muted-foreground">{customer.email}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  customer.status === 'active' ? 'bg-green-100 text-green-800' :
                  customer.status === 'lead' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {customer.status === 'active' ? 'Activo' :
                   customer.status === 'lead' ? 'Lead' :
                   'Inactivo'}
                </span>
                <span className="text-sm text-muted-foreground">
                  Última interacción: {customer.lastInteraction}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 