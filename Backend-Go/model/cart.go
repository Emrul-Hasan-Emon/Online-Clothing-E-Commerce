package model

type Cart struct {
	ID           int     `json:"Id,omitempty"`
	OrderID      int     `json:"OrderId,omitempty"`
	UserID       int     `json:"UserID,omitempty"`
	Size         string  `json:"Size,omitempty"`
	Color        string  `json:"Color,omitempty"`
	Quantity     int     `json:"Quantity,omitempty"`
	TotalPrice   float64 `json:"TotalPrice,omitempty"`
	Discount     float64 `json:"Discount,omitempty"`
	PayablePrice float64 `json:"PayablePrice,omitempty"`
}
