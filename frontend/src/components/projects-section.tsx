const projects = [
  {
    name: "AI Trading Pipeline",
    description:
      "Fully automated forex trading system with AI-driven analysis, real-time data ingestion, and systematic strategy execution.",
    tech: ["Python", "AI/ML", "APIs", "PostgreSQL"],
    color: "#ff9e64",
  },
  {
    name: "E-Commerce Platform",
    description:
      "Commercial e-commerce application with payment processing, inventory management, and responsive storefront.",
    tech: ["Next.js", "React", "Supabase", "Stripe"],
    color: "#7aa2f7",
  },
  {
    name: "Cross-Platform Mobile App",
    description:
      "Mobile application built with React Native / Flutter, targeting both iOS and Android from a single codebase.",
    tech: ["React Native", "Flutter", "TypeScript"],
    color: "#bb9af7",
  },
  {
    name: "Portfolio Website",
    description:
      "This site — an interactive, terminal-themed portfolio with scroll-driven animations and a 3D MacBook component.",
    tech: ["React", "Vite", "Framer Motion", "Tailwind CSS"],
    color: "#16f2b3",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 lg:py-24">
      {/* Section header */}
      <div className="mb-12 flex items-center gap-4">
        <p className="font-mono text-sm text-[#565f89]">
          <span className="text-[#9ece6a]">marios@arch</span>
          <span className="text-[#565f89]">:</span>
          <span className="text-[#7aa2f7]">~</span>
          <span className="text-[#565f89]">$</span>
          <span className="text-[#c0caf5]"> ls ~/projects/</span>
        </p>
      </div>

      <h2 className="mb-10 text-4xl font-bold tracking-tight md:text-5xl">
        <span className="text-[#16f2b3]">Projects</span>
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.name}
            className="group rounded-lg border border-[#1a1b2e] bg-[#0a0d1a]/60 p-6 transition-colors hover:border-[#16f2b3]/30"
          >
            {/* Terminal title bar */}
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f7768e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e0af68]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#9ece6a]" />
              <span className="ml-2 font-mono text-xs text-[#565f89]">
                ~/projects/{project.name.toLowerCase().replace(/\s+/g, "-")}
              </span>
            </div>

            <h3
              className="mb-2 text-lg font-semibold"
              style={{ color: project.color }}
            >
              {project.name}
            </h3>

            <p className="mb-4 text-sm leading-relaxed text-[#a9b1d6]">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded border border-[#25213b] px-2 py-0.5 font-mono text-xs text-[#565f89]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
