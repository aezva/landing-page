'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, BarChart, Settings, BookOpen, Bell, CreditCard, Plug } from 'lucide-react';
import { NIAChat } from '@/components/nia/chat';
import { IntegrationsManager } from '@/components/integrations/integrations-manager';
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { SalesPipeline } from "@/components/sales/sales-pipeline";
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <DashboardOverview />
        </TabsContent>
        <TabsContent value="sales">
          <SalesPipeline />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
} 