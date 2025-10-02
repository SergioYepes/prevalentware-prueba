import { useEffect, useState } from "react";
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

  if (status === "loading") return <p>Cargando sesión...</p>;
  if (!session) return <p>No estás autenticado</p>;

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Movimientos</CardTitle>
          {isAdmin && (
            <Link href="/movements/new">
              <Button>Nuevo Movimiento</Button>
            </Link>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Usuario</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No hay movimientos registrados
                    </TableCell>
                  </TableRow>
                ) : (
                  movements.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>{m.concept}</TableCell>
                      <TableCell>${m.amount.toLocaleString()}</TableCell>
                      <TableCell>{new Date(m.date).toLocaleDateString()}</TableCell>
                      <TableCell>{m.userName || "N/A"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
