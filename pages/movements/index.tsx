import React from "react";
import { useMovements } from "../../hooks/useMovements";
import { useSession } from "next-auth/react";

export default function MovementsPage() {
  const { data, balance } = useMovements();
  const { data: session } = useSession();

  if (!session) return <p className="p-6">Debes iniciar sesión</p>;
  if (session.user.role !== "ADMIN")
    return <p className="p-6">Acceso denegado</p>;

  return (
    <div className="p-6">
      <h2>Movimientos</h2>
      <table>
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr key={m.id}>
              <td>{m.concept}</td>
              <td>${m.amount.toLocaleString()}</td>
              <td>{new Date(m.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Saldo actual: ${balance.toLocaleString()}</p>
    </div>
  );
}
