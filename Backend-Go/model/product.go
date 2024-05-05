package model

type ProductID int

// Product represents the structure of a product
type Product struct {
	ID          ProductID `json:"id,omitempty"`
	Name        string    `json:"Name,omitempty"`
	Brand       string    `json:"Brand,omitempty"`
	Category    string    `json:"Category,omitempty"`
	CategoryID  string    `json:"CategoryID,omitempty"`
	Price       int       `json:"Price,omitempty"`
	Colors      []string  `json:"Colors,omitempty"`
	Size        []Size    `json:"Size,omitempty"`
	InStock     bool      `json:"InStock,omitempty"`
	Quantity    int       `json:"Quantity,omitempty"`
	Discount    int       `json:"Discount,omitempty"`
	ImageURL    string    `json:"ImageURL,omitempty"`
	Gender      string    `json:"Gender,omitempty"`
	Description string    `json:"Description,omitempty"`
	IsDeleted   bool      `json:"isDeleted,omitempty"`
}
