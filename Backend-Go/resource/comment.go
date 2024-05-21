package resource

import (
	"encoding/json"
	"net/http"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/common"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/database"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"
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

func (pr *Product) CreateCommentWriter(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var comment model.Comment
		err := json.NewDecoder(r.Body).Decode(&comment)
		if err != nil {
			http.Error(w, "request couldnot found", http.StatusBadRequest)
			return
		}
		err = db.WriteComment(comment)
		if err != nil {
			http.Error(w, "an error occured while inserting comment into the database", http.StatusBadRequest)
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode("successfully posted the comment")
	}
}
