"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LogInButton() {
  const pathname = usePathname();

  const endPath = pathname.endsWith("login");

  return (
    <>
      {!endPath && (
        <Link
          href="/auth/login"
          className="text-[13px] font-[200] text-neutral-500 transition-all hover:!text-neutral-600 dark:text-neutral-400 dark:hover:!text-neutral-300"
        >
          Log in
        </Link>
      )}
    </>
  );
}
