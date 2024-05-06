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
