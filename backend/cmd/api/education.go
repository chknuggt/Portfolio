package main

import (
	"encoding/json"
	"net/http"

	"github.com/marioselef/portfolio/internal/db/queries"
)

type educationResponse struct {
	ID          string  `json:"id"`
	School      string  `json:"school"`
	Degree      string  `json:"degree"`
	PeriodStart string  `json:"period_start"`
	PeriodEnd   *string `json:"period_end"`
	SortOrder   int32   `json:"sort_order"`
}

func handleListEducation(q *queries.Queries) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := q.ListEducation(r.Context())
		if err != nil {
			http.Error(w, "failed to list education", http.StatusInternalServerError)
			return
		}
		resp := make([]educationResponse, len(rows))
		for i, e := range rows {
			start := pgDateStr(e.PeriodStart)
			var startStr string
			if start != nil {
				startStr = *start
			}
			resp[i] = educationResponse{
				ID:          uuidStr(e.ID),
				School:      e.School,
				Degree:      e.Degree,
				PeriodStart: startStr,
				PeriodEnd:   pgDateStr(e.PeriodEnd),
				SortOrder:   e.SortOrder,
			}
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}
