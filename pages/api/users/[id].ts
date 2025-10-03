import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const role = (session.user as any).role;
  if (role !== "ADMIN") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { id } = req.query;

  if (req.method === "PUT") {
    const { name, role: newRole } = req.body;
    const user = await prisma.user.update({
      where: { id: String(id) },
      data: { name, role: newRole },
    });
    return res.json(user);
  }

  res.setHeader("Allow", ["PUT"]);
  res.status(405).end();
}
