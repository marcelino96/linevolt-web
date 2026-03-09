import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { StudioView } from "./StudioView";

export { metadata, viewport } from "next-sanity/studio";

const isSanityReady = () => !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export default async function StudioPage() {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  if (!isSanityReady()) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-8">
        <div className="max-w-lg w-full border border-orange-400/30 rounded-3xl p-10 bg-orange-400/5 text-center">
          <div className="w-14 h-14 rounded-full bg-orange-400/15 flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-white mb-3">Sanity Belum Dikonfigurasi</h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Untuk menggunakan Sanity Studio, buat project di{" "}
            <strong className="text-orange-400">sanity.io</strong> lalu isi env vars di{" "}
            <code className="bg-white/10 text-orange-300 px-2 py-0.5 rounded">.env.local</code>
          </p>
          <div className="text-left bg-[#0a0a0a] border border-white/10 rounded-xl p-5 text-sm font-mono text-gray-400 mb-8">
            <p className="text-gray-600 mb-2"># .env.local</p>
            <p><span className="text-orange-300">NEXT_PUBLIC_SANITY_PROJECT_ID</span>=<span className="text-green-400">your_project_id</span></p>
            <p><span className="text-orange-300">NEXT_PUBLIC_SANITY_DATASET</span>=<span className="text-green-400">production</span></p>
            <p><span className="text-orange-300">SANITY_API_TOKEN</span>=<span className="text-green-400">your_token</span></p>
          </div>
          <ol className="text-left text-sm text-gray-500 space-y-2">
            <li>1. Buka <strong className="text-gray-300">sanity.io</strong> → Create free project</li>
            <li>2. Copy <strong className="text-gray-300">Project ID</strong> dari dashboard</li>
            <li>3. Buat API Token (Editor role) di Settings → API</li>
            <li>4. Isi di <code className="text-orange-300">.env.local</code> lalu restart dev server</li>
          </ol>
        </div>
      </div>
    );
  }

  return <StudioView />;
}
