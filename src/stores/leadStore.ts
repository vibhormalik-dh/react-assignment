import { create } from "zustand";
import { LeadFormData } from "../lib/leadSchema";

type Lead = LeadFormData & { id: number };

type LeadStore = {
  leads: Lead[];
  total: number;
  page: number;
  search: string;
  sort: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setSort: (sort: string) => void;
  fetchLeads: () => Promise<void>;
};

export const useLeadStore = create<LeadStore>((set, get) => ({
  leads: [],
  total: 0,
  page: 1,
  search: "",
  sort: "name",
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search }),
  setSort: (sort) => set({ sort }),
  fetchLeads: async () => {
    const { page, search, sort } = get();
    const res = await fetch(
      `/api/leads?page=${page}&search=${search}&sort=${sort}`
    );
    const { data, total } = await res.json();
    set({ leads: data, total });
  },
}));

