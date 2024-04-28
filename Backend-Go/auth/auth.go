package auth

import (
	"net/http"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/cerr"
	log "github.com/Emrul-Hasan-Emon/repositories/ecommerce/log4u"
)

type Authentication struct {
}

func CreateNewAuthInstance() *Authentication {
	return &Authentication{}
}

func Protector(action string, inner http.Handler) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !tokenExists(r) {
			msg := "Couldn't validate user. Login again."
			log.Errorf(msg)
			cerr.SendError(w, msg)
			return
		}

		jwtParser := NewJWTParser(getJWTToken(r))
		if err := jwtParser.VerifyToken(); err != nil {
			msg := "Invalid Token"
			cerr.SendError(w, msg)
			return
		}
		inner.ServeHTTP(w, r)
	})
}

func getJWTToken(r *http.Request) string {
	return r.Header.Get("Authorization")
}

func tokenExists(r *http.Request) bool {
	token := r.Header.Get("Authorization")
	return len(token) > 0
}
