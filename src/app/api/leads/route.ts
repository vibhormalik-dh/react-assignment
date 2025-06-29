import {NextRequest, NextResponse} from "next/server";
import {leadSchema} from "../../../lib/leadSchema";

const mockLeads = Array.from({length: 1000}).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@mail.com`,
  company: `Company ${i % 10}`,
  status: ["Interested", "Contacted", "Closed"][i % 3],
}));

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const sort = searchParams.get("sort") || "name";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  let filtered = mockLeads.filter(
    lead =>
      lead.name.toLowerCase().includes(search) ||
      lead.company.toLowerCase().includes(search)
  );

  filtered = filtered.sort((a, b) => {
    if (sort === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sort === "company") {
      return a.company.localeCompare(b.company);
    }
    if (sort === "status") {
      return a.status.localeCompare(b.status);
    }
    // Default sort by name if sort parameter is invalid
    return a.name.localeCompare(b.name);
  });

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    data: paginated,
    total: filtered.length,
    page,
  });
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
