"use client";

import { useState, useMemo } from "react";
import type { FlatRow } from "@/types/amnog";
import AmnogTable from "./AmnogTable";
import Charts from "./Charts";

export default function DashboardShell({ rows }: { rows: FlatRow[] }) {
  const [search, setSearch] = useState("");
  const [selectedGebiete, setSelectedGebiete] = useState<Set<string>>(new Set());
  const [selectedAusmass, setSelectedAusmass] = useState<Set<string>>(new Set());
  const [orphanFilter, setOrphanFilter] = useState<"all" | "only" | "without">("all");

  const { minYear, maxYear } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const r of rows) {
      if (!r.datum_beschluss) continue;
      const y = parseInt(r.datum_beschluss.slice(0, 4), 10);
      if (y < min) min = y;
      if (y > max) max = y;
    }
    return {
      minYear: isFinite(min) ? min : 2011,
      maxYear: isFinite(max) ? max : new Date().getFullYear(),
    };
  }, [rows]);

  const [yearRange, setYearRange] = useState<[number, number]>(() => [minYear, maxYear]);

  const yearFiltered = useMemo(() => {
    const [from, to] = yearRange;
    const isFullRange = from === minYear && to === maxYear;
    return rows.filter((r) => {
      if (!r.datum_beschluss) return isFullRange;
      const y = parseInt(r.datum_beschluss.slice(0, 4), 10);
      return y >= from && y <= to;
    });
  }, [rows, yearRange, minYear, maxYear]);

  const filtered = useMemo(() => {
    if (orphanFilter === "only") return yearFiltered.filter((r) => r.orphan_drug === true);
    if (orphanFilter === "without") return yearFiltered.filter((r) => r.orphan_drug === false);
    return yearFiltered;
  }, [yearFiltered, orphanFilter]);

  return (
    <>
      <Charts
        rows={filtered}
        selectedGebiete={selectedGebiete}
        selectedAusmass={selectedAusmass}
        onGebieteChange={setSelectedGebiete}
        onAusmassChange={setSelectedAusmass}
      />
      <AmnogTable
        rows={filtered}
        search={search}
        setSearch={setSearch}
        selectedGebiete={selectedGebiete}
        setSelectedGebiete={setSelectedGebiete}
        selectedAusmass={selectedAusmass}
        setSelectedAusmass={setSelectedAusmass}
        yearRange={yearRange}
        setYearRange={setYearRange}
        minYear={minYear}
        maxYear={maxYear}
        orphanFilter={orphanFilter}
        setOrphanFilter={setOrphanFilter}
      />
    </>
  );
}
