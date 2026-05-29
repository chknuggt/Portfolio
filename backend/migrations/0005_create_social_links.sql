-- +goose Up
CREATE TABLE social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    img TEXT NOT NULL,
    link TEXT NOT NULL,
    category TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

-- +goose Down
DROP TABLE social_links;
