"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Project = { id: string; name: string; location: string; year: string; tag: string; tagEN: string; image: string; images?: string[]; gradient: string; color: string; };
type BlogPost = { slug: string; title: string; excerpt: string; content: string; coverImage: string; tags: string; publishedAt: string; readTime: string; author: string; };
type DeleteTarget = { type: "portfolio"; id: string } | { type: "blog"; slug: string };

const GRADIENTS = ["from-amber-900/80 to-orange-900/60", "from-blue-900/80 to-indigo-900/60", "from-purple-900/80 to-pink-900/60", "from-emerald-900/80 to-teal-900/60", "from-red-900/80 to-rose-900/60", "from-sky-900/80 to-cyan-900/60"];
const COLORS = ["#F97316", "#60a5fa", "#a78bfa", "#34d399", "#f87171", "#22d3ee"];
const EMPTY_P: Project = { id: "", name: "", location: "", year: new Date().getFullYear().toString(), tag: "", tagEN: "", image: "", images: [], gradient: GRADIENTS[0], color: COLORS[0] };
const EMPTY_B: BlogPost = { slug: "", title: "", excerpt: "", content: "", coverImage: "", tags: "", publishedAt: new Date().toISOString().split("T")[0], readTime: "5 menit", author: "Tim Linevolt" };

