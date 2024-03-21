"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LogInButton() {
  const pathname = usePathname();

  const endPath = pathname.endsWith("login");

  return (
    <>
      {!endPath && (
        <Link href="/auth/login" className="text-primary text-[13px]">
          Log in
        </Link>
      )}
    </>
  );
}
