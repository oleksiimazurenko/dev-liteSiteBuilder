"use server";

import prisma from "@/shared/lib/prisma-client";
import { getErrorMessage } from "@/shared/utils/extract-error-message";
import crypto from "crypto";
import { existsSync, promises as fs } from "fs";
import path from "path";

const calculateFileHash = (buffer: Buffer): string => {
  return crypto.createHash("sha256").update(buffer).digest("hex");
};

const isImageUnique = async (
  fileHash: string,
  userId: string,
): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user && user.imageData) {
    const imageDataArray = JSON.parse(user.imageData as string);

    const hashExists = imageDataArray.some(
      (item: { hash: string }) => item.hash === fileHash,
    );

    // Если хеш найден, изображение не уникально
    return !hashExists;
  }

  return true;
};

const uploadImage = async (data: FormData, userId: string) => {
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    throw new Error(
      "No file uploaded. Notice in file: src/shared/actions/user/set/upload-image.ts",
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileHash = calculateFileHash(buffer);

  if (!(await isImageUnique(fileHash, userId))) {
    let fileName;

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { imageData: true },
      });

      if (user && user.imageData) {
        fileName = JSON.parse(user.imageData as string).find(
          (user: { name: string; hash: string }) => user.hash === fileHash,
        )?.name;
        fileName = fileName
          ? fileName
          : "Error in file: src/shared/actions/user/set/upload-image.ts";
      }
    } catch (e) {
      console.log(getErrorMessage(e));
    }

    console.log("Image already exists and was not uploaded again.");
    return {
      success: true,
      message: "Image already exists and was not uploaded again.",
      fileName: fileName
        ? fileName
        : "Error in file: src/shared/actions/user/set/upload-image.ts",
    };
  }

  const directoryPath = path.join(process.cwd(), "public/images/users", userId);

  if (!existsSync(directoryPath)) {
    await fs.mkdir(directoryPath, { recursive: true });
  }

  const fileName = `${Date.now()}${getExtension(file.type)}`;
  const imagePath = path.join(directoryPath, fileName);

  try {
    await fs.writeFile(imagePath, buffer);
    console.log(`File uploaded successfully to ${imagePath}`);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { imageData: true },
    });

    if (user && user.imageData) {
      const currentHashes = JSON.parse(user.imageData as string);

      if (Array.isArray(currentHashes)) {
        const existingHashEntry = currentHashes.find(
          (h) => h.hash === fileHash,
        );

        if (existingHashEntry) {
          console.log("Image already exists and was not uploaded again.");
          return {
            success: true,
            message: "Image already exists and was not uploaded again.",
            fileName: existingHashEntry.name,
          };
        }

        const updatedHashes = [
          ...currentHashes,
          { hash: fileHash, name: fileName },
        ];

        await prisma.user.update({
          where: { id: userId },
          data: { imageData: JSON.stringify(updatedHashes) },
        });
      } else {
        await prisma.user.update({
          where: { id: userId },
          data: {
            imageData: JSON.stringify([{ hash: fileHash, name: fileName }]),
          },
        });
      }
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: {
          imageData: JSON.stringify([{ hash: fileHash, name: fileName }]),
        },
      });
    }
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
