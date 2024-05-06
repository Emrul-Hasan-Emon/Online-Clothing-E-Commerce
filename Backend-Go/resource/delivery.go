package resource

import (
	"encoding/json"
	"net/http"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/common"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/database"
)

func (pr *Product) CreateDeliveryManListFetcher(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rw := common.RequestWrapper(r)
		role, err := rw.FindRole()
		if err != nil || role == "" {
			http.Error(w, "role couldn't found", http.StatusBadRequest)
			return
		}
		deliveryManList, err := db.FetchDeliveryInformation(role)
		if err != nil {
			http.Error(w, "an error occured while fetching delivery man details", http.StatusBadRequest)
			return
		}

		jsonData, err := json.Marshal(deliveryManList)
		if err != nil {
			http.Error(w, "an unexpected error occured", http.StatusBadRequest)
			return
		}
		common.SetHeader(w)
		w.Write(jsonData)
	}
}
