package main

import (
	"encoding/json"
	"net/http"

	"github.com/marioselef/portfolio/internal/db/queries"
)

type projectResponse struct {
	ID           string  `json:"id"`
	Title        string  `json:"title"`
	Excerpt      string  `json:"excerpt"`
	Icon         string  `json:"icon"`
	LiveUrl      *string `json:"live_url"`
	GithubUrl    *string `json:"github_url"`
	Technologies *string `json:"technologies"`
	MarkdownFile *string `json:"markdown_file"`
	SortOrder    int32   `json:"sort_order"`
}

func handleListProjects(q *queries.Queries) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := q.ListProjects(r.Context())
		if err != nil {
			http.Error(w, "failed to list projects", http.StatusInternalServerError)
			return
		}
		resp := make([]projectResponse, len(rows))
		for i, p := range rows {
			resp[i] = projectResponse{
				ID:           uuidStr(p.ID),
				Title:        p.Title,
				Excerpt:      p.Excerpt,
				Icon:         p.Icon,
				LiveUrl:      p.LiveUrl,
				GithubUrl:    p.GithubUrl,
				Technologies: p.Technologies,
				MarkdownFile: p.MarkdownFile,
				SortOrder:    p.SortOrder,
			}
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}
