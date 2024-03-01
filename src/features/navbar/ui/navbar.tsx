"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@/shared/ui/button";
import { UserButton } from "./user-button";
import { useCurrentRole } from "@/shared/lib/auth/hooks/use-current-role";

export const Navbar = () => {
  const pathname = usePathname();

  const session = useSession();
  const role = useCurrentRole();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-secondary p-4 shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/info-profil" ? "default" : "outline"}
        >
          <Link href="/info-profil">Info profil</Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>

        <Button
          asChild
          variant={pathname === "/list-sites" ? "default" : "outline"}
        >
          <Link href="/list-sites">List sites</Link>
        </Button>

        <div className="flex flex-1 items-center justify-end">
          <div className="ml-auto mr-4 block">
            {session?.data?.user?.name}
          </div>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
