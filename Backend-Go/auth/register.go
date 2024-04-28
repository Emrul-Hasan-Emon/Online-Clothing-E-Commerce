package auth

import (
	"encoding/json"
	"net/http"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/database"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"
)

func (auth *Authentication) RegisterNewUser(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var user model.User
		err := json.NewDecoder(r.Body).Decode(&user)

		if err != nil {
			http.Error(w, "Failed to parse request body", http.StatusBadRequest)
			return
		}
		user.IsDeleted = false

		// Check if email already exists
		if db.CheckIfEmailExist(user.Email) {
			http.Error(w, "Email already exists", http.StatusConflict)
			return
		}

		err = db.InsertNewUserInformation(user)
		if err != nil {
			http.Error(w, "Failed to insert user into database", http.StatusInternalServerError)
			return
		}
		// Respond with success message
		w.WriteHeader(http.StatusOK)
	}
}
