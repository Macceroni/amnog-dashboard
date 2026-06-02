"use client";

import { useState } from "react";
import type { FlatRow } from "@/types/amnog";
import AmnogTable from "./AmnogTable";
import Charts from "./Charts";

export default function DashboardShell({ rows }: { rows: FlatRow[] }) {
  const [search, setSearch] = useState("");
  const [selectedGebiete, setSelectedGebiete] = useState<Set<string>>(new Set());
  const [selectedAusmass, setSelectedAusmass] = useState<Set<string>>(new Set());

  return (
    <>
      <Charts
        rows={rows}
        selectedGebiete={selectedGebiete}
        selectedAusmass={selectedAusmass}
        onGebieteChange={setSelectedGebiete}
        onAusmassChange={setSelectedAusmass}
      />
      <AmnogTable
        rows={rows}
        search={search}
        setSearch={setSearch}
        selectedGebiete={selectedGebiete}
        setSelectedGebiete={setSelectedGebiete}
        selectedAusmass={selectedAusmass}
        setSelectedAusmass={setSelectedAusmass}
      />
    </>
  );
}
