"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentSite } from "@/lib/site-scope";
import { hasPermission } from "@/lib/audit";
import { services } from "@kodagen/crm-engine";
import type { ActivityType } from "@kodagen/crm-engine";
import { logAudit } from "@/lib/audit";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function createActivity(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  try {
    const ctx = await getCurrentSite();
    if (!ctx) return { ok: false, error: "Not signed in." };
    if (!hasPermission(ctx.role, "activities.edit", ctx.permissions)) return { ok: false, error: "No permission." };

    const title = String(fd.get("title") ?? "").trim();
    if (!title) return { ok: false, error: "Title is required." };

    const supabase = await createClient();
    await services.createActivity(supabase, ctx.siteId, {
      title,
      type: (String(fd.get("type") ?? "task")) as ActivityType,
      contact_id: String(fd.get("contactId") ?? "").trim() || undefined,
      deal_id: String(fd.get("dealId") ?? "").trim() || undefined,
      description: String(fd.get("description") ?? "").trim() || undefined,
      due_at: String(fd.get("dueAt") ?? "").trim() || undefined,
      assigned_to: ctx.user.id,
    });

    logAudit({ action: "activity.create", entityType: "activity", details: { title } });
    revalidatePath("/admin/activities"); revalidatePath("/admin");
    return { ok: true };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}

export async function completeActivity(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  try {
    const ctx = await getCurrentSite();
    if (!ctx) return { ok: false, error: "Not signed in." };
    if (!hasPermission(ctx.role, "activities.edit", ctx.permissions)) return { ok: false, error: "No permission." };

    const id = String(fd.get("id") ?? "").trim();
    if (!id) return { ok: false, error: "Missing id." };

    const supabase = await createClient();
    await services.completeActivity(supabase, ctx.siteId, id);
    logAudit({ action: "activity.complete", entityType: "activity", entityId: id });
    revalidatePath("/admin/activities"); revalidatePath("/admin");
    return { ok: true };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}
