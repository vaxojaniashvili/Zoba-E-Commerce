export interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  seller: string;
  image: string;
  phone?: string;
  location?: string;
  specs?: Record<string, string>;
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

export interface Products {
  id: number;
  image: string;
  title: string;
  price: string;
  description: string;
  seller: string;
  phone: string;
  location: string;
  specs?: ProductSpecs;
}
