package database

import (
	"time"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"
)

func (db *Database) InsertNewOrder(order model.Order) (int, error) {
	// Prepare the SQL statement
	stmt, err := db.db.Prepare("INSERT INTO online_clothing_management_system.Orders (UserID, Name, Contact, Email, Address, City, District, PaymentNumber, TransactionNumber, TotalCost, Discount, ShippingCost, PayableCost, OrderStatus, OrderDate, OrderTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		return 0, err
	}
	// Get current date and time in ISO 8601 format
	currentDateTime := time.Now().Format(time.RFC3339)
	// fmt.Println(currentDateTime)

	// Execute the SQL statement
	result, err := stmt.Exec(order.UserID, order.Name, order.Contact, order.Email, order.Address, order.City, order.District, order.PaymentNumber, order.TransactionNumber, order.TotalCost, order.Discount, order.ShippingCost, order.PayableCost, order.OrderStaus, currentDateTime[:10], currentDateTime[11:19])
	if err != nil {
		return 0, nil
	}

	// Retrieve the generated OrderID
	orderID, err := result.LastInsertId()
	if err != nil {
		return 0, nil
	}
	return int(orderID), nil
}
