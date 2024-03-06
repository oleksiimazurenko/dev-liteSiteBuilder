import { getSites } from "@/shared/actions/site/get/get-sites";
import { z } from "zod";

export const FirstSchema = z.object({
  name: z.string().min(2, { message: "Назва не може бути менше 2 символів" }),
  url: z
    .string()
    .min(2, { message: "Назва не може бути менше 2 символів" })
    .superRefine(async (url, ctx) => {
      const { data: sites } = await getSites(); // Предполагается, что это асинхронная функция
      const exists = sites?.some((site) => site.url === url); // Проверяем, существует ли такой URL
      if (exists) {
        // Если URL существует, добавляем ошибку в контекст Zod
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
