import { NextResponse } from "next/server";
import { importNewsFromSources } from "@/lib/bots/import";
import { newsSources } from "@/lib/bots/sources";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const dryRun = url.searchParams.get("dryRun") === "1";
  const token = request.headers.get("x-konex-bot-token");

  if (!dryRun && (!process.env.KONEX_BOT_TOKEN || token !== process.env.KONEX_BOT_TOKEN)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const result = await importNewsFromSources(newsSources, { dryRun });
    return NextResponse.json({
      ok: true,
      bot: "news",
      dryRun,
      mode: "human-review-required",
      ...result
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error importando noticias" },
      { status: 500 }
    );
  }
}
