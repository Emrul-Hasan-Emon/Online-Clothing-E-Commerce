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
