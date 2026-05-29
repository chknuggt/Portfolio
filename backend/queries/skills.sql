-- name: ListSkills :many
SELECT * FROM skills ORDER BY category ASC, sort_order ASC;
