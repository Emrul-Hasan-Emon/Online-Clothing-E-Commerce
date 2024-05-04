export interface Order {
    userId: number,
    name: string,
    contact: string,
    email: string,
    address: string,
    city: string, 
    district: string,
    paymentNumber: string,
    transactionNumber: string,
    totalCost: number,
    discount: number,
    shippingCost: number,
    payableCost: number
}

export interface orderAddress {
    name: string,
    contact: string,
    email: string,
    address: string,
    city: string,
    district: string
}