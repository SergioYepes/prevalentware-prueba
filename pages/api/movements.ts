import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { requireAuth } from '../../lib/requireAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const session = await requireAuth(req, res);
    if (!session) return;
    // Obtener todos los movimientos
    const movements = await prisma.movement.findMany({
      include: { user: true },
    });
    return res.status(200).json(movements);
  }
  if (req.method === 'POST') {
    const session = await requireAuth(req, res, ['ADMIN']);
    if (!session) return;
    // Crear un nuevo movimiento
    const { concept, amount, date, userId } = req.body;
    try {
      const movement = await prisma.movement.create({
        data: {
          concept,
          amount,
          date: new Date(date),
          userId,
        },
      });
      return res.status(201).json(movement);
    } catch (error) {
      return res.status(400).json({ error: 'Error creando movimiento', details: error });
    }
  }
  return res.status(405).json({ error: 'Método no permitido' });
}
