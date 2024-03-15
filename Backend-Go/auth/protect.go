package auth

import "net/http"

type Action string

type Protector interface {
	Protect(Action, http.Handler) http.HandlerFunc
}
