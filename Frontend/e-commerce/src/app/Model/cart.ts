export interface Cart {
    Id: number,
    Size: string,
    Color: string,
    Quantity?: number,
    TotalPrice?: number,
    Discount?: number,
    PayablePrice?: number,
}

export interface CartTotal {
    SubTotal: number,
    Discount: number,
    Shipping: number,
    Total: number
}