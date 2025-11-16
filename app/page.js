
import Link from 'next/link';
export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="py-6 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.svg" alt="Open Road Exchange" className="w-48" />
        </div>
        <nav className="space-x-4">
          <Link href="/inventory">Inventory</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>
      <section className="bg-gradient-to-r from-sky-600 to-cyan-500 text-white py-24 px-8">
        <div className="max-w-5xl">
          <h1 className="text-4xl font-bold">Find your next adventure on the Open Road</h1>
          <p className="mt-4">Buy, sell, and trade RVs, trucks, and trailers. Financing available.</p>
          <div className="mt-6">
            <Link href="/inventory" className="px-4 py-2 bg-white text-slate-900 rounded-md">Browse Inventory</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
