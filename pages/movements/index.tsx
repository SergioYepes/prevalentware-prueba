import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "../../components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/Table";

interface Movement {
  id: string;
  concept: string;
  amount: number;
  date: string;
  userName: string;
  type?: "INGRESO" | "EGRESO";
}

export default function MovementsPage() {
  const { data: session, status } = useSession();
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = session?.user?.role === "ADMIN";
  

  useEffect(() => {
    if (status === "loading") return;

    const fetchMovements = async () => {
      try {
        const res = await fetch("/api/movements", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Error cargando movimientos");
        const data = await res.json();
        setMovements(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovements();
  }, [status]);
  
console.log(movements);
  if (status === "loading") return <p>Cargando sesión...</p>;
  if (!session) return <p>No estás autenticado</p>;

    const availableAmount = movements.reduce((acc, m) => {
    if (m.type === "EGRESO") return acc - m.amount;
    return acc + m.amount;
  }, 0);

  return (
    <div className="container mx-auto py-8">
      <Card className="border border-orange-500">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="underline text-2xl">Movimientos</CardTitle>
          {isAdmin && (
            <Link href="/movements/new">
              <Button className="bg-cyan-600 hover:bg-cyan-700">Nuevo Movimiento</Button>
            </Link>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Cargando...</p>
          ) : (
              <>
              <Table className="border border-orange-500">
                <TableHeader>
                  <TableRow className="border-b border-orange-500">
                    <TableHead>Concepto</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Usuario</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movements.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center border border-orange-500">
                        No hay movimientos registrados
                      </TableCell>
                    </TableRow>
                  ) : (
                    movements.map((m) => (
                      <TableRow key={m.id} className="border-b border-orange-500">
                        <TableCell className="border-r border-orange-500">{m.concept}</TableCell>
                        <TableCell className="border-r border-orange-500">
                          ${m.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="border-r border-orange-500">
                          {new Date(m.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{m.userName || "N/A"}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <div className="mt-6 text-right font-bold text-lg border-t border-orange-500 pt-4">
                Monto disponible:{" "}
                <span className={availableAmount < 0 ? "text-red-600" : "text-green-600"}>
                  ${availableAmount.toLocaleString()}
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
