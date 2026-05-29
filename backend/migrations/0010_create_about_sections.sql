-- +goose Up
CREATE TABLE about_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL
);

-- +goose Down
DROP TABLE about_sections;
