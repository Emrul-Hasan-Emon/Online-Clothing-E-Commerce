package route

import (
	"net/http"
	"time"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/auth"
	log "github.com/Emrul-Hasan-Emon/repositories/ecommerce/log4u"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type Builder struct {
	allowCors  bool
	router     *mux.Router
	serverName string
	isLogDebug bool
}

// Router fetch the configured router.
func (rb *Builder) Router() *mux.Router {
	return rb.router
}

func NewRouteBuilder(allowCors bool, serverName string, isLogDebug bool) *Builder {
	return &Builder{allowCors, mux.NewRouter().StrictSlash(true), serverName, isLogDebug}
}

func (rb *Builder) SubRouteBuilder(pathPrefix string) *Builder {
	return &Builder{rb.allowCors, rb.router.PathPrefix(pathPrefix).Subrouter(), rb.serverName, rb.isLogDebug}
}

func (rb *Builder) Add(action string, method, path string, handlerFunc http.HandlerFunc) *mux.Route {
	handler := rb.generalHanlder(
		rb.corsHanlder(
			rb.performanceLogger(
				handlerFunc, action)))
	return rb.add(action, method, path, handler)
}

func (rb *Builder) AddSafe(action string, method, path string, handlerFunc http.HandlerFunc) *mux.Route {
	handler := rb.generalHanlder(
		rb.corsHanlder(
			auth.Protector(
				action, rb.performanceLogger(
					handlerFunc, action))))
	return rb.add(action, method, path, handler)
}
func (rb *Builder) add(action string, method, path string, handler http.Handler) *mux.Route {
	return rb.router.Methods(method).Path(path).Name(string(action)).Handler(handler)
}

func (rb *Builder) performanceLogger(inner http.HandlerFunc, action string) http.Handler {
	if rb.isLogDebug {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			inner.ServeHTTP(w, r)
			log.Debugf("%s %s %s %s", r.Method, r.RequestURI, action, time.Since(start))
		})
	}
	return inner
}

func (rb *Builder) corsHanlder(handler http.Handler) http.Handler {
	if rb.allowCors {
		return cors.New(cors.Options{
			AllowedHeaders:   []string{"authorization"},
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowCredentials: true,
		}).Handler(handler)
	}
	return handler
}

func (rb *Builder) generalHanlder(inner http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Server", rb.serverName)
		inner.ServeHTTP(w, r)
	})
}
