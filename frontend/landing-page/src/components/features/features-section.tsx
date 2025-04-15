'use client'

import { ChatBubbleLeftRightIcon, BoltIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Chat Inteligente',
    description: 'Respuestas instantáneas y precisas a las consultas de tus clientes 24/7.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Automatización Inteligente',
    description: 'Automatiza tareas repetitivas y mejora la eficiencia de tu negocio.',
    icon: BoltIcon,
  },
  {
    name: 'Análisis Detallado',
    description: 'Obtén insights valiosos sobre las interacciones con tus clientes.',
    icon: ChartBarIcon,
  },
]

export const FeaturesSection = () => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-pink-600">Todo lo que necesitas</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Características Principales
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            NIA ofrece todas las herramientas necesarias para transformar la atención al cliente de tu negocio
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-pink-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection 