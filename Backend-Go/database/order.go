package database

import "github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"

func (db *Database) InsertNewOrder(order model.Order) (int, error) {
	// Prepare the SQL statement
	stmt, err := db.db.Prepare("INSERT INTO online_clothing_management_system.Orders (UserID, Name, Contact, Email, Address, City, District, PaymentNumber, TransactionNumber, TotalCost, Discount, ShippingCost, PayableCost, OrderStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		return 0, err
	}
	// Execute the SQL statement
	result, err := stmt.Exec(order.UserID, order.Name, order.Contact, order.Email, order.Address, order.City, order.District, order.PaymentNumber, order.TransactionNumber, order.TotalCost, order.Discount, order.ShippingCost, order.PayableCost, order.OrderStaus)
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
