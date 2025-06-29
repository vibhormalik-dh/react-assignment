import {NextRequest, NextResponse} from "next/server";
import {leadSchema} from "../../../lib/leadSchema";

const mockLeads = [
  {id: 1, name: "Alice", company: "Acme Inc.", status: "Interested"},
  {id: 2, name: "Bob", company: "Beta LLC", status: "Contacted"},
  {id: 3, name: "Charlie", company: "Gamma Ltd.", status: "Closed"},
];

export async function GET() {
  return NextResponse.json(mockLeads);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = leadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({error: result.error.format()}, {status: 400});
  }
  const newLead = {id: Date.now(), ...body};
  mockLeads.push(newLead);
  return NextResponse.json(newLead, {status: 201});
}
