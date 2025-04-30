'use client';

import { 
  ChatBubbleLeftIcon, 
  PuzzlePieceIcon, 
  BuildingStorefrontIcon,
  ChartBarIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  PhoneIcon,
  ArrowTrendingUpIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { metadata } from './metadata'
import NiaChatWidget from '@/components/NiaChatWidget';

export { metadata }

export default function InicioPage() {
  const router = useRouter();

  const quickCommands = [
    { 
      command: "Analiza el rendimiento de las ventas del mes", 
      category: "Ventas",
      icon: ShoppingCartIcon
    },
    { 
      command: "Revisa los tickets de soporte pendientes", 
      category: "Atención al Cliente",
      icon: PhoneIcon
    },
    { 
      command: "Genera un informe de marketing para la próxima semana", 
      category: "Marketing",
      icon: ChartBarIcon
    },
    { 
      command: "Planifica las tareas pendientes", 
      category: "Personal",
      icon: UserGroupIcon
    }
  ];

  const stats = [
    { name: 'Tareas Completadas', value: '24', change: '+5', changeType: 'increase', description: 'por NNIA esta semana' },
    { name: 'Análisis Generados', value: '8', change: '+3', changeType: 'increase', description: 'por NNIA este mes' },
    { name: 'Integraciones Activas', value: '3', change: '+1', changeType: 'increase', description: 'conectadas por NNIA' },
    { name: 'Eficiencia', value: '92%', change: '+4%', changeType: 'increase', description: 'de NNIA en tareas' },
  ];

  const recentActivity = [
    { id: 1, title: 'NNIA completó análisis de ventas', time: 'Hace 2 horas', icon: ChartBarIcon },
    { id: 2, title: 'NNIA respondió consultas de clientes', time: 'Hace 3 horas', icon: ChatBubbleLeftIcon },
    { id: 3, title: 'NNIA generó informe de marketing', time: 'Hace 5 horas', icon: SparklesIcon },
    { id: 4, title: 'NNIA actualizó integraciones', time: 'Hace 1 día', icon: PuzzlePieceIcon },
  ];

  const rolesSummary = [
    { 
      name: 'Asistente Personal', 
      description: 'Gestiona tu agenda y tareas diarias',
      icon: UserGroupIcon,
      href: '/roles/personal',
      tasks: 5,
      example: "Planifica mi agenda para la próxima semana"
    },
    { 
      name: 'Asistente de Ventas', 
      description: 'Seguimiento de pedidos y clientes',
      icon: ShoppingCartIcon,
      href: '/roles/sales',
      tasks: 3,
      example: "Analiza las tendencias de ventas del mes"
    },
    { 
      name: 'Atención al Cliente', 
      description: 'Gestión de consultas y tickets',
      icon: PhoneIcon,
      href: '/roles/customer-service',
      tasks: 8,
      example: "Revisa los tickets pendientes de hoy"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado con NNIA */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Bienvenido al panel de NNIA</h1>
          <p className="mt-1 text-sm text-gray-500">
            Tu asistente de IA para gestionar tu negocio
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">NNIA está activa y lista para ayudarte</span>
        </div>
      </div>

      {/* Comandos Rápidos */}
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Comandos Rápidos para NNIA</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickCommands.map((cmd, index) => (
            <button
              key={index}
              className="p-4 rounded-lg border border-gray-200 hover:border-nia-pink hover:bg-nia-pink/5 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <cmd.icon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{cmd.command}</p>
                  <p className="text-xs text-gray-500">{cmd.category}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white shadow rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
              <span className={`inline-flex items-center text-sm ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'increase' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
                {stat.change}
              </span>
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
            <p className="mt-1 text-xs text-gray-500">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Actividad reciente y Roles */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Actividad reciente */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Actividad Reciente de NNIA</h2>
            <button
              onClick={() => router.push('/messages')}
              className="text-sm text-nia-pink hover:text-nia-pink/80"
            >
              Ver todo
            </button>
          </div>
          <ul className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <activity.icon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Resumen de Roles */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Roles de NNIA</h2>
            <button
              onClick={() => router.push('/roles')}
              className="text-sm text-nia-pink hover:text-nia-pink/80"
            >
              Ver todos
            </button>
          </div>
          <div className="space-y-4">
            {rolesSummary.map((role) => (
              <Link 
                key={role.name} 
                href={role.href}
                className="block p-4 rounded-lg border border-gray-200 hover:border-nia-pink hover:bg-nia-pink/5 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <role.icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{role.name}</p>
                    <p className="text-sm text-gray-500">{role.description}</p>
                    <p className="text-xs text-nia-pink mt-1">Ejemplo: "{role.example}"</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-nia-pink/10 text-nia-pink">
                      {role.tasks} tareas
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Integraciones y Negocio */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Integraciones */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Integraciones de NNIA</h2>
            <button
              onClick={() => router.push('/integrations')}
              className="text-sm text-nia-pink hover:text-nia-pink/80"
            >
              Ver todas
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-3">
                <PuzzlePieceIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Shopify</p>
                  <p className="text-sm text-gray-500">Gestionado por NNIA</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Activo
              </span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-3">
                <PuzzlePieceIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">WhatsApp Business</p>
                  <p className="text-sm text-gray-500">Gestionado por NNIA</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Activo
              </span>
            </div>
          </div>
        </div>

        {/* Negocio */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Tu Negocio con NNIA</h2>
            <button
              onClick={() => router.push('/business')}
              className="text-sm text-nia-pink hover:text-nia-pink/80"
            >
              Ver detalles
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-3 mb-2">
                <BuildingStorefrontIcon className="h-5 w-5 text-gray-400" />
                <p className="text-sm font-medium text-gray-900">Tienda Online</p>
              </div>
              <p className="text-sm text-gray-500">Gestionado por NNIA</p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                <span>NNIA ha optimizado las ventas en un 25% este mes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center space-x-4">
        <button
          onClick={() => router.push('/profile')}
          className="bg-nia-pink text-black px-4 py-2 rounded-full text-sm hover:bg-nia-pink/90"
        >
          Configurar NNIA
        </button>
        <button
          onClick={() => router.push('/setup')}
          className="bg-nia-pink text-black px-4 py-2 rounded-full text-sm hover:bg-nia-pink/90"
        >
          Entrenar a NNIA
        </button>
      </div>

      <NiaChatWidget
        apiUrl={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}
        context={{
          platform: 'client-panel',
          clientID: '123', // Esto debería venir de la autenticación
        }}
      />
    </div>
  );
} 