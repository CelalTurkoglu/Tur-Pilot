import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/config/siteConfig";
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

  const moduleRowsHtml = totals.selectedModules
    .map(
      (m) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #E8ECF2;">
          <div style="font-size:11px;font-weight:700;color:#2457D6;text-transform:uppercase;">${escapeHtml(
            CONFIG_STEPS[m.step].label
          )}</div>
          <div style="font-size:14px;font-weight:600;color:#15304C;margin-top:2px;">${escapeHtml(
            m.name
          )}</div>
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #E8ECF2;color:#15304C;font-size:14px;font-weight:700;text-align:right;white-space:nowrap;">
          ${escapeHtml(formatTry(m.price))} <span style="font-weight:400;color:#5A6472;font-size:12px;">/ yıl</span>
        </td>
      </tr>`
    )
    .join("");

  const timelineHtml = MIGRATION_TIMELINE.map(
    (t) => `
    <td style="width:20%;vertical-align:top;padding:8px;background:#F8FAFC;border:1px solid #E8ECF2;border-radius:8px;">
      <div style="font-size:11px;font-weight:700;color:#2457D6;">${escapeHtml(
        t.day
      )}</div>
      <div style="font-size:12px;font-weight:700;color:#15304C;margin-top:2px;">${escapeHtml(
        t.label
      )}</div>
      <div style="font-size:11px;color:#5A6472;margin-top:2px;line-height:1.35;">${escapeHtml(
        t.note
      )}</div>
    </td>`
  ).join("");

  const moduleTextList = totals.selectedModules
    .map((m) => `- [${CONFIG_STEPS[m.step].label}] ${m.name}: ${formatTry(m.price)} / yıl`)
    .join("\n");

  const adminSubject = params.isSummary
    ? `[TurPilot Paket Talebi] ${params.agencyName} — ${formatTry(
        totals.subtotal
      )} + KDV / yıl (${params.referenceId})`
    : `[TurPilot Görüşme Talebi] ${params.agencyName} — ${params.contactName} (${params.referenceId})`;

  const brandHeaderHtml = `
    <div style="background:#15304C;padding:20px 24px;border-radius:14px 14px 0 0;display:flex;align-items:center;justify-content:space-between;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td>
            <span style="display:inline-block;background:#2457D6;color:#FFFFFF;font-weight:800;font-size:18px;padding:6px 12px;border-radius:8px;letter-spacing:-0.02em;">TurPilot</span>
          </td>
          <td style="text-align:right;">
            <span style="display:inline-block;background:#F2A900;color:#15304C;font-weight:700;font-size:12px;padding:5px 10px;border-radius:999px;">
              Ref: ${escapeHtml(params.referenceId)}
            </span>
          </td>
        </tr>
      </table>
    </div>`;

  const financialCardHtml = `
    <div style="margin-top:16px;background:#15304C;color:#FFFFFF;border-radius:12px;padding:18px 20px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:3px 0;color:#C3CEDC;">Seçilen modül sayısı</td>
          <td style="padding:3px 0;text-align:right;font-weight:600;color:#FFFFFF;">${totals.count} modül</td>
        </tr>
        <tr>
          <td style="padding:3px 0;color:#C3CEDC;">Ara toplam (KDV hariç)</td>
          <td style="padding:3px 0;text-align:right;font-weight:700;color:#FFFFFF;">${escapeHtml(
            formatTry(totals.subtotal)
          )} / yıl</td>
        </tr>
        <tr>
          <td style="padding:3px 0;color:#C3CEDC;">KDV (%${Math.round(
            siteConfig.vatRate * 100
          )})</td>
          <td style="padding:3px 0;text-align:right;color:#C3CEDC;">${escapeHtml(
            formatTry(totals.vatAmount)
          )}</td>
        </tr>
        <tr>
          <td style="padding:10px 0 2px;border-top:1px dashed rgba(255,255,255,0.3);font-size:16px;font-weight:700;color:#FFFFFF;">KDV Dahil Yıllık Toplam</td>
          <td style="padding:10px 0 2px;border-top:1px dashed rgba(255,255,255,0.3);text-align:right;font-size:22px;font-weight:800;color:#F2A900;">${escapeHtml(
            formatTry(totals.grandTotal)
          )}</td>
        </tr>
      </table>
    </div>`;

  const adminHtml = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:660px;margin:0 auto;color:#15304C;background:#F2F4F7;padding:24px;">
    ${brandHeaderHtml}
    <div style="background:#FFFFFF;border:1px solid #DDE2E9;border-top:none;border-radius:0 0 14px 14px;padding:24px;">
      <div style="font-size:12px;font-weight:700;color:#2457D6;text-transform:uppercase;letter-spacing:0.05em;">
        ${params.isSummary ? "Yeni Sistem Yapılandırma ve Görüşme Talebi" : "Yeni Görüşme / Demo Talebi"} · ${escapeHtml(
          createdDate
        )}
      </div>
      <h1 style="margin:6px 0 18px;font-size:24px;color:#15304C;">${escapeHtml(
        params.agencyName
      )}</h1>

      <table style="width:100%;border-collapse:collapse;background:#F8FAFC;border:1px solid #DDE2E9;border-radius:10px;font-size:14px;">
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #E8ECF2;color:#5A6472;width:150px;">Yetkili Ad Soyad</td>
          <td style="padding:10px 14px;border-bottom:1px solid #E8ECF2;font-weight:700;color:#15304C;">${escapeHtml(
            params.contactName
          )}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #E8ECF2;color:#5A6472;">Acente Adı</td>
          <td style="padding:10px 14px;border-bottom:1px solid #E8ECF2;font-weight:700;color:#15304C;">${escapeHtml(
            params.agencyName
          )}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #E8ECF2;color:#5A6472;">Telefon (WhatsApp)</td>
          <td style="padding:10px 14px;border-bottom:1px solid #E8ECF2;font-weight:700;color:#15304C;">
            ${escapeHtml(params.phone)}
          </td>
        </tr>
        <tr>
          <td style="padding:10px 14px;color:#5A6472;">E-posta</td>
          <td style="padding:10px 14px;font-weight:600;color:#2457D6;">${escapeHtml(
            params.email || "-"
          )}</td>
        </tr>
      </table>

      <div style="margin-top:14px;display:flex;gap:10px;">
        ${
          waHref
            ? `<a href="${waHref}" style="display:inline-block;background:#1E7A46;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:13px;padding:10px 16px;border-radius:8px;margin-right:8px;">WhatsApp ile Acenteye Yaz</a>`
            : ""
        }
        <a href="tel:${escapeHtml(
          params.phone
        )}" style="display:inline-block;background:#2457D6;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:13px;padding:10px 16px;border-radius:8px;">Hemen Ara</a>
      </div>

      <h2 style="margin:24px 0 10px;font-size:16px;color:#15304C;">Seçilen Paket ve Modüller (${totals.count} Modül)</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #DDE2E9;border-radius:10px;overflow:hidden;">
        ${moduleRowsHtml}
        <tr>
          <td style="padding:10px 12px;background:#F8FAFC;color:#34465A;font-size:14px;font-weight:600;">Kurulum ve Excel veri aktarımı</td>
          <td style="padding:10px 12px;background:#F8FAFC;color:#1E7A46;font-size:14px;font-weight:700;text-align:right;">Dahil (Ücretsiz)</td>
        </tr>
      </table>

      ${financialCardHtml}
    </div>
  </div>`;

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
    "",
    "Seçilen Modüller:",
    moduleTextList,
    "- Kurulum ve Excel veri aktarımı: Dahil (Ücretsiz)",
    "",
    `Ara toplam (KDV hariç): ${formatTry(totals.subtotal)} / yıl`,
    `KDV (%20): ${formatTry(totals.vatAmount)}`,
    `KDV dahil yıllık toplam: ${formatTry(totals.grandTotal)} / yıl`,
  ].join("\n");

  const customerSubject = `TurPilot Sistem Özetiniz ve Görüşme Talebiniz Alındı (${params.referenceId})`;

  const customerHtml = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:660px;margin:0 auto;color:#15304C;background:#F2F4F7;padding:24px;">
    ${brandHeaderHtml}
    <div style="background:#FFFFFF;border:1px solid #DDE2E9;border-top:none;border-radius:0 0 14px 14px;padding:24px;">
      <div style="background:#E6F3EB;border:1px solid #B7DFC7;color:#144F2E;border-radius:10px;padding:12px 14px;font-size:14px;font-weight:700;">
        ✓ Sistem özetiniz ve görüşme talebiniz TurPilot ekibine ulaştı.
      </div>

      <h1 style="margin:16px 0 8px;font-size:22px;color:#15304C;">Merhaba ${escapeHtml(
        params.contactName
      )},</h1>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.55;color:#34465A;">
        <strong>${escapeHtml(
          params.agencyName
        )}</strong> için oluşturduğunuz TurPilot paket yapılandırması aşağıda özetlenmiştir. Ürün ekibimiz en kısa sürede <strong>${escapeHtml(
          params.phone
        )}</strong> numarasından sizinle iletişime geçerek ihtiyaçlarınızı birlikte doğrulayacaktır.
      </p>

      <h2 style="margin:20px 0 10px;font-size:16px;color:#15304C;">Seçtiğiniz Paket ve Modüller</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #DDE2E9;border-radius:10px;overflow:hidden;">
        ${moduleRowsHtml}
        <tr>
          <td style="padding:10px 12px;background:#F8FAFC;color:#34465A;font-size:14px;font-weight:600;">Kurulum ve Excel veri aktarımı</td>
          <td style="padding:10px 12px;background:#F8FAFC;color:#1E7A46;font-size:14px;font-weight:700;text-align:right;">Dahil (Ücretsiz)</td>
        </tr>
      </table>

      ${financialCardHtml}

      <h3 style="margin:22px 0 8px;font-size:15px;color:#15304C;">Geçiş Takvimi</h3>
      <p style="margin:0 0 10px;font-size:13px;color:#5A6472;">${escapeHtml(
        MIGRATION_SLA_TEXT
      )}</p>
      <table style="width:100%;border-collapse:separate;border-spacing:4px;">
        <tr>${timelineHtml}</tr>
      </table>

      <div style="margin-top:20px;padding-top:16px;border-top:1px solid #E8ECF2;font-size:13px;color:#5A6472;line-height:1.6;">
        <div><strong>TurPilot İletişim:</strong> <a href="tel:+908508853455" style="color:#2457D6;text-decoration:none;">${escapeHtml(
          siteConfig.phoneDisplay
        )}</a> · <a href="mailto:${escapeHtml(
          siteConfig.email
        )}" style="color:#2457D6;text-decoration:none;">${escapeHtml(
          siteConfig.email
        )}</a></div>
        <div style="margin-top:4px;">Web: <a href="${escapeHtml(
          siteConfig.siteUrl
        )}" style="color:#2457D6;text-decoration:none;">${escapeHtml(
          siteConfig.domain
        )}</a></div>
      </div>
    </div>
  </div>`;

  const customerText = [
    `Merhaba ${params.contactName},`,
    `${params.agencyName} için oluşturduğunuz TurPilot sistem özeti ve görüşme talebiniz alındı (Referans: ${params.referenceId}).`,
    `Ekibimiz en kısa sürede ${params.phone} numarasından sizinle iletişime geçecektir.`,
    "",
    "Seçilen Modüller:",
    moduleTextList,
    "- Kurulum ve Excel veri aktarımı: Dahil (Ücretsiz)",
    "",
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
    connectionTimeout: 4000,
    greetingTimeout: 4000,
    socketTimeout: 6000,
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
    let transportDetail = "none";

    // 1) Resend API varsa hem info@turpilot.site + celal2004@gmail.com'a hem müşteriye gönder
    if (process.env.RESEND_API_KEY) {
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
        transportDetail = "resend";
      } catch (err) {
        console.error("[TurPilot Resend Error]", err);
        transportDetail = `resend_err:${err instanceof Error ? err.message : "unknown"}`;
      }
    }

    // 2) SMTP_PASS (veya EMAIL_APP_PASSWORD) varsa önce smtp.gmail.com:465 SSL ile dene
    const smtpPass =
      process.env.SMTP_PASS || process.env.EMAIL_APP_PASSWORD || "";
    const smtpUser =
      process.env.SMTP_USER || process.env.EMAIL_USER || siteConfig.email;
    if (!adminNotified && smtpPass) {
      const host = process.env.SMTP_HOST || "smtp.gmail.com";
      const port = Number(process.env.SMTP_PORT || "465");
      const secure =
        process.env.SMTP_SECURE !== undefined
          ? process.env.SMTP_SECURE === "true"
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
        transportDetail = `smtp:${host}:${port}`;
      } catch (err) {
        console.error(`[TurPilot SMTP Error (${host}:${port})]`, err);
        transportDetail = `smtp_err:${err instanceof Error ? err.message : "unknown"}`;
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
      transportDetail,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Geçersiz talep verisi." },
      { status: 400 }
    );
  }
}
