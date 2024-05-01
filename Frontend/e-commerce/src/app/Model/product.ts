export interface Product {
    id?: number;
    Name?: string;
    Brand?: string;
    Category?: string;
    CategoryID?: string;
    Price?: number;
    Colors?: string[];
    sizes?: Size[];
    Size?: Size[];
    InStock?: boolean;
    Quantity?: number;
    Discount?: number;
    ImageURL?: string;
    Gender?: string;
    Description?: string;
  }
  
  export interface Size {
    Color?: string,
    Name: string;
    Quantity: number;
  }
  