import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
};

export default function UsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState({ name: "", role: "USER" });

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleEdit = (user: User) => {
    setEditing(user);
    setForm({ name: user.name || "", role: user.role });
  };

  const saveUser = async () => {
    if (!editing) return;
    const res = await fetch(`/api/users/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updated = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u.id === updated.id ? updated : u))
      );
      setEditing(null);
    } else {
      alert("Error al actualizar usuario");
    }
  };

  if (!session) return <p className="p-6">Debes iniciar sesión</p>;
  if ((session.user as any).role !== "ADMIN")
    return <p className="p-6">Acceso denegado</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Gestión de Usuarios</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Correo</th>
            <th className="p-2 border">Rol</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Editar Usuario</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Nombre</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Rol</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="USER">Usuario</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setEditing(null)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={saveUser}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
