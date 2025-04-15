'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Mail, Calendar, MessageSquare, FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  recommended: boolean;
  businessTypes: string[];
  useCases: string[];
  apiKey?: string;
  webhookUrl?: string;
}

type BusinessType = 'retail' | 'servicios' | 'financiero' | 'salud' | 'educacion' | 'restaurante' | 'personalizado';

export function IntegrationsManager() {
  const [businessType, setBusinessType] = useState<BusinessType>('personalizado');
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Comunicación directa con clientes y gestión de citas',
      icon: <MessageSquare className="h-6 w-6" />,
      enabled: false,
      recommended: true,
      businessTypes: ['retail', 'servicios', 'restaurante', 'salud'],
      useCases: [
        'Confirmación de citas',
        'Recordatorios de servicios',
        'Seguimiento de clientes',
        'Promociones personalizadas'
      ]
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Gestión de comunicaciones formales y documentación',
      icon: <Mail className="h-6 w-6" />,
      enabled: false,
      recommended: true,
      businessTypes: ['financiero', 'educacion', 'servicios'],
      useCases: [
        'Documentación legal',
        'Facturas y recibos',
        'Comunicaciones oficiales',
        'Seguimiento de casos'
      ]
    },
    {
      id: 'calendar',
      name: 'Calendario',
      description: 'Gestión de citas y programación de servicios',
      icon: <Calendar className="h-6 w-6" />,
      enabled: false,
      recommended: true,
      businessTypes: ['servicios', 'salud', 'educacion'],
      useCases: [
        'Agendamiento de citas',
        'Gestión de disponibilidad',
        'Recordatorios automáticos',
        'Optimización de horarios'
      ]
    },
    {
      id: 'google-docs',
      name: 'Google Docs',
      description: 'Documentación y gestión de información',
      icon: <FileText className="h-6 w-6" />,
      enabled: false,
      recommended: true,
      businessTypes: ['financiero', 'educacion', 'servicios'],
      useCases: [
        'Documentos legales',
        'Contratos y acuerdos',
        'Manuales y guías',
        'Registros de clientes'
      ]
    }
  ]);

  useEffect(() => {
    // Actualizar recomendaciones basadas en el tipo de negocio
    setIntegrations(prevIntegrations => 
      prevIntegrations.map(integration => ({
        ...integration,
        recommended: integration.businessTypes.includes(businessType)
      }))
    );
  }, [businessType]);

  const handleToggle = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, enabled: !integration.enabled }
        : integration
    ));
  };

  const handleApiKeyChange = (id: string, value: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, apiKey: value }
        : integration
    ));
  };

  const handleWebhookChange = (id: string, value: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, webhookUrl: value }
        : integration
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <Label>Tipo de Negocio</Label>
        <Select value={businessType} onValueChange={(value: BusinessType) => setBusinessType(value)}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Selecciona el tipo de negocio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="retail">Comercio Minorista</SelectItem>
            <SelectItem value="servicios">Servicios Profesionales</SelectItem>
            <SelectItem value="financiero">Servicios Financieros</SelectItem>
            <SelectItem value="salud">Salud y Bienestar</SelectItem>
            <SelectItem value="educacion">Educación</SelectItem>
            <SelectItem value="restaurante">Restaurante/Cafetería</SelectItem>
            <SelectItem value="personalizado">Personalizado</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          NIA se adaptará automáticamente a las necesidades específicas de tu negocio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className={integration.recommended ? 'border-primary' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {integration.icon}
                  <div>
                    <CardTitle>{integration.name}</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </div>
                </div>
                <Switch
                  checked={integration.enabled}
                  onCheckedChange={() => handleToggle(integration.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              {integration.recommended && (
                <div className="mb-4 p-2 bg-primary/10 rounded-md">
                  <p className="text-sm text-primary font-medium">
                    Recomendado para tu tipo de negocio
                  </p>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <Label>Casos de uso principales:</Label>
                  <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside">
                    {integration.useCases.map((useCase, index) => (
                      <li key={index}>{useCase}</li>
                    ))}
                  </ul>
                </div>
                {integration.enabled && (
                  <>
                    <div className="space-y-2">
                      <Label>API Key</Label>
                      <Input
                        type="password"
                        value={integration.apiKey || ''}
                        onChange={(e) => handleApiKeyChange(integration.id, e.target.value)}
                        placeholder="Ingresa tu API Key"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Webhook URL</Label>
                      <Input
                        value={integration.webhookUrl || ''}
                        onChange={(e) => handleWebhookChange(integration.id, e.target.value)}
                        placeholder="Ingresa la URL del webhook"
                      />
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 