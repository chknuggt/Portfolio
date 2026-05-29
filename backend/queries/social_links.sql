-- name: ListSocialLinks :many
SELECT * FROM social_links ORDER BY category ASC, sort_order ASC;
