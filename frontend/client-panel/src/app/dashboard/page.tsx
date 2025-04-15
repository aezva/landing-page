'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, BarChart, Settings, BookOpen, Bell, CreditCard, Plug } from 'lucide-react';
import { NIAChat } from '@/components/nia/chat';
import { IntegrationsManager } from '@/components/integrations/integrations-manager';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-card border-r">
        <div className="p-4">
          <h1 className="text-2xl font-bold">NIA Platform</h1>
        </div>
        <nav className="mt-8">
          <TabsList className="flex flex-col items-start space-y-2 p-4">
            <TabsTrigger
              value="chat"
              className="w-full justify-start"
              onClick={() => setActiveTab('chat')}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat con NIA
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="w-full justify-start"
              onClick={() => setActiveTab('stats')}
            >
              <BarChart className="mr-2 h-4 w-4" />
              Estadísticas
            </TabsTrigger>
            <TabsTrigger
              value="specializations"
              className="w-full justify-start"
              onClick={() => setActiveTab('specializations')}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Especialidades
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="w-full justify-start"
              onClick={() => setActiveTab('integrations')}
            >
              <Plug className="mr-2 h-4 w-4" />
              Integraciones
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="w-full justify-start"
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </TabsTrigger>
            <TabsTrigger
              value="subscription"
              className="w-full justify-start"
              onClick={() => setActiveTab('subscription')}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Suscripción
            </TabsTrigger>
            <TabsTrigger
              value="updates"
              className="w-full justify-start"
              onClick={() => setActiveTab('updates')}
            >
              <Bell className="mr-2 h-4 w-4" />
              Actualizaciones
            </TabsTrigger>
          </TabsList>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <Tabs value={activeTab} className="space-y-4">
          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle>Chat con NIA</CardTitle>
                <CardDescription>
                  Conversa con NIA sobre tu negocio y obtén insights valiosos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NIAChat />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
                <CardDescription>
                  Analiza el rendimiento de NIA en tu negocio
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Aquí irán las estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Interacciones Totales</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">1,234</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Tasa de Satisfacción</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">98%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Tiempo Promedio de Respuesta</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">2.3s</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specializations">
            <Card>
              <CardHeader>
                <CardTitle>Especialidades</CardTitle>
                <CardDescription>
                  Gestiona las especialidades de NIA para tu negocio
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Aquí irá la gestión de especialidades */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Asistente de Ventas</h3>
                      <p className="text-sm text-muted-foreground">
                        Ayuda a los clientes con preguntas sobre productos
                      </p>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Soporte Técnico</h3>
                      <p className="text-sm text-muted-foreground">
                        Resuelve problemas técnicos de los clientes
                      </p>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integraciones</CardTitle>
                <CardDescription>
                  Conecta NIA con otras plataformas para potenciar su funcionalidad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IntegrationsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
                <CardDescription>
                  Personaliza la configuración de NIA para tu negocio
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Aquí irá la configuración */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Información del Negocio</h3>
                    <p className="text-sm text-muted-foreground">
                      Actualiza la información básica de tu negocio
                    </p>
                    <Button className="mt-2">Editar</Button>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Integraciones</h3>
                    <p className="text-sm text-muted-foreground">
                      Configura las integraciones con otras plataformas
                    </p>
                    <Button className="mt-2">Configurar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Suscripción</CardTitle>
                <CardDescription>
                  Gestiona tu plan de suscripción
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Aquí irá la información de la suscripción */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Plan Actual</h3>
                    <p className="text-2xl font-bold">Pro</p>
                    <p className="text-sm text-muted-foreground">$79/mes</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Próximo Pago</h3>
                    <p className="text-sm">15 de Mayo, 2024</p>
                  </div>
                  <Button>Actualizar Plan</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="updates">
            <Card>
              <CardHeader>
                <CardTitle>Actualizaciones</CardTitle>
                <CardDescription>
                  Mantente al día con las últimas novedades de NIA
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Aquí irán las actualizaciones */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Nueva Especialidad: Asesor Financiero</h3>
                    <p className="text-sm text-muted-foreground">
                      Ahora NIA puede ayudar a tus clientes con asesoría financiera
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Publicado el 10 de Mayo, 2024
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Mejoras en el Análisis de Conversaciones</h3>
                    <p className="text-sm text-muted-foreground">
                      Nuevas métricas y reportes disponibles
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Publicado el 5 de Mayo, 2024
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 