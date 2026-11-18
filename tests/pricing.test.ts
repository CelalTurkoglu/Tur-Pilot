import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "../src/config/siteConfig";
import {
  buildSummaryWhatsappText,
  calculatePackageTotals,
  MODULES,
  type ModuleId,
} from "../src/data/modules";

const SEVEN_ADDONS: ModuleId[] = [
  "room",
  "bulk",
  "stops",
  "pdf",
  "whatsapp",
  "refund",
  "pos",
];

test("Resmi 11 modül ve varsayılan siteConfig bayrakları doğrulanır", () => {
  assert.equal(MODULES.length, 11);
  assert.equal(siteConfig.showTestimonials, true);
  assert.equal(siteConfig.testimonials.length, 3);
  assert.equal(siteConfig.vatRate, 0.2);
  assert.equal(siteConfig.showVatBreakdown, true);
  assert.equal(siteConfig.phoneDisplay, "+90 850 885 3455");
  assert.equal(siteConfig.whatsappNumber, "908508853455");
  assert.equal(siteConfig.email, "info@turpilot.site");
});

test("Resmi fiyatlandırma kombinasyonları eksiksiz tutar", () => {
  assert.equal(calculatePackageTotals(["admin"]).subtotal, 30000);
  assert.equal(
    calculatePackageTotals(["admin", ...SEVEN_ADDONS]).subtotal,
    45000
  );
  assert.equal(calculatePackageTotals(["admin", "public"]).subtotal, 45000);
  assert.equal(
    calculatePackageTotals(["admin", "public", ...SEVEN_ADDONS]).subtotal,
    60000
  );
  assert.equal(
    calculatePackageTotals(["admin", "public", "hotel", "dealer"]).subtotal,
    75000
  );
  const allIds = MODULES.map((m) => m.id);
  const full = calculatePackageTotals(allIds);
  assert.equal(full.subtotal, 90000);
  assert.equal(full.vatAmount, 18000);
  assert.equal(full.grandTotal, 108000);
});

test("Admin Paneli çıkarılamaz (her zaman toplamda dahildir)", () => {
  const onlyPublic = calculatePackageTotals(["public"]);
  assert.equal(onlyPublic.subtotal, 45000);
  assert.ok(onlyPublic.selectedModules.some((m) => m.id === "admin"));
});

test("WhatsApp özet metni seçili modülleri, acente adını ve tutarı içerir", () => {
  const msg = buildSummaryWhatsappText({
    selectedIds: ["admin", "public", "hotel"],
    agencyName: "Anadolu Turizm",
    contactName: "Ahmet Yılmaz",
    phone: "0532 000 00 00",
    email: "ahmet@anadolutur.com",
    callWindow: "Sabah",
  });
  assert.match(msg, /Anadolu Turizm/);
  assert.match(msg, /Admin Paneli/);
  assert.match(msg, /Public Site/);
  assert.match(msg, /B2B Otel Satış/);
  assert.match(msg, /59\.000 ₺/);
});

test("src dosyalarında yer tutucu veya yasaklı ifade bulunmaz", () => {
  const forbidden = [
    "Lorem ipsum",
    "[Detay",
    "[not]",
    "[tutar]",
    "Mehr erfahren",
    "Privacy policy",
    "dükkanlar",
    "e-imza",
  ];

  const srcRoot = path.resolve(process.cwd(), "src");
  const walk = (dir: string): string[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries.flatMap((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    });
  };

  for (const filePath of walk(srcRoot)) {
    const text = fs.readFileSync(filePath, "utf8");
    for (const term of forbidden) {
      assert.equal(
        text.toLowerCase().includes(term.toLowerCase()),
        false,
        `Yasaklı ifade "${term}" bulundu: ${filePath}`
      );
    }
  }
});
