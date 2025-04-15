'use client'

const testimonials = [
  {
    body: 'NIA ha transformado completamente la forma en que atendemos a nuestros clientes. La respuesta es inmediata y precisa.',
    author: {
      name: 'María González',
      handle: 'CEO de TechStart',
      imageUrl: '/testimonials/maria.jpg',
    },
  },
  {
    body: 'La integración fue muy sencilla y los resultados fueron inmediatos. Nuestros clientes están más satisfechos que nunca.',
    author: {
      name: 'Carlos Rodríguez',
      handle: 'Fundador de eCommerce Plus',
      imageUrl: '/testimonials/carlos.jpg',
    },
  },
  {
    body: 'La capacidad de NIA para manejar múltiples conversaciones simultáneas ha mejorado significativamente nuestra eficiencia.',
    author: {
      name: 'Ana Martínez',
      handle: 'Directora de Atención al Cliente',
      imageUrl: '/testimonials/ana.jpg',
    },
  },
]

export const TestimonialsSection = () => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-pink-600">Testimonios</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Lo que dicen nuestros clientes
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author.handle} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                  <blockquote className="text-gray-900">
                    <p>{`"${testimonial.body}"`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img className="h-10 w-10 rounded-full bg-gray-50" src={testimonial.author.imageUrl} alt="" />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                      <div className="text-gray-600">{testimonial.author.handle}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection 