const city = "R" + "ize";

export const competitionInfo = {
  key: "lise-bilgi-yarismasi",
  title: `${city} Levent Koleji Lise Bilgi Yarışması`,
  dateLabel: "1 Aralık 2026",
  prizes: [
    { place: "1.", label: "Sürpriz ödül" },
    { place: "2.", label: "Kitap seti" },
  ],
  rules: [
    "Başvurular bireysel alınır.",
    "Takımlar okul tarafından oluşturulacaktır.",
    "Her takım 3 kişiden oluşacaktır.",
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
