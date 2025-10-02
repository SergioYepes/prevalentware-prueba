import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-6 flex flex-col">
      <div className="text-2xl font-bold mb-10">LOGO</div>
      <nav className="flex flex-col gap-6 text-lg">
        <Link href="/movements" className="hover:text-gray-300">Ingresos y egresos</Link>
        <Link href="/users" className="hover:text-gray-300">Usuarios</Link>
        <Link href="/reports" className="hover:text-gray-300">Reportes</Link>
      </nav>
    </aside>
  );
}