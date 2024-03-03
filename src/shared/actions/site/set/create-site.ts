"use server";

import { componentStyles } from "@/shared/initial-styles/style-component";
import { sectionStyles } from "@/shared/initial-styles/style-section";
import prisma from "@/shared/lib/prisma-client";
import { getErrorMessage } from "@/shared/utils/extract-error-message";
import { revalidatePath } from "next/cache";

const createSite = async (
  id: string,
  name: string,
  status: boolean,
  views: number,
  view: boolean,
  url: string,
) => {
  try {
    // Используем $transaction для атомарного создания страницы, секции и компонента
    const transactionResult = await prisma.$transaction(async (prisma) => {
      // Создаем сайт
      const site = await prisma.site.create({
        data: {
          name,
          status,
          views,
          view,
          url,
          userId: id,
        },
      });

      // Создаем страницу
      const page = await prisma.page.create({
        data: {
          name,
          url,
          siteId: site.id,
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
          tag: "div",
          innerStyles: componentStyles.innerStyles,
          outerStyles: componentStyles.outerStyles,
          textContent: section.name,
          sectionId: section.id,
          position: 1,
        },
      });

      return { page, section, component };
    });

    revalidatePath("/list-sites/[siteId]", "layout");

    return { success: true, data: transactionResult };
  } catch (error) {
    console.error(getErrorMessage(error));
    return { success: false, error: getErrorMessage(error) };
  }
};

export { createSite };
