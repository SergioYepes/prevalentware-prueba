import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).json({ error: "Not authenticated" });

  const userRole = (session.user as any).role || "USER";
  const userId = (session.user as any).id;

if (req.method === "GET") {
  const list = await prisma.movement.findMany({
    orderBy: { date: "desc" },
    include: { user: true },
  });
  return res.json(list);
}


  if (req.method === "POST") {
    // Solo ADMIN puede crear
    if (userRole !== "ADMIN") return res.status(403).json({ error: "Forbidden" });

    const { concept, amount, date, type, userId: formUserId, userName } = req.body;

    try {
      const record = await prisma.movement.create({
        data: {
          concept,
          amount: Number(amount),
          date: new Date(date),
          type,
          userId: formUserId ?? userId,
          userName,
        },
      });
      return res.status(201).json(record);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create movement" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end();
}
