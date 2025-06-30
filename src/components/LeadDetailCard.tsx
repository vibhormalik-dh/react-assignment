import {memo} from "react";

type LeadProps = {
  name: string;
  company: string;
  status: string;
};

function LeadDetailCardComponent({ name, company, status }: LeadProps) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">{company}</p>
      <p className="text-sm text-blue-500">{status}</p>
    </div>
  );
}
const LeadDetailCard = memo(LeadDetailCardComponent);

export default LeadDetailCard;