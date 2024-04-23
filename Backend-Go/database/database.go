package database

import (
	"database/sql"
	"net/url"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/config"
	log "github.com/Emrul-Hasan-Emon/repositories/ecommerce/log4u"
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

func (db *Database) FetchAllProduct() error {
	return nil
}
