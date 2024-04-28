package auth

import (
	"encoding/json"
	"net/http"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/database"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"
)

func (auth *Authentication) ValidateUser(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var user model.UserLogin
		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			http.Error(w, "Invalid User", http.StatusBadRequest)
			return
		}

		userName, userRole, err := db.ValidateUser(user)
		if err != nil {
			http.Error(w, "Invalid User", http.StatusBadRequest)
			return
		}
		// Return user name and role
		response := map[string]string{"name": userName, "role": userRole}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(response)
	}
}
