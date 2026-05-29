package main

import (
	"encoding/json"
	"net/http"

	"github.com/marioselef/portfolio/internal/db/queries"
)

type socialLinkResponse struct {
	ID       string `json:"id"`
	Title    string `json:"title"`
	Img      string `json:"img"`
	Link     string `json:"link"`
	Category string `json:"category"`
}

func handleListSocialLinks(q *queries.Queries) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := q.ListSocialLinks(r.Context())
		if err != nil {
			http.Error(w, "failed to list social links", http.StatusInternalServerError)
			return
		}
		resp := make([]socialLinkResponse, len(rows))
		for i, s := range rows {
			resp[i] = socialLinkResponse{
				ID:       uuidStr(s.ID),
				Title:    s.Title,
				Img:      s.Img,
				Link:     s.Link,
				Category: s.Category,
			}
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}
