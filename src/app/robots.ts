import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/tesekkurler", "/api/"],
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
