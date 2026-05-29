-- +goose Up
CREATE TABLE experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE,
    description TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

-- +goose Down
DROP TABLE experience;
