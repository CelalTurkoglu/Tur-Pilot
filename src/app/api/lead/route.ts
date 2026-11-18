import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/config/siteConfig";
import {
  calculatePackageTotals,
  formatTry,
  MIGRATION_SLA_TEXT,
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
  callWindow: string;
  source: string;
  selectedIds: ModuleId[];
}) {
  const totals = calculatePackageTotals(params.selectedIds, siteConfig.vatRate);
  const waDigits = normalizePhoneForWa(params.phone);
  const waHref = waDigits ? `https://wa.me/${waDigits}` : "";

  const moduleRowsHtml = totals.selectedModules
    .map(
      (m) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #E8ECF2;color:#15304C;font-size:14px;">${escapeHtml(
          m.name
        )}</td>
        <td style="padding:8px 0;border-bottom:1px solid #E8ECF2;color:#15304C;font-size:14px;font-weight:600;text-align:right;white-space:nowrap;">${escapeHtml(
          formatTry(m.price)
        )} / yıl</td>
      </tr>`
    )
    .join("");

  const moduleTextList = totals.selectedModules
    .map((m) => `- ${m.name}: ${formatTry(m.price)} / yıl`)
    .join("\n");

  const adminSubject = params.isSummary
    ? `[TurPilot Ön Talep] ${params.agencyName} — ${formatTry(
        totals.subtotal
      )} + KDV / yıl (${params.referenceId})`
    : `[TurPilot Görüşme Talebi] ${params.agencyName} — ${params.contactName} (${params.referenceId})`;

  const adminHtml = `
  <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#15304C;background:#F2F4F7;padding:24px;">
    <div style="background:#FFFFFF;border:1px solid #DDE2E9;border-radius:14px;padding:24px;">
      <div style="font-size:12px;font-weight:700;color:#2457D6;text-transform:uppercase;letter-spacing:0.05em;">
        ${params.isSummary ? "Yeni Sistem Yapılandırma Özeti" : "Yeni Görüşme / Demo Talebi"}
      </div>
      <h1 style="margin:6px 0 16px;font-size:22px;color:#15304C;">${escapeHtml(
        params.agencyName
      )}</h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#5A6472;width:150px;">Referans No</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(
          params.referenceId
        )}</td></tr>
        <tr><td style="padding:6px 0;color:#5A6472;">Yetkili</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(
          params.contactName
        )}</td></tr>
        <tr><td style="padding:6px 0;color:#5A6472;">Telefon</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(
          params.phone
        )} ${
          waHref
            ? `(<a href="${waHref}" style="color:#1E7A46;">WhatsApp ile Aç</a>)`
            : ""
        }</td></tr>
        <tr><td style="padding:6px 0;color:#5A6472;">E-posta</td><td style="padding:6px 0;">${escapeHtml(
          params.email || "-"
        )}</td></tr>
        <tr><td style="padding:6px 0;color:#5A6472;">Görüşme Zamanı</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(
          params.callWindow
        )}</td></tr>
        <tr><td style="padding:6px 0;color:#5A6472;">Kaynak</td><td style="padding:6px 0;">${escapeHtml(
          params.source
        )}</td></tr>
      </table>

      ${
        params.isSummary
          ? `
      <h2 style="margin:22px 0 8px;font-size:16px;color:#15304C;">Seçilen Modüller (${totals.count} modül)</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${moduleRowsHtml}
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #E8ECF2;color:#34465A;font-size:14px;">Kurulum ve veri taşıma</td>
          <td style="padding:8px 0;border-bottom:1px solid #E8ECF2;color:#1E7A46;font-size:14px;font-weight:700;text-align:right;">Dahil (Ücretsiz)</td>
        </tr>
      </table>
      <div style="margin-top:14px;background:#15304C;color:#FFFFFF;border-radius:10px;padding:14px 16px;">
        <div style="display:flex;justify-content:space-between;font-size:14px;color:#C3CEDC;">
          <span>Ara toplam (KDV hariç): </span>
          <strong style="color:#FFFFFF;">${escapeHtml(formatTry(totals.subtotal))} / yıl</strong>
        </div>
        <div style="margin-top:4px;font-size:13px;color:#C3CEDC;">
          KDV (%${Math.round(siteConfig.vatRate * 100)}): ${escapeHtml(
              formatTry(totals.vatAmount)
            )} · KDV dahil yıllık toplam: <strong style="color:#F2A900;">${escapeHtml(
              formatTry(totals.grandTotal)
            )}</strong>
        </div>
      </div>`
          : ""
      }
    </div>
  </div>`;

  const adminText = [
    params.isSummary
      ? "Yeni TurPilot Sistem Yapılandırma Özeti"
      : "Yeni TurPilot Görüşme Talebi",
    `Referans: ${params.referenceId}`,
    `Acente: ${params.agencyName}`,
    `Yetkili: ${params.contactName}`,
    `Telefon: ${params.phone}`,
    `E-posta: ${params.email || "-"}`,
    `Görüşme zamanı: ${params.callWindow}`,
    `Kaynak: ${params.source}`,
    ...(params.isSummary
      ? [
          "",
          "Seçilen Modüller:",
          moduleTextList,
          "- Kurulum ve veri taşıma: Dahil (Ücretsiz)",
          `Ara toplam (KDV hariç): ${formatTry(totals.subtotal)} / yıl`,
          `KDV (%20): ${formatTry(totals.vatAmount)}`,
          `KDV dahil yıllık toplam: ${formatTry(totals.grandTotal)} / yıl`,
        ]
      : []),
  ].join("\n");

  const customerSubject = `TurPilot Sistem Özetiniz ve Görüşme Talebiniz Alındı (${params.referenceId})`;

  const customerHtml = `
  <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#15304C;background:#F2F4F7;padding:24px;">
    <div style="background:#FFFFFF;border:1px solid #DDE2E9;border-radius:14px;padding:24px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <img src="${siteConfig.siteUrl}/apple-icon" alt="TurPilot" width="32" height="32" style="border-radius:8px;display:block;" />
        <span style="font-size:20px;font-weight:700;color:#15304C;">Tur<span style="color:#2457D6;">Pilot</span></span>
      </div>
      <h1 style="margin:12px 0 8px;font-size:22px;color:#15304C;">Talebiniz ekibimize ulaştı.</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.55;color:#34465A;">
        Merhaba ${escapeHtml(params.contactName)},<br/>
        <strong>${escapeHtml(
          params.agencyName
        )}</strong> için oluşturduğunuz TurPilot sistem özeti kaydedildi. Tercih ettiğiniz <strong>${escapeHtml(
          params.callWindow.toLowerCase()
        )}</strong> saat aralığında ekibimiz sizinle iletişime geçecektir.
      </p>

      <div style="font-size:13px;color:#5A6472;margin-bottom:10px;">Referans No: <strong>${escapeHtml(
        params.referenceId
      )}</strong></div>

      <table style="width:100%;border-collapse:collapse;">
        ${moduleRowsHtml}
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #E8ECF2;color:#34465A;font-size:14px;">Kurulum ve veri taşıma</td>
          <td style="padding:8px 0;border-bottom:1px solid #E8ECF2;color:#1E7A46;font-size:14px;font-weight:700;text-align:right;">Dahil (Ücretsiz)</td>
        </tr>
      </table>

      <div style="margin-top:14px;background:#15304C;color:#FFFFFF;border-radius:10px;padding:14px 16px;">
        <div style="font-size:14px;color:#C3CEDC;">Ara toplam (KDV hariç): <strong style="color:#FFFFFF;">${escapeHtml(
          formatTry(totals.subtotal)
        )} / yıl</strong></div>
        <div style="margin-top:4px;font-size:14px;color:#C3CEDC;">KDV (%${Math.round(
          siteConfig.vatRate * 100
        )}): ${escapeHtml(formatTry(totals.vatAmount))}</div>
        <div style="margin-top:6px;font-size:17px;font-weight:700;color:#F2A900;">Yıllık toplam: ${escapeHtml(
          formatTry(totals.grandTotal)
        )}</div>
      </div>

      <p style="margin:16px 0 0;font-size:13px;line-height:1.5;color:#5A6472;">
        ${escapeHtml(MIGRATION_SLA_TEXT)}<br/>
        Hızlı iletişim: <a href="tel:+908508853455" style="color:#2457D6;">${escapeHtml(
          siteConfig.phoneDisplay
        )}</a> · <a href="mailto:${escapeHtml(
          siteConfig.email
        )}" style="color:#2457D6;">${escapeHtml(siteConfig.email)}</a>
      </p>
    </div>
  </div>`;

  const customerText = [
    `Merhaba ${params.contactName},`,
    `${params.agencyName} için oluşturduğunuz TurPilot sistem özeti kaydedildi (Referans: ${params.referenceId}).`,
    `Tercih ettiğiniz ${params.callWindow.toLowerCase()} saat aralığında sizinle iletişime geçeceğiz.`,
    "",
    "Seçilen Modüller:",
    moduleTextList,
    "- Kurulum ve veri taşıma: Dahil (Ücretsiz)",
    `Ara toplam (KDV hariç): ${formatTry(totals.subtotal)} / yıl`,
    `KDV (%20): ${formatTry(totals.vatAmount)}`,
    `KDV dahil yıllık toplam: ${formatTry(totals.grandTotal)} / yıl`,
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
  to: string;
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
      to: [payload.to],
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const contactName = String(body?.contactName ?? "").trim();
    const agencyName = String(body?.agencyName ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const callWindow = String(body?.callWindow ?? "Sabah").trim();
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
      callWindow,
      source,
      selectedIds,
    });

    const notifyEmail = process.env.LEAD_NOTIFY_EMAIL || siteConfig.email;
    const fromEmail =
      process.env.MAIL_FROM || `TurPilot <${siteConfig.email}>`;

    let adminNotified = false;
    let customerNotified = false;
    let telegramSent = false;
    let webhookSent = false;

    // 1) Resend API varsa kullan
    if (process.env.RESEND_API_KEY) {
      try {
        adminNotified = await sendViaResend({
          from: fromEmail,
          to: notifyEmail,
          replyTo: email || undefined,
          subject: built.adminSubject,
          html: built.adminHtml,
          text: built.adminText,
        });
        if (isSummary && email) {
          customerNotified = await sendViaResend({
            from: fromEmail,
            to: email,
            replyTo: notifyEmail,
            subject: built.customerSubject,
            html: built.customerHtml,
            text: built.customerText,
          });
        }
      } catch (err) {
        console.error("[TurPilot Resend Error]", err);
      }
    }

    // 2) SMTP tanımlıysa (Resend kullanılmadıysa veya yedek olarak) gönder
    if (
      !adminNotified &&
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      try {
        const port = Number(process.env.SMTP_PORT || "587");
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port,
          secure: process.env.SMTP_SECURE === "true" || port === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.MAIL_FROM || process.env.SMTP_USER,
          to: notifyEmail,
          replyTo: email || undefined,
          subject: built.adminSubject,
          html: built.adminHtml,
          text: built.adminText,
        });
        adminNotified = true;

        if (isSummary && email) {
          await transporter.sendMail({
            from: process.env.MAIL_FROM || process.env.SMTP_USER,
            to: email,
            replyTo: notifyEmail,
            subject: built.customerSubject,
            html: built.customerHtml,
            text: built.customerText,
          });
          customerNotified = true;
        }
      } catch (err) {
        console.error("[TurPilot SMTP Error]", err);
      }
    }

    // 3) Telegram Bot anlık bildirimi tanımlıysa gönder
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const tgRes = await fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text: built.adminText,
            }),
          }
        );
        telegramSent = tgRes.ok;
      } catch (err) {
        console.error("[TurPilot Telegram Error]", err);
      }
    }

    // 4) Harici CRM/Slack Webhook tanımlıysa gönder
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const whRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referenceId,
            type: body?.type,
            contactName,
            agencyName,
            phone,
            email,
            callWindow,
            source,
            selectedModules: built.totals.selectedModules.map((m) => ({
              id: m.id,
              name: m.name,
              price: m.price,
            })),
            subtotal: built.totals.subtotal,
            vatAmount: built.totals.vatAmount,
            grandTotal: built.totals.grandTotal,
            receivedAt: new Date().toISOString(),
            sourceDomain: siteConfig.domain,
          }),
        });
        webhookSent = whRes.ok;
      } catch (err) {
        console.error("[TurPilot Lead Webhook Error]", err);
      }
    }

    const emailDelivered = adminNotified || customerNotified;

    return NextResponse.json({
      ok: true,
      referenceId,
      emailDelivered,
      adminNotified,
      customerNotified,
      telegramSent,
      webhookSent,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Geçersiz talep verisi." },
      { status: 400 }
    );
  }
}
