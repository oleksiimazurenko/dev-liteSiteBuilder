'use client'

import { UserInfo } from "@/features/main/auth";
import { useCurrentUser } from "@/shared/lib/auth/hooks/use-current-user";

export default function InfoProfil() {
  const user = useCurrentUser();
  return <UserInfo user={user} />;
}
