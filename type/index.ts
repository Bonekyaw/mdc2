export interface User {
  id: number;
}

export interface ProductType {
  id: number;
  categories_id: number;
  brand: string;
  title: string;
  star: number;
  quantity: number;
  price: number;
  discount: number;
  image: string;
  colors: ColorType[];
  sizes: SizeType[];
  users: User[];
  description: string;
}

export interface CategoryType {
  id: number;
  name: string;
  image: any;
}

export interface ColorType {
  id: number;
  colorId: number;
  productId: number;
  stock: boolean;
  color: {
    id: number;
    name: string;
    bgColor: string;
  };
}

export interface SizeType {
  id: number;
  sizeId: number;
  productId: number;
  stock: boolean;
  size: {
    id: number;
    name: string;
  };
}

export interface SampleType {
  key: number;
  image: string;
}
