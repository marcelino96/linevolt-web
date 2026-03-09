"use client";

import { useState } from "react";

export function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (next !== confirm) {
      setMessage({ type: "error", text: "Password baru tidak cocok." });
      return;
    }
    if (next.length < 8) {
      setMessage({ type: "error", text: "Password minimal 8 karakter." });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Gagal mengubah password." });
      } else {
        setMessage({ type: "success", text: "Password berhasil diubah!" });
        setCurrent("");
        setNext("");
        setConfirm("");
      }
    } catch {
      setMessage({ type: "error", text: "Terjadi kesalahan. Coba lagi." });
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center font-sans px-4">
      <div className="w-full max-w-sm p-8 rounded-3xl border border-white/10 bg-white/[0.03]">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-400/15 border border-orange-400/30 mb-6 mx-auto">
          <svg
            width="22" height="22" viewBox="0 0 24 24"
            fill="none" stroke="#F97316" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>

        <h1 className="text-white font-black text-xl text-center mb-1">Ganti Password</h1>
        <p className="text-gray-500 text-sm text-center mb-6">Admin Linevolt CMS</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="Password sekarang"
            required
            autoComplete="current-password"
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-orange-400/60 transition-colors"
          />
          <input
            type="password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            placeholder="Password baru (min. 8 karakter)"
            required
            autoComplete="new-password"
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-orange-400/60 transition-colors"
          />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Konfirmasi password baru"
            required
            autoComplete="new-password"
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-orange-400/60 transition-colors"
          />

          {message && (
            <p className={`text-xs px-1 ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-400 transition-colors disabled:opacity-60"
          >
            {loading ? "Menyimpan..." : "Ubah Password"}
          </button>
        </form>

        <div className="flex justify-between mt-6">
          <a href="/studio" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            ← Studio
          </a>
          <a href="/admin/login" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
