package product

import (
	"net/http"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/database"
)

type Product struct {
}

func CreateNewProductInstance() *Product {
	return &Product{}
}

func (pr *Product) CreateProductFetcher(
	mapper *database.DatabaseMapper,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

	}
}
