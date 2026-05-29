package main

import (
	"encoding/json"
	"net/http"

	"github.com/marioselef/portfolio/internal/db/queries"
)

func handleListAbout(q *queries.Queries) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := q.ListAboutSections(r.Context())
		if err != nil {
			http.Error(w, "failed to list about sections", http.StatusInternalServerError)
			return
		}
		resp := make(map[string]string, len(rows))
		for _, s := range rows {
			resp[s.Key] = s.Content
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}
