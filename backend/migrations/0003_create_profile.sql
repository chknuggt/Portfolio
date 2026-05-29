-- +goose Up
CREATE TABLE profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT NOT NULL,
    avatar TEXT NOT NULL DEFAULT '/img/ui/profile.jpg',
    email TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    github TEXT,
    linkedin TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- +goose Down
DROP TABLE profile;
