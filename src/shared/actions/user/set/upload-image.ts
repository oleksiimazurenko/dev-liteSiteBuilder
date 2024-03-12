"use server";

import prisma from "@/shared/lib/prisma-client"; 
import crypto from "crypto";
import { promises as fs, existsSync } from "fs";
import path from "path";

const calculateFileHash = (buffer: Buffer): string => {
  return crypto.createHash("sha256").update(buffer).digest("hex");
};

// Проверка уникальности изображения в базе данных
const isImageUnique = async (fileHash: string, userId: string): Promise<boolean> => {

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user && user.imageHashs) {
    const hashesArray = JSON.parse(user.imageHashs as string);
    return !hashesArray.includes(fileHash);
  }

  return true;
};


const uploadImage = async (
  data: FormData,
  userId: string,
) => {
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileHash = calculateFileHash(buffer);

  // Проверяем уникальность изображения
  if (!(await isImageUnique(fileHash, userId))) {
    console.log("Image already exists and was not uploaded again.");
    return {
      success: true,
      message: "Image already exists and was not uploaded again.",
    };
  }

  console.log('23421412341234123412341243')

  const directoryPath = path.join(process.cwd(), "public/images/users", userId);

  // Убедитесь, что директория существует
  if (!existsSync(directoryPath)) {
    await fs.mkdir(directoryPath, { recursive: true });
  }

  const fileName = `${Date.now()}${getExtension(file.type)}`;
  const imagePath = path.join(directoryPath, fileName);

  try {
    // Записываем файл изображения
    await fs.writeFile(imagePath, buffer);
    console.log(`File uploaded successfully to ${imagePath}`);

    // Здесь можно обновить запись в базе данных, добавив хеш изображения к пользователю
    await prisma.user.update({
      where: { id: userId },
      data: {
        // Обновите эту часть в соответствии с вашей логикой хранения хешей
        imageHashs: { push: fileHash }, // Пример для MongoDB, для других БД может отличаться
      },
    });

  } catch (error) {
    console.error("Failed to upload image", error);
    return {
      success: false,
      message: "Failed to upload image.",
    };
  }

  return {
    success: true,
    message: "The image was successfully uploaded to the server",
    fileName,
  };
};

const getExtension = (mimeType: string): string => {
  switch (mimeType) {
    case "image/jpeg":
      return ".jpeg";
    case "image/png":
      return ".png";
    case "image/gif":
      return ".gif";
    default:
      return "";
  }
};

export { uploadImage };
