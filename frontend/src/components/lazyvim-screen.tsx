const NEOVIM_ASCII = `
███╗   ██╗███████╗ ██████╗ ██╗   ██╗██╗███╗   ███╗
████╗  ██║██╔════╝██╔═══██╗██║   ██║██║████╗ ████║
██╔██╗ ██║█████╗  ██║   ██║██║   ██║██║██╔████╔██║
██║╚██╗██║██╔══╝  ██║   ██║╚██╗ ██╔╝██║██║╚██╔╝██║
██║ ╚████║███████╗╚██████╔╝ ╚████╔╝ ██║██║ ╚═╝ ██║
╚═╝  ╚═══╝╚══════╝ ╚═════╝   ╚═══╝  ╚═╝╚═╝     ╚═╝
`.trim();

const MENU_ITEMS = [
  { icon: "🟦", label: "TypeScript", key: "ts" },
  { icon: "🟨", label: "JavaScript", key: "js" },
  { icon: "🐍", label: "Python", key: "py" },
  { icon: "⚛️", label: "Next.js / React", key: "nx" },
  { icon: "📱", label: "React Native / Flutter", key: "mb" },
  { icon: "🐘", label: "PostgreSQL / Supabase", key: "db" },
  { icon: "🔧", label: "Django", key: "dj" },
  { icon: "🐳", label: "Docker / Linux", key: "dx" },
  { icon: "🔑", label: "JWT / API Development", key: "api" },
  { icon: "🔀", label: "Git / CI/CD", key: "git" },
];

export default function LazyVimScreen() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center font-mono"
      style={{ backgroundColor: "#1a1b26" }}
    >
      {/* ASCII Logo */}
      <pre
        className="mb-6 text-center text-[6px] leading-[7px] sm:text-[8px] sm:leading-[9px] md:text-[10px] md:leading-[11px]"
        style={{ color: "#7dcfff" }}
      >
        {NEOVIM_ASCII}
      </pre>

      {/* Menu Items */}
      <div className="flex flex-col gap-[3px]">
        {MENU_ITEMS.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-8 px-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-[8px]" style={{ color: "#7aa2f7" }}>
                {item.icon}
              </span>
              <span
                className="text-[8px]"
                style={{ color: "#c0caf5" }}
              >
                {item.label}
              </span>
            </div>
            <span
              className="text-[8px] font-bold"
              style={{ color: "#ff9e64" }}
            >
              {item.key}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p
        className="mt-4 text-[7px]"
        style={{ color: "#ff9e64" }}
      >
        ~ 10 skills loaded
      </p>
    </div>
  );
}
