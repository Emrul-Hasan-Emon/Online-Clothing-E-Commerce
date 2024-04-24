package database

import (
	"database/sql"
	"encoding/json"
	"net/url"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/config"
	log "github.com/Emrul-Hasan-Emon/repositories/ecommerce/log4u"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"
	_ "github.com/go-sql-driver/mysql"
)

type Database struct {
	db *sql.DB
}

func CreateNewDatabaseInstance(dbDef *config.DbDef) *Database {
	return &Database{openDatabase(dbDef)}
}

func openDatabase(dbDef *config.DbDef) *sql.DB {
	databaseUrl := dbDef.User + ":" + url.PathEscape(
		dbDef.Password,
	) + "@tcp(" + dbDef.Host + ")/" + dbDef.DatabaseName

	database, err := sql.Open("mysql", databaseUrl)
	if err != nil {
		log.Fatalf("Failed to open database %s: %s: [%v]", dbDef.Host, dbDef.DatabaseName, err)
	}
	log.Debugf("Connected to database %s: %s", dbDef.Host, dbDef.DatabaseName)
	err = database.Ping()
	if err != nil {
		log.Fatalf("Failed to ping database %s: %s: [%v]", dbDef.Host, dbDef.DatabaseName, err)
	}
	log.Debugf("Database available %s:%s", dbDef.Host, dbDef.DatabaseName)
	return database
}

func (db *Database) Close() {
	db.db.Close()
}

func (db *Database) FetchAllProduct() ([]model.Product, error) {
	query := "SELECT * FROM online_clothing_management_system.Products"

	rows, err := db.db.Query(query)
	if err != nil {
		log.Fatalf("Failed Start to datbase: %s", err)
		panic(err)
	}
	defer rows.Close()

	var products []model.Product
	for rows.Next() {
		var p model.Product
		var colorsJSON string
		var sizeJSON string

		err := rows.Scan(&p.ID, &p.Name, &p.Brand, &p.Category, &p.CategoryID, &p.Price, &colorsJSON, &sizeJSON, &p.InStock, &p.Quantity, &p.Discount, &p.ImageURL, &p.Gender)
		if err != nil {
			panic(err.Error())
		}
		// Unmarshal the JSON string for Colors into the Colors slice
		err = json.Unmarshal([]byte(colorsJSON), &p.Colors)
		if err != nil {
			panic(err.Error())
		}
		// Unmarshal the JSON string for Size into the Size slice
		err = json.Unmarshal([]byte(sizeJSON), &p.Size)
		if err != nil {
			panic(err.Error())
		}
		products = append(products, p)
	}
	// Print the fetched products
	// for _, p := range products {
	// 	fmt.Printf("ID: %d, Name: %s, Brand: %s, Category: %s, Price: %d, Colors: %s, Size: %+v, InStock: %t, Quantity: %d, Discount: %d, ImageURL: %s, Gender: %s\n", p.ID, p.Name, p.Brand, p.Category, p.Price, strings.Join(p.Colors, ", "), p.Size, p.InStock, p.Quantity, p.Discount, p.ImageURL, p.Gender)
	// }
	return products, nil
}
