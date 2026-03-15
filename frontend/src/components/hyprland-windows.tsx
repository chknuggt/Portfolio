import { motion, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

const Prompt = ({ children }: { children: React.ReactNode }) => (
  <p>
    <span className="text-[#9ece6a]">marios@arch</span>
    <span className="text-[#565f89]">:</span>
    <span className="text-[#7aa2f7]">~</span>
    <span className="text-[#565f89]">$ </span>
    <span className="text-[#c0caf5]">{children}</span>
  </p>
);

const Output = ({ children, muted }: { children: React.ReactNode; muted?: boolean }) => (
  <p className={muted ? "text-[#565f89]" : "text-[#c0caf5]"}>{children}</p>
);

const Success = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[#9ece6a]">{children}</p>
);

/* Window 1 - About Me & System Info */
const AboutMeTerminal = () => (
  <div className="p-3 font-mono text-[10px] leading-[16px]">
    <p className="mb-2 text-[10px] font-bold text-[#7dcfff]">~ About Me</p>
    <Prompt>whoami</Prompt>
    <Output>Marios Eleftheriou</Output>
    <div className="mt-1.5" />
    <Prompt>cat /etc/role</Prompt>
    <Output>Software Engineer</Output>
    <div className="mt-1.5" />
    <Prompt>uptime -s</Prompt>
    <Output>2+ years in production</Output>
    <div className="mt-1.5" />
    <Prompt>cat /etc/education</Prompt>
    <Output>BSc Informatics — NBU</Output>
    <Output muted>GPA: 5.12/6 | Grad: July 2025</Output>
    <div className="mt-1.5" />
    <Prompt>hostnamectl</Prompt>
    <Output>Location: Larnaca, Cyprus</Output>
    <Output>OS: Arch Linux x86_64</Output>
    <Output>WM: Hyprland</Output>
    <Output>Terminal: Alacritty</Output>
    <Output>Shell: zsh</Output>
    <Output>Editor: Neovim</Output>
    <div className="mt-1.5 flex gap-1">
      <span className="h-2.5 w-2.5 rounded-sm bg-[#f7768e]" />
      <span className="h-2.5 w-2.5 rounded-sm bg-[#ff9e64]" />
      <span className="h-2.5 w-2.5 rounded-sm bg-[#e0af68]" />
      <span className="h-2.5 w-2.5 rounded-sm bg-[#9ece6a]" />
      <span className="h-2.5 w-2.5 rounded-sm bg-[#7dcfff]" />
      <span className="h-2.5 w-2.5 rounded-sm bg-[#7aa2f7]" />
      <span className="h-2.5 w-2.5 rounded-sm bg-[#bb9af7]" />
    </div>
  </div>
);

/* Window 2 - Connect / Contact */
const ConnectTerminal = () => (
  <div className="p-3 font-mono text-[10px] leading-[16px]">
    <p className="mb-2 text-[10px] font-bold text-[#7dcfff]">~ Connect</p>
    <Prompt>ping github.com/marioselef</Prompt>
    <Success>PING github.com — 64 bytes — time=12ms</Success>
    <div className="mt-1.5" />
    <Prompt>dig linkedin.com/in/marioselef</Prompt>
    <Success>;; ANSWER: A 200 OK — profile found</Success>
    <div className="mt-1.5" />
    <Prompt>sendmail -t</Prompt>
    <Output>To: marioselef@yahoo.com</Output>
    <Output muted>Message queued for delivery</Output>
    <div className="mt-1.5" />
    <Prompt>curl -s tel://+35794109466</Prompt>
    <Success>Connection established.</Success>
  </div>
);

/* Window 3 - Languages & Interests */
const InterestsTerminal = () => (
  <div className="p-3 font-mono text-[10px] leading-[16px]">
    <Prompt>pacman -Qi languages</Prompt>
    <Output>Greek      <span className="text-[#565f89]">|</span> native</Output>
    <Output>English    <span className="text-[#565f89]">|</span> fluent</Output>
    <Output>Bulgarian  <span className="text-[#565f89]">|</span> intermediate</Output>
    <div className="mt-1.5" />
    <Prompt>neofetch --interests</Prompt>
    <Output>Chess <span className="text-[#565f89]">(top 1% chess.com)</span></Output>
    <Output>Forex & Macro <span className="text-[#565f89]">|</span> Sports</Output>
  </div>
);

export default function HyprlandWindows({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // Window 1: starts full, then shrinks to left ~50%
  const w1Width = useTransform(scrollYProgress, [0.45, 0.5, 0.55, 0.6], ["100%", "100%", "65%", "50%"]);
  const w1Scale = useTransform(scrollYProgress, [0.45, 0.47], [0.99, 1]);

  // Window 2: appears on the right at full height, then shrinks when w3 arrives
  const w2Scale = useTransform(scrollYProgress, [0.55, 0.57], [0.98, 1]);
  const w2Height = useTransform(scrollYProgress, [0.65, 0.7], ["100%", "50%"]);

  // Window 3: appears bottom-right
  const w3Scale = useTransform(scrollYProgress, [0.68, 0.7], [0.98, 1]);

  return (
    <div className="absolute inset-0 top-7 flex gap-[4px] p-[4px]">
      {/* Window 1 - left/master: About Me */}
      <motion.div
        style={{
          width: w1Width,
          scale: w1Scale,
        }}
        className="h-full shrink-0 overflow-hidden overflow-y-auto rounded-lg border border-[#7aa2f7]/60 bg-[#1a1b26]/95"
      >
        <AboutMeTerminal />
      </motion.div>

      {/* Right column */}
      <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
        {/* Window 2 - top right: Connect */}
        <motion.div
          style={{
            height: w2Height,
            scale: w2Scale,
          }}
          className="w-full shrink-0 overflow-hidden rounded-lg border border-[#7aa2f7]/60 bg-[#1a1b26]/95"
        >
          <ConnectTerminal />
        </motion.div>

        {/* Window 3 - bottom right: Languages & Interests */}
        <motion.div
          style={{
            scale: w3Scale,
          }}
          className="w-full flex-1 overflow-hidden rounded-lg border border-[#7aa2f7]/60 bg-[#1a1b26]/95"
        >
          <InterestsTerminal />
        </motion.div>
      </div>
    </div>
  );
}
