package main

import (
	"encoding/json"
	"net/http"

	"github.com/marioselef/portfolio/internal/db/queries"
)

type typoraDocumentResponse struct {
	ID      string `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

func handleGetTyporaDocument(q *queries.Queries) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		doc, err := q.GetTyporaDocument(r.Context())
		if err != nil {
			http.Error(w, "failed to get typora document", http.StatusInternalServerError)
			return
		}
		resp := typoraDocumentResponse{
			ID:      uuidStr(doc.ID),
			Title:   doc.Title,
			Content: doc.Content,
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}
