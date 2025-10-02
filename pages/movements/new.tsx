import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function NewMovementPage() {
  const { data: session } = useSession();

  const router = useRouter();
  

  const [form, setForm] = useState({
    concept: "",
    amount: "",
    date: "",
    type: "INGRESO",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        const payload = {
        ...form,
        userId: session?.user.id,
        userName: session?.user.name,
        };
      const res = await fetch("/api/movements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (res.ok) {
        router.push("/movements");
      } else {
        const error = await res.json();
        alert("Error al crear el movimiento: " + (error?.error || res.status));
      }
    } finally {
      setLoading(false);
    }
  };

  if (!session) return <p className="p-6">Debes iniciar sesión</p>;
  if (session.user.role !== "ADMIN") return <p className="p-6">No tienes permisos</p>;

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow rounded-lg">
      <h1 className="text-xl font-bold mb-4">Nuevo Movimiento</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Concepto</label>
          <input
            type="text"
            name="concept"
            value={form.concept}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Monto</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Fecha</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Tipo</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="INGRESO">Ingreso</option>
            <option value="EGRESO">Egreso</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
}
