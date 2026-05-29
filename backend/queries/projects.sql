-- name: ListProjects :many
SELECT * FROM projects ORDER BY sort_order ASC;
