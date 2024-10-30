const Woman = require("@/data/shop/woman.png");
const Man = require("@/data/shop/man.png");
const Teen = require("@/data/shop/teen.png");
const Kid = require("@/data/shop/kid.png");
const Baby = require("@/data/shop/baby.png");
const Pet = require("@/data/shop/pet.png");

const t1 = require("@/data/shop/t1.png");
const t2 = require("@/data/shop/t2.png");
const t3 = require("@/data/shop/t3.png");
const t4 = require("@/data/shop/t4.png");

const w1 = require("@/data/shop/w1.png");
const w2 = require("@/data/shop/w2.png");
const w3 = require("@/data/shop/w3.png");
const w4 = require("@/data/shop/w4.png");
const w5 = require("@/data/shop/w5.png");

const c1 = require("@/data/shop/c1.png");
const c2 = require("@/data/shop/c2.png");
const c3 = require("@/data/shop/c3.png");

export const categories = [
  { id: "uuid1", name: "Men", image: Man },
  { id: "uuid2", name: "Women", image: Woman },
  { id: "uuid3", name: "Teens", image: Teen },
  { id: "uuid4", name: "Kids", image: Kid },
  { id: "uuid5", name: "Babies", image: Baby },
  { id: "uuid6", name: "Pets", image: Pet },
  { id: "uuid7", name: "Women", image: Woman },
  { id: "uuid8", name: "Men", image: Man },
  { id: "uuid9", name: "Teens", image: Teen },
  { id: "uuid10", name: "Kids", image: Kid },
  { id: "uuid11", name: "Babies", image: Baby },
  { id: "uuid12", name: "Pets", image: Pet },
];

export const products = [
  {
    id: "uuid1",
    categories_id: "uuid1",
    brand: "H&M",
    title: "Oversized Fit Printed Mesh T-Shirt",
    star: 4.9,
    quantity: 136,
    price: 295.5,
    discount: 550,
    image: "t1.png",
    favourite: true,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid2",
    categories_id: "uuid1",
    brand: "H&M",
    title: "Loose Fit T-Shirt",
    star: 4.7,
    quantity: 201,
    price: 199.5,
    discount: 0,
    image: "t3.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid3",
    categories_id: "uuid2",
    brand: "H&M",
    title: "Regular Fit Linen",
    star: 4.8,
    quantity: 127,
    price: 255,
    discount: 0,
    image: "t2.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid4",
    categories_id: "uuid1",
    brand: "H&M",
    title: "DryMove Fit",
    star: 4.5,
    quantity: 234,
    price: 220,
    discount: 0,
    image: "t4.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid5",
    categories_id: "uuid2",
    brand: "H&M",
    title: "Oversized Fit Printed Mesh T-Shirt",
    star: 4.9,
    quantity: 136,
    price: 295,
    discount: 550,
    image: "w1.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid6",
    categories_id: "uuid2",
    brand: "H&M",
    title: "Regular Fit Linen",
    star: 4.8,
    quantity: 127,
    price: 255,
    discount: 0,
    image: "w2.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid7",
    categories_id: "uuid1",
    brand: "H&M",
    title: "DryMove Fit",
    star: 4.5,
    quantity: 234,
    price: 220,
    discount: 0,
    image: "w4.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid8",
    categories_id: "uuid1",
    brand: "H&M",
    title: "Loose Fit T-Shirt",
    star: 4.5,
    quantity: 234,
    price: 220,
    discount: 0,
    image: "w5.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid9",
    categories_id: "uuid2",
    brand: "H&M",
    title: "Oversized Fit Printed Mesh T-Shirt",
    star: 4.9,
    quantity: 136,
    price: 295.5,
    discount: 550,
    image: "t1.png",
    favourite: true,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid10",
    categories_id: "uuid2",
    brand: "H&M",
    title: "Loose Fit T-Shirt",
    star: 4.7,
    quantity: 201,
    price: 199.5,
    discount: 0,
    image: "t3.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid11",
    categories_id: "uuid3",
    brand: "H&M",
    title: "Regular Fit Linen",
    star: 4.8,
    quantity: 127,
    price: 255,
    discount: 0,
    image: "t2.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid12",
    categories_id: "uuid3",
    brand: "H&M",
    title: "DryMove Fit",
    star: 4.5,
    quantity: 234,
    price: 220,
    discount: 0,
    image: "t4.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid13",
    categories_id: "uuid4",
    brand: "H&M",
    title: "Oversized Fit Printed Mesh T-Shirt",
    star: 4.9,
    quantity: 136,
    price: 295,
    discount: 550,
    image: "w1.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid14",
    categories_id: "uuid4",
    brand: "H&M",
    title: "Regular Fit Linen",
    star: 4.8,
    quantity: 127,
    price: 255,
    discount: 0,
    image: "w2.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid15",
    categories_id: "uuid5",
    brand: "H&M",
    title: "DryMove Fit",
    star: 4.5,
    quantity: 234,
    price: 220,
    discount: 0,
    image: "w4.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid16",
    categories_id: "uuid5",
    brand: "H&M",
    title: "Loose Fit T-Shirt",
    star: 4.5,
    quantity: 234,
    price: 220,
    discount: 0,
    image: "w5.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid17",
    categories_id: "uuid6",
    brand: "H&M",
    title: "Regular Fit Linen",
    star: 4.8,
    quantity: 127,
    price: 255,
    discount: 0,
    image: "w2.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid18",
    categories_id: "uuid6",
    brand: "H&M",
    title: "DryMove Fit",
    star: 4.5,
    quantity: 234,
    price: 220,
    discount: 0,
    image: "w4.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
  {
    id: "uuid19",
    categories_id: "uuid6",
    brand: "H&M",
    title: "Loose Fit T-Shirt",
    star: 4.5,
    quantity: 234,
    price: 220,
    discount: 0,
    image: "w5.png",
    favourite: false,
    description:
      "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening. an undergarment of cotton, or other material, for the upper part of the body. a shirtwaist.",
  },
];

export const sample = [
  { key: 1, image: c1 },
  { key: 2, image: c2 },
  { key: 3, image: c3 },
];

export const selectItems = {
  colors: [
    { id: "uuid1", name: "black", bgColor: "#000000", stock: true },
    { id: "uuid2", name: "blue", bgColor: "#2B4CC3", stock: true },
    { id: "uuid3", name: "purple", bgColor: "#6680C2", stock: false },
    { id: "uuid4", name: "white", bgColor: "#ffffff", stock: true },
  ],
  sizes: [
    { id: "uuid5", name: "XS", stock: false },
    { id: "uuid6", name: "S", stock: true },
    { id: "uuid7", name: "M", stock: true },
    { id: "uuid8", name: "L", stock: false },
    { id: "uuid9", name: "XL", stock: true },
    { id: "uuid10", name: "XXL", stock: true },
  ],
};
