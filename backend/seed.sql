-- Seed data for local development.
-- Run once after migrations: psql $DATABASE_URL < seed.sql
-- Replace placeholder values with your own before running.

-- Profile
INSERT INTO profile (name, title, bio, avatar, email, phone, location, github, linkedin)
VALUES (
  'Alex Developer',
  'Full-Stack & Mobile Developer',
  'Hi, I''m Alex — a Full-Stack Developer based in Somewhere. I build web and mobile apps using React, Next.js, TypeScript, Flutter, and Go.',
  '/img/ui/profile.jpg',
  'hello@example.com',
  '+1 555 000 0000',
  'Somewhere',
  'https://github.com/yourusername',
  'https://linkedin.com/in/yourusername'
);

-- Experience
INSERT INTO experience (company, role, period_start, period_end, description, sort_order) VALUES
  ('Acme Corp', 'Junior Full-Stack Developer', '2023-01-01', NULL,
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 0);

-- Education
INSERT INTO education (school, degree, period_start, period_end, sort_order) VALUES
  ('State University', 'BSc Computer Science', '2019-09-01', '2023-06-01', 0);

-- Skills
INSERT INTO skills (name, category, sort_order) VALUES
  ('TypeScript',  'Languages',  0),
  ('Python',      'Languages',  1),
  ('Go',          'Languages',  2),
  ('React',       'Frameworks', 0),
  ('Next.js',     'Frameworks', 1),
  ('Flutter',     'Frameworks', 2),
  ('PostgreSQL',  'Tools',      0),
  ('Docker',      'Tools',      1),
  ('Git',         'Tools',      2);

-- Music
INSERT INTO music (title, artist, cover, audio, sort_order) VALUES
  ('Faded', 'Alan Walker / Jesper Borgen', '/music/thumbnail.png', 'music/faded.mp3', 0);

-- Social links (Safari favorites)
INSERT INTO social_links (title, category, img, link) VALUES
  ('Email',    'favorites', 'img/ui/sites/mail.png',     'mailto:hello@example.com'),
  ('GitHub',   'favorites', 'img/ui/sites/github.png',   'https://github.com/yourusername'),
  ('LinkedIn', 'favorites', 'img/ui/sites/linkedin.png', 'https://linkedin.com/in/yourusername'),
  ('Chess',    'freq',      'img/ui/sites/chess.png',    'https://chess.com/member/yourusername'),
  ('GitHub',   'freq',      'img/ui/sites/github.png',   'https://github.com/yourusername');

-- About sections (key-value config)
INSERT INTO about_sections (key, content) VALUES
  ('chess_url',         'https://chess.com/member/yourusername'),
  ('collaboration',     'I''m open to collaboration on full-stack projects, mobile apps, and open source work.'),
  ('contact',           'Email: hello@example.com | GitHub: github.com/yourusername | Location: Somewhere'),
  ('dream',             'while (sleeping) { money++; }'),
  ('interests',         'Full-Stack Development / React & Next.js / Flutter / Go / Open Source'),
  ('intro',             'Full-Stack & Mobile Developer based in Somewhere.'),
  ('spotify_embed_url', 'https://open.spotify.com/embed/artist/6l3HvQ5sa6mXTsMTB19rO5'),
  ('vscode_url',        'https://github1s.com/yourusername/yourrepo');

-- Finder items (filesystem tree)
-- Desktop folder children appear on the desktop; root folders appear in Finder sidebar.
WITH desktop AS (
  INSERT INTO finder_items (name, parent_id, type, sort_order)
  VALUES ('Desktop', NULL, 'folder', 2)
  RETURNING id
),
docs_root AS (
  INSERT INTO finder_items (name, parent_id, type, icon, sort_order)
  VALUES ('Documents', NULL, 'folder', '/img/icons/folder-blue.png', 1)
  RETURNING id
)
INSERT INTO finder_items (name, parent_id, type, icon, sort_order)
  SELECT 'Documents', id, 'folder', '/img/icons/folder-blue.png', 0 FROM desktop
  UNION ALL
  SELECT 'Projects',  id, 'folder', '/img/icons/folder-blue.png', 1 FROM desktop;

INSERT INTO finder_items (name, parent_id, type, sort_order) VALUES
  ('Downloads', NULL, 'folder', 3);

INSERT INTO finder_items (name, parent_id, type, icon, sort_order) VALUES
  ('Projects', NULL, 'folder', '/img/icons/folder-blue.png', 0);

-- Bear notes
INSERT INTO bear_notes (title, excerpt, sort_order, content) VALUES
  ('About Me', 'Full-Stack Developer | Open Source Enthusiast', 0,
'# About Me

## Introduction

Hey there! 👋

I''m **Alex Developer**, a Full-Stack & Mobile Developer specializing in **React, Next.js, and Flutter**.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Skills

**Languages:** TypeScript, JavaScript, Python, Go, Dart

**Frameworks:** React, Next.js, Flutter, Django

**Tools:** Docker, PostgreSQL, Git

## Contact

- Email: [hello@example.com](mailto:hello@example.com)
- GitHub: [@yourusername](https://github.com/yourusername)

## Resume

- Download: [CV (PDF)](/cv.pdf)'),

  ('GitHub Stats', 'My open source activity and contribution graph.', 1,
'# Github Stats

Check out my open source activity and contributions on GitHub:

[github.com/yourusername](https://github.com/yourusername)'),

  ('About This Site', 'How this macOS-style portfolio was built.', 2,
'# About This Site

This site is inspired by macOS, developed using [React](https://reactjs.org/), [Zustand](https://zustand-demo.pmnd.rs/) and [UnoCSS](https://uno.antfu.me/).

The source code is hosted [here](https://github.com/yourusername/Portfolio).');

-- Projects
INSERT INTO projects (title, excerpt, icon, live_url, sort_order, github_url, technologies, content) VALUES
  ('macOS Portfolio',
   'This site — a macOS-style interactive portfolio built with React and Go.',
   'img/ui/logos/portfolio.png', NULL, 0,
   'https://github.com/yourusername/Portfolio',
   'React, TypeScript, Go, PostgreSQL',
   '# macOS Portfolio

A macOS-themed portfolio website simulating the macOS desktop experience.

- Interactive desktop with draggable/resizable windows
- Dock with app magnification effects
- Multiple apps: Bear, Safari, Terminal, Spotify
- Dark mode, Control Center, Spotlight search

**Tech Stack:** React, TypeScript, Vite, UnoCSS, Zustand, Go, Chi, PostgreSQL, Docker'),

  ('E-Commerce Platform',
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
   'img/ui/logos/waterfilter.png', 'https://example.com', 1,
   'https://github.com/yourusername/ecommerce',
   'Next.js, TypeScript, Stripe, PostgreSQL',
   '# E-Commerce Platform

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

- Admin dashboard with analytics
- Product listings and inventory management
- Payment integration

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, PostgreSQL, Stripe'),

  ('Mobile App',
   'Cross-platform mobile app built with Flutter.',
   'img/ui/logos/choirokoitia.png', NULL, 2,
   'https://github.com/yourusername/mobileapp',
   'Flutter, Dart, Firebase',
   '# Mobile App

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

- Available on Android and iOS
- Real-time data sync
- Offline support

**Tech Stack:** Flutter, Dart, Firebase');

-- Typora document
INSERT INTO typora_documents (title, content) VALUES
  ('Welcome',
'# Welcome to my Portfolio

## About

Edit this document from your database to customise what appears in Typora.

## Notes

This is a markdown editor powered by [Milkdown](https://milkdown.dev).');
