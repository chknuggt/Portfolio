-- +goose Up
CREATE TABLE desktop_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('folder', 'file')),
    parent_id UUID REFERENCES desktop_items(id) ON DELETE CASCADE,
    link TEXT,
    icon TEXT,
    sort_order INT NOT NULL DEFAULT 0
);

-- +goose Down
DROP TABLE desktop_items;
