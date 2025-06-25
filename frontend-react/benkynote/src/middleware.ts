import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@auth0/nextjs-auth0/edge';
import { jwtDecode } from 'jwt-decode';

export async function middleware(req: NextRequest) {
  const res = new NextResponse();
  const { accessToken } = await getAccessToken(req, res);

  // Manejar error al obtener el token
  if (!accessToken) {
    console.error("Error obteniendo el token");
    return NextResponse.redirect(new URL('/api/auth/login', req.url));
  }

  // Decodificar el token
  const decodedToken = jwtDecode(accessToken);
  const roles = decodedToken['https://Benkynote/roles'];

  // Verificar si el usuario tiene el rol de 'administrador'
  const isAdmin = roles && roles.includes('administrador');

  const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
  console.log(req.nextUrl.pathname)
  console.log(isAdminPage)
  // Redirigir a la página de administración si es administrador y no está en la página de administración
  if (isAdmin && !isAdminPage) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // Redirigir a la página de unauthorized si no es admin y está intentando acceder a /admin
  if (!isAdmin && isAdminPage) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // Si todo está bien, permitir el acceso
  return NextResponse.next();
}

// Configurar el matcher para proteger las rutas bajo /admin
export const config = {
  matcher: ['/admin/:path*','/personal/:path*'],
};
