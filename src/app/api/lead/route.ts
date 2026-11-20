import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/config/siteConfig";

function cleanEnv(val?: string): string {
  if (!val) return "";
  return val.trim().replace(/^["']+|["']+$/g, "").trim();
}

function findGoogleScriptUrl(): string {
  const direct = cleanEnv(
    process.env.GOOGLE_SCRIPT_MAIL_URL ||
      process.env.GOOGLE_SCRIPT_URL ||
      process.env.APPS_SCRIPT_URL
  );
  if (direct) return direct;
  for (const [, v] of Object.entries(process.env)) {
    const cleaned = cleanEnv(v);
    if (cleaned.includes("script.google.com/macros/s/")) {
      return cleaned;
    }
  }
  return siteConfig.googleScriptMailUrl;
}
import {
  calculatePackageTotals,
  CONFIG_STEPS,
  formatTry,
  MIGRATION_SLA_TEXT,
  MIGRATION_TIMELINE,
  type ModuleId,
} from "@/data/modules";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizePhoneForWa(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("90")) return digits;
  if (digits.startsWith("0")) return `9${digits}`;
  if (digits.length === 10) return `90${digits}`;
  return digits;
}

function buildEmails(params: {
  referenceId: string;
  isSummary: boolean;
  contactName: string;
  agencyName: string;
  phone: string;
  email: string;
  source: string;
  selectedIds: ModuleId[];
}) {
  const totals = calculatePackageTotals(params.selectedIds, siteConfig.vatRate);
  const waDigits = normalizePhoneForWa(params.phone);
  const waHref = waDigits ? `https://wa.me/${waDigits}` : "";
  const createdDate = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const vatPct = Math.round(siteConfig.vatRate * 100);
  const turpilotWaHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Merhaba TurPilot ekibi, ${params.referenceId} numaralı (${params.agencyName}) talebim hakkında yazıyorum.`
  )}`;

  const emailStyles = `
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light only" />
<style>
  html, body { margin:0 !important; padding:0 !important; width:100% !important; background:#F2F4F7; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }
  img { border:0; outline:none; text-decoration:none; }
  a { color:#2457D6; }
  @media only screen and (max-width: 520px) {
    .tp-outer { padding:10px 8px !important; }
    .tp-shell { border-radius:12px !important; }
    .tp-head { padding:14px 16px !important; }
    .tp-pad { padding:18px 14px !important; }
    .tp-h1 { font-size:20px !important; line-height:1.25 !important; }
    .tp-total-val { font-size:19px !important; }
    .tp-btn { display:block !important; width:100% !important; box-sizing:border-box !important; text-align:center !important; margin:0 0 8px 0 !important; }
  }
</style>`;

  const wrapHtml = (inner: string, preheader: string) => `<!DOCTYPE html>
<html lang="tr" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
${emailStyles}
</head>
<body style="margin:0;padding:0;width:100%;background:#F2F4F7;font-family:Arial,Helvetica,sans-serif;color:#15304C;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;font-size:1px;line-height:1px;">${escapeHtml(
    preheader
  )}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#F2F4F7;">
  <tr>
    <td align="center" class="tp-outer" style="padding:20px 12px;">
      <!--[if mso]>
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td>
      <![endif]-->
      <div style="width:100%;max-width:600px;margin:0 auto;">
        <table role="presentation" class="tp-shell" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#FFFFFF;border:1px solid #DDE2E9;border-radius:14px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#15304C;text-align:left;">
          ${inner}
        </table>
      </div>
      <!--[if mso]>
      </td></tr></table>
      <![endif]-->
    </td>
  </tr>
</table>
</body>
</html>`;

  const brandHeaderHtml = `
          <tr>
            <td class="tp-head" style="background:#15304C;padding:18px 22px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                <tr>
                  <td align="left" valign="middle">
                    <span style="display:inline-block;background:#2457D6;color:#FFFFFF;font-weight:800;font-size:17px;line-height:1;padding:8px 12px;border-radius:8px;letter-spacing:-0.01em;">TurPilot</span>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display:inline-block;background:#F2A900;color:#15304C;font-weight:700;font-size:11px;line-height:1;padding:6px 10px;border-radius:999px;white-space:nowrap;">Ref: ${escapeHtml(
                      params.referenceId
                    )}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;

  // Tek sütunlu akışkan bilgi satırları — her ekran genişliğinde taşma yapmaz
  const infoRow = (label: string, valueHtml: string, last = false) => `
                <tr>
                  <td style="padding:10px 14px;${
                    last ? "" : "border-bottom:1px solid #E8ECF2;"
                  }">
                    <div style="font-size:11px;font-weight:700;color:#5A6472;text-transform:uppercase;letter-spacing:0.03em;">${label}</div>
                    <div style="font-size:14px;font-weight:700;color:#15304C;margin-top:2px;line-height:1.35;word-break:break-word;overflow-wrap:anywhere;">${valueHtml}</div>
                  </td>
                </tr>`;

  // Her modül tek dış hücre içinde, sol ad (sarar) + sağ fiyat (tek satır) — mobilde sıfır taşma ve temiz tek ayırıcı çizgi
  const moduleRowsHtml = totals.selectedModules
    .map(
      (m) => `
                <tr>
                  <td style="padding:11px 14px;border-bottom:1px solid #E8ECF2;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                      <tr>
                        <td align="left" valign="top" style="padding-right:10px;">
                          <div style="font-size:10px;font-weight:700;color:#2457D6;text-transform:uppercase;letter-spacing:0.04em;line-height:1.2;">${escapeHtml(
                            CONFIG_STEPS[m.step].label
                          )}</div>
                          <div style="font-size:13px;font-weight:700;color:#15304C;margin-top:3px;line-height:1.35;word-break:break-word;">${escapeHtml(
                            m.name
                          )}</div>
                        </td>
                        <td align="right" valign="top" style="white-space:nowrap;width:1%;padding-top:12px;">
                          <span style="font-size:13px;font-weight:700;color:#15304C;">${escapeHtml(
                            formatTry(m.price)
                          )}</span><span style="font-size:11px;font-weight:400;color:#5A6472;"> / yıl</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`
    )
    .join("");

  const modulesTableHtml = `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:1px solid #DDE2E9;border-radius:10px;overflow:hidden;background:#FFFFFF;">
              ${moduleRowsHtml}
              <tr>
                <td style="padding:11px 14px;background:#F8FAFC;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                    <tr>
                      <td align="left" valign="middle" style="padding-right:10px;font-size:13px;font-weight:700;color:#34465A;">Kurulum ve Excel veri aktarımı</td>
                      <td align="right" valign="middle" style="white-space:nowrap;width:1%;font-size:13px;font-weight:700;color:#1E7A46;">Dahil (Ücretsiz)</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>`;

  const financialCardHtml = `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-top:14px;background:#15304C;border-radius:12px;">
              <tr>
                <td style="padding:16px 16px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;font-size:13px;">
                    <tr>
                      <td align="left" style="padding:3px 8px 3px 0;color:#C3CEDC;">Modül sayısı</td>
                      <td align="right" style="padding:3px 0;font-weight:700;color:#FFFFFF;white-space:nowrap;">${totals.count} modül</td>
                    </tr>
                    <tr>
                      <td align="left" style="padding:3px 8px 3px 0;color:#C3CEDC;">Ara toplam (KDV hariç)</td>
                      <td align="right" style="padding:3px 0;font-weight:700;color:#FFFFFF;white-space:nowrap;">${escapeHtml(
                        formatTry(totals.subtotal)
                      )} / yıl</td>
                    </tr>
                    <tr>
                      <td align="left" style="padding:3px 8px 10px 0;color:#C3CEDC;">KDV (%${vatPct})</td>
                      <td align="right" style="padding:3px 0 10px 0;color:#C3CEDC;white-space:nowrap;">${escapeHtml(
                        formatTry(totals.vatAmount)
                      )}</td>
                    </tr>
                    <tr>
                      <td align="left" valign="middle" style="padding:10px 8px 0 0;border-top:1px dashed #4B6482;font-size:14px;font-weight:700;color:#FFFFFF;">Yıllık toplam</td>
                      <td align="right" valign="middle" class="tp-total-val" style="padding:10px 0 0 0;border-top:1px dashed #4B6482;font-size:22px;font-weight:800;color:#F2A900;white-space:nowrap;">${escapeHtml(
                        formatTry(totals.grandTotal)
                      )}</td>
                    </tr>
                    <tr>
                      <td colspan="2" align="right" style="padding-top:6px;font-size:11px;color:#C3CEDC;line-height:1.4;">
                        Kredi kartınızla, bankanız üzerinden taksitle ödeyebilirsiniz.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>`;

  const timelineHtml = MIGRATION_TIMELINE.map(
    (t, idx) => `
              <tr>
                <td width="18" valign="top" style="padding:5px 0 ${
                  idx === MIGRATION_TIMELINE.length - 1 ? "0" : "10px"
                } 0;">
                  <div style="width:10px;height:10px;border-radius:50%;background:#2457D6;"></div>
                </td>
                <td valign="top" style="padding:0 0 ${
                  idx === MIGRATION_TIMELINE.length - 1 ? "0" : "10px"
                } 6px;">
                  <div style="font-size:11px;font-weight:700;color:#2457D6;">${escapeHtml(
                    t.day
                  )}</div>
                  <div style="font-size:13px;font-weight:700;color:#15304C;margin-top:1px;">${escapeHtml(
                    t.label
                  )}</div>
                  <div style="font-size:12px;color:#5A6472;margin-top:2px;line-height:1.4;">${escapeHtml(
                    t.note
                  )}</div>
                </td>
              </tr>`
  ).join("");

  const moduleTextList = totals.selectedModules
    .map(
      (m) =>
        `- [${CONFIG_STEPS[m.step].label}] ${m.name}: ${formatTry(m.price)} / yıl`
    )
    .join("\n");

  const adminSubject = params.isSummary
    ? `[TurPilot Paket Talebi] ${params.agencyName} — ${formatTry(
        totals.subtotal
      )} + KDV / yıl (${params.referenceId})`
    : `[TurPilot Görüşme Talebi] ${params.agencyName} — ${params.contactName} (${params.referenceId})`;

  const adminInner = `${brandHeaderHtml}
          <tr>
            <td class="tp-pad" style="padding:22px;">
              <div style="font-size:11px;font-weight:700;color:#2457D6;text-transform:uppercase;letter-spacing:0.04em;line-height:1.4;">
                ${
                  params.isSummary
                    ? "Yeni Sistem Yapılandırma ve Görüşme Talebi"
                    : "Yeni Görüşme / Demo Talebi"
                } · ${escapeHtml(createdDate)}
              </div>
              <h1 class="tp-h1" style="margin:6px 0 14px;font-size:22px;line-height:1.25;color:#15304C;word-break:break-word;">${escapeHtml(
                params.agencyName
              )}</h1>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#F8FAFC;border:1px solid #DDE2E9;border-radius:10px;">
                ${infoRow("Yetkili Ad Soyad", escapeHtml(params.contactName))}
                ${infoRow("Acente Adı", escapeHtml(params.agencyName))}
                ${infoRow("Telefon (WhatsApp)", escapeHtml(params.phone))}
                ${infoRow(
                  "E-posta",
                  params.email
                    ? `<a href="mailto:${escapeHtml(
                        params.email
                      )}" style="color:#2457D6;text-decoration:none;font-weight:700;">${escapeHtml(
                        params.email
                      )}</a>`
                    : "-",
                  true
                )}
              </table>

              <div style="margin-top:14px;">
                ${
                  waHref
                    ? `<a class="tp-btn" href="${waHref}" style="display:inline-block;background:#1E7A46;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:14px;line-height:1.2;padding:12px 18px;border-radius:8px;margin:0 8px 8px 0;">WhatsApp ile Yaz</a>`
                    : ""
                }
                <a class="tp-btn" href="tel:${escapeHtml(
                  params.phone
                )}" style="display:inline-block;background:#2457D6;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:14px;line-height:1.2;padding:12px 18px;border-radius:8px;margin:0 0 8px 0;">Hemen Ara</a>
              </div>

              ${
                params.isSummary
                  ? `<h2 style="margin:18px 0 10px;font-size:15px;color:#15304C;">Seçilen Paket ve Modüller (${totals.count} Modül)</h2>
              ${modulesTableHtml}
              ${financialCardHtml}`
                  : ""
              }
            </td>
          </tr>`;

  const adminHtml = wrapHtml(
    adminInner,
    `${params.agencyName} — ${params.contactName} (${params.phone})`
  );

  const adminText = [
    params.isSummary
      ? "Yeni TurPilot Sistem Yapılandırma ve Görüşme Talebi"
      : "Yeni TurPilot Görüşme Talebi",
    `Referans: ${params.referenceId}`,
    `Tarih: ${createdDate}`,
    `Acente: ${params.agencyName}`,
    `Yetkili: ${params.contactName}`,
    `Telefon: ${params.phone}`,
    `E-posta: ${params.email || "-"}`,
    ...(params.isSummary
      ? [
          "",
          "Seçilen Modüller:",
          moduleTextList,
          "- Kurulum ve Excel veri aktarımı: Dahil (Ücretsiz)",
          "",
          `Ara toplam (KDV hariç): ${formatTry(totals.subtotal)} / yıl`,
          `KDV (%${vatPct}): ${formatTry(totals.vatAmount)}`,
          `KDV dahil yıllık toplam: ${formatTry(totals.grandTotal)} / yıl`,
        ]
      : []),
  ].join("\n");

  const customerSubject = params.isSummary
    ? `TurPilot Sistem Özetiniz ve Görüşme Talebiniz Alındı (${params.referenceId})`
    : `TurPilot Görüşme Talebiniz Alındı (${params.referenceId})`;

  const customerInner = `${brandHeaderHtml}
          <tr>
            <td class="tp-pad" style="padding:22px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                <tr>
                  <td style="background:#E6F3EB;border:1px solid #B7DFC7;border-radius:10px;padding:12px 14px;font-size:13px;font-weight:700;line-height:1.45;color:#144F2E;">
                    ✓ ${
                      params.isSummary
                        ? "Sistem özetiniz ve görüşme talebiniz TurPilot ekibine ulaştı."
                        : "Görüşme talebiniz TurPilot ekibine ulaştı."
                    }
                  </td>
                </tr>
              </table>

              <h1 class="tp-h1" style="margin:16px 0 8px;font-size:21px;line-height:1.25;color:#15304C;">Merhaba ${escapeHtml(
                params.contactName
              )},</h1>
              <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#34465A;">
                ${
                  params.isSummary
                    ? `<strong>${escapeHtml(
                        params.agencyName
                      )}</strong> için oluşturduğunuz TurPilot paket yapılandırması aşağıda özetlenmiştir. Ürün ekibimiz en kısa sürede <strong>${escapeHtml(
                        params.phone
                      )}</strong> numarasından sizinle iletişime geçerek ihtiyaçlarınızı birlikte doğrulayacaktır.`
                    : `<strong>${escapeHtml(
                        params.agencyName
                      )}</strong> adına ilettiğiniz canlı tanıtım ve görüşme talebiniz alındı. Ürün ekibimiz en kısa sürede <strong>${escapeHtml(
                        params.phone
                      )}</strong> numarasından sizinle iletişime geçecektir.`
                }
              </p>

              ${
                params.isSummary
                  ? `<h2 style="margin:18px 0 10px;font-size:15px;color:#15304C;">Seçtiğiniz Paket ve Modüller</h2>
              ${modulesTableHtml}
              ${financialCardHtml}`
                  : `<div style="margin:16px 0;">
                <a class="tp-btn" href="${escapeHtml(
                  siteConfig.siteUrl
                )}/sistemini-olustur" style="display:inline-block;background:#F2A900;color:#15304C;text-decoration:none;font-weight:700;font-size:14px;line-height:1.2;padding:12px 18px;border-radius:8px;">Sistemini Oluştur ve Fiyat Gör</a>
              </div>`
              }

              <h3 style="margin:22px 0 6px;font-size:15px;color:#15304C;">Geçiş Takvimi</h3>
              <p style="margin:0 0 12px;font-size:13px;line-height:1.5;color:#5A6472;">${escapeHtml(
                MIGRATION_SLA_TEXT
              )}</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                ${timelineHtml}
              </table>

              <div style="margin-top:18px;">
                <a class="tp-btn" href="${turpilotWaHref}" style="display:inline-block;background:#1E7A46;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:13px;line-height:1.2;padding:11px 16px;border-radius:8px;margin:0 8px 8px 0;">WhatsApp&apos;tan Yaz</a>
                <a class="tp-btn" href="tel:+908508853455" style="display:inline-block;background:#2457D6;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:13px;line-height:1.2;padding:11px 16px;border-radius:8px;margin:0 0 8px 0;">${escapeHtml(
                  siteConfig.phoneDisplay
                )}</a>
              </div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-top:14px;border-top:1px solid #E8ECF2;">
                <tr>
                  <td style="padding-top:14px;font-size:12px;color:#5A6472;line-height:1.7;">
                    <strong style="color:#15304C;">TurPilot</strong> · Otobüslü tur acenteleri için operasyon programı<br />
                    <a href="tel:+908508853455" style="color:#2457D6;text-decoration:none;">${escapeHtml(
                      siteConfig.phoneDisplay
                    )}</a> · <a href="mailto:${escapeHtml(
    siteConfig.email
  )}" style="color:#2457D6;text-decoration:none;">${escapeHtml(
    siteConfig.email
  )}</a> · <a href="${escapeHtml(
    siteConfig.siteUrl
  )}" style="color:#2457D6;text-decoration:none;">${escapeHtml(
    siteConfig.domain
  )}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;

  const customerHtml = wrapHtml(
    customerInner,
    params.isSummary
      ? `${params.agencyName} için paket özetiniz ve görüşme talebiniz alındı.`
      : `${params.agencyName} için görüşme talebiniz alındı.`
  );

  const customerText = [
    `Merhaba ${params.contactName},`,
    params.isSummary
      ? `${params.agencyName} için oluşturduğunuz TurPilot sistem özeti ve görüşme talebiniz alındı (Referans: ${params.referenceId}).`
      : `${params.agencyName} için ilettiğiniz TurPilot görüşme talebiniz alındı (Referans: ${params.referenceId}).`,
    `Ekibimiz en kısa sürede ${params.phone} numarasından sizinle iletişime geçecektir.`,
    ...(params.isSummary
      ? [
          "",
          "Seçilen Modüller:",
          moduleTextList,
          "- Kurulum ve Excel veri aktarımı: Dahil (Ücretsiz)",
          "",
          `Ara toplam (KDV hariç): ${formatTry(totals.subtotal)} / yıl`,
          `KDV (%${vatPct}): ${formatTry(totals.vatAmount)}`,
          `KDV dahil yıllık toplam: ${formatTry(totals.grandTotal)} / yıl`,
        ]
      : []),
    "",
    MIGRATION_SLA_TEXT,
    `İletişim: ${siteConfig.phoneDisplay} · ${siteConfig.email}`,
  ].join("\n");

  return {
    totals,
    adminSubject,
    adminHtml,
    adminText,
    customerSubject,
    customerHtml,
    customerText,
  };
}

