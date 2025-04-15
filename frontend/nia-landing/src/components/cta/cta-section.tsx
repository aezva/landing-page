'use client'

import { Button } from '../ui/button'

export const CTASection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Mejora la atención al cliente de tu negocio hoy mismo
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Únete a los cientos de negocios que ya están usando NIA para automatizar su atención al cliente y mejorar la satisfacción de sus usuarios.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg">
              Comenzar Prueba Gratuita
            </Button>
            <Button variant="outline" size="lg" className="text-white hover:bg-white hover:text-gray-900">
              Contactar Ventas
            </Button>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#ec4899" />
                <stop offset={1} stopColor="#ec4899" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default CTASection 