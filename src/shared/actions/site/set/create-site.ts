"use server";

import prisma from "@/shared/lib/prisma-client";
import { avatar, text } from "@/shared/styles/initial/style-component";
import { sectionStyles } from "@/shared/styles/initial/style-section";
import { getErrorMessage } from "@/shared/utils/extract-error-message";
import { revalidatePath } from "next/cache";
import { deleteImage } from "../../user/set/delete-image";
import { uploadImage } from "../../user/set/upload-image";

type ImageObject = {
  data: FormData;
  nameFolder: string;
};

const createSite = async (
  id: string,
  name: string,
  title: string,
  subtitle: string,
  description: string,
  status: boolean,
  views: number,
  url: string,
  imageObject?: ImageObject,
) => {
  let isImageWasUploaded = false;
  let imageFileName: string = "";

  try {
    if (imageObject) {
      const { data, nameFolder } = imageObject;
      const { success, fileName, message } = await uploadImage(
        data,
        nameFolder,
      );

      if (!success) throw new Error(message);

      isImageWasUploaded = true;
      if (fileName) imageFileName = fileName;
    }

    // Используем $transaction для атомарного создания страницы, секции и компонента
    const transactionResult = await prisma.$transaction(async (prisma) => {
      // Создаем сайт
      const site = await prisma.site.create({
        data: {
          name,
          imageName: imageFileName,
          title,
          subtitle,
          description,
          status,
          views,
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
          isMain: true,
        },
      });

      // Создаем секцию для этой страницы
      const section = await prisma.section.create({
        data: {
          sectionStyles: {
            ...sectionStyles.sectionStyles,
            minHeight: "100svh",
          },
          containerStyles: { ...sectionStyles.containerStyles },
          name: page.name,
          pageId: page.id,
          position: 1,
        },
      });

      // Создаем аватар в этой секции
      const avatarComponent = await prisma.component.create({
        data: {
          type: "image",
          parenTag: "div",
          src: `/images/users/${id}/${imageFileName}`,
          alt: name,
          width: 100,
          height: 100,
          innerStyles: avatar.innerStyles,
          outerStyles: avatar.outerStyles,
          sectionId: section.id,
          position: 1,
        },
      });

      // Создаем компонент в этой секции
      const component = await prisma.component.create({
        data: {
          type: "text",
          parenTag: "div",
          innerStyles: text.innerStyles,
          outerStyles: text.outerStyles,
          textContent: section.name,
          sectionId: section.id,
          position: 2,
        },
      });

      return { page, section, avatarComponent, component };
    });

    revalidatePath("/home/[siteId]", "layout");

    return { success: true, data: transactionResult };
  } catch (error) {
    console.error(getErrorMessage(error));

    if (isImageWasUploaded) {
      await deleteImage(id, imageFileName);
    }

    return {
      success: false,
      error: getErrorMessage(error),
      message: "The site was not created",
    };
  }
};

export { createSite };