async function sendViaResend(payload: {
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: payload.from,
      to: payload.to,
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Resend HTTP ${res.status}: ${errText}`);
  }
  return true;
}

async function trySmtpSend(params: {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  adminRecipients: string[];
  customerEmail: string;
  built: ReturnType<typeof buildEmails>;
}) {
  const transporter = nodemailer.createTransport({
    host: params.host,
    port: params.port,
    secure: params.secure,
    auth: {
      user: params.user,
      pass: params.pass,
    },
    connectionTimeout: 2500,
    greetingTimeout: 2500,
    socketTimeout: 4000,
  });

  await transporter.sendMail({
    from: params.from,
    to: params.adminRecipients.join(", "),
    replyTo: params.customerEmail || undefined,
    subject: params.built.adminSubject,
    html: params.built.adminHtml,
    text: params.built.adminText,
  });

  let customerSent = false;
  if (params.customerEmail) {
    await transporter.sendMail({
      from: params.from,
      to: params.customerEmail,
      replyTo: siteConfig.email,
      subject: params.built.customerSubject,
      html: params.built.customerHtml,
      text: params.built.customerText,
    });
    customerSent = true;
  }

  return { adminSent: true, customerSent };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const contactName = String(body?.contactName ?? "").trim();
    const agencyName = String(body?.agencyName ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const source = String(body?.source ?? body?.type ?? "Web Formu").trim();
    const isSummary = body?.type === "configurator_summary";
    const selectedIds = Array.isArray(body?.selectedIds)
      ? (body.selectedIds as ModuleId[])
      : (["admin"] as ModuleId[]);

    if (!contactName || !agencyName || !phone) {
      return NextResponse.json(
        { ok: false, error: "Ad soyad, acente adı ve telefon zorunludur." },
        { status: 400 }
      );
    }

    if (isSummary && !email) {
      return NextResponse.json(
        { ok: false, error: "Sistem özeti gönderimi için e-posta zorunludur." },
        { status: 400 }
      );
    }

    const referenceId = `TP-${Date.now().toString(36).toUpperCase()}`;
    const built = buildEmails({
      referenceId,
      isSummary,
      contactName,
      agencyName,
      phone,
      email,
      source,
      selectedIds,
    });

    // Her zaman hem info@turpilot.site hem celal2004@gmail.com adreslerine gider
    const adminRecipientSet = new Set<string>(siteConfig.notifyEmails);
    if (process.env.LEAD_NOTIFY_EMAIL) {
      for (const addr of process.env.LEAD_NOTIFY_EMAIL.split(",")) {
        const trimmed = addr.trim();
        if (trimmed) adminRecipientSet.add(trimmed);
      }
    }
    const adminRecipients = Array.from(adminRecipientSet);
    const fromEmail =
      process.env.MAIL_FROM || `TurPilot <${siteConfig.email}>`;

    let adminNotified = false;
    let customerNotified = false;
    let formspreeSent = false;
    const diagnostics: string[] = [];

    // 1) Google Apps Script HTTPS Relay (Railway SMTP port engelini HTTPS 443 üzerinden aşar)
    const googleScriptUrl = findGoogleScriptUrl();
    if (googleScriptUrl) {
      try {
        const gsAdmin = await fetch(googleScriptUrl, {
          method: "POST",
          redirect: "follow",
          signal: AbortSignal.timeout(8000),
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            to: adminRecipients.join(","),
            replyTo: email || siteConfig.email,
            subject: built.adminSubject,
            html: built.adminHtml,
            text: built.adminText,
          }),
        });
        const gsAdminText = await gsAdmin.text();
        const isOk =
          gsAdmin.ok &&
          (gsAdminText.includes('"ok":true') ||
            gsAdminText.includes('"ok": true'));
        adminNotified = isOk;
        diagnostics.push(
          `gs_admin:${gsAdmin.status}:${gsAdminText.slice(0, 120)}`
        );

        if (isOk && email) {
          const gsCust = await fetch(googleScriptUrl, {
            method: "POST",
            redirect: "follow",
            signal: AbortSignal.timeout(8000),
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
              to: email,
              replyTo: siteConfig.email,
              subject: built.customerSubject,
              html: built.customerHtml,
              text: built.customerText,
            }),
          });
          const gsCustText = await gsCust.text();
          customerNotified =
            gsCust.ok &&
            (gsCustText.includes('"ok":true') ||
              gsCustText.includes('"ok": true'));
          diagnostics.push(`gs_cust:${gsCust.status}`);
        }
      } catch (err) {
        console.error("[TurPilot Google Script Relay Error]", err);
        diagnostics.push(
          `gs_err:${err instanceof Error ? err.message : "unknown"}`
        );
      }
    } else {
      diagnostics.push("gs:not_configured");
    }

    // 2) Resend API varsa hem info@turpilot.site + celal2004@gmail.com'a hem müşteriye gönder
    const resendKey = cleanEnv(process.env.RESEND_API_KEY);
    if (!adminNotified && resendKey) {
      try {
        adminNotified = await sendViaResend({
          from: fromEmail,
          to: adminRecipients,
          replyTo: email || undefined,
          subject: built.adminSubject,
          html: built.adminHtml,
          text: built.adminText,
        });
        if (email) {
          customerNotified = await sendViaResend({
            from: fromEmail,
            to: [email],
            replyTo: siteConfig.email,
            subject: built.customerSubject,
            html: built.customerHtml,
            text: built.customerText,
          });
        }
        diagnostics.push("resend:ok");
      } catch (err) {
        console.error("[TurPilot Resend Error]", err);
        diagnostics.push(
          `resend_err:${err instanceof Error ? err.message : "unknown"}`
        );
      }
    }

    // 3) SMTP_PASS (veya EMAIL_APP_PASSWORD) varsa IPv4 ile smtp.gmail.com:465 SSL dene
    const smtpPass = cleanEnv(
      process.env.SMTP_PASS || process.env.EMAIL_APP_PASSWORD
    );
    const smtpUser =
      cleanEnv(process.env.SMTP_USER || process.env.EMAIL_USER) ||
      siteConfig.email;
    if (!adminNotified && smtpPass) {
      const host = cleanEnv(process.env.SMTP_HOST) || "smtp.gmail.com";
      const port = Number(cleanEnv(process.env.SMTP_PORT) || "465");
      const secure =
        process.env.SMTP_SECURE !== undefined
          ? cleanEnv(process.env.SMTP_SECURE) === "true"
          : port === 465;

      try {
        const res = await trySmtpSend({
          host,
          port,
          secure,
          user: smtpUser,
          pass: smtpPass,
          from: fromEmail,
          adminRecipients,
          customerEmail: email,
          built,
        });
        adminNotified = res.adminSent;
        customerNotified = res.customerSent;
        diagnostics.push(`smtp:${host}:${port}:ok`);
      } catch (err) {
        console.error(`[TurPilot SMTP Error (${host}:${port})]`, err);
        diagnostics.push(
          `smtp_err:${err instanceof Error ? err.message : "unknown"}`
        );
      }
    }

    // 3) Mevcut Formspree kanalına da otomatik yedek bildirim gönder (4.5s timeout ile)
    const formspreeUrl =
      process.env.FORMSPREE_URL || siteConfig.formspreeFallbackUrl;
    if (formspreeUrl) {
      try {
        const fsRes = await fetch(formspreeUrl, {
          method: "POST",
          signal: AbortSignal.timeout(4500),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: built.adminSubject,
            _replyto: email || undefined,
            referansNo: referenceId,
            acenteAdi: agencyName,
            yetkiliAdSoyad: contactName,
            telefon: phone,
            eposta: email,
            secilenModuller: built.totals.selectedModules
              .map((m) => `${m.name} (${formatTry(m.price)}/yıl)`)
              .join(", "),
            araToplamKdvHaric: `${formatTry(built.totals.subtotal)} / yıl`,
            kdvTutari: formatTry(built.totals.vatAmount),
            yillikGenelToplam: `${formatTry(built.totals.grandTotal)} / yıl`,
            detayliOzet: built.adminText,
          }),
        });
        formspreeSent = fsRes.ok;
      } catch (err) {
        console.error("[TurPilot Formspree Backup Error]", err);
      }
    }

    const emailDelivered = adminNotified || customerNotified || formspreeSent;

    return NextResponse.json({
      ok: true,
      referenceId,
      emailDelivered,
      adminNotified: adminNotified || formspreeSent,
      customerNotified,
      transportDetail: diagnostics.join(" | "),
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Geçersiz talep verisi." },
      { status: 400 }
    );
  }
}
