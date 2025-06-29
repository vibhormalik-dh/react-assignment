import LeadsTable from "../../components/LeadsTable";
import NavBar from "../../components/NavBar";

export default function LeadsPage() {
  return (
    <div>
      <NavBar />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Leads</h1>
        <LeadsTable />
      </main>
    </div>
  );
}