package model

// User represents the user data structure
type User struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	PhoneNumber string `json:"phoneNumber"`
	Email       string `json:"email"`
	Gender      string `json:"gender"`
	Address     string `json:"address"`
	Role        string `json:"role"`
	DateOfBirth string `json:"dateOfBirth"`
	Password    string `json:"password"`
	IsDeleted   bool   `json:"-"`
}
