import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "linevolt2025";

function getAllPosts() {
    if (!fs.existsSync(BLOG_DIR)) return [];
    const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".json"));
    return files
        .map(f => {
            try { return JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), "utf-8")); }
            catch { return null; }
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (slug) {
        const filePath = path.join(BLOG_DIR, `${slug}.json`);
        if (!fs.existsSync(filePath)) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(JSON.parse(fs.readFileSync(filePath, "utf-8")));
    }
    return NextResponse.json(getAllPosts());
}

export async function POST(req: Request) {
    const adminPass = req.headers.get("x-admin-password");
    if (adminPass !== ADMIN_PASSWORD) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

    if (body.action === "save") {
        const post = body.post;
        if (!post.slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
        fs.writeFileSync(path.join(BLOG_DIR, `${post.slug}.json`), JSON.stringify(post, null, 2));
        return NextResponse.json({ ok: true });
    }

    if (body.action === "delete") {
        const filePath = path.join(BLOG_DIR, `${body.slug}.json`);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
