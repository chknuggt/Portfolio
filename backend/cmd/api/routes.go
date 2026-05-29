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

	// nginx strips /api/ prefix before forwarding here
	r.Get("/profile", handleGetProfile(q))
	r.Get("/projects", handleListProjects(q))
	r.Get("/social-links", handleListSocialLinks(q))
	r.Get("/experience", handleListExperience(q))
	r.Get("/education", handleListEducation(q))
	r.Get("/skills", handleListSkills(q))
	r.Get("/music", handleListMusic(q))
	r.Get("/about", handleListAbout(q))
	r.Get("/bear-notes", handleListBearNotes(q))
	r.Get("/desktop-items", handleListDesktopItems(q))
}
