import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { ReviewStatus } from "@/lib/bots/types";

const allowedTables = new Set(["news_items", "transport_alerts"]);
const allowedStatuses = new Set<ReviewStatus>(["pendiente", "aprobado", "publicado", "archivado"]);

export async function POST(request: Request) {
  const token = request.headers.get("x-konex-admin-token");

  if (!process.env.KONEX_ADMIN_TOKEN || token !== process.env.KONEX_ADMIN_TOKEN) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase admin no configurado" }, { status: 500 });
  }

  const body = (await request.json()) as {
    table?: string;
    id?: string;
    status?: ReviewStatus;
  };

  if (!body.table || !allowedTables.has(body.table) || !body.id || !body.status || !allowedStatuses.has(body.status)) {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from(body.table)
    .update({
      status: body.status,
      reviewed_at: new Date().toISOString()
    })
    .eq("id", body.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    table: body.table,
    id: body.id,
    status: body.status
  });
}
