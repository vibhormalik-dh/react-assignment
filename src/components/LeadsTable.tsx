'use client';

import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useLeadStore } from "@/stores/leadStore";
import _ from 'lodash'; // Optional

const columns: ColumnDef<unknown>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: (info) => info.getValue(),
  },
  {
    header: "Company",
    accessorKey: "company",
    cell: (info) => info.getValue(),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info) => info.getValue(),
  },
];

export default function LeadsTable() {
  const {
    leads,
    fetchLeads,
    page,
    total,
    setPage,
    setSearch,
    setSort,
  } = useLeadStore();

  const [input, setInput] = useState("");

  const debouncedSearch = _.debounce((value: string) => {
    setSearch(value);
    setPage(1);
    fetchLeads();
  }, 300);

  useEffect(() => {
    fetchLeads();
  }, [page]);

  const table = useReactTable({
    data: leads,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <input
        placeholder="Search leads..."
        className="border p-2 w-full"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          debouncedSearch(e.target.value);
        }}
      />

      <table className="w-full border">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 cursor-pointer"
                  onClick={() => { 
                    const column = header.column.id;
                    setSort(column);
                    fetchLeads();
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 border rounded"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} / {Math.ceil(total / 10)}
        </span>
        <button
          className="px-4 py-2 border rounded"
          onClick={() => setPage(page + 1)}
          disabled={page * 10 >= total}
        >
          Next
        </button>
      </div>
    </div>
  );
}