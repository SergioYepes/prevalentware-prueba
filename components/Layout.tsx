import Sidebar from "./Sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-900 text-white">
        <Sidebar />
      </div>
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
