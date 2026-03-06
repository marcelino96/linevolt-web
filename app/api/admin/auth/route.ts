import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "linevolt2025";

export async function POST(req: NextRequest) {
    const { password } = await req.json();
    if (password === ADMIN_PASSWORD) {
        return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
