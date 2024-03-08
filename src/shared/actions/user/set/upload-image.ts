"use server";

import crypto from "crypto";
import { constants, existsSync } from "fs";
import { access, mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

// // Функция для асинхронной проверки существования файла
const fileExists = async (path: string): Promise<boolean> => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const calculateFileHash = (buffer: Buffer): string => {
  return crypto.createHash("sha256").update(buffer).digest("hex");
};

// Функция для проверки уникальности изображения и создания/обновления файла hashes.json
const isImageUniqueAndUpdateHashFile = async (
  directoryPath: string,
  fileHash: string,
) => {
  const hashFilePath = join(directoryPath, "hashes.json");
  let hashes = [];

  // Создаём директорию, если она не существует
  if (!existsSync(directoryPath)) {
    await mkdir(directoryPath, { recursive: true });
  }

  // Читаем файл hashes.json, если он существует
  if (await fileExists(hashFilePath)) {
    const data = await readFile(hashFilePath, "utf-8");
    hashes = JSON.parse(data);
  }

  // Проверяем, уникально ли изображение
  if (hashes.includes(fileHash)) {
    return false; // Изображение не уникально
  }

  // Добавляем хеш в массив и обновляем файл hashes.json
  hashes.push(fileHash);
  await writeFile(hashFilePath, JSON.stringify(hashes), "utf-8");

  return true; // Изображение уникально
};

const uploadImage = async (
  data: FormData,
  pathName: string,
  nameFolder?: string,
) => {
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileHash = calculateFileHash(buffer);

  const directoryPath = nameFolder
    ? join(process.cwd(), pathName, nameFolder)
    : join(process.cwd(), pathName);

  // Проверяем уникальность изображения перед его записью
  if (!(await isImageUniqueAndUpdateHashFile(directoryPath, fileHash))) {
    console.log("Image already exists and was not uploaded again.");
    return {
      success: true,
      message: "Image already exists and was not uploaded again.",
    };
  }

  try {
    // Записываем файл изображения
    const imagePath = join(
      directoryPath,
      `${Date.now()}${getExtension(file.type)}`,
    );
    await writeFile(imagePath, buffer);
    console.log(`File uploaded successfully to ${imagePath}`);
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
    fileName: file.name,
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
