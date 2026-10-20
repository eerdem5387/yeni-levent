const city = "R" + "ize";

export const competitionInfo = {
  key: "lise-bilgi-yarismasi",
  title: `${city} Levent Koleji Lise Bilgi Yarışması`,
  teamSize: 3,
  prizes: [
    { place: "1.", label: "Sürpriz ödül" },
    { place: "2.", label: "Kitap seti" },
  ],
  rules: [
    "Takım halinde yarışılacak.",
    "Her takım 3 kişiden oluşacak.",
  ],
  subjects: [
    "Tarih",
    "Edebiyat",
    "Coğrafya",
    "Genel Kültür",
    "Müzik",
    "Sayısal Mantık",
    "Güncel Bilgiler",
  ],
} as const;
