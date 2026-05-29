package main

import (
	"encoding/json"
	"net/http"

	"github.com/marioselef/portfolio/internal/db/queries"
)

type experienceResponse struct {
	ID          string  `json:"id"`
	Company     string  `json:"company"`
	Role        string  `json:"role"`
	PeriodStart string  `json:"period_start"`
	PeriodEnd   *string `json:"period_end"`
	Description string  `json:"description"`
	SortOrder   int32   `json:"sort_order"`
}

func handleListExperience(q *queries.Queries) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := q.ListExperience(r.Context())
		if err != nil {
			http.Error(w, "failed to list experience", http.StatusInternalServerError)
			return
		}
		resp := make([]experienceResponse, len(rows))
		for i, e := range rows {
			start := pgDateStr(e.PeriodStart)
			var startStr string
			if start != nil {
				startStr = *start
			}
			resp[i] = experienceResponse{
				ID:          uuidStr(e.ID),
				Company:     e.Company,
				Role:        e.Role,
				PeriodStart: startStr,
				PeriodEnd:   pgDateStr(e.PeriodEnd),
				Description: e.Description,
				SortOrder:   e.SortOrder,
			}
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}
