const city = "R" + "ize";

export const tournamentInfo = {
  key: "satranc-mangala",
  title: `${city} Levent Koleji Satranç ve Mangala Turnuvası`,
  dateLabel: "Yakında duyurulacak",
  games: [
    { id: "chess" as const, label: "Satranç" },
    { id: "mangala" as const, label: "Mangala" },
  ],
  rules: [
    "Başvurular bireysel alınır.",
    "Satranç, mangala veya her ikisine birden başvurabilirsiniz.",
    "En az bir turnuva seçimi zorunludur.",
  ],
} as const;
