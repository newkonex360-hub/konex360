"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { ReviewStatus } from "@/lib/bots/types";

const allowedTables = new Set(["news_items", "transport_alerts"]);
const allowedStatuses = new Set<ReviewStatus>(["aprobado", "publicado", "archivado"]);

export async function updateReviewStatus(formData: FormData) {
  const table = String(formData.get("table") ?? "");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as ReviewStatus;

  if (!supabaseAdmin || !allowedTables.has(table) || !id || !allowedStatuses.has(status)) {
    return;
  }

  await supabaseAdmin
    .from(table)
    .update({
      status,
      reviewed_at: new Date().toISOString()
    })
    .eq("id", id);

  revalidatePath("/admin");
}
