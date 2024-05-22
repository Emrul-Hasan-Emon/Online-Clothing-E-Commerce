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
	authRouter.Add("Fetch All Users", http.MethodGet, "/all", auth.CreateAllUserFetcher(db))

	productRouter := router.SubRouteBuilder("/products")
	productRouter.Add("Get All Products", http.MethodGet, "/", pr.CreateProductFetcher(db))
	productRouter.Add("Get Product By ID", http.MethodGet, "/{productId}", pr.CreateSingleProductFetcher(db))
	productRouter.Add("Insert New Product", http.MethodPost, "/insert", pr.InsertNewProduct(db))
	productRouter.Add("Delete Product", http.MethodGet, "/delete/{productId}", pr.DeleteProduct(db))
	productRouter.Add("Update Product", http.MethodPost, "/update/{productId}", pr.UpdateProduct(db))
	productRouter.Add("Stocke Check", http.MethodPost, "/check", pr.CreateStockChecker(db))

	categoryRouter := router.SubRouteBuilder("/category")
	categoryRouter.Add("Get Categories", http.MethodGet, "/", pr.CreateCategoryFetcher(db))

	orderRouter := router.SubRouteBuilder("/order")
	orderRouter.Add("Create New Order", http.MethodPost, "/insert", pr.CreateNewOrder(db))
	orderRouter.Add("Get Order History", http.MethodGet, "/user/{userId}", pr.FetchOrderHistory(db))
	orderRouter.Add("Remove Order Record", http.MethodGet, "/remove/{orderId}", pr.RemoveOrder(db))
	orderRouter.Add("Fetch All Orders", http.MethodGet, "/all", pr.FetchAllOrders(db))
	orderRouter.Add("Change Order Status", http.MethodPost, "/change/{orderId}", pr.CreateOrderStatusChanger(db))
	orderRouter.Add("Fetch Order Status", http.MethodGet, "/status/{orderId}", pr.CreateOrderStatusFetcher(db))

	cartRouter := router.SubRouteBuilder("/cart")
	cartRouter.Add("Create Carts", http.MethodPost, "/insert", pr.CreateCartInserter(db))
	cartRouter.Add("Get Cart Details", http.MethodGet, "/{orderId}", pr.CreateCartFetcher(db))

	deliveryRouter := router.SubRouteBuilder("/delivery")
	deliveryRouter.Add("Fetch Delivery Man List", http.MethodGet, "/{role}", pr.CreateDeliveryManListFetcher(db))
	deliveryRouter.Add("Fetch Delivery Count", http.MethodGet, "/d/count", pr.CreateDeliveryCountFetcher(db))
	deliveryRouter.Add("Place New Delivery", http.MethodPost, "/place", pr.CreateNewDeliveryCreater(db))
	deliveryRouter.Add("Fetch Delivery Status", http.MethodGet, "/status/{orderId}", pr.CreateDeliveryStatusFetcher(db))
	deliveryRouter.Add("Fetch New Delivery Information", http.MethodPost, "/info", pr.CreateDeliveryDetailsFetcher(db))
	deliveryRouter.Add("Change Delivery Order Status", http.MethodGet, "/change/{orderId}", pr.CreateDeliveryStatusChanger(db))

	commentRouter := router.SubRouteBuilder("/comment")
	commentRouter.Add("Fetch Comments", http.MethodGet, "/{productId}", pr.CreateCommentFetcher(db))
	commentRouter.Add("Insert Comment", http.MethodPost, "/insert", pr.CreateCommentWriter(db))

	log.Fatal(http.ListenAndServe(config.Server().String(), router.Router()))
}
