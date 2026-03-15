import type { BearData } from "../types";

const bear: BearData[] = [
  {
    id: "profile",
    title: "Profile",
    icon: "i-fa-solid:paw",
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: "i-la:dragon",
        excerpt: "Junior Full-Stack & Mobile Developer | FinTech & Forex Enthusiast"
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: "i-icon-park-outline:github",
        excerpt: "Here are some stats about my GitHub account..."
      },
{
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: "i-octicon:browser",
        excerpt: "Something about this macOS-style portfolio site..."
      }
    ]
  },
  {
    id: "project",
    title: "Projects",
    icon: "i-octicon:repo",
    md: [
      {
        id: "portfolio",
        title: "macOS Portfolio",
        file: "markdown/portfolio.md",
        icon: "i-heroicons-outline:desktop-computer",
        excerpt: "A macOS-themed portfolio with Laravel CMS backend.",
        link: "https://github.com/chknuggt"
      },
      {
        id: "waterfilter",
        title: "WaterFilterNet",
        file: "markdown/waterfilter.md",
        icon: "i-heroicons-solid:shopping-cart",
        excerpt: "A full commercial e-commerce platform with Next.js featuring admin dashboard, shop management, and order tracking.",
        link: "https://waterfilternet.com"
      },
      {
        id: "choirokoitia",
        title: "Choirokoitia Heritage App",
        file: "markdown/choirokoitia.md",
        icon: "i-heroicons-solid:device-mobile",
        excerpt: "Mobile app (Flutter) for Android and iOS with bilingual English/Greek content for a UNESCO heritage site.",
        link: "https://github.com/chknuggt"
      },
      {
        id: "chess-game",
        title: "Chess Game",
        file: "markdown/chess-game.md",
        icon: "i-fa-solid:chess",
        excerpt: "A chess game built with Unity, published on itch.io.",
        link: "https://github.com/chknuggt"
      },
      {
        id: "saas-cms",
        title: "SaaS CMS Website Builder",
        file: "markdown/saas-cms.md",
        icon: "i-heroicons-solid:template",
        excerpt: "A SaaS CMS website builder with built-in staff management tools for local businesses.",
        link: "https://github.com/chknuggt"
      },
      {
        id: "ai-trading",
        title: "AI Trading Pipeline",
        file: "markdown/ai-trading.md",
        icon: "i-heroicons-solid:trending-up",
        excerpt: "Fully automated AI trading pipeline that monitors live news, parses macroeconomic data, and autonomously executes trades.",
        link: "https://github.com/chknuggt"
      }
    ]
  }
];

export default bear;
