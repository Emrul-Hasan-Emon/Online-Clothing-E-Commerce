package database

import (
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"
)

func (db *Database) FetchDeliveryInformation(role string) ([]model.User, error) {
	query := `SELECT * FROM online_clothing_management_system.User WHERE Role = ? AND IsDeleted = false`
	rows, err := db.db.Query(query, role)
	if err != nil {
		return []model.User{}, err
	}

	var deliveryInfo []model.User
	for rows.Next() {
		var user model.User
		err := rows.Scan(
			&user.ID,
			&user.Name,
			&user.PhoneNumber,
			&user.Email,
			&user.Gender,
			&user.Address,
			&user.Role,
			&user.DateOfBirth,
			&user.Password,
			&user.IsDeleted,
			&user.City,
			&user.District,
		)
		if err != nil {
			return []model.User{}, nil
		}
		deliveryInfo = append(deliveryInfo, user)
	}
	return deliveryInfo, nil
}

func (db *Database) FetchDeliveryQuantityInformation() ([]model.DeliveryCount, error) {
	query := `SELECT * FROM online_clothing_management_system.DeliveryCount`
	rows, err := db.db.Query(query)
	if err != nil {
		return []model.DeliveryCount{}, err
	}
	var deliveryCountList []model.DeliveryCount
	for rows.Next() {
		var d model.DeliveryCount
		err := rows.Scan(
			&d.DeliveryCountID,
			&d.UserID,
			&d.Quantity,
		)

		if err != nil {
			return []model.DeliveryCount{}, err
		}
		deliveryCountList = append(deliveryCountList, d)
	}
	return deliveryCountList, nil
}

func (db *Database) InsertNewDelivery(delivery model.Delivery) error {
	shipping := "Shipping"
	stmt, err := db.db.Prepare("INSERT INTO online_clothing_management_system.Delivery (OrderID, UserID, OrderStatus) VALUES (?, ?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(delivery.OrderID, delivery.UserID, shipping)
	return err
}

func (db *Database) FetchDeliveryCount(UserID int) (int, error) {
	query := `SELECT Quantity FROM online_clothing_management_system.DeliveryCount WHERE UserID = ?`
	row := db.db.QueryRow(query, UserID)

	var quantity int
	err := row.Scan(&quantity)
	if err != nil {
		return -1, nil
	}
	return quantity, nil
}

func (db *Database) UpdateCountInDeliveryCount(UserID, count int) error {
	stmt, err := db.db.Prepare("UPDATE online_clothing_management_system.DeliveryCount SET Quantity = ? WHERE UserID = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(count, UserID)
	return err
}

func (db *Database) FetchDeliveryStatus(orderId int) (string, error) {
	query := "SELECT OrderStatus FROM online_clothing_management_system.Delivery WHERE OrderID = ?"
	row := db.db.QueryRow(query, orderId)
	var status string
	err := row.Scan(&status)
	if err != nil {
		return "", err
	}
	return status, err
}
