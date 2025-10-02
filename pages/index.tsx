import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') return <p>Cargando...</p>;
    if (!session) {
    router.push('/auth/signin');
    return null;
    }


  return (
    <div className="flex h-screen">      
    <Sidebar />
      <main className="flex-1 p-10 bg-gray-50 flex flex-col gap-6">
        <DashboardCard title="Sistema de gestión de ingresos y gastos" />
        <DashboardCard title="Gestión de usuarios" />
        <DashboardCard title="Reportes" />
      </main>
    </div>
  );

}