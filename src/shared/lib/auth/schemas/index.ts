import * as z from "zod";

type DictionaryList = {
	[key: string]: string;
};

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.union([z.literal("ADMIN"), z.literal("USER")]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

// -------------------------------------------------------------

export const getResetSchema = (dictionaryList?: DictionaryList) => {
  const emailWarning = dictionaryList?.email_warning || "Email is required";

	const ResetSchema = z.object({
		email: z.string().email({
			message: emailWarning
		}),
	});

  return ResetSchema;
};

// -------------------------------------------------------------

export const getLoginSchema = (dictionaryList?: DictionaryList) => {
  const emailWarning = dictionaryList?.email_warning || "Email is required";
  const passwordWarning = dictionaryList?.password_warning || "Password is required";

  const LoginSchema = z.object({
    email: z.string().email({ message: emailWarning }),
    password: z.string().min(1, { message: passwordWarning }),
    code: z.optional(z.string()),
  });

  return LoginSchema;
};

// -------------------------------------------------------------


export const getRegisterSchema = (dictionaryList?: DictionaryList) => {
  const emailWarning = dictionaryList?.email_warning || "Email is required";
  const passwordWarning = dictionaryList?.password_warning || "Minimum 6 characters required";
  const nameWarning = dictionaryList?.name_warning || "Name is required";


	const RegisterSchema = z.object({
		email: z.string().email({ message: emailWarning }),
		password: z.string().min(6, { message: passwordWarning }),
		name: z.string().min(1, { message: nameWarning }),
	});


  

  return RegisterSchema;
}
