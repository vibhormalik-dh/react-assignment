import Navbar from "../../../components/NavBar";
import NewLeadForm from "../../../components/NewLeadForm";

export default function NewLeadPage() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Lead</h2>
        <NewLeadForm />
      </main>
    </>
  );
}