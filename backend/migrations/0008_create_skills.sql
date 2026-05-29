-- +goose Up
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

-- +goose Down
DROP TABLE skills;
