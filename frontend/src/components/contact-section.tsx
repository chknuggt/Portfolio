const links = [
  {
    label: "GitHub",
    command: "ping",
    value: "github.com/marioselef",
    href: "https://github.com/marioselef",
    color: "#c0caf5",
  },
  {
    label: "LinkedIn",
    command: "dig",
    value: "linkedin.com/in/marioselef",
    href: "https://www.linkedin.com/in/marioselef/",
    color: "#7aa2f7",
  },
  {
    label: "Email",
    command: "sendmail",
    value: "marioselef@yahoo.com",
    href: "mailto:marioselef@yahoo.com",
    color: "#9ece6a",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-24">
      {/* Section header */}
      <div className="mb-12 flex items-center gap-4">
        <p className="font-mono text-sm text-[#565f89]">
          <span className="text-[#9ece6a]">marios@arch</span>
          <span className="text-[#565f89]">:</span>
          <span className="text-[#7aa2f7]">~</span>
          <span className="text-[#565f89]">$</span>
          <span className="text-[#c0caf5]"> cat ~/.contacts</span>
        </p>
      </div>

      <h2 className="mb-10 text-4xl font-bold tracking-tight md:text-5xl">
        Get In <span className="text-[#16f2b3]">Touch</span>
      </h2>

      <div className="mx-auto max-w-2xl">
        <p className="mb-10 text-lg leading-relaxed text-[#a9b1d6]">
          I&apos;m always open to new opportunities, collaborations, or just a
          good conversation about tech. Feel free to reach out.
        </p>

        <div className="space-y-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-lg border border-[#1a1b2e] bg-[#0a0d1a]/60 p-4 font-mono transition-colors hover:border-[#16f2b3]/30"
            >
              <span className="text-sm text-[#565f89]">$</span>
              <span className="text-sm text-[#9ece6a]">{link.command}</span>
              <span
                className="text-sm transition-colors group-hover:underline"
                style={{ color: link.color }}
              >
                {link.value}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 border-t border-[#1a1b2e] pt-8 text-center">
        <p className="font-mono text-xs text-[#565f89]">
          <span className="text-[#9ece6a]">marios@arch</span>
          <span className="text-[#565f89]">:</span>
          <span className="text-[#7aa2f7]">~</span>
          <span className="text-[#565f89]">$</span>
          <span className="text-[#c0caf5]"> echo "Built with React + Vite"</span>
        </p>
        <p className="mt-2 font-mono text-xs text-[#565f89]">
          &copy; {new Date().getFullYear()} Marios Eleftheriou
        </p>
      </div>
    </section>
  );
}
