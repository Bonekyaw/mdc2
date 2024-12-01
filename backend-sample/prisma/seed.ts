import { PrismaClient, Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Phone Nyo",
    phone: "778661260",
    password: "",
    randToken: "xirj1izi88iisvh0mt6lr9efseef45frt",
  },
  {
    name: "Ko Nay",
    phone: "778661261",
    password: "",
    randToken: "xirj1izi88iisvh0mt6lr9efseef45frt",
  },
  {
    name: "Paing Gyi",
    phone: "778661262",
    password: "",
    randToken: "xirj1izi88iisvh0mt6lr9efseef45frt",
  },
  {
    name: "Jue Jue",
    phone: "778661263",
    password: "",
    randToken: "xirj1izi88iisvh0mt6lr9efseef45frt",
  },
  {
    name: "Nant Su",
    phone: "778661264",
    password: "",
    randToken: "xirj1izi88iisvh0mt6lr9efseef45frt",
  },
];

const categories = [
  { name: "Men", image: "man.png" },
  { name: "Women", image: "woman.png" },
  { name: "Teens", image: "teen.png" },
  { name: "Kids", image: "kid.png" },
  { name: "Babies", image: "baby.png" },
  { name: "Pets", image: "pet.png" },
];

const colors = [
  { name: "black", bgColor: "#000000" },
  { name: "blue", bgColor: "#2B4CC3" },
  { name: "purple", bgColor: "#6680C2" },
  { name: "white", bgColor: "#ffffff" },
];

const sizes = [
  { name: "XS" },
  { name: "S" },
  { name: "M" },
  { name: "L" },
  { name: "XL" },
  { name: "XXL" },
];

const products = [
  {
    categoryId: 1,
    brand: "H&M",
    title: "Oversized Fit Printed Mesh T-Shirt",
    star: 4.9,
    quantity: 160,
    price: 295.5,
    discount: 550,
    image: "t1.png",
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
  },
  {
    categoryId: 1,
    brand: "H&M",
    title: "Loose Fit T-Shirt",
    star: 4.7,
    quantity: 201,
    price: 199.5,
    discount: 0,
    image: "t3.png",
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
  },
  {
    categoryId: 2,
    brand: "H&M",
    title: "Regular Fit Linen",
    star: 4.8,
    quantity: 127,
    price: 255,
    discount: 0,
    image: "t2.png",
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
  },
  {
    categoryId: 1,
    brand: "H&M",
    title: "DryMove Fit",
    star: 4.5,
    quantity: 234,
    price: 220,
    discount: 0,
    image: "t4.png",
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
  },
  {
    categoryId: 2,
    brand: "H&M",
    title: "Oversized Fit Printed Mesh T-Shirt",
    star: 4.9,
    quantity: 136,
    price: 295,
    discount: 550,
    image: "w1.png",
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
  },
  {
    categoryId: 2,
    brand: "H&M",
    title: "Regular Fit Linen",
    star: 4.8,
    quantity: 127,
    price: 255,
    discount: 0,
    image: "w2.png",
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
  },
  {
    categoryId: 1,
    brand: "H&M",
    title: "DryMove Fit",
    star: 4.5,
    quantity: 234,
    price: 220,
    discount: 0,
    image: "w4.png",
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
  },
  {
    categoryId: 1,
    brand: "H&M",
    title: "Loose Fit T-Shirt",
    star: 4.5,
    quantity: 234,
    price: 220,
    discount: 0,
    image: "w5.png",
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
  },
];

const ColorsOnProducts = [
  { productId: 1, colorId: 1, stock: true },
  { productId: 1, colorId: 2, stock: true },
  { productId: 1, colorId: 3, stock: false },
  { productId: 1, colorId: 4, stock: true },
  { productId: 2, colorId: 1, stock: true },
  { productId: 2, colorId: 2, stock: true },
  { productId: 2, colorId: 3, stock: true },
  { productId: 2, colorId: 4, stock: false },
  { productId: 3, colorId: 1, stock: true },
  { productId: 3, colorId: 2, stock: false },
  { productId: 3, colorId: 3, stock: true },
  { productId: 3, colorId: 4, stock: true },
  { productId: 4, colorId: 1, stock: false },
  { productId: 4, colorId: 2, stock: true },
  { productId: 4, colorId: 3, stock: true },
  { productId: 4, colorId: 4, stock: true },
  { productId: 5, colorId: 1, stock: true },
  { productId: 5, colorId: 2, stock: true },
  { productId: 5, colorId: 3, stock: false },
  { productId: 5, colorId: 4, stock: true },
  { productId: 6, colorId: 1, stock: true },
  { productId: 6, colorId: 2, stock: true },
  { productId: 6, colorId: 3, stock: true },
  { productId: 6, colorId: 4, stock: true },
  { productId: 7, colorId: 1, stock: true },
  { productId: 7, colorId: 2, stock: true },
  { productId: 7, colorId: 3, stock: false },
  { productId: 7, colorId: 4, stock: true },
  { productId: 8, colorId: 1, stock: true },
  { productId: 8, colorId: 2, stock: true },
  { productId: 8, colorId: 3, stock: true },
  { productId: 8, colorId: 4, stock: false },
];

