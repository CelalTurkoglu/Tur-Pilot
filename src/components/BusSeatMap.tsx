"use client";

import React, { useState } from "react";

type SeatStatus = "free" | "male" | "female";
type BusLayout = "2+2" | "2+1";

interface SeatInfo {
  num: number;
  status: SeatStatus;
  passenger?: string;
  stop?: string;
}

const SEAT_DATA: Record<number, Omit<SeatInfo, "num">> = {
  1: { status: "female", passenger: "Ayşe Yılmaz", stop: "Kadıköy" },
  2: { status: "male", passenger: "Kemal Yılmaz", stop: "Kadıköy" },
  3: { status: "male", passenger: "Mehmet Demir", stop: "Mecidiyeköy" },
  4: { status: "female", passenger: "Selin Demir", stop: "Mecidiyeköy" },
  5: { status: "male", passenger: "Can Kaya", stop: "Gebze" },
  6: { status: "free" },
  7: { status: "female", passenger: "Zeynep Ak", stop: "Kadıköy" },
  8: { status: "female", passenger: "Elif Ak", stop: "Kadıköy" },
  9: { status: "free" },
  10: { status: "free" },
  11: { status: "female", passenger: "Fatma Şahin", stop: "İzmit" },
  12: { status: "free" },
  13: { status: "male", passenger: "Burak Öz", stop: "Kadıköy" },
  14: { status: "male", passenger: "Emre Öz", stop: "Kadıköy" },
  17: { status: "male", passenger: "Ali Vural", stop: "İncirli" },
  18: { status: "female", passenger: "Ece Vural", stop: "İncirli" },
  21: { status: "male", passenger: "Mert Kılıç", stop: "Gebze" },
  22: { status: "female", passenger: "İrem Kılıç", stop: "Gebze" },
  25: { status: "free" },
  29: { status: "male", passenger: "Hasan Güneş", stop: "İzmit" },
  30: { status: "male", passenger: "Ayhan Güneş", stop: "İzmit" },
};

// Obilet 2+2 yatay otobüs yerleşimi (12 sütun; orta kapı boşluğu 6. sütun üst sırada)
const COLS_2_2: Array<{
  top?: [number, number];
  bottom: [number, number];
}> = [
  { top: [4, 3], bottom: [2, 1] },
  { top: [8, 7], bottom: [6, 5] },
  { top: [12, 11], bottom: [10, 9] },
  { top: [16, 15], bottom: [14, 13] },
  { top: [20, 19], bottom: [18, 17] },
  { top: undefined, bottom: [22, 21] }, // Orta kapı boşluğu
  { top: [24, 23], bottom: [26, 25] },
  { top: [28, 27], bottom: [30, 29] },
  { top: [32, 31], bottom: [34, 33] },
  { top: [36, 35], bottom: [38, 37] },
  { top: [40, 39], bottom: [42, 41] },
  { top: [44, 43], bottom: [46, 45] },
];

// 2+1 yatay otobüs yerleşimi (üstte tekli, altta 2'li, orta kapı 6. sütun üstte)
const COLS_2_1: Array<{
  top?: number;
  bottom: [number, number];
}> = [
  { top: 3, bottom: [2, 1] },
  { top: 6, bottom: [5, 4] },
  { top: 9, bottom: [8, 7] },
  { top: 12, bottom: [11, 10] },
  { top: 15, bottom: [14, 13] },
  { top: undefined, bottom: [17, 16] }, // Orta kapı boşluğu
  { top: 18, bottom: [20, 19] },
  { top: 21, bottom: [23, 22] },
  { top: 24, bottom: [26, 25] },
  { top: 27, bottom: [29, 28] },
  { top: 30, bottom: [32, 31] },
  { top: 33, bottom: [35, 34] },
];

