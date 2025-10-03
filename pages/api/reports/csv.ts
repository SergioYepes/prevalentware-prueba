import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    return res.status(403).end();
  }

  const rows = await prisma.movement.findMany({ include: { user: true } });

  const csv = [
    ["concept", "amount", "date", "userEmail"],
    ...rows.map((r: any) => [
      r.concept,
      r.amount,
      r.date.toISOString(),
      r.user.email,
    ]),
  ]
    .map((r) => r.join(","))
    .join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=report.csv");
  res.send(csv);
}
