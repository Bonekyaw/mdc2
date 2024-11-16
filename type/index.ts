export interface User {
  id: string;
  name: string;
}

export interface ProductType {
  id: string;
  categories_id: string;
  brand: string;
  title: string;
  star: number;
  quantity: number;
  price: number;
  discount: number;
  image: any;
  favourite: boolean;
  description: string;
}

export interface CategoryType {
  id: string;
  name: string;
  image: any;
}

export interface ColorType {
  id: string;
  name: string;
  bgColor: string;
  stock: boolean;
}

export interface SizeType {
  id: string;
  name: string;
  stock: boolean;
}

export interface SampleType {
  key: number;
  image: string;
}
