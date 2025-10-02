import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { requireAuth } from '../../lib/requireAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await requireAuth(req, res, ['ADMIN']);
  if (!session) return;

  if (req.method === 'GET') {
    // Obtener todos los usuarios
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  }
  if (req.method === 'POST') {
    // Crear un nuevo usuario (solo ejemplo, falta validación y control de roles)
    const { name, email, phone } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          role: 'ADMIN', // Por defecto ADMIN para pruebas
        },
      });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: 'Error creando usuario', details: error });
    }
  }
  return res.status(405).json({ error: 'Método no permitido' });
}

