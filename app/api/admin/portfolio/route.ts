import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "content", "portfolio.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "linevolt2025";

function getAuth(req: NextRequest) {
    return req.headers.get("x-admin-password") === ADMIN_PASSWORD;
}

export async function GET() {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    if (!getAuth(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    let projects = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

    if (body.action === "add") {
        projects.push(body.project);
    } else if (body.action === "update") {
        projects = projects.map((p: { id: string }) => p.id === body.project.id ? body.project : p);
    } else if (body.action === "delete") {
        projects = projects.filter((p: { id: string }) => p.id !== body.id);
    }

    fs.writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2));
    return NextResponse.json({ ok: true });
}
