package resource

import (
	"encoding/json"
	"net/http"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/common"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/database"
)

func (pr *Product) CreateCommentFetcher(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rw := common.RequestWrapper(r)
		productId, err := rw.FindProductId()
		if err != nil || productId == 0 {
			http.Error(w, "product id could not found", http.StatusBadRequest)
			return
		}
		comments, err := db.FetchComments(productId)
		if err != nil {
			http.Error(w, "an error occured while fetching comments", http.StatusBadRequest)
			return
		}
		commentJson, err := json.Marshal(comments)
		if err != nil {
			http.Error(w, "an unexpected error occured", http.StatusBadRequest)
			return
		}
		common.SetHeader(w)
		w.Write(commentJson)
	}
}
