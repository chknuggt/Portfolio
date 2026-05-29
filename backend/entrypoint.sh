#!/bin/sh
set -e
./goose -dir migrations postgres "$DATABASE_URL" up
exec ./api
