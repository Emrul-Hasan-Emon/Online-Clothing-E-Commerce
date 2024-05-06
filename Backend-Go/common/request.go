package common

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type wrapper struct {
	req *http.Request
}

// requestWrapper creates a HTTP request wrapper
func RequestWrapper(r *http.Request) *wrapper {
	return &wrapper{r}
}

func reqMuxParam(r *http.Request, name string) string {
	vars := mux.Vars(r)
	productId := vars[name]
	return productId
}

func (w *wrapper) FindProductId() (int, error) {
	id := reqMuxParam(w.req, "productId")
	if id == "" {
		return 0, nil
	}
	return strconv.Atoi(id)
}

func (w *wrapper) FindUserId() (int, error) {
	id := reqMuxParam(w.req, "userId")
	if id == "" {
		return 0, nil
	}
	return strconv.Atoi(id)
}

func (w *wrapper) FindOrderId() (int, error) {
	id := reqMuxParam(w.req, "orderId")
	if id == "" {
		return 0, nil
	}
	return strconv.Atoi(id)
}

func (w *wrapper) FindRole() (string, error) {
	id := reqMuxParam(w.req, "role")
	if id == "" {
		return "", nil
	}
	return id, nil
}
