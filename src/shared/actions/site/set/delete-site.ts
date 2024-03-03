"use server";

import prisma from "@/shared/lib/prisma-client";
import { getErrorMessage } from "@/shared/utils/extract-error-message";
import { revalidatePath } from "next/cache";

const deleteSite = async (id: string) => {
  try {
    const transactionResult = await prisma.$transaction(async (prisma) => {
      // Получаем идентификаторы страниц, связанные с этим сайтом
      const pages = await prisma.page.findMany({
        where: { siteId: id },
        select: { id: true }, // Только идентификаторы страниц
      });
      const pageIds = pages.map((page) => page.id);

      // Если страницы есть, то далее ищем секции, связанные с этими страницами
      if (pageIds.length > 0) {
        const sections = await prisma.section.findMany({
          where: { pageId: { in: pageIds } },
          select: { id: true }, // Только идентификаторы секций
        });
        const sectionIds = sections.map((section) => section.id);

        // Удаляем компоненты, связанные с этими секциями
        if (sectionIds.length > 0) {
          await prisma.component.deleteMany({
            where: {
              sectionId: { in: sectionIds },
            },
          });
        }

        // Удаляем секции, связанные с этими страницами
        await prisma.section.deleteMany({
          where: {
            pageId: { in: pageIds },
          },
        });
      }

      // Удаляем страницы, связанные с этим сайтом
      await prisma.page.deleteMany({
        where: {
          id: { in: pageIds },
        },
      });

      // Удаляем сайт
      return await prisma.site.delete({
        where: {
          id,
        },
      });
    });

    revalidatePath("/list-sites/[siteId]", "layout");

    return { success: true, data: transactionResult };
  } catch (error) {
    console.error(getErrorMessage(error));
    return { success: false, error: getErrorMessage(error) };
  }
};

export { deleteSite };
