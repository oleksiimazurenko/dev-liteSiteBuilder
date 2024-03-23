import { z } from 'zod'

//---------------------------------------------------------------
// Инициализация схемы валидации
//---------------------------------------------------------------
export const imageSchema = z.object({
  file: z.unknown().refine(
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
});