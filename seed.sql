-- Run this in TablePlus after migrations have applied.
-- Edit values to match your current info before running.

-- Profile
INSERT INTO profile (name, title, bio, avatar, email, phone, location, github, linkedin)
VALUES (
  'Marios',
  'Junior Full-Stack & Mobile Developer',
  'Hi, I''m Marios — a Full-Stack & Mobile Developer based in Cyprus. I build web and mobile apps using React, Next.js, TypeScript, Flutter, Django, and Go. Currently working at IANUS Technologies.',
  '/img/ui/profile.jpg',
  'marioseleftheriou99@yahoo.com',
  '+357 94109466',
  'Cyprus',
  'https://github.com/chknuggt',
  'https://www.linkedin.com/in/marios-eleftheriou-59b399339/'
);

-- Projects
INSERT INTO projects (title, excerpt, icon, link, markdown_file, sort_order) VALUES
('macOS Portfolio',    'This site — a macOS-style interactive portfolio built with React + Three.js.',       'img/ui/logos/portfolio.png',      NULL,                                     'portfolio.md',        0),
('WaterFilterNet',     'E-commerce platform for water filtration systems built with Next.js and Stripe.',     'img/ui/logos/waterfilter.png',    'https://waterfilter.net',                'waterfilter.md',      1),
('Choirokoitia App',   'Heritage tourism app for the Choirokoitia UNESCO site built with Flutter.',           'img/ui/logos/choirokoitia.png',   NULL,                                     'choirokoitia.md',     2),
('Chess Game',         'Browser-based chess game with AI opponent built in TypeScript.',                      'img/ui/logos/chess.png',          NULL,                                     'chess-game.md',       3),
('SaaS CMS Builder',   'No-code website builder SaaS with drag-and-drop interface.',                         'img/ui/logos/saas.png',           NULL,                                     'saas-cms.md',         4),
('AI Trading Pipeline','Automated Forex trading pipeline powered by GPT-4 signal analysis.',                  'img/ui/logos/trading.png',        NULL,                                     'ai-trading.md',       5);

-- Social links
INSERT INTO social_links (title, img, link, category, sort_order) VALUES
('GitHub',   'img/ui/sites/github.png',   'https://github.com/chknuggt',                                    'favorites', 0),
('LinkedIn', 'img/ui/sites/linkedin.png', 'https://www.linkedin.com/in/marios-eleftheriou-59b399339/',      'favorites', 1),
('Email',    'img/ui/sites/mail.png',     'mailto:marioseleftheriou99@yahoo.com',                           'freq',      0),
('Chess',    'img/ui/sites/chess.png',    'https://www.chess.com/member/chknuggt',                          'freq',      1);

-- Experience
INSERT INTO experience (company, role, period_start, period_end, description, sort_order) VALUES
('IANUS Technologies', 'Junior Full-Stack Developer', '2024-01-01', NULL,
 'Building and maintaining full-stack web applications. Working with React, TypeScript, and Django REST Framework. Contributing to mobile development with Flutter.', 0);

-- Education
INSERT INTO education (school, degree, period_start, period_end, sort_order) VALUES
('Frederick University', 'BSc Computer Science', '2020-09-01', '2024-06-01', 0);

-- Skills
INSERT INTO skills (name, category, sort_order) VALUES
('TypeScript',   'Languages',   0),
('Python',       'Languages',   1),
('Go',           'Languages',   2),
('Dart',         'Languages',   3),
('SQL',          'Languages',   4),
('React',        'Frameworks',  0),
('Next.js',      'Frameworks',  1),
('Flutter',      'Frameworks',  2),
('Django',       'Frameworks',  3),
('Chi',          'Frameworks',  4),
('PostgreSQL',   'Tools',       0),
('Supabase',     'Tools',       1),
('Docker',       'Tools',       2),
('Git',          'Tools',       3),
('Three.js',     'Tools',       4);

-- Music
INSERT INTO music (title, artist, cover, audio, sort_order) VALUES
('Faded', 'Alan Walker / Jesper Borgen', '/music/thumbnail.png', 'music/faded.mp3', 0);

-- About sections (used by terminal / about views)
INSERT INTO about_sections (key, content) VALUES
('bio',           'Hi, this is Marios. I''m a Junior Full-Stack & Mobile Developer based in Cyprus. I work at IANUS Technologies building web and mobile applications.'),
('interests',     'Full-Stack Development / React & Next.js / Flutter / Django / Go / FinTech & Forex / AI Automation'),
('collaboration', 'I''m open to collaboration on full-stack projects, mobile apps, and AI-driven systems.'),
('contact',       'Email: marioseleftheriou99@yahoo.com | GitHub: github.com/chknuggt | Phone: +357 94109466 | Location: Cyprus');
