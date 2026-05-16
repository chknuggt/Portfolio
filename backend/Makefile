.PHONY: migrate-up migrate-down migrate-status migrate-create

DATABASE_URL := $(shell grep DATABASE_URL .env | cut -d= -f2-)

migrate-up:
	goose -dir migrations postgres "$(DATABASE_URL)" up

migrate-down:
	goose -dir migrations postgres "$(DATABASE_URL)" down

migrate-status:
	goose -dir migrations postgres "$(DATABASE_URL)" status

migrate-create:
	goose -dir migrations create $(NAME) sql
