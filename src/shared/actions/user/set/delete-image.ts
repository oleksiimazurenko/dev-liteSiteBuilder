import crypto from "crypto";
import { existsSync, promises as fs } from "fs";
import path from "path";
import prisma from "@/shared/lib/prisma-client";

// Вспомогательная функция для вычисления хеша файла
const calculateFileHash = async (filePath: string) => {
  const fileBuffer = await fs.readFile(filePath);
  return crypto.createHash("sha256").update(fileBuffer).digest("hex");
};

const deleteImage = async (userId: string, imageName: string) => {
  const userDirectoryPath = path.join(process.cwd(), "public/users", userId);
  const imageFilePath = path.join(userDirectoryPath, imageName);
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // Вычисление хеша файла перед его удалением
  let fileHash = "";
  if (existsSync(imageFilePath)) {
    fileHash = await calculateFileHash(imageFilePath);
  }

  // Удаление файла изображения
  if (fileHash && existsSync(imageFilePath)) {
    await fs.unlink(imageFilePath);
    console.log(`Image file ${imageName} deleted.`);
  } else {
    console.log(`Image file ${imageName} does not exist or hash couldn't be calculated.`);
    return; // Если файл не существует или хеш не может быть вычислен, дальнейшие действия не требуются
  }

  // Обновление списка хешей в поле imageHashs
  if (user && user.imageHashs) {
    const imageHashs = JSON.parse(user.imageHashs as string) // Предполагается, что imageHashs хранит JSON-строку
    const updatedImageHashs = imageHashs.filter((hash: string) => hash !== fileHash);
    await prisma.user.update({
      where: { id: userId },
      data: { imageHashs: JSON.stringify(updatedImageHashs) }, // Сохраняем обновлённый массив хешей в формате JSON
    });
    console.log(`Hash for ${imageName} removed.`);
  } else {
    console.log("User not found or user has no imageHashs.");
  }
};

export { deleteImage };
