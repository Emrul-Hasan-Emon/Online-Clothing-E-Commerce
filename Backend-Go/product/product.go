package product

import (
	"encoding/json"
	"net/http"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/common"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/database"
	log "github.com/Emrul-Hasan-Emon/repositories/ecommerce/log4u"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"
)

type Product struct {
}

func CreateNewProductInstance() *Product {
	return &Product{}
}

func (pr *Product) CreateProductFetcher(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		respone, err := db.FetchAllProduct()
		if err != nil {
			log.Errorf("error to parse products. Error: %s", err.Error())
			return
		}
		// Convert products slice to JSON
		productJSON, err := json.Marshal(respone)
		if err != nil {
			log.Errorf("unexpected erroc occured. Error: %s", err)
			return
		}

		common.SetHeader(w)
		w.Write(productJSON)
	}
}

func (pr *Product) CreateSingleProductFetcher(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rw := common.RequestWrapper(r)
		productId, err := rw.FindProductId()

		if err != nil {
			log.Errorf("error to fetch start index. Error: %s", err.Error())
			return
		}

		respone, err := db.FetchProductByID(model.ProductID(productId))
		if err != nil {
			log.Errorf("error to parse products. Error: %s", err.Error())
			return
		}
		// Convert products slice to JSON
		productJSON, err := json.Marshal(respone)
		if err != nil {
			log.Errorf("unexpected erroc occured. Error: %s", err)
			return
		}

		common.SetHeader(w)
		w.Write(productJSON)
	}
}

func (pr *Product) Testing(mapper *database.DatabaseMapper, db *database.Database) {
	db.FetchAllProduct()
}
