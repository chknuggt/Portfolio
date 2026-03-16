<?php

namespace Database\Seeders;

use App\Models\Content;
use App\Models\Setting;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedSettings();
        $this->seedContent();
    }

    private function seedSettings(): void
    {
        $settings = [
            // Personal
            'name' => 'Marios Eleftheriou',
            'title' => 'Full Stack Developer',
            'hero_text' => 'Welcome to my Portfolio',
            'username' => 'marioselef',
            'email' => 'marioseleftheriou99@yahoo.com',
            'phone' => '357 94109466',
            'location' => 'Cyprus',
            'github' => 'https://github.com/chknuggt',
            'github_username' => 'chknuggt',
            'linkedin' => 'https://www.linkedin.com/in/marios-eleftheriou-59b399339/',
            'chess_link' => 'https://www.chess.com/member/chknuggt',
            'resume_filename' => 'Marios_Eleftheriou_CV.pdf',

            // Siri
            'siri_bio' => 'Marios Eleftheriou is a Junior Full-Stack & Mobile Developer working at IANUS Technologies in Cyprus. GitHub: https://github.com/chknuggt He builds full-stack projects using React, Next.js, TypeScript, Django, Flutter, Supabase, and PostgreSQL. His resume is available for download.',

            // Music
            'music_title' => 'Faded',
            'music_artist' => 'Alan Walker / Jesper Borgen',
            'music_cover' => '/music/thumbnail.png',
            'music_audio' => 'music/faded.mp3',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }

    private function seedContent(): void
    {
        $items = [
            // ── Bear profile pages ──
            [
                'type' => 'page',
                'slug' => 'about-me',
                'title' => 'About Me',
                'excerpt' => 'Junior Full-Stack & Mobile Developer | FinTech & Forex Enthusiast',
                'icon' => 'i-la:dragon',
                'body' => "# About Me\n\n## Introduction\n\nHey there!\n\nI'm **Marios Eleftheriou**, a Junior Full-Stack & Mobile Developer specializing in **Next.js, React Native, and Flutter**, with a strong interest in **FinTech & Forex**.\n\nHighly motivated Software Engineer with hands-on experience in full-stack development, API integrations, and cloud deployment. Currently contributing to **IANUS Technologies** in Larnaca, Cyprus.\n\nCurrently pursuing a **Bachelor's degree in Informatics** at New Bulgarian University (GPA: 5.12/6), graduating July 2026.\n\n## Skills\n\n**Languages:** TypeScript, JavaScript, Python, C++, C#, Dart, HTML/CSS, SQL\n\n**Frameworks:** Next.js, React, React Native (Expo), Flutter, Django, Supabase\n\n**Tools & Platforms:** Git/GitHub, Docker, Vercel, Hetzner, PostgreSQL, JWT, API Development\n\n## Contact\n\n- Email: marioseleftheriou99@yahoo.com\n- Phone: 357 94109466\n- Github: @marioselef\n- Location: Cyprus",
            ],
            [
                'type' => 'page',
                'slug' => 'github-stats',
                'title' => 'Github Stats',
                'excerpt' => 'Here are some stats about my GitHub account...',
                'icon' => 'i-icon-park-outline:github',
                'body' => "# Github Stats\n\nMy GitHub stats (powered by github-readme-stats):\n\n[![github stats](https://github-readme-stats.vercel.app/api?username=chknuggt&show_icons=true&hide_title=true&hide_border=true)](https://github.com/chknuggt)\n\n[![top langs](https://github-readme-stats.vercel.app/api/top-langs/?username=chknuggt&layout=compact&hide_border=true)](https://github.com/chknuggt)",
            ],
            [
                'type' => 'page',
                'slug' => 'about-site',
                'title' => 'About This Site',
                'excerpt' => 'Something about this macOS-style portfolio site...',
                'icon' => 'i-octicon:browser',
                'body' => "# About This Site\n\nThis site is inspired by macOS, developed using React, Zustand and UnoCSS.\n\nThe source code is hosted on GitHub.",
            ],

            // ── Projects (used by Bear, Launchpad, Finder) ──
            [
                'type' => 'project',
                'slug' => 'portfolio',
                'title' => 'macOS Portfolio',
                'excerpt' => 'A macOS-themed portfolio with Laravel CMS backend.',
                'icon' => 'i-heroicons-outline:desktop-computer',
                'link' => 'https://github.com/chknuggt',
                'img' => 'img/icons/launchpad/apple.png',
                'body' => "# macOS Portfolio\n\nA macOS-themed portfolio website simulating the macOS desktop experience.\n\n- Interactive desktop with draggable/resizable windows\n- Dock with app magnification effects\n- Multiple apps: Bear (notes), Safari, Terminal, Spotify, FaceTime\n- Dark mode, Control Center, Spotlight search\n- CMS backend powered by Laravel\n\n**Tech Stack:** React, TypeScript, Vite, UnoCSS, Zustand, Laravel, PHP, MariaDB, Redis, Docker",
            ],
            [
                'type' => 'project',
                'slug' => 'waterfilter',
                'title' => 'WaterFilterNet',
                'excerpt' => 'A full commercial e-commerce platform with Next.js featuring admin dashboard, shop management, and order tracking.',
                'icon' => 'i-heroicons-solid:shopping-cart',
                'link' => 'https://waterfilternet.com',
                'img' => 'img/icons/safari.png',
                'body' => "# WaterFilterNet\n\nA full commercial e-commerce platform built with **Next.js** featuring:\n\n- Admin dashboard with analytics\n- Shop management and product listings\n- User accounts and order tracking\n- Inventory management\n- Payment integration\n\n**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Supabase",
            ],
            [
                'type' => 'project',
                'slug' => 'choirokoitia',
                'title' => 'Choirokoitia Heritage App',
                'excerpt' => 'Mobile app (Flutter) for Android and iOS with bilingual English/Greek content for a UNESCO heritage site.',
                'icon' => 'i-heroicons-solid:device-mobile',
                'link' => 'https://github.com/chknuggt',
                'img' => 'img/icons/launchpad/apple.png',
                'body' => "# Choirokoitia Heritage App\n\nA mobile app for the **Choirokoitia UNESCO Heritage Site** built with Flutter.\n\n- Available on Android and iOS\n- Bilingual content (English / Greek)\n- Interactive site map and information\n\n**Tech Stack:** Flutter, Dart",
            ],
            [
                'type' => 'project',
                'slug' => 'chess-game',
                'title' => 'Chess Game',
                'excerpt' => 'A chess game built with Unity, published on itch.io.',
                'icon' => 'i-fa-solid:chess',
                'link' => 'https://github.com/chknuggt',
                'img' => 'img/icons/chess.svg',
                'body' => "# Chess Game\n\nA chess game built with **Unity** and published on itch.io.\n\n- Full chess rules implementation\n- AI opponent\n- Clean UI design\n\n**Tech Stack:** Unity, C#",
            ],
            [
                'type' => 'project',
                'slug' => 'saas-cms',
                'title' => 'SaaS CMS Website Builder',
                'excerpt' => 'A SaaS CMS website builder with built-in staff management tools for local businesses.',
                'icon' => 'i-heroicons-solid:template',
                'link' => 'https://github.com/chknuggt',
                'img' => 'img/icons/vscode.png',
                'body' => "# SaaS CMS Website Builder\n\nA **SaaS CMS website builder** with built-in staff management tools designed for local businesses.\n\n- Drag-and-drop page builder\n- Staff management and scheduling\n- Multi-tenant architecture\n- Custom domain support\n\n**Tech Stack:** Next.js, TypeScript, Supabase",
            ],
            [
                'type' => 'project',
                'slug' => 'ai-trading',
                'title' => 'AI Trading Pipeline',
                'excerpt' => 'Fully automated AI trading pipeline that monitors live news, parses macroeconomic data, and autonomously executes trades.',
                'icon' => 'i-heroicons-solid:trending-up',
                'link' => 'https://github.com/chknuggt',
                'img' => 'img/icons/terminal.png',
                'body' => "# AI Trading Pipeline\n\nA fully automated **AI trading pipeline** that:\n\n- Monitors live news feeds in real-time\n- Parses macroeconomic data and indicators\n- Incorporates custom indicators\n- Autonomously executes trades based on AI analysis\n\n**Tech Stack:** Python, AI/ML, API Integrations",
            ],

            // ── Terminal files ──
            [
                'type' => 'terminal',
                'slug' => 'terminal-intro',
                'title' => 'intro.txt',
                'body' => "Hi, this is Marios. I'm a Junior Full-Stack & Mobile Developer currently working at IANUS Technologies in Cyprus.",
            ],
            [
                'type' => 'terminal',
                'slug' => 'terminal-interests',
                'title' => 'interests.txt',
                'body' => 'Full-Stack Development / React & Next.js / Flutter / Django / FinTech & Forex / AI Automation',
            ],
            [
                'type' => 'terminal',
                'slug' => 'terminal-who-cares',
                'title' => 'who-cares.txt',
                'body' => "I'm open to collaboration on full-stack projects, mobile apps, and AI-driven systems.",
            ],
            [
                'type' => 'terminal',
                'slug' => 'terminal-dream',
                'title' => 'my-dream.cpp',
                'body' => "while(sleeping) {\n    money++;\n}",
            ],

            // ── Safari links ──
            [
                'type' => 'link',
                'slug' => 'link-email',
                'title' => 'Email',
                'link' => 'mailto:marioseleftheriou99@yahoo.com',
                'img' => 'img/sites/gmail.svg',
                'icon' => 'favorite',
            ],
            [
                'type' => 'link',
                'slug' => 'link-github',
                'title' => 'Github',
                'link' => 'https://github.com/chknuggt',
                'img' => 'img/sites/github.svg',
                'icon' => 'favorite',
            ],
            [
                'type' => 'link',
                'slug' => 'link-linkedin',
                'title' => 'Linkedin',
                'link' => 'https://www.linkedin.com/in/marios-eleftheriou-59b399339/',
                'img' => 'img/sites/linkedin.svg',
                'icon' => 'favorite',
            ],
            [
                'type' => 'link',
                'slug' => 'link-github-freq',
                'title' => 'Github',
                'link' => 'https://github.com/',
                'img' => 'img/sites/github.svg',
                'icon' => 'frequent',
            ],
            [
                'type' => 'link',
                'slug' => 'link-chess',
                'title' => 'Chess.com',
                'link' => 'https://www.chess.com/member/chknuggt',
                'img' => 'img/icons/chess.svg',
                'icon' => 'frequent',
            ],
        ];

        foreach ($items as $item) {
            Content::updateOrCreate(['slug' => $item['slug']], $item);
        }
    }
}
