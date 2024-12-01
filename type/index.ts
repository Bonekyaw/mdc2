export interface User {
  id: string;
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
  user: User[];
  description: string;
}

export interface CategoryType {
  id: number;
  name: string;
  image: any;
}

export interface ColorType {
  id: number;
  name: string;
  bgColor: string;
  stock: boolean;
}

export interface SizeType {
  id: number;
  name: string;
  stock: boolean;
}

export interface SampleType {
  key: number;
  image: string;
}
