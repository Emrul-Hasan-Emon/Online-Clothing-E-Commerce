package resource

import (
	"encoding/json"
	"net/http"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/common"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/database"
	log "github.com/Emrul-Hasan-Emon/repositories/ecommerce/log4u"
)

func (pr *Product) CreateCategoryFetcher(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		response, err := db.FetchCategory()
		if err != nil {
			log.Errorf("error to parse products. Error: %s", err.Error())
			return
		}
		// Convert products slice to JSON
		categoriesJSON, err := json.Marshal(response)
		if err != nil {
			log.Errorf("unexpected erroc occured. Error: %s", err)
			return
		}
		common.SetHeader(w)
		w.Write(categoriesJSON)
	}
}
