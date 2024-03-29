"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { db } from "@/shared/lib/auth/lib/db";
import { sendVerificationEmail } from "@/shared/lib/auth/lib/mail";
import { generateVerificationToken } from "@/shared/lib/auth/lib/tokens";
import { getUserByEmail } from "../get/user";
import { getRegisterSchema } from '../../schemas'

const RegisterSchema = getRegisterSchema()

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
