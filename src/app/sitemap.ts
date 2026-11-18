import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/ozellikler",
    "/sistemini-olustur",
    "/gizlilik",
    "/kvkk",
    "/kullanim-sartlari",
    "/cerez-politikasi",
  ];

  const lastModified = new Date("2026-11-18T00:00:00.000Z");

  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" || route === "/ozellikler" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/ozellikler" || route === "/sistemini-olustur" ? 0.9 : 0.4,
  }));
}
