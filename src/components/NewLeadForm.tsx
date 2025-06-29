"use client";

import {useForm} from "react-hook-form";
import {LeadFormData, leadSchema} from "../lib/leadSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useLeadStore} from "@/stores/leadStore";

export default function NewLeadForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: LeadFormData) => {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const created = await response.json();
      useLeadStore.getState().addLead(created);
      setSubmitted(true);
    } else {
      console.error("Submission failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <label className="block">Name</label>
        <input
          {...register("name")}
          className="broder p-2 w-full"
          placeholder="Enter name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block">Email</label>
        <input
          {...register("email")}
          className="broder p-2 w-full"
          placeholder="Enter email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block">Company</label>
        <input
          {...register("company")}
          className="broder p-2 w-full"
          placeholder="Enter company"
        />
        {errors.company && (
          <p className="text-red-500">{errors.company.message}</p>
        )}
      </div>

      <div>
        <label className="block">Status</label>
        <select {...register("status")} className="border p-2 w-full">
          <option value="">Select status</option>
          <option value="Interested">Interested</option>
          <option value="Contacted">Contacted</option>
          <option value="Closed">Closed</option>
        </select>
        {errors.status && (
          <p className="text-red-500">{errors.status.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-primary text-black border-2 px-4 py-2 rounded"
      >
        Submit
      </button>

      {submitted && (
        <p className="text-green-600">Lead submitted (check console).</p>
      )}
    </form>
  );
}
