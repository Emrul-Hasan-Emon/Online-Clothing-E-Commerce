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
		order.OrderStaus = "Pending"

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
