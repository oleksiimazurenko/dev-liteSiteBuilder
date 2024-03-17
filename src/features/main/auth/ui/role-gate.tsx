"use client";

import { useCurrentRole } from "@/shared/lib/auth/hooks/use-current-role";
import { FormError } from "./response-status/form-error";

type RoleGateProps = {
  children: React.ReactNode;
  allowedRole: "USER" | "ADMIN";
};

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return <>{children}</>;
};
