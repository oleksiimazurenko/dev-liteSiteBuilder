import { useSession } from "next-auth/react";

export const useCurrentRole = (): string => {
  const session = useSession();

  return session.data?.user?.role;
};
