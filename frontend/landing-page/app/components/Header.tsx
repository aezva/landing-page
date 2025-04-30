'use client'

import { useState } from 'react'

export default function Header() {
  const [language, setLanguage] = useState('es')

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'))
  }

  return (
    <header className="w-full px-10 py-4 flex justify-between items-center bg-white border-b border-gray-200">
      {/* Lado Izquierdo: Logo + Menú */}
      <div className="flex items-center space-x-24">
        {/* Logo */}
        <h1 className="text-black text-2xl font-bold tracking-[5px]">NIA</h1>

        {/* Menú de navegación */}
        <nav className="flex space-x-8">
          <a href="#inicio" className="text-black hover:opacity-70 transition">Inicio</a>
          <a href="#funcionalidades" className="text-black hover:opacity-70 transition">Funcionalidades</a>
          <a href="#precios" className="text-black hover:opacity-70 transition">Precios</a>
          <a href="#registro" className="text-black hover:opacity-70 transition">Registrarse</a>
        </nav>
      </div>

      {/* Lado Derecho: Idioma + Botón */}
      <div className="flex items-center space-x-6">
        {/* Botón de idioma */}
        <button
          onClick={toggleLanguage}
          className="text-black text-sm hover:opacity-70 transition"
        >
          {language === 'es' ? 'Español' : 'English'}
        </button>

        {/* Botón de llamada a la acción */}
        <button className="bg-[#FF9C9C] text-black text-sm px-4 py-2 rounded-md shadow-sm hover:opacity-90 transition">
          Try NIA for free
        </button>
      </div>
    </header>
  )
} 