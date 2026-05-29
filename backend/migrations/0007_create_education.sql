-- +goose Up
CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school TEXT NOT NULL,
    degree TEXT NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE,
    sort_order INT NOT NULL DEFAULT 0
);

-- +goose Down
DROP TABLE education;
