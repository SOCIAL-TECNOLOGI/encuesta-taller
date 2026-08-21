import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://34.148.249.153:5000/dashboard-data', {
      headers: { 'x-dashboard-token': 'encuesta-panel-2026-alau' },
      cache: 'no-store'
    });
    const data = await response.json();

    if (!response.ok) {
      console.error('Error desde la VM:', data);
      return NextResponse.json({ error: 'Error al obtener datos' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error en la API de Vercel:', error);
    return NextResponse.json({ error: 'Error de conexión con el servidor' }, { status: 500 });
  }
}
