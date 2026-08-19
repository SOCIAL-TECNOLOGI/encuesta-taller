import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch('http://34.148.249.153:5000/submit-encuesta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error desde la VM:', data);
      return NextResponse.json(
        { error: 'Error al guardar en el servidor' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Encuesta guardada' });
  } catch (error) {
    console.error('Error en la API de Vercel:', error);
    return NextResponse.json(
      { error: 'Error de conexión con el servidor' },
      { status: 500 }
    );
  }
}