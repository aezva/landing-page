import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Por ahora, devolvemos una respuesta simple
    // Más adelante integraremos con el backend real
    return NextResponse.json({
      response: `Recibí tu mensaje: "${message}". Esta es una respuesta de prueba.`
    });
  } catch (error) {
    console.error('Error en la API de chat:', error);
    return NextResponse.json(
      { error: 'Error al procesar el mensaje' },
      { status: 500 }
    );
  }
} 