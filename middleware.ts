import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  if (!url.startsWith('/dashboard')) return NextResponse.next();

  const authHeader = request.headers.get('authorization');
  if (!authHeader) return new NextResponse('Auth required', { status: 401, headers: { 'WWW-Authenticate': 'Basic' } });

  const base64 = authHeader.split(' ')[1];
  const [user, pass] = Buffer.from(base64, 'base64').toString().split(':');
  const validUser = process.env.DASHBOARD_USER || 'admin';
  const validPass = process.env.DASHBOARD_PASS;

  // ✅ CORREGIDO: sin contraseña de respaldo insegura — si no está
  // configurada en Vercel, el acceso queda bloqueado por defecto,
  // no con una clave adivinable como "cambiaesto".
  if (!validPass) return new NextResponse('Dashboard no configurado', { status: 503 });

  if (user === validUser && pass === validPass) return NextResponse.next();
  return new NextResponse('Auth required', { status: 401, headers: { 'WWW-Authenticate': 'Basic' } });
}
