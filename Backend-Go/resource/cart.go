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

		err = updateProduct(cartDetails, db)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		err = db.InsertCartDetails(cartDetails)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode("cart details entered successfully")
	}
}

func updateProduct(cartDetails []model.Cart, db *database.Database) error {
	for cartItem := 0; cartItem < len(cartDetails); cartItem++ {
		product, err := db.FetchProductByID(model.ProductID(cartDetails[cartItem].ProductID))
		if err != nil {
			return err
		}

		for idx := 0; idx < len(product.Size); idx++ {
			if product.Size[idx].Color == cartDetails[cartItem].Color && product.Size[idx].Name == cartDetails[cartItem].Size {
				product.Quantity = product.Quantity - cartDetails[cartItem].Quantity
				product.Size[idx].Quantity = product.Size[idx].Quantity - cartDetails[cartItem].Quantity
				err = db.UpdateProductDetails(product, int(product.ID))
				if err != nil {
					return err
				}
			}
		}
	}
	return nil
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

func (pr *Product) CreateStockChecker(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var cartDetails []model.Cart
		err := json.NewDecoder(r.Body).Decode(&cartDetails)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		missingProductsId, err := checkStockExitOrNot(cartDetails, db)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(missingProductsId)
	}
}

func checkStockExitOrNot(cartDetails []model.Cart, db *database.Database) ([]int, error) {
	var missingProductId []int
	for cartItem := 0; cartItem < len(cartDetails); cartItem++ {
		products, err := db.FetchProductByID(model.ProductID(cartDetails[cartItem].ProductID))
		if err != nil {
			return []int{}, nil
		}

		for stock := 0; stock < len(products.Size); stock++ {
			color := products.Size[stock].Color
			name := products.Size[stock].Name
			quantity := products.Size[stock].Quantity

			if color == cartDetails[cartItem].Color && name == cartDetails[cartItem].Size {
				if cartDetails[cartItem].Quantity > quantity {
					missingProductId = append(missingProductId, cartDetails[cartItem].ProductID)
					break
				}
			}
		}
	}
	return missingProductId, nil
}
