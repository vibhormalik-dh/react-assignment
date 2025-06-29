import LeadDetailCard from "../components/LeadDetailCard";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Lead Portal</h1>
      <LeadDetailCard name="John Doe" company="Acme Inc." status="Interested" />
    </main>
  );
}