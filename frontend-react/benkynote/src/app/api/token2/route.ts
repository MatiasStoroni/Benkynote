import { NextResponse } from 'next/server';
import { getAccessToken } from '@auth0/nextjs-auth0';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { accessToken } = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ error: 'No se pudo obtener el token' }, { status: 401 });
  }

  return NextResponse.json({ accessToken });
}