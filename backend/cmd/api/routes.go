package main

import (
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/marioselef/portfolio/internal/db/queries"
)

func addRoutes(r chi.Router, pool *pgxpool.Pool) {
	q := queries.New(pool)

	r.Get("/", handleRoot())
	r.Get("/health", handleHealth(pool))
	r.Get("/users/count", handleCountUsers(q))
}
