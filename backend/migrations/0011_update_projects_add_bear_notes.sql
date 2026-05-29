-- +goose Up
ALTER TABLE projects RENAME COLUMN link TO live_url;
ALTER TABLE projects ADD COLUMN github_url TEXT;
ALTER TABLE projects ADD COLUMN technologies TEXT;

CREATE TABLE bear_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    file TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

-- +goose Down
ALTER TABLE projects RENAME COLUMN live_url TO link;
ALTER TABLE projects DROP COLUMN github_url;
ALTER TABLE projects DROP COLUMN technologies;

DROP TABLE bear_notes;
