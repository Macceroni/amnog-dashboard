"use client";

import { useState, useMemo } from "react";
import type { FlatRow } from "@/types/amnog";
import AmnogTable from "./AmnogTable";
import Charts from "./Charts";

export default function DashboardShell({ rows }: { rows: FlatRow[] }) {
  const [search, setSearch] = useState("");
  const [selectedGebiete, setSelectedGebiete] = useState<Set<string>>(new Set());
  const [selectedAusmass, setSelectedAusmass] = useState<Set<string>>(new Set());

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

  return (
    <>
      <Charts
        rows={yearFiltered}
        selectedGebiete={selectedGebiete}
        selectedAusmass={selectedAusmass}
        onGebieteChange={setSelectedGebiete}
        onAusmassChange={setSelectedAusmass}
      />
      <AmnogTable
        rows={yearFiltered}
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
      />
    </>
  );
}
