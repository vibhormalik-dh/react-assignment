import { create } from "zustand";
import { LeadFormData } from "../lib/leadSchema";

type Lead = LeadFormData & { id: number };

type LeadStore = {
    leads: Lead[];
    addLead: (lead: LeadFormData) => void;
    fetchLeads: () => Promise<void>;
}

export const useLeadStore = create<LeadStore>((set) => ({
    leads: [],
    addLead: (lead) => set((state) => ({
        leads: [...state.leads, { ...lead, id: Date.now() }],
    })),
    fetchLeads: async () => {
        const res = await fetch("/api/leads");
        const data = await res.json();
        set({ leads: data });
    },
}));
