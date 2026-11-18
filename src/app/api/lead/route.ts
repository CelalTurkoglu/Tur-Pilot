import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const contactName = String(body?.contactName ?? "").trim();
    const agencyName = String(body?.agencyName ?? "").trim();
    const phone = String(body?.phone ?? "").trim();

    if (!contactName || !agencyName || !phone) {
      return NextResponse.json(
        { ok: false, error: "Ad soyad, acente adı ve telefon zorunludur." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...body,
            receivedAt: new Date().toISOString(),
            sourceDomain: "turpilot.site",
          }),
        });
      } catch (err) {
        console.error("[TurPilot Lead Webhook Error]", err);
      }
    }

    return NextResponse.json({
      ok: true,
      referenceId: `TP-${Date.now().toString(36).toUpperCase()}`,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Geçersiz talep verisi." },
      { status: 400 }
    );
  }
}
