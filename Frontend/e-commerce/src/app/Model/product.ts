export interface Product {
    Id: number;
    Name: string;
    Brand: string;
    Category: string;
    CategoryID: string;
    Price: number;
    Colors: string[];
    Size: Size[];
    InStock: boolean;
    Quantity: number;
    Discount: number;
    ImageURL: string;
    Gender: string;
    Description: string;
  }
  
  export interface Size {
    name: string;
    quantity: number;
  }
  