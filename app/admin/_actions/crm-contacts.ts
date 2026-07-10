"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentSite } from "@/lib/site-scope";
import { hasPermission } from "@/lib/audit";
import { services } from "@kodagen/crm-engine";
import type { ContactSource, ContactStatus } from "@kodagen/crm-engine";
import { logAudit } from "@/lib/audit";

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

function bump() { revalidatePath("/admin/contacts"); revalidatePath("/admin/deals"); revalidatePath("/admin"); }

export async function createContact(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  try {
    const ctx = await getCurrentSite();
    if (!ctx) return { ok: false, error: "Not signed in." };
    if (!hasPermission(ctx.role, "contacts.edit", ctx.permissions)) return { ok: false, error: "No permission." };

    const name = String(fd.get("name") ?? "").trim();
    if (!name) return { ok: false, error: "Name is required." };

    const supabase = await createClient();
    const contact = await services.createContact(supabase, ctx.siteId, {
      full_name: name,
      email: String(fd.get("email") ?? "").trim() || undefined,
      phone: String(fd.get("phone") ?? "").trim() || undefined,
      company: String(fd.get("company") ?? "").trim() || undefined,
      job_title: String(fd.get("jobTitle") ?? "").trim() || undefined,
      source: (String(fd.get("source") ?? "manual")) as ContactSource,
      status: (String(fd.get("status") ?? "lead")) as ContactStatus,
      notes: String(fd.get("notes") ?? "").trim() || undefined,
      tags: [],
    });

    logAudit({ action: "contact.create", entityType: "contact", entityId: contact.id, details: { name } });
    bump();
    return { ok: true, id: contact.id };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}

export async function updateContact(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  try {
    const ctx = await getCurrentSite();
    if (!ctx) return { ok: false, error: "Not signed in." };
    if (!hasPermission(ctx.role, "contacts.edit", ctx.permissions)) return { ok: false, error: "No permission." };

    const id = String(fd.get("id") ?? "").trim();
    if (!id) return { ok: false, error: "Missing id." };

    const supabase = await createClient();
    await services.updateContact(supabase, ctx.siteId, id, {
      full_name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim() || null,
      phone: String(fd.get("phone") ?? "").trim() || null,
      company: String(fd.get("company") ?? "").trim() || null,
      job_title: String(fd.get("jobTitle") ?? "").trim() || null,
      source: (String(fd.get("source") ?? "manual")) as ContactSource,
      status: (String(fd.get("status") ?? "lead")) as ContactStatus,
      notes: String(fd.get("notes") ?? "").trim() || null,
    });

    logAudit({ action: "contact.update", entityType: "contact", entityId: id });
    bump();
    return { ok: true };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}

export async function deleteContact(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  try {
    const ctx = await getCurrentSite();
    if (!ctx) return { ok: false, error: "Not signed in." };
    if (!hasPermission(ctx.role, "contacts.edit", ctx.permissions)) return { ok: false, error: "No permission." };

    const id = String(fd.get("id") ?? "").trim();
    if (!id) return { ok: false, error: "Missing id." };

    const supabase = await createClient();
    await services.deleteContact(supabase, ctx.siteId, id);
    logAudit({ action: "contact.delete", entityType: "contact", entityId: id });
    bump();
    return { ok: true };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}
