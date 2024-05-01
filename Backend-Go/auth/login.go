package auth

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/database"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"
	"github.com/golang-jwt/jwt"
)

var jwtKey = []byte("your_secret_key")

type Claims struct {
	Email string `json:"email"`
	jwt.StandardClaims
}

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

		userID, userName, userRole, err := db.ValidateUser(user)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			http.Error(w, "Invalid User", http.StatusBadRequest)
			return
		}
		expirationTime := time.Now().Add(100 * time.Minute)
		claims := &Claims{
			Email: user.Email,
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: expirationTime.Unix(),
			},
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		tokenString, err := token.SignedString(jwtKey)

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		response := map[string]string{"id": strconv.Itoa(userID), "name": userName, "role": userRole, "token": tokenString}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(response)
	}
}

func (auth *Authentication) ValidateToken() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("Authorization")

		if tokenString == "" {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		if claims, ok := token.Claims.(*Claims); ok && token.Valid {
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(claims.Email)
		} else {
			w.WriteHeader(http.StatusUnauthorized)
		}
	}
}
