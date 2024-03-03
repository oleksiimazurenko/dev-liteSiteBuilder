import { PrismaClient } from "@prisma/client";
import prisma from '../../prisma-client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || prisma

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;