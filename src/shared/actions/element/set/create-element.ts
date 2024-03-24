"use server";

import prisma from "@/shared/lib/prisma-client";
import { getErrorMessage } from "@/shared/utils/extract-error-message";
import { Component } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type CreateElement = {
  id: string;
  rPath?: string;
} & Omit<Component, "id" | "section" | "products" | "sectionId" | "position">;

const createElement = async ({
  id,
  type,
  textContent,
  outerStyles,
  innerStyles,
  width,
  height,
  src,
  alt,
  href,
  parentTag,
  rPath,
}: CreateElement) => {
  try {
    // Находим максимальную позицию в разделе и увеличиваем её на 1 для нового компонента
    const maxPosition = await prisma.component.findFirst({
      where: { sectionId: id },
      orderBy: { position: "desc" },
      select: { position: true },
    });

    // Если у нас есть максимальная позиция, увеличиваем её, иначе начинаем с 1
    const newPosition =
      maxPosition && maxPosition.position !== null
        ? maxPosition.position + 1
        : 1;

    const response = await prisma.component.create({
      data: {
        type,
        textContent,
        outerStyles,
        innerStyles,
        width,
        height,
        src,
        alt,
        href,
        parentTag,
        sectionId: id,
        position: newPosition,
      },
    });

    if (rPath) revalidatePath(rPath, "page"); // Если нужно, пересобираем страницу

    return response ? { success: true, data: response } : { success: false }; // Возвращаем результат
  } catch (error) {
    console.error(getErrorMessage(error));
    return { success: false, error: getErrorMessage(error) };
  }
};

export { createElement };
