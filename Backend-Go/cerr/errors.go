package cerr

import "net/http"

type Error struct {
	Status int
	Msg    string
}

func SendError(w http.ResponseWriter, msg string) {
	serr := NewError(http.StatusInternalServerError, msg)
	http.Error(w, serr.Msg, serr.Status)
}

func NewError(status int, msg string) *Error {
	return &Error{Status: status, Msg: msg}
}