function BusSeatButton({
  num,
  status,
  selected,
  onSelect,
}: {
  num: number;
  status: SeatStatus;
  selected: boolean;
  onSelect: (num: number) => void;
}) {
  // Kolçaklı ve sağdan sırtlıklı koltuk tasarımı
  let fillClass =
    "bg-white border-[#CFD6E0] text-[#34465A] hover:border-[#2457D6]";
  let backStripe = "bg-[#E2E7EE]";

  if (selected) {
    fillClass =
      "bg-[#2457D6] border-[#15304C] text-white ring-2 ring-[#F2A900]";
    backStripe = "bg-[#1A43A8]";
  } else if (status === "male") {
    fillClass = "bg-[#DBEAFE] border-[#3B82F6] text-[#1E3A8A]";
    backStripe = "bg-[#93C5FD]";
  } else if (status === "female") {
    fillClass = "bg-[#FCE7F3] border-[#EC4899] text-[#831843]";
    backStripe = "bg-[#F9A8D4]";
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(num)}
      aria-label={`Koltuk ${num}`}
      aria-pressed={selected}
      className={`relative w-[29px] h-[25px] rounded-l-[6px] rounded-r-[8px] border text-[11px] font-bold flex items-center justify-center pr-1 cursor-pointer transition-colors tabular-nums ${fillClass}`}
    >
      {/* Üst ve alt kolçak çizgileri */}
      <span
        aria-hidden="true"
        className="absolute -top-[1px] left-1 right-2 h-[2px] rounded-full bg-current opacity-20"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-[1px] left-1 right-2 h-[2px] rounded-full bg-current opacity-20"
      />
      {/* Sağ sırtlık minderi */}
      <span
        aria-hidden="true"
        className={`absolute right-[1.5px] top-[2px] bottom-[2px] w-[4px] rounded-r-[5px] ${backStripe}`}
      />
      <span className="relative z-10 leading-none">{num}</span>
    </button>
  );
}

