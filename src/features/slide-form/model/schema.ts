import { getSites } from "@/shared/actions/site/get/get-sites";
import { z } from "zod";

export const FirstSchema = z.object({
  name: z.string().min(2, { message: "Назва не може бути менше 2 символів" }),
  url: z
    .string()
    .min(2, { message: "Назва не може бути менше 2 символів" })
    .refine(
      (url) => {
        const pattern = /^[A-Za-z0-9_-]+$/;
        return pattern.test(url);
      },
      {
        message: "URL може містити тільки літери, цифри, підкреслення та тире",
      },
    )
    .superRefine(async (url, ctx) => {
      const { data: sites } = await getSites();
      const exists = sites?.some((site) => site.url === url);
      if (exists) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "URL вже існує в базі даних",
        });
      }
    }),
});

export const SecondSchema = z.object({
  image: z.unknown().refine(
    (file) => {
      if (!(file instanceof File)) {
        return false;
      }

      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      return validTypes.includes(file.type);
    },
    {
      message: "file not selected, valid file types: jpeg, png, gif",
    },
  ),
  title: z.string().min(2, { message: "error" }),
  subtitle: z.string().min(3, { message: "error" }),
  description: z.string().min(5, { message: "error" }),
});
