"use client";

import NavBar from "@/components/NavBar";

export default function Dashboard() {
  // ... Need to implement
  return (
    <div>
      <NavBar />
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <div className="grid grid-cols-3">
          <p>Dashboard content goes here.</p>
        </div>
      </main>
    </div>
  );

}