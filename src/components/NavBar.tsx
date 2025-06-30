import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-primary text-black p-4 flex justify-between">
      <h1 className="text-xl font-bold">
        <Link href="/" className="hover:underline">
          Lead Portal
        </Link>
      </h1>
      <div className="space-x-4">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/leads" className="hover:underline">
          Leads
        </Link>
      </div>
    </nav>
  );
}
