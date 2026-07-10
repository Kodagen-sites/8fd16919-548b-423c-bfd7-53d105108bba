"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentSite } from "@/lib/site-scope";
import { hasPermission } from "@/lib/audit";
import { services } from "@kodagen/crm-engine";
import { logAudit } from "@/lib/audit";
import { CURRENCY_CODE } from "@/lib/currency";

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

function bump() { revalidatePath("/admin/deals"); revalidatePath("/admin/pipeline"); revalidatePath("/admin/contacts"); revalidatePath("/admin"); }

export async function createDeal(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  try {
    const ctx = await getCurrentSite();
    if (!ctx) return { ok: false, error: "Not signed in." };
    if (!hasPermission(ctx.role, "deals.edit", ctx.permissions)) return { ok: false, error: "No permission." };

    const title = String(fd.get("title") ?? "").trim();
    if (!title) return { ok: false, error: "Deal title is required." };

    const supabase = await createClient();
    const deal = await services.createDeal(supabase, ctx.siteId, {
      title,
      contact_id: String(fd.get("contactId") ?? "").trim() || undefined,
      pipeline_id: String(fd.get("pipelineId") ?? "").trim(),
      stage_id: String(fd.get("stageId") ?? "").trim(),
      value_cents: Math.round(Number(fd.get("value") ?? 0) * 100),
      currency: CURRENCY_CODE,
      probability: Number(fd.get("probability") ?? 50),
      expected_close_date: String(fd.get("expectedClose") ?? "").trim() || undefined,
      notes: String(fd.get("notes") ?? "").trim() || undefined,
      fields: {},
    });

    logAudit({ action: "deal.create", entityType: "deal", entityId: deal.id, details: { title } });
    bump();
    return { ok: true, id: deal.id };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}

export async function moveDeal(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  try {
    const ctx = await getCurrentSite();
    if (!ctx) return { ok: false, error: "Not signed in." };
    if (!hasPermission(ctx.role, "deals.edit", ctx.permissions)) return { ok: false, error: "No permission." };

    const dealId = String(fd.get("dealId") ?? "").trim();
    const stageId = String(fd.get("stageId") ?? "").trim();
    if (!dealId || !stageId) return { ok: false, error: "Missing deal or stage." };

    const supabase = await createClient();
    const deal = await services.moveDealToStage(supabase, ctx.siteId, dealId, stageId);
    logAudit({ action: `deal.move`, entityType: "deal", entityId: deal.id, details: { stageId, state: deal.state } });
    bump();
    return { ok: true };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}

export async function closeDealWon(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  try {
    const ctx = await getCurrentSite();
    if (!ctx) return { ok: false, error: "Not signed in." };
    if (!hasPermission(ctx.role, "deals.close", ctx.permissions)) return { ok: false, error: "No permission." };

    const dealId = String(fd.get("dealId") ?? "").trim();
    if (!dealId) return { ok: false, error: "Missing deal." };

    const supabase = await createClient();
    await services.markDealWon(supabase, ctx.siteId, dealId);
    logAudit({ action: "deal.won", entityType: "deal", entityId: dealId });
    bump();
    return { ok: true };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}

export async function closeDealLost(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  try {
    const ctx = await getCurrentSite();
    if (!ctx) return { ok: false, error: "Not signed in." };
    if (!hasPermission(ctx.role, "deals.close", ctx.permissions)) return { ok: false, error: "No permission." };

    const dealId = String(fd.get("dealId") ?? "").trim();
    const reason = String(fd.get("reason") ?? "").trim();
    if (!dealId) return { ok: false, error: "Missing deal." };

    const supabase = await createClient();
    await services.markDealLost(supabase, ctx.siteId, dealId, reason || undefined);
    logAudit({ action: "deal.lost", entityType: "deal", entityId: dealId, details: { reason } });
    bump();
    return { ok: true };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}
