import { PrismaClient } from "@prisma/client"; // { Prisma, PrismaClient }

const prisma = new PrismaClient();

export const getAllCategories = async () => {
  return prisma.category.findMany();
};
