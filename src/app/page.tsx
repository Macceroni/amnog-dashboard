import { loadAmnogData } from "@/lib/amnog";
import type { FlatRow } from "@/types/amnog";
import AmnogTable from "./components/AmnogTable";

export default function Home() {
  const data = loadAmnogData();

  const rows: FlatRow[] = data.verfahren.flatMap((v) =>
    v.patientengruppen.map((p) => ({
      pat_gr_id: p.pat_gr_id,
      handelsname: v.handelsname,
      wirkstoff_inn: p.wirkstoff_inn,
      therapiegebiet: v.therapiegebiet,
      zn_ausmass: p.zn_ausmass,
      zn_wahrscheinlichkeit: p.zn_wahrscheinlichkeit,
      datum_beschluss: p.datum_beschluss,
    }))
  );

  return (
    <main className="min-h-screen bg-white px-8 py-10 font-sans">
      <h1 className="text-2xl font-semibold text-zinc-900 mb-1">
        AMNOG Dashboard
      </h1>
      <p className="text-zinc-500 text-sm mb-8">
        Datenstand: {data.generated_at.slice(0, 10)} · Quelle: {data.source}
      </p>
      <AmnogTable rows={rows} />
    </main>
  );
}
