package model

// Product represents the structure of a product
type Product struct {
	ID         int
	Name       string
	Brand      string
	Category   string
	CategoryID string
	Price      int
	Colors     []string // Assuming Colors will be stored as a string in JSON format
	Size       []Size   // Size is now a slice of structs representing the JSON array
	InStock    bool
	Quantity   int
	Discount   int
	ImageURL   string
	Gender     string
}
