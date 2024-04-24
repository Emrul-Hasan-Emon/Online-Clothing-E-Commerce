package model

type ProductID int

// Product represents the structure of a product
type Product struct {
	ID          ProductID
	Name        string
	Brand       string
	Category    string
	CategoryID  string
	Price       int
	Colors      []string // Assuming Colors will be stored as a string in JSON format
	Size        []Size   // Size is now a slice of structs representing the JSON array
	InStock     bool
	Quantity    int
	Discount    int
	ImageURL    string
	Gender      string
	Description string
}
