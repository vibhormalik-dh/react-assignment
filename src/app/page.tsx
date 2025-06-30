"use client";

import {useLeadStore} from "@/stores/leadStore";
import LeadDetailCard from "../components/LeadDetailCard";
import {useEffect, useState} from "react";
import {LeadFormData} from "@/lib/leadSchema";
import NavBar from "@/components/NavBar";

export default function Home() {
  const {leads, fetchLeads, page, setPage} = useLeadStore();
  const [data, setData] = useState<(LeadFormData & {id: number})[]>([]);

  useEffect(() => {
    fetchLeads();
  }, [page]);

  useEffect(() => {
    if (leads.length > 0) {
      setData(prev => [...prev, ...leads]);
    }
  }, [leads]);
  

  return (
    <div>
      <NavBar />
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Lead Portal</h1>
        <div className="grid grid-cols-3">
          {data && data.length > 0 ? (
            data.map(lead => (
              <div className="p-px" key={lead.id}>
                <LeadDetailCard key={lead.id} {...lead} />
              </div>
            ))
          ) : (
            <p>No leads found.</p>
          )}
        </div>
        <div className="justify-center align-middle flex mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Load More
          </button>
        </div>
      </main>
    </div>
  );
}
