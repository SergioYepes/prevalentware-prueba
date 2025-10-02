export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">Mi App</h1>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}
