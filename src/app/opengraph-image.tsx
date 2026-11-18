import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#2457D6",
          padding: "64px 72px",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="46" height="46" viewBox="0 0 36 36" fill="none">
              <rect
                x="8.5"
                y="7.5"
                width="19"
                height="19"
                rx="4.5"
                stroke="#2457D6"
                strokeWidth="2.3"
              />
              <path
                d="M9.5 19H26.5"
                stroke="#2457D6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M18 10.6L22.2 15.8H19.4V18.8H16.6V15.8H13.8L18 10.6Z"
                fill="#2457D6"
              />
              <circle cx="13.2" cy="22.7" r="1.75" fill="#F2A900" />
              <circle cx="22.8" cy="22.7" r="1.75" fill="#F2A900" />
              <path
                d="M12.5 26.5V28.3M23.5 26.5V28.3"
                stroke="#2457D6"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-0.02em" }}>
            TurPilot
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: 920,
            }}
          >
            Otobüsleriniz dolsun, akşam masa başı bitsin.
          </div>
          <div style={{ fontSize: 26, color: "#E6EEFF", maxWidth: 880 }}>
            Otobüslü tur acenteleri için %100 bulut rezervasyon, 2+1/2+2 koltuk
            planı, kapora ve saha ön muhasebe yazılımı.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              background: "#F2A900",
              color: "#15304C",
              fontSize: 22,
              fontWeight: 800,
              padding: "14px 28px",
              borderRadius: 12,
            }}
          >
            turpilot.site · Sistemini Oluştur
          </div>
          <div style={{ fontSize: 22, color: "#D5E2FF" }}>
            +90 850 885 3455
          </div>
        </div>
      </div>
    ),
    size
  );
}
