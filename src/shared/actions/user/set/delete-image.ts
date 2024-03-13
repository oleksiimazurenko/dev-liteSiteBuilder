import prisma from "@/shared/lib/prisma-client";
import { getErrorMessage } from "@/shared/utils/extract-error-message";
import crypto from "crypto";
import { existsSync, promises as fs } from "fs";
import path from "path";

// Вспомогательная функция для вычисления хеша файла
const calculateFileHash = async (filePath: string) => {
  const fileBuffer = await fs.readFile(filePath);
  return crypto.createHash("sha256").update(fileBuffer).digest("hex");
};

const deleteImage = async (userId: string, imageName: string) => {
  const userDirectoryPath = path.join(process.cwd(), "public/users", userId);
  const imageFilePath = path.join(userDirectoryPath, imageName);

  try {
    // Вычисление хеша файла перед его удалением
    let fileHash = "";
    if (existsSync(imageFilePath))
      fileHash = await calculateFileHash(imageFilePath);

    // Удаление файла изображения
    if (fileHash && existsSync(imageFilePath)) {
      await fs.unlink(imageFilePath);
      console.log(`Image file ${imageName} deleted.`);
    } else {
      throw new Error(
        `Image file ${imageName} does not exist or hash couldn't be calculated.`,
      );
    }

    // Обновление списка хешей в поле imageHashs
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { imageData: true },
    });

    if (user && user.imageData) {
      // Десериализуем JSON в массив объектов
      const imageDataArray = JSON.parse(user.imageData as string);

      // Ищем и удаляем объект с соответствующим именем файла
      const updatedImageDataArray = imageDataArray.filter(
        (item: { name: string; hash: string }) => item.name !== imageName,
      );

      // Сериализуем обновленный массив объектов обратно в JSON
      const updatedImageData = JSON.stringify(updatedImageDataArray);

      // Обновляем поле imageData пользователя в базе данных
      await prisma.user.update({
        where: { id: userId },
        data: { imageData: updatedImageData },
      });
    } else {
      throw new Error("User not found or hash no image data.");
    }
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};

export { deleteImage };
