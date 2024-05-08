package resource

import (
	"encoding/json"
	"net/http"

	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/common"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/database"
	"github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"
)

func (pr *Product) CreateDeliveryManListFetcher(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rw := common.RequestWrapper(r)
		role, err := rw.FindRole()
		if err != nil || role == "" {
			http.Error(w, "role couldn't found", http.StatusBadRequest)
			return
		}
		deliveryManList, err := db.FetchDeliveryInformation(role)
		if err != nil {
			http.Error(w, "an error occured while fetching delivery man details", http.StatusBadRequest)
			return
		}

		jsonData, err := json.Marshal(deliveryManList)
		if err != nil {
			http.Error(w, "an unexpected error occured", http.StatusBadRequest)
			return
		}
		common.SetHeader(w)
		w.Write(jsonData)
	}
}

func (pr *Product) CreateDeliveryCountFetcher(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		deliveryCountList, err := db.FetchDeliveryQuantityInformation()
		if err != nil {
			http.Error(w, "an error occured while fetching delivery count details", http.StatusBadRequest)
			return
		}

		jsonData, err := json.Marshal(deliveryCountList)
		if err != nil {
			http.Error(w, "an unexpected error occured", http.StatusBadRequest)
			return
		}
		common.SetHeader(w)
		w.Write(jsonData)
	}
}

func (pr *Product) CreateNewDeliveryCreater(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var deliver model.Delivery
		err := json.NewDecoder(r.Body).Decode(&deliver)
		if err != nil {
			http.Error(w, "an unexpected error occured", http.StatusBadRequest)
			return
		}

		deliveryCount, err := db.FetchDeliveryCount(deliver.UserID)
		if err != nil || deliveryCount == -1 {
			http.Error(w, "no user id found", http.StatusBadRequest)
			return
		}
		deliveryCount++

		err = db.InsertNewDelivery(deliver)
		if err != nil {
			http.Error(w, "couldn't place new order", http.StatusBadRequest)
			return
		}

		err = db.UpdateCountInDeliveryCount(deliver.UserID, deliveryCount)
		if err != nil {
			http.Error(w, "couldn't place new order", http.StatusBadRequest)
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode("successfully placed order")
	}
}

func (pr *Product) CreateDeliveryStatusFetcher(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rw := common.RequestWrapper(r)
		orderId, err := rw.FindOrderId()
		if err != nil {
			http.Error(w, "order couldn't found", http.StatusBadRequest)
			return
		}
		orderStatus, err := db.FetchDeliveryStatus(orderId)
		if orderStatus == "" || err != nil {
			http.Error(w, "order status couldn't be fetched", http.StatusBadRequest)
			return
		}
		common.SetHeader(w)
		jsonData, err := json.Marshal(orderStatus)
		if err != nil {
			http.Error(w, "an unexpected error occured", http.StatusBadRequest)
			return
		}
		w.Write(jsonData)
	}
}

func (pr *Product) CreateDeliveryDetailsFetcher(
	db *database.Database,
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var deliver model.DeliveryBody
		err := json.NewDecoder(r.Body).Decode(&deliver)
		if err != nil {
			http.Error(w, "request body is not found", http.StatusBadRequest)
			return
		}
		deliveryDetails, err := db.FetchNewDeliveryInformation(deliver)
		if err != nil {
			http.Error(w, "no delivery information found", http.StatusBadRequest)
			return
		}
		jsonData, err := json.Marshal(deliveryDetails)
		if err != nil {
			http.Error(w, "an unexpected error occured", http.StatusBadRequest)
			return
		}
		w.WriteHeader(http.StatusOK)
		w.Write(jsonData)
	}
}
