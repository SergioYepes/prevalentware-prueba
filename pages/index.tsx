import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import DashboardCard from "../components/DashboardCard";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") return <p>Cargando...</p>;
  if (!session) return null;

  return (
      <div className="flex h-screen">
        <main className="flex-1 p-10 bg-gray-50 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold mb-6">Bienvenido 👋</h2>
          <DashboardCard title="Sistema de gestión de ingresos y gastos" onClick={() => router.push("/movements")} />
          <DashboardCard title="Gestión de usuarios" onClick={() => router.push("/users")} />
          <DashboardCard title="Reportes" onClick={() => router.push("/reports")} />
        </main>
      </div>
  );
}
