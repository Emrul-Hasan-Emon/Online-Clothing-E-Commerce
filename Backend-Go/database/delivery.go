package database

import "github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"

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
