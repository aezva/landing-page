'use client'

import { Button } from '../ui/button'
import { CheckIcon } from '@heroicons/react/24/outline'

const tiers = [
  {
    name: 'Básico',
    id: 'tier-basic',
    price: '29',
    description: 'Perfecto para pequeños negocios que están empezando.',
    features: [
      'Hasta 1,000 mensajes por mes',
      'Integración con 1 plataforma',
      'Respuestas en tiempo real',
      'Soporte por email',
    ],
    cta: 'Comenzar Gratis',
    mostPopular: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    price: '59',
    description: 'Ideal para negocios en crecimiento con más necesidades.',
    features: [
      'Hasta 5,000 mensajes por mes',
      'Integración con 3 plataformas',
      'Análisis de sentimientos',
      'Personalización avanzada',
      'Soporte prioritario',
    ],
    cta: 'Comenzar Prueba Gratuita',
    mostPopular: true,
  },
  {
    name: 'Empresarial',
    id: 'tier-enterprise',
    price: 'Personalizado',
    description: 'Solución personalizada para grandes empresas.',
    features: [
      'Mensajes ilimitados',
      'Integraciones ilimitadas',
      'API personalizada',
      'Modelo de IA personalizado',
      'Soporte 24/7',
      'SLA garantizado',
    ],
    cta: 'Contactar Ventas',
    mostPopular: false,
  },
]

export const PricingSection = () => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-pink-600">Precios</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            El plan perfecto para tu negocio
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Elige el plan que mejor se adapte a tus necesidades. Todos los planes incluyen una prueba gratuita de 14 días.
        </p>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={`
                flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10
                ${tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : ''}
                ${tierIdx === 0 ? 'lg:rounded-r-none' : ''}
                ${tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : ''}
              `}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">{tier.name}</h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-pink-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-pink-600">
                      Más Popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  {tier.price !== 'Personalizado' ? (
                    <>
                      <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price}</span>
                      <span className="text-sm font-semibold leading-6 text-gray-600">/mes</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price}</span>
                  )}
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-pink-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant={tier.mostPopular ? 'default' : 'outline'}
                className="mt-8"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection 