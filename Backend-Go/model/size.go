package model

// Size represents the structure of an individual size object
type Size struct {
	Name     string `json:"Name,omitempty"`
	Quantity int    `json:"Quantity,omitempty"`
	Color    string `json:"Color,omitempty"`
}
