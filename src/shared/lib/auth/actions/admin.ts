"use server";

import { currentRole } from "@/shared/lib/auth/actions/get/auth";

export const admin = async () => {
  const role = await currentRole();

  if (role === "ADMIN") {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" };
};
