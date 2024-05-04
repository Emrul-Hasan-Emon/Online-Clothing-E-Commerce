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
