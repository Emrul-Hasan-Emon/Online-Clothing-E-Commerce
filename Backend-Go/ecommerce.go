package main

import (
	"net/http"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/auth"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/config"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/database"
	log "github.com/Emrul-Hasan-Emon/repositories/ecommerce/log4u"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/product"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/route"
)

func main() {
	config := config.NewConfig()
	defer config.CloseLog()

	db := database.CreateNewDatabaseInstance(config.GetDatabaseDef())
	defer db.Close()
	// db.FetchAllProduct()

	// mapper := database.CreateNewDatabaseMapper(db)
	pr := product.CreateNewProductInstance()
	auth := auth.CreateNewAuthInstance()
	// pr.Testing(mapper, db)

	router := route.NewRouteBuilder(config.GetAllowCORS(), config.GetappName(), config.IsLogDebug())
	authRouter := router.SubRouteBuilder("/auth")
	authRouter.Add("Register", http.MethodPost, "/register", auth.RegisterNewUser(db))

	productRouter := router.SubRouteBuilder("/products")
	productRouter.Add("Get All Products", http.MethodGet, "/", pr.CreateProductFetcher(db))
	productRouter.Add("Get Product By ID", http.MethodGet, "/{productId}", pr.CreateSingleProductFetcher(db))

	log.Fatal(http.ListenAndServe(config.Server().String(), router.Router()))
}
