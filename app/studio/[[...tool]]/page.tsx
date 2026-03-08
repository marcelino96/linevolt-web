import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { StudioView } from "./StudioView";

export { metadata, viewport } from "next-sanity/studio";

export default async function StudioPage() {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }
  return <StudioView />;
}
