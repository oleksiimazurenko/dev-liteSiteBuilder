import { z } from "zod";

export const FirstSchema = z.object({
  name: z.string().min(2, { message: "error" }),
  url: z.string().min(2, { message: "error" }),
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
  aboutMe: z.string().min(5, { message: "error" }),
});
