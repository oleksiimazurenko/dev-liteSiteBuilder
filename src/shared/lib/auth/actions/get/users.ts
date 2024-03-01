import { db } from "@/shared/lib/auth/lib/db";

export const getUsers = async () => {
  try {
    const account = await db.user.findMany();

    return account;
  } catch {
    return null;
  }
};
