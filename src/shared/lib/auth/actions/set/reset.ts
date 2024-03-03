"use server";

import * as z from "zod";

import { sendPasswordResetEmail } from "@/shared/lib/auth/lib/mail";
import { generatePasswordResetToken } from "@/shared/lib/auth/lib/tokens";
import { getUserByEmail } from "../get/user";
import { getResetSchema } from '../../schemas'

const ResetSchema = getResetSchema()

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid emaiL!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "Reset email sent!" };
};
