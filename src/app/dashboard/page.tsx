import NavBar from "../../components/NavBar";

export default function DashboardPage() {
  return (
    <div>
      <NavBar />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to the dashboard!</p>
      </main>
    </div>
  );
}