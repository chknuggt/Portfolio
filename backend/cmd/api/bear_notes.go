package main

import (
	"encoding/json"
	"net/http"

	"github.com/marioselef/portfolio/internal/db/queries"
)

type bearNoteResponse struct {
	ID        string  `json:"id"`
	Title     string  `json:"title"`
	Excerpt   string  `json:"excerpt"`
	Content   *string `json:"content"`
	SortOrder int32   `json:"sort_order"`
}

func handleListBearNotes(q *queries.Queries) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := q.ListBearNotes(r.Context())
		if err != nil {
			http.Error(w, "failed to list bear notes", http.StatusInternalServerError)
			return
		}
		resp := make([]bearNoteResponse, len(rows))
		for i, n := range rows {
			resp[i] = bearNoteResponse{
				ID:        uuidStr(n.ID),
				Title:     n.Title,
				Excerpt:   n.Excerpt,
				Content:   n.Content,
				SortOrder: n.SortOrder,
			}
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}