const ProductsOnSizes = [
  { productId: 1, sizeId: 1, stock: true },
  { productId: 1, sizeId: 2, stock: true },
  { productId: 1, sizeId: 3, stock: false },
  { productId: 1, sizeId: 4, stock: true },
  { productId: 1, sizeId: 5, stock: true },
  { productId: 1, sizeId: 6, stock: true },
  { productId: 2, sizeId: 1, stock: true },
  { productId: 2, sizeId: 2, stock: false },
  { productId: 2, sizeId: 3, stock: true },
  { productId: 2, sizeId: 4, stock: true },
  { productId: 2, sizeId: 5, stock: true },
  { productId: 2, sizeId: 6, stock: true },
  { productId: 3, sizeId: 1, stock: true },
  { productId: 3, sizeId: 2, stock: true },
  { productId: 3, sizeId: 3, stock: true },
  { productId: 3, sizeId: 4, stock: true },
  { productId: 3, sizeId: 5, stock: true },
  { productId: 3, sizeId: 6, stock: false },
  { productId: 4, sizeId: 1, stock: true },
  { productId: 4, sizeId: 2, stock: true },
  { productId: 4, sizeId: 3, stock: false },
  { productId: 4, sizeId: 4, stock: true },
  { productId: 4, sizeId: 5, stock: true },
  { productId: 4, sizeId: 6, stock: true },
  { productId: 5, sizeId: 1, stock: true },
  { productId: 5, sizeId: 2, stock: true },
  { productId: 5, sizeId: 3, stock: true },
  { productId: 5, sizeId: 4, stock: true },
  { productId: 5, sizeId: 5, stock: false },
  { productId: 5, sizeId: 6, stock: true },
  { productId: 6, sizeId: 1, stock: true },
  { productId: 6, sizeId: 2, stock: false },
  { productId: 6, sizeId: 3, stock: true },
  { productId: 6, sizeId: 4, stock: true },
  { productId: 6, sizeId: 5, stock: true },
  { productId: 6, sizeId: 6, stock: true },
  { productId: 7, sizeId: 1, stock: true },
  { productId: 7, sizeId: 2, stock: true },
  { productId: 7, sizeId: 3, stock: true },
  { productId: 7, sizeId: 4, stock: true },
  { productId: 7, sizeId: 5, stock: true },
  { productId: 7, sizeId: 6, stock: true },
  { productId: 8, sizeId: 1, stock: true },
  { productId: 8, sizeId: 2, stock: true },
  { productId: 8, sizeId: 3, stock: true },
  { productId: 8, sizeId: 4, stock: true },
  { productId: 8, sizeId: 5, stock: true },
  { productId: 8, sizeId: 6, stock: false },
];

async function main() {
  console.log(`Start seeding ...`);
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash("12345678", salt);
  for (const a of userData) {
    a.password = password;
    const user = await prisma.user.create({
      data: a,
    });
    console.log(`Created user with id: ${user.id}`);
  }

  // Seed categories
  for (const category of categories) {
    const createdCategory = await prisma.category.create({ data: category });
    console.log(`Created category with id: ${createdCategory.id}`);
  }

  // Seed colors
  for (const color of colors) {
    const createdColor = await prisma.color.create({ data: color });
    console.log(`Created color with id: ${createdColor.id}`);
  }

  // Seed sizes
  for (const size of sizes) {
    const createdSize = await prisma.size.create({ data: size });
    console.log(`Created size with id: ${createdSize.id}`);
  }

  // Seed products
  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: product,
    });
    console.log(`Created product with id: ${createdProduct.id}`);
  }

  // Seed color-product relationships
  for (const cp of ColorsOnProducts) {
    const createdColorProduct = await prisma.colorsOnProducts.create({
      data: cp,
    });
    console.log(
      `Created color-product relationship with colorId: ${createdColorProduct.colorId} and productId: ${createdColorProduct.productId}`
    );
  }

  // Seed product-size relationships
  for (const ps of ProductsOnSizes) {
    const createdProductSize = await prisma.productsOnSizes.create({
      data: ps,
    });
    console.log(
      `Created product-size relationship with sizeId: ${createdProductSize.sizeId} and productId: ${createdProductSize.productId}`
    );
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// npx prisma db seed
