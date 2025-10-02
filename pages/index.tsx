import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import Layout from "../components/Layout";

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
    <Layout>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-10 bg-gray-50 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold mb-6">Bienvenido 👋</h2>
          <DashboardCard title="Sistema de gestión de ingresos y gastos" />
          <DashboardCard title="Gestión de usuarios" />
          <DashboardCard title="Reportes" />
        </main>
      </div>
    </Layout>
  );
}
