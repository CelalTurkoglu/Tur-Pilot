import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TurPilot — Otobüslü Tur Acenteleri İçin Operasyon Programı",
    short_name: "TurPilot",
    description:
      "Otobüslü tur acenteleri için rezervasyon, koltuk planı, saha ve ön muhasebe yazılımı.",
    start_url: "/",
    display: "standalone",
    background_color: "#F2F4F7",
    theme_color: "#2457D6",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
