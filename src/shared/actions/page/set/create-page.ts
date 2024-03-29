"use server";

import prisma from "@/shared/lib/prisma-client";
import { text } from "@/shared/styles/initial/style-component";
import { sectionStyles } from "@/shared/styles/initial/style-section";
import { getErrorMessage } from "@/shared/utils/extract-error-message";
import { revalidatePath } from "next/cache";

const createPage = async (id: string, name: string, url: string) => {
  try {
    // Используем $transaction для атомарного создания страницы, секции и компонента
    const transactionResult = await prisma.$transaction(async (prisma) => {
      // Создаем страницу
      const page = await prisma.page.create({
        data: {
          name,
          url,
          siteId: id,
        },
      });

      // Создаем секцию для этой страницы
      const section = await prisma.section.create({
        data: {
          sectionStyles: {
            ...sectionStyles.sectionStyles,
            height: "300px",
            paddingTop: "120px",
          },
          containerStyles: { ...sectionStyles.containerStyles },
          name: page.name,
          pageId: page.id,
          position: 1,
        },
      });

      // Создаем компонент в этой секции
      const component = await prisma.component.create({
        data: {
          type: "text",
          parentTag: "div",
          innerStyles: text.innerStyles,
          outerStyles: text.outerStyles,
          textContent: section.name,
          sectionId: section.id,
          position: 1,
        },
      });

      return { page, section, component };
    });

    revalidatePath("/[pageSlug]", "page");
    revalidatePath("/", "layout");

    return { success: true, data: transactionResult };
  } catch (error) {
    console.error(getErrorMessage(error));
    return { success: false, error: getErrorMessage(error) };
  }
};

export { createPage };
