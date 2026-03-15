const skills = [
  // Languages
  { name: "TypeScript", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "Python", category: "language" },
  { name: "C++", category: "language" },
  { name: "C#", category: "language" },
  { name: "Dart", category: "language" },
  { name: "HTML/CSS", category: "language" },

  // Frameworks & Libraries
  { name: "Next.js", category: "framework" },
  { name: "React Native (Expo)", category: "framework" },
  { name: "Flutter", category: "framework" },
  { name: "Django", category: "framework" },

  // Tools & Platforms
  { name: "PostgreSQL", category: "tool" },
  { name: "Supabase", category: "tool" },
  { name: "Git / GitHub", category: "tool" },
  { name: "Docker", category: "tool" },
  { name: "Linux", category: "tool" },

  // Concepts
  { name: "API Development", category: "concept" },
  { name: "JWT Authentication", category: "concept" },
  { name: "Back-End Engineering", category: "concept" },
  { name: "Database Design", category: "concept" },
  { name: "CI/CD", category: "concept" },
];

const categoryColors: Record<string, string> = {
  language: "border-[#16f2b3] text-[#16f2b3]",
  framework: "border-[#7aa2f7] text-[#7aa2f7]",
  tool: "border-[#ff9e64] text-[#ff9e64]",
  concept: "border-[#bb9af7] text-[#bb9af7]",
};

export default function SkillsSection() {
  return (
    <div className="py-12 lg:py-20">
      <div className="flex flex-wrap justify-center gap-3">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-white/5 ${categoryColors[skill.category]}`}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}
