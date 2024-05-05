package database

import "github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"

func (db *Database) InsertCartDetails(cartDetails []model.Cart) error {
	stmt, err := db.db.Prepare("INSERT INTO online_clothing_management_system.Cart (OrderID, UserID, Size, Color, Quantity, TotalPrice, Discount, PayablePrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()
	for _, detail := range cartDetails {
		_, err := stmt.Exec(detail.OrderID, detail.UserID, detail.Size, detail.Color, detail.Quantity, detail.TotalPrice, detail.Discount, detail.PayablePrice)
		if err != nil {
			return err
		}
	}
	return nil
}

func (db *Database) FetchCartDetails(orderId int) ([]model.Cart, error) {
	var carts []model.Cart
	query := "SELECT * FROM online_clothing_management_system.Cart WHERE OrderID = ?"
	rows, err := db.db.Query(query, orderId)
	if err != nil {
		return []model.Cart{}, err
	}

	for rows.Next() {
		var cart model.Cart
		err := rows.Scan(
			&cart.ID,
			&cart.OrderID,
			&cart.UserID,
			&cart.Size,
			&cart.Color,
			&cart.Quantity,
			&cart.TotalPrice,
			&cart.Discount,
			&cart.PayablePrice,
		)
		if err != nil {
			return []model.Cart{}, nil
		}
		carts = append(carts, cart)
	}
	return carts, nil
}
