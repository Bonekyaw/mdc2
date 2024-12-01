import { PrismaClient } from "@prisma/client"; // { Prisma, PrismaClient }

const prisma = new PrismaClient();

export const getUserByPhone = async (phone: string) => {
  return prisma.user.findUnique({
    where: { phone: phone }, // { phone }
  });
};

export const getOtpByPhone = async (phone: string) => {
  return prisma.otp.findUnique({
    where: { phone: phone }, // { phone }
  });
};

export const createOtp = async (otpData: any) => {
  return prisma.otp.create({ data: otpData });
};

export const updateOtp = async (id: number, otpData: any) => {
  return prisma.otp.update({
    where: { id: id },
    data: otpData,
  });
};

export const createUser = async (userData: any) => {
  return prisma.user.create({ data: userData });
};

export const updateUser = async (id: number, userData: any) => {
  return prisma.user.update({
    where: { id: id },
    data: userData,
  });
};

export const getAllUsers = async (filteredData: any) => {
  return prisma.user.findMany(filteredData);
};
