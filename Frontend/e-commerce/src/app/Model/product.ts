export interface Product {
    id: number;
    name: string;
    brand: string;
    category: string;
    category_id: string;
    price: number;
    colors: string[];
    size: Size[];
    in_stock: boolean;
    quantity: number;
    discount: number;
    image_url: string;
    gender: string;
  }
  
  export interface Size {
    name: string;
    quantity: number;
  }
  