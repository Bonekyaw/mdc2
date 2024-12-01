import { PrismaClient } from "@prisma/client"; // { Prisma, PrismaClient }

const prisma = new PrismaClient();

export const getAllProducts = async (options: any, limit: number) => {
  const products = await prisma.product.findMany(options);
  const lastProductInResults = products.length ? products[limit - 1] : null; // Remember: zero-based index! :)
  const myCursor = products.length ? lastProductInResults?.id : null;

  return {
    data: products,
    nextCursor: myCursor,
  };
};

export const getProductById = async (productId: number, userId: number) => {
  return prisma.product.findUnique({
    where: { id: productId },
    include: {
      colors: {
        include: {
          color: true,
        },
      },
      sizes: {
        include: {
          size: true,
        },
      },
      users: {
        where: {
          id: userId,
        },
        select: {
          id: true,
        },
      },
    },
  });
};

export const addProductToFavourite = async (
  productId: number,
  userId: number
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      products: {
        connect: {
          id: productId,
        },
      },
    },
    select: {
      id: true,
    },
  });
};

export const removeProductFromFavourite = async (
  productId: number,
  userId: number
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      products: {
        disconnect: {
          id: productId,
        },
      },
    },
    select: {
      id: true,
    },
  });
};
