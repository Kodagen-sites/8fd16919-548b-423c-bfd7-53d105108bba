"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentSite } from "@/lib/site-scope";
import { hasPermission, logAudit } from "@/lib/audit";
import { services } from "@kodagen/tickets-engine";
import type { EventStatus } from "@kodagen/tickets-engine";

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };
function bump() { revalidatePath("/admin/events-manage"); revalidatePath("/admin/registrations"); revalidatePath("/admin"); }

export async function createTktEvent(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  try {
    const ctx = await getCurrentSite();
    if (!ctx) return { ok: false, error: "Not signed in." };
    if (!hasPermission(ctx.role, "events.edit", ctx.permissions)) return { ok: false, error: "No permission." };
    const title = String(fd.get("title") ?? "").trim();
    if (!title) return { ok: false, error: "Title is required." };
    const supabase = createServiceClient();
    const event = await services.createEvent(supabase, ctx.siteId, {
      title, description: String(fd.get("description") ?? "").trim() || undefined,
      venue: String(fd.get("venue") ?? "").trim() || undefined,
      image: String(fd.get("image") ?? "").trim() || undefined,
      start_at: String(fd.get("startAt") ?? ""),
      end_at: String(fd.get("endAt") ?? "").trim() || undefined,
      capacity: fd.get("capacity") ? Number(fd.get("capacity")) : undefined,
      price_cents: Math.round(Number(fd.get("price") ?? 0) * 100),
      category: String(fd.get("category") ?? "").trim() || undefined,
      status: (String(fd.get("status") ?? "draft")) as EventStatus,
    });
    logAudit({ action: "event.create", entityType: "event", entityId: event.id, details: { title } });
    bump();
    return { ok: true, id: event.id };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}

export async function updateTktEvent(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  try {
    const ctx = await getCurrentSite();
    if (!ctx) return { ok: false, error: "Not signed in." };
    if (!hasPermission(ctx.role, "events.edit", ctx.permissions)) return { ok: false, error: "No permission." };
    const id = String(fd.get("id") ?? "").trim();
    if (!id) return { ok: false, error: "Missing id." };
    const supabase = createServiceClient();
    await services.updateEvent(supabase, ctx.siteId, id, {
      title: String(fd.get("title") ?? "").trim(),
      description: String(fd.get("description") ?? "").trim() || null,
      venue: String(fd.get("venue") ?? "").trim() || null,
      start_at: String(fd.get("startAt") ?? ""),
      end_at: String(fd.get("endAt") ?? "").trim() || null,
      capacity: fd.get("capacity") ? Number(fd.get("capacity")) : null,
      price_cents: Math.round(Number(fd.get("price") ?? 0) * 100),
      status: (String(fd.get("status") ?? "draft")) as EventStatus,
    });
    logAudit({ action: "event.update", entityType: "event", entityId: id });
    bump();
    return { ok: true };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}

export async function deleteTktEvent(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  try {
    const ctx = await getCurrentSite();
    if (!ctx) return { ok: false, error: "Not signed in." };
    if (!hasPermission(ctx.role, "events.manage", ctx.permissions)) return { ok: false, error: "No permission." };
    const id = String(fd.get("id") ?? "").trim();
    if (!id) return { ok: false, error: "Missing id." };
    const supabase = createServiceClient();
    await services.deleteEvent(supabase, ctx.siteId, id);
    logAudit({ action: "event.delete", entityType: "event", entityId: id });
    bump();
    return { ok: true };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}
