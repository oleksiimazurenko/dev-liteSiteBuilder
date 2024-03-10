"use server";

import { auth } from "@/shared/lib/auth/model/auth";
import prisma from "@/shared/lib/prisma-client";
import { getErrorMessage } from "@/shared/utils/extract-error-message";

const getLangUser = async () => {
  try {

    const session = await auth();
    if (!session)
      return {
        success: false,
        message:
          "Session not found. Notice in file: actions/user/get/get-lang-user.ts",
      };

    const id = session.user.id;
    if (!id)
      return {
        success: false,
        message:
          "ID not found. Notice in file: actions/user/get/get-lang-user.ts",
      };

    const userLang = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        lang: true,
      },
    });

    if (userLang === null || !userLang.lang) {
      return {
        success: false,
        message:
          "User lang not found. Notice in file: actions/user/get/get-lang-user.ts",
      };
    }

    return {
      success: true,
      lang: userLang.lang,
    }
  

  } catch (error) {
    console.error(getErrorMessage(error));
    return { success: false, error: getErrorMessage(error) }; // Возвращаем ошибку
  }
};

export { getLangUser };
