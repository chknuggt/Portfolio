-- +goose Up
CREATE TABLE music (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    cover TEXT NOT NULL,
    audio TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

-- +goose Down
DROP TABLE music;
