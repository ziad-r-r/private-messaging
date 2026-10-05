import { NextRequest, NextResponse } from "next/server";
import { handle } from "@/lib/api";
import { ensureSeeded } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function dispatch(req: NextRequest, ctx: { params: { path: string[] } }) {
  try {
    await ensureSeeded();
    return await handle(req, ctx.params.path || []);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}

export const GET = dispatch;
export const POST = dispatch;
export const PATCH = dispatch;
export const DELETE = dispatch;
