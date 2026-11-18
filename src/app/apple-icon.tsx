import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2457D6",
          borderRadius: 42,
        }}
      >
        <svg width="144" height="144" viewBox="0 0 36 36" fill="none">
          <rect
            x="8.5"
            y="7.5"
            width="19"
            height="19"
            rx="4.5"
            stroke="#FFFFFF"
            strokeWidth="2.3"
          />
          <path
            d="M9.5 19H26.5"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18 10.6L22.2 15.8H19.4V18.8H16.6V15.8H13.8L18 10.6Z"
            fill="#FFFFFF"
          />
          <circle cx="13.2" cy="22.7" r="1.75" fill="#F2A900" />
          <circle cx="22.8" cy="22.7" r="1.75" fill="#F2A900" />
          <path
            d="M12.5 26.5V28.3M23.5 26.5V28.3"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size
  );
}
