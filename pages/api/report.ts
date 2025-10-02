import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { requireAuth } from '../../lib/requireAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await requireAuth(req, res, ['ADMIN']);
  if (!session) return;

  if (req.method === 'GET') {
    // Ejemplo: obtener el saldo actual
    const ingresos = await prisma.movement.aggregate({
      _sum: { amount: true },
      where: { amount: { gt: 0 } },
    });
    const egresos = await prisma.movement.aggregate({
      _sum: { amount: true },
      where: { amount: { lt: 0 } },
    });
    const saldo = (ingresos._sum.amount || 0) + (egresos._sum.amount || 0);
    return res.status(200).json({ saldo });
  }
  return res.status(405).json({ error: 'Método no permitido' });
}
