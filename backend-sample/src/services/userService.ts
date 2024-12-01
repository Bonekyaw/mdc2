import { PrismaClient } from "@prisma/client"; // { Prisma, PrismaClient }

const prisma = new PrismaClient();

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id: id }, // { phone }
  });
};
