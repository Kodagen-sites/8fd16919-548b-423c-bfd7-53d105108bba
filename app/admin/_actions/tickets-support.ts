"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentSite } from "@/lib/site-scope";
import { hasPermission, logAudit } from "@/lib/audit";
import { services } from "@kodagen/tickets-engine";
import type { TicketStatus, TicketPriority, RegistrationStatus } from "@kodagen/tickets-engine";

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

export async function createSupportTicket(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  try {
    const ctx = await getCurrentSite();
    if (!ctx) return { ok: false, error: "Not signed in." };
    if (!hasPermission(ctx.role, "tickets.manage", ctx.permissions)) return { ok: false, error: "No permission." };
    const subject = String(fd.get("subject") ?? "").trim();
    if (!subject) return { ok: false, error: "Subject is required." };
    const supabase = createServiceClient();
    const ticket = await services.createTicket(supabase, ctx.siteId, {
      subject, description: String(fd.get("description") ?? "").trim() || undefined,
      category: String(fd.get("category") ?? "").trim() || undefined,
      priority: (String(fd.get("priority") ?? "medium")) as TicketPriority,
      requester_name: String(fd.get("requesterName") ?? "").trim(),
      requester_email: String(fd.get("requesterEmail") ?? "").trim() || undefined,
      requester_phone: String(fd.get("requesterPhone") ?? "").trim() || undefined,
    });
    logAudit({ action: "ticket.create", entityType: "ticket", entityId: ticket.reference, details: { subject } });
    revalidatePath("/admin/support-tickets"); revalidatePath("/admin");
    return { ok: true, id: ticket.id };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}

export async function transitionTicket(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  try {
    const ctx = await getCurrentSite();
    if (!ctx) return { ok: false, error: "Not signed in." };
    if (!hasPermission(ctx.role, "tickets.manage", ctx.permissions)) return { ok: false, error: "No permission." };
    const ticketId = String(fd.get("ticketId") ?? "").trim();
    const newStatus = String(fd.get("newStatus") ?? "").trim() as TicketStatus;
    if (!ticketId || !newStatus) return { ok: false, error: "Missing ticket or status." };
    const supabase = createServiceClient();
    const ticket = await services.transitionTicket(supabase, ctx.siteId, ticketId, newStatus);
    logAudit({ action: `ticket.${newStatus}`, entityType: "ticket", entityId: ticket.reference });
    revalidatePath("/admin/support-tickets"); revalidatePath("/admin");
    return { ok: true };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}

export async function updateRegStatus(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  try {
    const ctx = await getCurrentSite();
    if (!ctx) return { ok: false, error: "Not signed in." };
    if (!hasPermission(ctx.role, "registrations.manage", ctx.permissions)) return { ok: false, error: "No permission." };
    const regId = String(fd.get("regId") ?? "").trim();
    const status = String(fd.get("status") ?? "").trim() as RegistrationStatus;
    if (!regId || !status) return { ok: false, error: "Missing data." };
    const supabase = createServiceClient();
    await services.updateRegistrationStatus(supabase, ctx.siteId, regId, status);
    logAudit({ action: `registration.${status}`, entityType: "registration", entityId: regId });
    revalidatePath("/admin/registrations"); revalidatePath("/admin");
    return { ok: true };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}
