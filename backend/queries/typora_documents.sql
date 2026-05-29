-- name: GetTyporaDocument :one
SELECT id, title, content FROM typora_documents LIMIT 1;
