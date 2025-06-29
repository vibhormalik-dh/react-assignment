import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  company: z.string().min(1, "Company is required"),
  status: z.enum(["Interested", "Contacted", "Closed"]),
});

export type LeadFormData = z.infer<typeof leadSchema>;