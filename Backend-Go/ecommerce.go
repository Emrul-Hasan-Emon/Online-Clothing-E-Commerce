package main

import (
	"net/http"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/auth"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/config"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/database"
	log "github.com/Emrul-Hasan-Emon/repositories/ecommerce/log4u"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/resource"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/route"
)

func main() {
	config := config.NewConfig()
	defer config.CloseLog()

	db := database.CreateNewDatabaseInstance(config.GetDatabaseDef())
	defer db.Close()
	// db.FetchAllProduct()

	// mapper := database.CreateNewDatabaseMapper(db)
	pr := resource.CreateNewProductInstance()
	auth := auth.CreateNewAuthInstance()
	// pr.Testing(mapper, db)

	router := route.NewRouteBuilder(config.GetAllowCORS(), config.GetappName(), config.IsLogDebug())
	authRouter := router.SubRouteBuilder("/auth")
	authRouter.Add("Register", http.MethodPost, "/register", auth.RegisterNewUser(db))
	authRouter.Add("Log In", http.MethodPost, "/login", auth.ValidateUser(db))
	authRouter.Add("Token Validate", http.MethodGet, "/validate", auth.ValidateToken())
	authRouter.Add("Fetch User Details", http.MethodGet, "/user/{userId}", auth.CreateSpecificUserFetcher(db))

	productRouter := router.SubRouteBuilder("/products")
	productRouter.Add("Get All Products", http.MethodGet, "/", pr.CreateProductFetcher(db))
	productRouter.Add("Get Product By ID", http.MethodGet, "/{productId}", pr.CreateSingleProductFetcher(db))
	productRouter.Add("Inser New Product", http.MethodPost, "/insert", pr.InsertNewProduct(db))

	categoryRouter := router.SubRouteBuilder("/category")
	categoryRouter.Add("Get Categories", http.MethodGet, "/", pr.CreateCategoryFetcher(db))

	orderRouter := router.SubRouteBuilder("/order")
	orderRouter.Add("Create New Order", http.MethodPost, "/insert", pr.CreateNewOrder(db))

	cartRouter := router.SubRouteBuilder("/cart")
	cartRouter.Add("Create Carts", http.MethodPost, "/insert", pr.CreateCartInserter(db))
	log.Fatal(http.ListenAndServe(config.Server().String(), router.Router()))
}
