package main

import (
	"net/http"

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

	mapper := database.CreateNewDatabaseMapper(db)
	pr := product.CreateNewProductInstance()

	router := route.NewRouteBuilder(config.GetAllowCORS(), config.GetappName(), config.IsLogDebug())

	productRouter := router.SubRouteBuilder("/product")
	productRouter.Add("Get All Products", http.MethodGet, "/", pr.CreateProductFetcher(mapper))

	log.Fatal(http.ListenAndServe(config.Server().String(), router.Router()))
}
