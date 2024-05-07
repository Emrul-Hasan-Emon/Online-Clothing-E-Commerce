package resource

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/common"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/database"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"
)

func (pr *Product) CreateNewOrder(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var order model.Order
		err := json.NewDecoder(r.Body).Decode(&order)
		order.OrderStatus = "Pending"

		fmt.Println("Order ---> ", order)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		orderID, err := db.InsertNewOrder(order)
		if err != nil {
			fmt.Println(err)
			http.Error(w, "an error occured while inserting order details", http.StatusBadRequest)
			return
		}
		order.OrderID = orderID
		orderJsonData, err := json.Marshal(order)
		if err != nil {
			http.Error(w, "an expected error occured", http.StatusBadRequest)
			return
		}
		common.SetHeader(w)
		w.Write(orderJsonData)
	}
}

func (pr *Product) FetchOrderHistory(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rw := common.RequestWrapper(r)
		userId, err := rw.FindUserId()
		if err != nil || userId == 0 {
			http.Error(w, "User Id couldn't found", http.StatusBadRequest)
			return
		}
		orders, err := db.FetchOrderHistory(userId)
		if err != nil {
			http.Error(w, "an error occured while fetching orders", http.StatusBadRequest)
			return
		}
		orderJsonData, err := json.Marshal(orders)
		if err != nil {
			return
		}
		common.SetHeader(w)
		w.Write(orderJsonData)
	}
}

func (pr *Product) FetchAllOrders(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		orders, err := db.FetchAllOrders()
		if err != nil {
			http.Error(w, "an error occured while fetching orders", http.StatusBadRequest)
			return
		}
		orderJsonData, err := json.Marshal(orders)
		if err != nil {
			return
		}
		common.SetHeader(w)
		w.Write(orderJsonData)
	}
}
func (pr *Product) RemoveOrder(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rw := common.RequestWrapper(r)
		orderId, err := rw.FindOrderId()
		if err != nil {
			http.Error(w, "order couldn't found", http.StatusBadRequest)
			return
		}
		err = db.RemoveOrderRecord(orderId)
		if err != nil {
			http.Error(w, "an error occured while deleting the order", http.StatusBadRequest)
			return
		}
		common.SetHeader(w)
	}
}

func (pr *Product) CreateOrderStatusChanger(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rw := common.RequestWrapper(r)
		orderId, err := rw.FindOrderId()
		if err != nil {
			http.Error(w, "order couldn't found", http.StatusBadRequest)
			return
		}
		err = db.ChangeOrderStatus(orderId)

		if err != nil {
			http.Error(w, "an error occured while changing the order status", http.StatusBadRequest)
			return
		}
		common.SetHeader(w)
	}
}
