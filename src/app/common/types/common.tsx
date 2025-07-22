export interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  seller: string;
  phone: string;
  location: string;
  image: string;
  specs?: ProductSpecs;
}

export interface Filters {
  category: string;
  price: string;
  brand: string;
}

export interface PageContext {
  params: {
    id: string;
  };
}

export interface ProductSpecs {
  [key: string]: string | number;
}
