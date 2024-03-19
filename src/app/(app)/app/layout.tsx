import { auth } from "@/shared/lib/auth/model/auth";
import { redirect } from "next/navigation";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: ProtectedLayoutProps) {
  const session = await auth();
  if (!session) redirect("/");

  return <div className="w-full">{children}</div>;
}
