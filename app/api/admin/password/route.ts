import { auth } from "@/auth";
import { writeClient, isSanityConfigured } from "@/sanity/lib/client";
import { compare, hash } from "bcryptjs";
import { NextRequest } from "next/server";

async function getCurrentHash(): Promise<string | null> {
  if (isSanityConfigured()) {
    try {
      const doc = await writeClient.fetch(
        `*[_type == "adminSettings" && _id == "adminSettings"][0]{passwordHash}`
      );
      if (doc?.passwordHash) return doc.passwordHash;
    } catch {}
  }
  return process.env.ADMIN_PASSWORD_HASH ?? null;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { currentPassword?: string; newPassword?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { currentPassword, newPassword } = body;

  if (!currentPassword || !newPassword) {
    return Response.json({ error: "Semua field harus diisi." }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return Response.json({ error: "Password minimal 8 karakter." }, { status: 400 });
  }

  // Verify current password
  const storedHash = await getCurrentHash();
  if (storedHash) {
    const valid = await compare(currentPassword, storedHash);
    if (!valid) {
      return Response.json({ error: "Password sekarang tidak valid." }, { status: 400 });
    }
  } else {
    const plain = process.env.ADMIN_PASSWORD;
    if (currentPassword !== plain) {
      return Response.json({ error: "Password sekarang tidak valid." }, { status: 400 });
    }
  }

  // Hash new password and store in Sanity
  const newHash = await hash(newPassword, 12);

  if (isSanityConfigured()) {
    try {
      await writeClient.createOrReplace({
        _type: "adminSettings",
        _id: "adminSettings",
        passwordHash: newHash,
      });
    } catch {
      return Response.json(
        { error: "Gagal menyimpan ke Sanity. Pastikan SANITY_API_TOKEN memiliki write access." },
        { status: 500 }
      );
    }
  } else {
    // No Sanity — instruct user to update env var manually
    return Response.json(
      {
        error:
          "Sanity tidak dikonfigurasi. Set ADMIN_PASSWORD_HASH di environment variables secara manual.",
      },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}
