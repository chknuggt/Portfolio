package main

import (
	"encoding/json"
	"net/http"

	"github.com/marioselef/portfolio/internal/db/queries"
)

type skillResponse struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Category string `json:"category"`
}

func handleListSkills(q *queries.Queries) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := q.ListSkills(r.Context())
		if err != nil {
			http.Error(w, "failed to list skills", http.StatusInternalServerError)
			return
		}
		resp := make([]skillResponse, len(rows))
		for i, s := range rows {
			resp[i] = skillResponse{
				ID:       uuidStr(s.ID),
				Name:     s.Name,
				Category: s.Category,
			}
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}
