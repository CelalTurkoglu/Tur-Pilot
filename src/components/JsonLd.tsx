import React from "react";
import { siteConfig } from "@/config/siteConfig";

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phoneDisplay,
    sameAs: [siteConfig.instagramUrl],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TurPilot",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "tr",
    url: siteConfig.siteUrl,
    description:
      "Otobüslü kültür, günübirlik ve konaklamalı tur düzenleyen seyahat acenteleri için %100 bulut rezervasyon, 2+1/2+2 koltuk planı, saha ve ön muhasebe yazılımı.",
    offers: {
      "@type": "Offer",
      price: "30000",
      priceCurrency: "TRY",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "30000",
        priceCurrency: "TRY",
        unitText: "YEAR",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
    </>
  );
}
