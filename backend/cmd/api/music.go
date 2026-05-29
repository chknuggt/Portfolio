package main

import (
	"encoding/json"
	"net/http"

	"github.com/marioselef/portfolio/internal/db/queries"
)

type musicResponse struct {
	ID     string `json:"id"`
	Title  string `json:"title"`
	Artist string `json:"artist"`
	Cover  string `json:"cover"`
	Audio  string `json:"audio"`
}

func handleListMusic(q *queries.Queries) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := q.ListMusic(r.Context())
		if err != nil {
			http.Error(w, "failed to list music", http.StatusInternalServerError)
			return
		}
		resp := make([]musicResponse, len(rows))
		for i, m := range rows {
			resp[i] = musicResponse{
				ID:     uuidStr(m.ID),
				Title:  m.Title,
				Artist: m.Artist,
				Cover:  m.Cover,
				Audio:  m.Audio,
			}
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}
