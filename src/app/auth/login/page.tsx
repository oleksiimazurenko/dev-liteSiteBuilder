import { LoginPanel } from '@/features/main/auth'
import { auth } from "@/shared/lib/auth/model/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session) redirect("/app/home");

  return (
    <div className="flex justify-center items-center min-h-[calc(100svh-59.5px)]">
      <LoginPanel />
    </div>
  );
}