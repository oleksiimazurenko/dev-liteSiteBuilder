"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaApple, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { DEFAULT_LOGIN_REDIRECT } from "@/shared/lib/auth/model/routes";
import { Button } from "@/shared/ui/button";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github" | "apple") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        className="ucw1 dark:ucd1 w-full p-[7px] transition-all hover:scale-105 dark:border-none"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-full w-full " />
      </Button>
      <Button
        className="ucw1 dark:ucd1 w-full p-[7px] transition-all hover:scale-105 dark:border-none"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-full w-full" />
      </Button>
      <Button
        className="ucw1 dark:ucd1 w-full p-[7px] transition-all hover:scale-105 dark:border-none"
        variant="default"
        disabled={true}
        onClick={() => onClick("apple")}
      >
        <FaApple className="h-full w-full" />
      </Button>
    </div>
  );
};
