package resource

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/common"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/database"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"
)

func (pr *Product) CreateCartInserter(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var cartDetails []model.Cart
		err := json.NewDecoder(r.Body).Decode(&cartDetails)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		fmt.Println(cartDetails)
		err = db.InsertCartDetails(cartDetails)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode("cart details entered successfully")
	}
}

func (pr *Product) CreateCartFetcher(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rw := common.RequestWrapper(r)
		orderId, err := rw.FindOrderId()
		if err != nil || orderId == 0 {
			http.Error(w, "order id couldn't found", http.StatusBadRequest)
			return
		}
		carts, err := db.FetchCartDetails(orderId)
		if err != nil {
			http.Error(w, "an error occured while fetching carts", http.StatusBadRequest)
			return
		}
		cartsJsonData, err := json.Marshal(carts)
		if err != nil {
			return
		}
		common.SetHeader(w)
		w.Write(cartsJsonData)
	}
}
