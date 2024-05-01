package database

import (
	log "github.com/Emrul-Hasan-Emon/repositories/ecommerce/log4u"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"
)

func (db *Database) FetchCategory() ([]model.Category, error) {
	query := "SELECT * FROM online_clothing_management_system.Category"

	rows, err := db.db.Query(query)
	if err != nil {
		log.Fatalf("Failed Start to datbase: %s", err)
		panic(err)
	}
	defer rows.Close()

	var categories []model.Category
	for rows.Next() {
		var category model.Category
		err := rows.Scan(&category.CategorySL, &category.CategoryID, &category.CategoryName, &category.Gender)
		if err != nil {
			panic(err.Error())
		}
		categories = append(categories, category)
	}
	return categories, nil
}
