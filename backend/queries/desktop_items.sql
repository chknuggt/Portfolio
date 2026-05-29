-- name: ListDesktopItems :many
SELECT * FROM desktop_items ORDER BY sort_order ASC;
