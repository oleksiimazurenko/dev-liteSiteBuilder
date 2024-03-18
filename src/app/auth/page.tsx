import { LogoIcon } from "@/entities/main/logo-icon";
import { auth } from "@/shared/lib/auth/model/auth";
import { AuthPanel } from "@/widgets/main/auth-panel";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) redirect("/app/home");

  return (
    <div className="flex justify-center items-center min-h-[100svh]">
      <AuthPanel />
    </div>
  );
}
