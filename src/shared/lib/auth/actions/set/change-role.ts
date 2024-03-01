"use server";

import { currentUser } from "@/shared/lib/auth/actions/get/auth";
import { db } from "@/shared/lib/auth/lib/db";
import { revalidatePath } from "next/cache";
import { update } from "../../model/auth";
import { getUserById } from "../get/user";

export const changeRole = async (role: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      role: role.toString(),
    },
  });

  update({
    user: {
      role: updatedUser.role,
    },
  });

  revalidatePath("");
};
