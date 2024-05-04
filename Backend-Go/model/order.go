package model

type Order struct {
	OrderID           int     `json:"orderID,omitempty"`
	UserID            int     `json:"userId"`
	Name              string  `json:"name"`
	Contact           string  `json:"contact"`
	Email             string  `json:"email"`
	Address           string  `json:"address"`
	City              string  `json:"city"`
	District          string  `json:"district"`
	PaymentNumber     string  `json:"paymentNumber"`
	TransactionNumber string  `json:"transactionNumber"`
	TotalCost         float64 `json:"totalCost"`
	Discount          float64 `json:"discount"`
	ShippingCost      float64 `json:"shippingCost"`
	PayableCost       float64 `json:"payableCost"`
	OrderStaus        string  `json:"status,omitempty"`
	OrderDate         string  `json:"orderDate,omitempty"`
	OrderTime         string  `json:"orderTime,omitempty"`
}
