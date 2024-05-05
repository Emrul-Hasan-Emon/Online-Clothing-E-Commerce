export interface Cart {
    OrderID?: number,
    UserID?: number,
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