export function BusSeatMap() {
  const [layout, setLayout] = useState<BusLayout>("2+2");
  const [selectedSeat, setSelectedSeat] = useState<number>(6);

  const seatInfo = SEAT_DATA[selectedSeat] ?? { status: "free" as SeatStatus };

  const statusText =
    seatInfo.status === "male"
      ? `Dolu (Erkek) · ${seatInfo.passenger} (${seatInfo.stop})`
      : seatInfo.status === "female"
      ? `Dolu (Kadın) · ${seatInfo.passenger} (${seatInfo.stop})`
      : "Boş koltuk · Seçime ve anlık rezervasyona hazır";

  return (
    <div className="bg-white border border-[#DDE2E9] rounded-[14px] p-3.5 sm:p-4 text-[#15304C]">
      {/* Üst Bar: Başlık + 2+2 / 2+1 Seçici */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E8ECF2]">
        <div>
          <div className="text-[13px] font-bold text-[#15304C]">
            Canlı Otobüs Koltuk Planı · 1. Araç
          </div>
          <div className="text-[11px] text-[#5A6472]">
            Çifte satış kilidi ve yan yana oturma kuralı aktif
          </div>
        </div>

        <div
          role="group"
          aria-label="Otobüs düzeni"
          className="inline-flex rounded-[8px] bg-[#F2F4F7] p-0.5 border border-[#DDE2E9] text-[11px] font-semibold"
        >
          <button
            type="button"
            onClick={() => setLayout("2+2")}
            className={`px-2.5 py-1 rounded-[6px] cursor-pointer transition-colors ${
              layout === "2+2"
                ? "bg-white text-[#2457D6] shadow-xs"
                : "text-[#5A6472] hover:text-[#15304C]"
            }`}
          >
            2+2 (46)
          </button>
          <button
            type="button"
            onClick={() => setLayout("2+1")}
            className={`px-2.5 py-1 rounded-[6px] cursor-pointer transition-colors ${
              layout === "2+1"
                ? "bg-white text-[#2457D6] shadow-xs"
                : "text-[#5A6472] hover:text-[#15304C]"
            }`}
          >
            2+1 (35)
          </button>
        </div>
      </div>

      {/* Yatay Otobüs Gövdesi */}
      <div className="mt-3 overflow-x-auto pb-1">
        <div className="min-w-[468px] bg-[#F7F8FA] border-[1.5px] border-[#D3DAE4] rounded-l-[28px] rounded-r-[14px] px-3 py-3 flex items-stretch gap-3 relative">
          {/* Ön Kısım: Ön Cam + Direksiyon */}
          <div className="w-[38px] shrink-0 flex flex-col justify-between items-center border-r border-dashed border-[#D3DAE4] pr-2.5 py-1">
            <div className="text-[9px] font-bold uppercase tracking-wider text-[#8C96A5]">
              Ön
            </div>
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9AA4B2"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="2.2" />
              <path d="M3.6 10.5h6.2M14.2 10.5h6.2M12 14.2V21" />
            </svg>
          </div>

          {/* Koltuk Sıraları */}
          <div className="flex-1 flex flex-col justify-between gap-4">
            {/* Üst Sıra */}
            <div className="grid grid-cols-12 gap-1.5">
              {layout === "2+2"
                ? COLS_2_2.map((col, idx) => (
                    <div
                      key={`t22-${idx}`}
                      className="flex flex-col gap-1.5 items-center justify-end"
                    >
                      {col.top ? (
                        <>
                          <BusSeatButton
                            num={col.top[0]}
                            status={SEAT_DATA[col.top[0]]?.status ?? "free"}
                            selected={selectedSeat === col.top[0]}
                            onSelect={setSelectedSeat}
                          />
                          <BusSeatButton
                            num={col.top[1]}
                            status={SEAT_DATA[col.top[1]]?.status ?? "free"}
                            selected={selectedSeat === col.top[1]}
                            onSelect={setSelectedSeat}
                          />
                        </>
                      ) : (
                        <div className="h-[56px] flex items-center justify-center text-[9px] font-semibold text-[#8C96A5] tracking-tight">
                          Kapı
                        </div>
                      )}
                    </div>
                  ))
                : COLS_2_1.map((col, idx) => (
                    <div
                      key={`t21-${idx}`}
                      className="flex flex-col items-center justify-start"
                    >
                      {col.top ? (
                        <BusSeatButton
                          num={col.top}
                          status={SEAT_DATA[col.top]?.status ?? "free"}
                          selected={selectedSeat === col.top}
                          onSelect={setSelectedSeat}
                        />
                      ) : (
                        <div className="h-[25px] flex items-center justify-center text-[9px] font-semibold text-[#8C96A5]">
                          Kapı
                        </div>
                      )}
                    </div>
                  ))}
            </div>

            {/* Koridor */}
            <div className="grid grid-cols-12 gap-1.5">
              {(layout === "2+2" ? COLS_2_2 : COLS_2_1).map((col, idx) => (
                <div
                  key={`b-${idx}`}
                  className="flex flex-col gap-1.5 items-center"
                >
                  <BusSeatButton
                    num={col.bottom[0]}
                    status={SEAT_DATA[col.bottom[0]]?.status ?? "free"}
                    selected={selectedSeat === col.bottom[0]}
                    onSelect={setSelectedSeat}
                  />
                  <BusSeatButton
                    num={col.bottom[1]}
                    status={SEAT_DATA[col.bottom[1]]?.status ?? "free"}
                    selected={selectedSeat === col.bottom[1]}
                    onSelect={setSelectedSeat}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alt Bilgi: Seçili Koltuk + Durum Göstergesi */}
      <div className="mt-3 pt-2.5 border-t border-[#E8ECF2] flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="font-medium text-[#34465A]">
          <strong className="text-[#15304C]">Koltuk {selectedSeat}:</strong>{" "}
          {statusText}
        </div>
        <div className="flex items-center gap-3 text-[#5A6472]">
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-white border border-[#CFD6E0]" />
            Boş
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-[#DBEAFE] border border-[#3B82F6]" />
            Erkek
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-[#FCE7F3] border border-[#EC4899]" />
            Kadın
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-[#2457D6] ring-1 ring-[#F2A900]" />
            Seçili
          </span>
        </div>
      </div>
    </div>
  );
}
