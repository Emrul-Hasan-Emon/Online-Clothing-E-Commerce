package model

type DeliveryCount struct {
	DeliveryCountID int `json:"deliveryCountId"`
	UserID          int `json:"userID"`
	Quantity        int `json:"deliveryCount"`
}

type Delivery struct {
	UserID  int `json:"userID"`
	OrderID int `json:"orderID"`
}

type DeliverDetails struct {
	OrderID     int    `json:"orderID"`
	OrderStatus string `json:"orderStatus"`
}

type DeliveryBody struct {
	UserID      int    `json:"userID"`
	OrderStatus string `json:"orderStatus"`
}
