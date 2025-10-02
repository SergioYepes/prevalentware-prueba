import { getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function requireAuth(req: NextApiRequest, res: NextApiResponse, allowedRoles: string[] = []) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    res.status(401).json({ error: 'No autenticado' });
    return null;
  }
  if (allowedRoles.length > 0 && !allowedRoles.includes((session.user as any).role)) {
    res.status(403).json({ error: 'No autorizado' });
    return null;
  }
  return session;
}
