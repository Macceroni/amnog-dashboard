"use client";

import { useState, useMemo } from "react";
import type { FlatRow } from "@/types/amnog";

type SortKey = keyof FlatRow;
type SortDir = "asc" | "desc";

function display(value: string | null): string {
  if (value === null) return "—";
  return value;
}

function formatDate(iso: string | null): string {
  if (iso === null) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function compareValues(a: string | null, b: string | null, dir: SortDir, isDate = false): number {
  // Nulls always last
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;

  let result: number;
  if (isDate) {
    result = new Date(a).getTime() - new Date(b).getTime();
  } else {
    result = a.localeCompare(b, "de");
  }
  return dir === "asc" ? result : -result;
}

const COLUMNS: { key: SortKey; label: string; isDate?: boolean }[] = [
  { key: "handelsname", label: "Handelsname" },
  { key: "wirkstoff_inn", label: "Wirkstoff" },
  { key: "therapiegebiet", label: "Therapiegebiet" },
  { key: "zn_ausmass", label: "Ausmaß" },
  { key: "zn_wahrscheinlichkeit", label: "Wahrscheinlichkeit" },
  { key: "datum_beschluss", label: "Beschlussdatum", isDate: true },
];

export default function AmnogTable({ rows }: { rows: FlatRow[] }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("datum_beschluss");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(
      (r) =>
        r.handelsname?.toLowerCase().includes(term) ||
        r.wirkstoff_inn?.toLowerCase().includes(term)
    );
  }, [rows, search]);

  const sorted = useMemo(() => {
    const col = COLUMNS.find((c) => c.key === sortKey);
    return [...filtered].sort((a, b) =>
      compareValues(a[sortKey], b[sortKey], sortDir, col?.isDate)
    );
  }, [filtered, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function sortIndicator(key: SortKey) {
    if (key !== sortKey) return <span className="text-zinc-300 ml-1">↕</span>;
    return <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>;
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="search"
          placeholder="Handelsname oder Wirkstoff suchen…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-zinc-200 rounded-lg px-3 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-zinc-300"
        />
        <span className="text-sm text-zinc-500">
          {sorted.length.toLocaleString("de-DE")} von {rows.length.toLocaleString("de-DE")} Patientengruppen
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="text-left px-4 py-3 font-medium text-zinc-600 cursor-pointer select-none whitespace-nowrap hover:text-zinc-900"
                >
                  {col.label}
                  {sortIndicator(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr
                key={row.pat_gr_id}
                className="border-b border-zinc-100 hover:bg-zinc-50"
              >
                <td className="px-4 py-2 font-medium text-zinc-900">{display(row.handelsname)}</td>
                <td className="px-4 py-2 text-zinc-700">{display(row.wirkstoff_inn)}</td>
                <td className="px-4 py-2 text-zinc-700">{display(row.therapiegebiet)}</td>
                <td className="px-4 py-2 text-zinc-700">{display(row.zn_ausmass)}</td>
                <td className="px-4 py-2 text-zinc-700">{display(row.zn_wahrscheinlichkeit)}</td>
                <td className="px-4 py-2 text-zinc-500 tabular-nums">{formatDate(row.datum_beschluss)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
