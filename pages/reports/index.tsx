import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

type Movement = {
  id: number;
  concept: string;
  amount: number;
  date: string;
  type: string;
};

export default function ReportsPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<Movement[]>([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetch("/api/movements")
      .then((res) => res.json())
      .then((rows) => {
        setData(rows);
        const bal = rows.reduce(
          (acc: number, r: Movement) =>
            acc + (r.type === "INGRESO" ? r.amount : -r.amount),
          0
        );
        setBalance(bal);
      });
  }, []);

  if (!session) return <p className="p-6">Debes iniciar sesión</p>;
  if (session.user.role !== "ADMIN")
    return <p className="p-6">Acceso denegado</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Reportes</h1>
      <p className="mb-4">Saldo actual: <strong>${balance.toFixed(2)}</strong></p>

      <div className="h-80 w-full bg-white border rounded shadow mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#2563eb"
              name="Monto"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Link
        href="/api/reports/csv"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Descargar CSV
      </Link>
    </div>
  );
}
