package database

import (
	"database/sql"
	"encoding/json"
	"fmt"
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

		err := rows.Scan(&p.ID, &p.Name, &p.Brand, &p.Category, &p.CategoryID, &p.Price, &colorsJSON, &sizeJSON, &p.InStock, &p.Quantity, &p.Discount, &p.ImageURL, &p.Gender, &p.Description)
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

func (db *Database) FetchProductByID(productId model.ProductID) (model.Product, error) {
	query := "SELECT * FROM online_clothing_management_system.Products WHERE Id = ?"

	// fmt.Println("Product ID: ", productId)
	// Execute the query with the specified ID
	row := db.db.QueryRow(query, productId)

	var p model.Product
	var colorsJSON string
	var sizeJSON string

	err := row.Scan(&p.ID, &p.Name, &p.Brand, &p.Category, &p.CategoryID, &p.Price, &colorsJSON, &sizeJSON, &p.InStock, &p.Quantity, &p.Discount, &p.ImageURL, &p.Gender, &p.Description)
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
	return p, nil
}

func (db *Database) CheckIfEmailExist(email string) bool {
	// Query database to check if email exists
	var count int
	err := db.db.QueryRow("SELECT COUNT(*) FROM online_clothing_management_system.User WHERE Email = ?", email).Scan(&count)
	if err != nil {
		log.Errorf("Error checking email existence: %v", err)
		return false // Assume email doesn't exist in case of error
	}
	return count > 0
}

func (db *Database) InsertNewUserInformation(user model.User) error {
	_, err := db.db.Exec("INSERT INTO online_clothing_management_system.User (Name, PhoneNumber, Email, Gender, Address, Role, DateOfBirth, Password, IsDeleted, City, District) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		user.Name, user.PhoneNumber, user.Email, user.Gender, user.Address, user.Role, user.DateOfBirth, user.Password, user.IsDeleted, user.City, user.District)

	if err != nil {
		log.Errorf("Error inserting user into database: %v", err)
		return err
	}
	return nil
}

func (db *Database) ValidateUser(userLogin model.UserLogin) (int, string, string, error) {
	var userRole string
	var userName string
	var userID int

	err := db.db.QueryRow("SELECT ID, Name, Role FROM online_clothing_management_system.User WHERE Email = ? AND Password = ?", userLogin.Email, userLogin.Password).Scan(&userID, &userName, &userRole)
	switch {
	case err == sql.ErrNoRows:
		return 0, "", "", fmt.Errorf("user not found")
	case err != nil:
		return 0, "", "", err
	}

	return userID, userName, userRole, nil
}

func (db *Database) IsNameExit(productName string) bool {
	var count int
	err := db.db.QueryRow("SELECT COUNT(*) FROM online_clothing_management_system.Products WHERE Name = ?", productName).Scan(&count)
	if err != nil {
		log.Errorf("Error checking email existence: %v", err)
		return false // Assume email doesn't exist in case of error
	}
	return count > 0
}

func (db *Database) InsertNewProduct(product model.Product) error {
	jsonSize, err := json.Marshal(product.Size)
	if err != nil {
		return err
	}

	jsonColor, err := json.Marshal(product.Colors)
	if err != nil {
		return err
	}
	query := `INSERT INTO online_clothing_management_system.Products (Name, Brand, Category_id, Category, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl, Gender, Description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	_, err = db.db.Exec(query, product.Name, product.Brand, product.CategoryID, product.Category, product.Price, jsonColor,
		jsonSize, product.InStock, product.Quantity, product.Discount, product.ImageURL, product.Gender, product.Description)
	return err
}
