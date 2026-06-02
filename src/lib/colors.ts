// Tailwind-Klassen für Badges (DetailPanel, Tabellenzellen)
export const AUSMASS_BADGE: Record<string, string> = {
  "Erheblich":                "bg-green-100 text-green-800",
  "Beträchtlich":             "bg-emerald-100 text-emerald-800",
  "Gering":                   "bg-yellow-100 text-yellow-800",
  "Geringerer Nutzen":        "bg-orange-100 text-orange-800",
  "Gilt als belegt (Orphan)": "bg-purple-100 text-purple-800",
  "Kein Zusatznutzen belegt": "bg-red-100 text-red-700",
  "Nicht quantifizierbar":    "bg-zinc-100 text-zinc-700",
};

// Hex-Farben für Chart-Balken (satter als die Badge-Variante)
export const AUSMASS_BAR: Record<string, string> = {
  "Erheblich":                "#4ade80",
  "Beträchtlich":             "#34d399",
  "Gering":                   "#facc15",
  "Geringerer Nutzen":        "#fb923c",
  "Gilt als belegt (Orphan)": "#c084fc",
  "Kein Zusatznutzen belegt": "#f87171",
  "Nicht quantifizierbar":    "#a1a1aa",
  "—":                        "#d4d4d8",
};

// Kanonische Reihenfolge für Charts und Legenden
export const AUSMASS_ORDER = [
  "Erheblich",
  "Beträchtlich",
  "Gering",
  "Nicht quantifizierbar",
  "Gilt als belegt (Orphan)",
  "Geringerer Nutzen",
  "Kein Zusatznutzen belegt",
];
