package main

import (
	"encoding/json"
	"net/http"

	"github.com/marioselef/portfolio/internal/db/queries"
)

type profileResponse struct {
	Name     string  `json:"name"`
	Title    string  `json:"title"`
	Bio      string  `json:"bio"`
	Avatar   string  `json:"avatar"`
	Email    string  `json:"email"`
	Phone    *string `json:"phone"`
	Location *string `json:"location"`
	Github   *string `json:"github"`
	Linkedin *string `json:"linkedin"`
}

func handleGetProfile(q *queries.Queries) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		p, err := q.GetProfile(r.Context())
		if err != nil {
			http.Error(w, "profile not found", http.StatusNotFound)
			return
		}
		resp := profileResponse{
			Name:     p.Name,
			Title:    p.Title,
			Bio:      p.Bio,
			Avatar:   p.Avatar,
			Email:    p.Email,
			Phone:    p.Phone,
			Location: p.Location,
			Github:   p.Github,
			Linkedin: p.Linkedin,
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}
