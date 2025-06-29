type LeadProps = {
  name: string;
  company: string;
  status: string;
};

export default function LeadDetailCard({ name, company, status }: LeadProps) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">{company}</p>
      <p className="text-sm text-blue-500">{status}</p>
    </div>
  );
}