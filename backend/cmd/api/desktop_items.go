package main

import (
	"encoding/json"
	"net/http"

	"github.com/marioselef/portfolio/internal/db/queries"
)

type desktopItemResponse struct {
	ID        string  `json:"id"`
	Name      string  `json:"name"`
	Type      string  `json:"type"`
	ParentID  *string `json:"parent_id"`
	Link      *string `json:"link"`
	Icon      *string `json:"icon"`
	SortOrder int32   `json:"sort_order"`
}

func handleListDesktopItems(q *queries.Queries) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := q.ListDesktopItems(r.Context())
		if err != nil {
			http.Error(w, "failed to list desktop items", http.StatusInternalServerError)
			return
		}
		resp := make([]desktopItemResponse, len(rows))
		for i, item := range rows {
			var parentID *string
			if item.ParentID.Valid {
				s := uuidStr(item.ParentID)
				parentID = &s
			}
			resp[i] = desktopItemResponse{
				ID:        uuidStr(item.ID),
				Name:      item.Name,
				Type:      item.Type,
				ParentID:  parentID,
				Link:      item.Link,
				Icon:      item.Icon,
				SortOrder: item.SortOrder,
			}
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}