export default function AdminPage() {
    const [auth, setAuth] = useState(false);
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [tab, setTab] = useState<"portfolio" | "blog">("portfolio");

    const [projects, setProjects] = useState<Project[]>([]);
    const [editing, setEditing] = useState<Project | null>(null);
    const [isNew, setIsNew] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const multiFileRef = useRef<HTMLInputElement>(null);
    const blogCoverRef = useRef<HTMLInputElement>(null);

    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [editPost, setEditPost] = useState<BlogPost | null>(null);
    const [isNewPost, setIsNewPost] = useState(false);
    const [uploadingCover, setUploadingCover] = useState(false);

    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState("");
    const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
    const [deleting, setDeleting] = useState(false);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3500); };

    const handleLogin = async () => {
        const res = await fetch("/api/admin/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
        if (res.ok) { setAuth(true); loadProjects(); loadPosts(); }
        else setAuthError("Password salah. Coba lagi.");
    };

    const loadProjects = async () => { const d = await fetch("/api/admin/portfolio").then(r => r.json()); setProjects(d); };
    const loadPosts = async () => { const d = await fetch("/api/admin/blog").then(r => r.json()); setPosts(Array.isArray(d) ? d : []); };

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            if (deleteTarget.type === "portfolio") {
                const res = await fetch("/api/admin/portfolio", {
                    method: "POST", headers: { "Content-Type": "application/json", "x-admin-password": password },
                    body: JSON.stringify({ action: "delete", id: deleteTarget.id })
                });
                if (res.ok) { showToast("🗑️ Project dihapus."); loadProjects(); }
                else { const err = await res.json(); showToast(`❌ Gagal: ${err.error || res.status}`); }
            } else {
                const res = await fetch("/api/admin/blog", {
                    method: "POST", headers: { "Content-Type": "application/json", "x-admin-password": password },
                    body: JSON.stringify({ action: "delete", slug: deleteTarget.slug })
                });
                if (res.ok) { showToast("🗑️ Artikel dihapus."); loadPosts(); }
                else { const err = await res.json(); showToast(`❌ Gagal: ${err.error || res.status}`); }
            }
        } catch (e) { showToast("❌ Network error."); }
        setDeleting(false);
        setDeleteTarget(null);
    };

    const handleSave = async () => {
        if (!editing) return; setSaving(true);
        const proj = { ...editing, id: editing.id || editing.name.toLowerCase().replace(/\s+/g, "-"), image: editing.images?.[0] || editing.image || "" };
        const payload = isNew ? { action: "add", project: proj } : { action: "update", project: proj };
        const res = await fetch("/api/admin/portfolio", { method: "POST", headers: { "Content-Type": "application/json", "x-admin-password": password }, body: JSON.stringify(payload) });
        if (res.ok) { showToast(isNew ? "✅ Project ditambahkan!" : "✅ Project diperbarui!"); setEditing(null); loadProjects(); }
        else { const err = await res.json(); showToast(`❌ Gagal: ${err.error || res.status}`); }
        setSaving(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, multi = false) => {
        const files = e.target.files; if (!files || !editing) return;
        setUploading(true);
        for (const file of Array.from(files)) {
            const formData = new FormData(); formData.append("file", file); formData.append("name", editing.id || "upload");
            const res = await fetch("/api/admin/upload", { method: "POST", headers: { "x-admin-password": password }, body: formData });
            if (res.ok) {
                const { path } = await res.json();
                setEditing(prev => prev ? { ...prev, images: [...(prev.images || []), path], image: prev.images?.[0] || path } : prev);
            }
        }
        e.target.value = "";
        setUploading(false); showToast("📸 Foto berhasil diupload!");
    };

    const removeImage = (idx: number) => {
        if (!editing) return;
        const newImages = (editing.images || []).filter((_, i) => i !== idx);
        setEditing({ ...editing, images: newImages, image: newImages[0] || "" });
    };

    const handleSaveBlog = async () => {
        if (!editPost) return; setSaving(true);
        const slug = editPost.slug || editPost.title.toLowerCase().replace(/[^a-z0-9\s]+/g, "").trim().replace(/\s+/g, "-");
        const post = { ...editPost, slug };
        const res = await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json", "x-admin-password": password }, body: JSON.stringify({ action: "save", post }) });
        if (res.ok) { showToast("✅ Artikel disimpan!"); setEditPost(null); loadPosts(); }
        else { const err = await res.json(); showToast(`❌ Gagal: ${err.error || res.status}`); }
        setSaving(false);
    };

    const handleBlogCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file || !editPost) return;
        setUploadingCover(true);
        const formData = new FormData(); formData.append("file", file); formData.append("name", `blog-${editPost.slug || "cover"}`);
        const res = await fetch("/api/admin/upload", { method: "POST", headers: { "x-admin-password": password }, body: formData });
        if (res.ok) {
            const { path } = await res.json();
            setEditPost(prev => prev ? { ...prev, coverImage: path } : prev);
            showToast("🖼️ Cover foto diupload!");
        } else showToast("❌ Upload gagal.");
        setUploadingCover(false); e.target.value = "";
    };

    if (!auth) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center font-sans">
            <div className="w-full max-w-sm p-8 rounded-3xl border border-white/10 bg-white/3">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-400/15 border border-orange-400/30 mb-6 mx-auto">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                </div>
                <h1 className="text-white font-black text-xl text-center mb-1">Linevolt Admin</h1>
                <p className="text-gray-500 text-sm text-center mb-6">Masukkan password untuk melanjutkan</p>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="Password admin..." className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-orange-400/60 mb-3" />
                {authError && <p className="text-red-400 text-xs mb-3">{authError}</p>}
                <button onClick={handleLogin} className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-400 transition-colors">Masuk</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans">
            {toast && <div className="fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl bg-[#111] border border-white/15 text-sm shadow-2xl animate-fade-in">{toast}</div>}

            {/* Delete Confirmation Modal */}
            {deleteTarget && (
                <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
                    <div className="w-full max-w-sm bg-[#111] border border-red-500/30 rounded-3xl p-7 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
                        </div>
                        <h3 className="font-black text-lg text-white mb-2">Konfirmasi Hapus</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            {deleteTarget.type === "portfolio" ? `Hapus project "${projects.find(p => p.id === deleteTarget.id)?.name}"?` : `Hapus artikel "${posts.find(p => p.slug === deleteTarget.slug)?.title}"?`}
                            <br /><span className="text-red-400 text-xs mt-1 block">Tindakan ini tidak dapat dibatalkan.</span>
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteTarget(null)} disabled={deleting} className="flex-1 py-3 rounded-xl border border-white/15 text-gray-400 font-semibold text-sm hover:border-white/30 hover:text-white transition-colors">Batal</button>
                            <button onClick={confirmDelete} disabled={deleting} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-500 transition-colors disabled:opacity-60">
                                {deleting ? "Menghapus..." : "Ya, Hapus"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <header className="border-b border-white/8 px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Image src="/logo-alt.png" alt="Linevolt" width={100} height={32} className="object-contain" />
                    <span className="text-xs text-orange-400 font-semibold tracking-widest uppercase border border-orange-400/30 px-2 py-0.5 rounded-full">Admin</span>
                </div>
                <a href="/" target="_blank" className="text-gray-400 text-sm hover:text-white transition-colors">← Lihat Website</a>
            </header>

            <div className="border-b border-white/8 px-8">
                <div className="flex gap-1 max-w-5xl mx-auto">
                    {(["portfolio", "blog"] as const).map(t => (
                        <button key={t} onClick={() => setTab(t)} className={`px-5 py-3.5 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${tab === t ? "border-orange-500 text-orange-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
                            {t === "portfolio" ? "📁 Portfolio" : "✍️ Blog"}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-8 py-10">

                {/* ── PORTFOLIO TAB ── */}
                {tab === "portfolio" && (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <div><h2 className="text-2xl font-black">Kelola Portfolio</h2><p className="text-gray-500 text-sm mt-1">{projects.length} project</p></div>
                            <button onClick={() => { setEditing({ ...EMPTY_P }); setIsNew(true); }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-400 transition-colors">+ Tambah Project</button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-10">
                            {projects.map(p => (
                                <div key={p.id} className="relative rounded-2xl border border-white/8 overflow-hidden group" style={{ minHeight: 180 }}>
                                    {p.image ? <Image src={p.image} alt={p.name} fill className="object-cover opacity-60" /> : <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-60`} />}
                                    <div className="absolute inset-0 bg-black/50" />
                                    <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                                        <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full border" style={{ color: p.color, borderColor: `${p.color}50`, background: `${p.color}15` }}>{p.tag}</span>
                                        <div>
                                            <p className="font-black text-lg">{p.name}</p>
                                            <p className="text-gray-400 text-sm">{p.location} · {p.year}</p>
                                            {p.images && p.images.length > 1 && <p className="text-xs text-orange-400 mt-1">📸 {p.images.length} foto</p>}
                                        </div>
                                    </div>
                                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        <button onClick={() => { setEditing({ ...p, images: p.images || [p.image].filter(Boolean) }); setIsNew(false); }} className="px-3 py-1.5 rounded-lg bg-white/15 text-white text-xs font-semibold hover:bg-white/25">Edit</button>
                                        <button onClick={() => setDeleteTarget({ type: "portfolio", id: p.id })} className="px-3 py-1.5 rounded-lg bg-red-500/30 text-red-300 text-xs font-semibold hover:bg-red-500/50">Hapus</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* ── BLOG TAB ── */}
                {tab === "blog" && (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <div><h2 className="text-2xl font-black">Kelola Blog</h2><p className="text-gray-500 text-sm mt-1">{posts.length} artikel</p></div>
                            <button onClick={() => { setEditPost({ ...EMPTY_B }); setIsNewPost(true); }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-400 transition-colors">+ Tulis Artikel</button>
                        </div>
                        <div className="space-y-3 mb-10">
                            {posts.length === 0 && <div className="text-center py-12 text-gray-600 text-sm">Belum ada artikel.</div>}
                            {posts.map(p => (
                                <div key={p.slug} className="flex items-center gap-4 p-5 rounded-2xl border border-white/8 bg-[#0d0d0d] hover:border-white/15 transition-colors">
                                    {p.coverImage && (
                                        <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                            <Image src={p.coverImage} alt="" fill className="object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm text-white truncate">{p.title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{p.publishedAt} · {p.readTime} · {p.tags}</p>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <a href={`/blog/${p.slug}`} target="_blank" className="px-3 py-1.5 rounded-lg bg-white/8 text-gray-400 text-xs font-semibold hover:bg-white/15 hover:text-white transition-colors">Lihat</a>
                                        <button onClick={() => { setEditPost({ ...p }); setIsNewPost(false); }} className="px-3 py-1.5 rounded-lg bg-white/15 text-white text-xs font-semibold hover:bg-white/25">Edit</button>
                                        <button onClick={() => setDeleteTarget({ type: "blog", slug: p.slug })} className="px-3 py-1.5 rounded-lg bg-red-500/30 text-red-300 text-xs font-semibold hover:bg-red-500/50">Hapus</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="rounded-2xl border border-orange-400/20 bg-orange-400/5 p-5 text-sm text-gray-400">
                            <p className="font-semibold text-white mb-2">🤖 Blog Automation dengan AI</p>
                            <p>Gunakan ChatGPT dengan prompt: <em className="text-orange-300">&quot;Tulis artikel SEO Bahasa Indonesia tentang [topik], 900 kata, format markdown, untuk Linevolt website spesialis LED Strip & Videotron&quot;</em> — paste hasilnya + upload cover foto, klik Simpan. &lt; 5 menit!</p>
                        </div>
                    </>
                )}
            </div>

            {/* Portfolio Edit Modal */}
            {editing && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) setEditing(null); }}>
                    <div className="w-full max-w-lg bg-[#0d0d0d] border border-white/12 rounded-3xl p-7 max-h-[90vh] overflow-y-auto">
                        <h3 className="font-black text-lg mb-5">{isNew ? "Tambah Project Baru" : `Edit: ${editing.name}`}</h3>
                        <div className="space-y-4">
                            {isNew && <Field label="ID (slug)"><input value={editing.id} onChange={e => setEditing({ ...editing, id: e.target.value })} placeholder="yes-chef" className="field-input" /></Field>}
                            <Field label="Nama Project"><input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="Yes Chef" className="field-input" /></Field>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Lokasi"><input value={editing.location} onChange={e => setEditing({ ...editing, location: e.target.value })} placeholder="Jakarta" className="field-input" /></Field>
                                <Field label="Tahun"><input value={editing.year} onChange={e => setEditing({ ...editing, year: e.target.value })} placeholder="2025" className="field-input" /></Field>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Tag (ID)"><input value={editing.tag} onChange={e => setEditing({ ...editing, tag: e.target.value })} placeholder="Restaurant Lighting" className="field-input" /></Field>
                                <Field label="Tag (EN)"><input value={editing.tagEN} onChange={e => setEditing({ ...editing, tagEN: e.target.value })} placeholder="Restaurant Lighting" className="field-input" /></Field>
                            </div>
                            <Field label={`📸 Foto Slideshow (${(editing.images || []).length} foto)`}>
                                <div className="space-y-3">
                                    {(editing.images || []).length > 0 && (
                                        <div className="grid grid-cols-3 gap-2">
                                            {(editing.images || []).map((img, idx) => (
                                                <div key={idx} className="relative rounded-xl overflow-hidden border border-white/10" style={{ aspectRatio: "16/9" }}>
                                                    <Image src={img} alt="" fill className="object-cover" />
                                                    <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors">×</button>
                                                    {idx === 0 && <span className="absolute bottom-1 left-1 text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded leading-none">Cover</span>}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex gap-2">
                                        <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex-1 py-2 rounded-xl border border-orange-400/40 text-orange-400 text-sm font-semibold hover:bg-orange-400/10 transition-colors disabled:opacity-50">{uploading ? "Uploading..." : "📷 Upload Foto"}</button>
                                        <button onClick={() => multiFileRef.current?.click()} disabled={uploading} className="flex-1 py-2 rounded-xl border border-white/20 text-gray-400 text-sm font-semibold hover:bg-white/5 transition-colors disabled:opacity-50">+ Multi Foto</button>
                                    </div>
                                    <input ref={fileRef} type="file" accept="image/*" onChange={e => handleImageUpload(e, false)} className="hidden" />
                                    <input ref={multiFileRef} type="file" accept="image/*" multiple onChange={e => handleImageUpload(e, true)} className="hidden" />
                                </div>
                            </Field>
                            <Field label="Warna Aksen">
                                <div className="flex gap-2">{COLORS.map(c => (<button key={c} onClick={() => setEditing({ ...editing, color: c })} className="w-8 h-8 rounded-full border-2 transition-all" style={{ background: c, borderColor: editing.color === c ? "#fff" : "transparent" }} />))}</div>
                            </Field>
                            <Field label="Gradient Fallback">
                                <select value={editing.gradient} onChange={e => setEditing({ ...editing, gradient: e.target.value })} className="field-input">
                                    {GRADIENTS.map(g => <option key={g} value={g}>{g.replace("from-", "").replace(" to-", " → ").replace(/\/\d+/g, "")}</option>)}
                                </select>
                            </Field>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setEditing(null)} className="flex-1 py-3 rounded-xl border border-white/15 text-gray-400 font-semibold text-sm hover:border-white/30 hover:text-white transition-colors">Batal</button>
                            <button onClick={handleSave} disabled={saving} className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-400 transition-colors disabled:opacity-60">{saving ? "Menyimpan..." : "Simpan"}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Blog Edit Modal */}
            {editPost && (
                <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) setEditPost(null); }}>
                    <div className="w-full max-w-2xl bg-[#0d0d0d] border border-white/12 rounded-3xl p-7 max-h-[92vh] overflow-y-auto">
                        <h3 className="font-black text-lg mb-5">{isNewPost ? "Tulis Artikel Baru" : `Edit: ${editPost.title}`}</h3>
                        <div className="space-y-4">
                            <Field label="Judul Artikel"><input value={editPost.title} onChange={e => setEditPost({ ...editPost, title: e.target.value })} placeholder="Judul artikel..." className="field-input" /></Field>
                            <Field label="Slug URL (kosongkan untuk auto-generate)"><input value={editPost.slug} onChange={e => setEditPost({ ...editPost, slug: e.target.value })} placeholder="judul-artikel-ini" className="field-input" /></Field>
                            <Field label="Excerpt (ringkasan singkat untuk SEO)"><textarea value={editPost.excerpt} onChange={e => setEditPost({ ...editPost, excerpt: e.target.value })} rows={2} placeholder="Ringkasan 1-2 kalimat..." className="field-input resize-none" /></Field>

                            {/* Cover Image */}
                            <Field label="🖼️ Cover Image (penting untuk SEO & social media)">
                                <div className="space-y-2">
                                    {editPost.coverImage && (
                                        <div className="relative rounded-xl overflow-hidden border border-white/10" style={{ aspectRatio: "16/9", maxHeight: 160 }}>
                                            <Image src={editPost.coverImage} alt="cover" fill className="object-cover" />
                                            <button onClick={() => setEditPost({ ...editPost, coverImage: "" })} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors">×</button>
                                        </div>
                                    )}
                                    <div className="flex gap-2">
                                        <input value={editPost.coverImage} onChange={e => setEditPost({ ...editPost, coverImage: e.target.value })} placeholder="/images/blog/nama-file.jpg" className="field-input flex-1 text-xs" />
                                        <button onClick={() => blogCoverRef.current?.click()} disabled={uploadingCover} className="px-4 py-2 rounded-xl border border-orange-400/40 text-orange-400 text-sm font-semibold hover:bg-orange-400/10 transition-colors disabled:opacity-50 shrink-0">
                                            {uploadingCover ? "..." : "Upload"}
                                        </button>
                                    </div>
                                    <input ref={blogCoverRef} type="file" accept="image/*" onChange={handleBlogCoverUpload} className="hidden" />
                                </div>
                            </Field>

                            <Field label="Konten Artikel (Markdown)">
                                <textarea value={editPost.content} onChange={e => setEditPost({ ...editPost, content: e.target.value })} rows={12} placeholder={"## Judul Section\n\nTulis konten artikel di sini.\n\n**Bold text**, *italic*, ## heading, - list item"} className="field-input resize-y font-mono text-xs" />
                            </Field>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Tags (pisah koma)"><input value={editPost.tags} onChange={e => setEditPost({ ...editPost, tags: e.target.value })} placeholder="LED Strip, Tutorial" className="field-input" /></Field>
                                <Field label="Estimasi Baca"><input value={editPost.readTime} onChange={e => setEditPost({ ...editPost, readTime: e.target.value })} placeholder="5 menit" className="field-input" /></Field>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Tanggal Publish"><input type="date" value={editPost.publishedAt} onChange={e => setEditPost({ ...editPost, publishedAt: e.target.value })} className="field-input" /></Field>
                                <Field label="Author"><input value={editPost.author} onChange={e => setEditPost({ ...editPost, author: e.target.value })} placeholder="Tim Linevolt" className="field-input" /></Field>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setEditPost(null)} className="flex-1 py-3 rounded-xl border border-white/15 text-gray-400 font-semibold text-sm hover:border-white/30 hover:text-white transition-colors">Batal</button>
                            <button onClick={handleSaveBlog} disabled={saving} className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-400 transition-colors disabled:opacity-60">{saving ? "Menyimpan..." : "Simpan & Publish"}</button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .field-input { width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); border-radius:12px; padding:10px 14px; color:white; font-size:14px; outline:none; transition:border-color 0.2s; }
                .field-input:focus { border-color:rgba(249,115,22,0.5); }
                .field-input option { background:#111; }
            `}</style>
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="block text-xs text-gray-400 font-semibold mb-1.5 uppercase tracking-wide">{label}</label>
            {children}
        </div>
    );
}
