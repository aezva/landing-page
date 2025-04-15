'use client'

import { Button } from '../ui/button'

export const HeroSection = () => {
  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            NIA - Tu Asistente de IA para Negocios
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Automatiza la atención al cliente y mejora la experiencia de tus usuarios con inteligencia artificial
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button>Comenzar Ahora</Button>
            <Button variant="outline">Saber Más</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 