-- +goose Up
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    icon TEXT NOT NULL,
    live_url TEXT,
    github_url TEXT,
    technologies TEXT,
    content TEXT,
    markdown_file TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    img TEXT NOT NULL,
    link TEXT NOT NULL,
    category TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE,
    description TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school TEXT NOT NULL,
    degree TEXT NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE,
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE music (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    cover TEXT NOT NULL,
    audio TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE about_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL
);

CREATE TABLE bear_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT,
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE finder_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('folder', 'file')),
    parent_id UUID REFERENCES finder_items(id) ON DELETE CASCADE,
    link TEXT,
    icon TEXT,
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE typora_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL DEFAULT 'Untitled',
    content TEXT NOT NULL DEFAULT ''
);

-- +goose Down
DROP TABLE IF EXISTS typora_documents;
DROP TABLE IF EXISTS finder_items;
DROP TABLE IF EXISTS bear_notes;
DROP TABLE IF EXISTS about_sections;
DROP TABLE IF EXISTS music;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS experience;
DROP TABLE IF EXISTS social_links;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS users;
DROP EXTENSION IF EXISTS pgcrypto;
