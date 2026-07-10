import { FK_COL, KODAGEN_SCHEMA, BOOKING_SCHEMA, withSchema, getScopeId } from '@/lib/db-scope';
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { recordPayment } from "@/lib/payments/report";
import { loadProvider } from "@/lib/payments/providers";
import { paystackVerifyTransaction } from "@/lib/payments/paystack";
import { stripeRetrieveCheckoutSession } from "@/lib/payments/stripe";
import { sendEmail } from "@/lib/email/send";
import { CURRENCY_CODE, fmtMoneyCents } from "@/lib/currency";
import { orderPaymentConfirmedEmail } from "@/lib/email/templates";
import ConfirmedView from "./confirmed-view";
import SiteChrome from "@/components/SiteChrome";

export const dynamic = "force-dynamic";

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; session_id?: string; pending?: string }>;
}) {
  const params = await searchParams;
  const orderId   = params.ref;
  const sessionId = params.session_id;
  const isPending = params.pending === "1";

  if (!orderId || isPending) {
    return <SiteChrome><ConfirmedView paid={false} reference={null} isPending={isPending ?? false} /></SiteChrome>;
  }

  // Scope the lookup to THIS deployment's site — `ref` is an
  // attacker-controllable order id; without the site pin,
  // ?ref=<another-tenant's-order-uuid> would render that tenant's order +
  // customer PII on this public page. The keyless lane pins via the slug
  // inside the get_order_public definer RPC.
  let svc: ReturnType<typeof createServiceClient> | null = null;
  try { svc = createServiceClient(); } catch { svc = null; }

  let order: Record<string, unknown> | null = null;
  if (svc) {
    const scopeId = await getScopeId(svc);
    const { data } = await svc
      .from("orders")
      .select("id, site_id, status, paid_at, payment_ref, payment_provider, guest_email, guest_name, notes, total, items")
      .eq("id", orderId)
      .eq(FK_COL, scopeId)
      .maybeSingle();
    order = (data as Record<string, unknown>) ?? null;
  } else {
    const anon = await createClient();
    const { data } = await anon.rpc("get_order_public", {
      p_slug: process.env.NEXT_PUBLIC_SITE_SLUG ?? "",
      p_order_id: orderId,
    });
    order = (data as Record<string, unknown>) ?? null;
    if (order && !order.id) order = null;
  }

  if (!order) {
    return <SiteChrome><ConfirmedView paid={false} reference={null} isPending={false} /></SiteChrome>;
  }

  const reference   = String(order.id).slice(0, 8).toUpperCase();
  const alreadyPaid = !!order.paid_at || order.status === "paid";

  if (!alreadyPaid && order.payment_provider && order.payment_ref) {
    const siteId   = order.site_id as string;
    const payRef   = order.payment_ref as string;
    const currency = (order.notes as string) ?? CURRENCY_CODE;

    let verifiedPaid = false;
    let verifiedAmount = 0;

    // ── Paystack: verify via API ──────────────────────────────────────────
    if (order.payment_provider === "paystack") {
      const provider = await loadProvider(siteId, "paystack");
      if (provider?.kind === "paystack") {
        const result = await paystackVerifyTransaction(provider, payRef);
        if (result.ok && result.status === "success") {
          verifiedPaid   = true;
          verifiedAmount = result.amount ?? Number(order.total);
        }
      }
    }

    // ── Stripe: verify checkout session ──────────────────────────────────
    if (order.payment_provider === "stripe" && sessionId) {
      const provider = await loadProvider(siteId, "stripe");
      if (provider?.kind === "stripe") {
        const result = await stripeRetrieveCheckoutSession(provider, sessionId);
        if (result.ok && result.paid) {
          verifiedPaid   = true;
          verifiedAmount = result.amount ?? Number(order.total);
        }
      }
    }

    if (verifiedPaid) {
      // Mark order paid + record the transaction — direct in dedicated mode,
      // via the platform site-proxy keyless (gateway-verified above).
      await recordPayment(siteId, {
        kind: "order", event: "paid", orderId,
        provider: order.payment_provider as "paystack" | "stripe",
        providerRef: order.payment_provider === "stripe" && sessionId ? sessionId : payRef,
        amountCents: verifiedAmount,
        currency,
        customerEmail: (order.guest_email as string) ?? null,
        customerName: (order.guest_name as string) ?? null,
      });

      // Send payment confirmed email to customer
      if (order.guest_email) {
        let siteName = "Store";
        if (svc) {
          const { data: settings } = await withSchema(svc, KODAGEN_SCHEMA)
            .from("site_settings")
            .select("business_name, primary_email")
            .eq(FK_COL, siteId)
            .maybeSingle();
          siteName = (settings?.business_name as string) || "Store";
        } else {
          const anon = await createClient();
          const { data: s0 } = await withSchema(anon, KODAGEN_SCHEMA)
            .rpc("get_public_site", { p_slug: process.env.NEXT_PUBLIC_SITE_SLUG ?? "" });
          const s = (Array.isArray(s0) ? s0[0] : s0) as Record<string, unknown> | null;
          siteName = (s?.business_name as string) || (s?.name as string) || "Store";
        }
        const items = Array.isArray(order.items)
          ? (order.items as Array<{ name: string; qty: number; price: number; variant?: string }>)
          : [];
        const fmtMoney = (cents: number) => fmtMoneyCents(cents, currency);

        const tmpl = orderPaymentConfirmedEmail({
          siteName,
          customerName: (order.guest_name as string) || (order.guest_email as string).split("@")[0],
          reference,
          totalFormatted: fmtMoney(verifiedAmount || Number(order.total)),
          items,
        });

        sendEmail(siteId, {
          to: order.guest_email as string,
          ...tmpl,
          tags: [{ name: "type", value: "payment-confirmed" }],
        }).catch((e) => console.error("[email] payment confirmed:", e));
      }

      return <SiteChrome><ConfirmedView paid={true} reference={reference} isPending={false} /></SiteChrome>;
    }
  }

  return <SiteChrome><ConfirmedView paid={alreadyPaid} reference={reference} isPending={false} /></SiteChrome>;
}
