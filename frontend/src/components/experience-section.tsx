export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 lg:py-24">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-[#1a1b2e] bg-[#0a0d1a]/60 p-6 transition-colors hover:border-[#16f2b3]/30">
          <h3 className="text-lg font-semibold text-[#c0caf5]">Software Engineer</h3>
          <p className="mt-1 font-mono text-sm text-[#7dcfff]">IANUS Technologies</p>
          <p className="mt-1 font-mono text-xs text-[#565f89]">2024 — Present</p>
        </div>

        <div className="rounded-lg border border-[#1a1b2e] bg-[#0a0d1a]/60 p-6 transition-colors hover:border-[#16f2b3]/30">
          <h3 className="text-lg font-semibold text-[#c0caf5]">BSc Informatics</h3>
          <p className="mt-1 font-mono text-sm text-[#7dcfff]">New Bulgarian University</p>
          <p className="mt-1 font-mono text-xs text-[#565f89]">GPA: 5.12/6 — Grad: July 2026</p>
        </div>

        <div className="rounded-lg border border-[#1a1b2e] bg-[#0a0d1a]/60 p-6 transition-colors hover:border-[#16f2b3]/30">
          <h3 className="text-lg font-semibold text-[#c0caf5]">2+ Years</h3>
          <p className="mt-1 font-mono text-sm text-[#7dcfff]">In Production</p>
          <p className="mt-1 font-mono text-xs text-[#565f89]">Full-stack & AI Systems</p>
        </div>
      </div>
    </section>
  );
}
