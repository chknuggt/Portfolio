import React, { useState, useEffect, useRef } from "react";

const LINES = [
  { prompt: "~ ❯", command: "whoami", output: null },
  { prompt: null, command: null, output: "marioselef" },
  { prompt: "~ ❯", command: "echo 'Hi, I'm Marios. Welcome to my portfolio.'", output: null },
  { prompt: null, command: null, output: "Hi, I'm Marios. Welcome to my portfolio." },
  { prompt: "~ ❯", command: "echo 'Software Engineer | Linux Enthusiast'", output: null },
  { prompt: null, command: null, output: "Software Engineer | Linux Enthusiast" },
  { prompt: "~ ❯", command: "ls ~/Projects/", output: null },
];

const TYPING_SPEED = 45;
const LINE_DELAY = 400;
const OUTPUT_DELAY = 0;

export default function TerminalIntro() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef(null);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (currentLineIndex >= LINES.length) return;

    const line = LINES[currentLineIndex];

    if (!line.prompt && line.output !== null) {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => [
          ...prev,
          { ...line, typed: line.output, done: true },
        ]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, OUTPUT_DELAY);
      return () => clearTimeout(timeout);
    }

    // Command lines get typed out
    const command = line.command;
    if (currentCharIndex === 0 && visibleLines.length > 0) {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => [
          ...prev,
          { ...line, typed: "", done: false },
        ]);
        setCurrentCharIndex(1);
      }, LINE_DELAY);
      return () => clearTimeout(timeout);
    }

    if (currentCharIndex === 0 && visibleLines.length === 0) {
      setVisibleLines([{ ...line, typed: "", done: false }]);
      setCurrentCharIndex(1);
      return;
    }

    if (currentCharIndex <= command.length) {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            typed: command.slice(0, currentCharIndex),
          };
          return updated;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, TYPING_SPEED);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setVisibleLines((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          done: true,
        };
        return updated;
      });
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
    }, LINE_DELAY);
    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentCharIndex, visibleLines.length]);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const isTypingDone = currentLineIndex >= LINES.length;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-2xl">
        {/* Alacritty-style terminal — no decorations, just content */}
        <div
          className="overflow-hidden rounded-[2px] border border-[#222]"
          style={{
            boxShadow: "0 0 40px rgba(0,0,0,0.6)",
          }}
        >
          {/* Terminal body */}
          <div
            ref={terminalRef}
            className="bg-[#0e1019] p-5 font-mono text-sm leading-7"
            style={{ minHeight: "280px" }}
          >
            {visibleLines.map((line, i) => (
              <div key={i}>
                {line.prompt ? (
                  <div className="flex flex-wrap">
                    <PromptText text={line.prompt} />
                    <span className="text-[#c0caf5]">
                      {line.typed}
                      {!line.done && <Cursor visible={showCursor} />}
                    </span>
                  </div>
                ) : (
                  <div className="text-[#a9b1d6]">{line.typed}</div>
                )}
              </div>
            ))}
            {isTypingDone && (
              <div className="flex flex-wrap">
                <PromptText text="~ ❯" />
                <Cursor visible={showCursor} />
              </div>
            )}
          </div>
        </div>
        {/* Scroll hint */}
        <div className="mt-8 flex justify-center">
          <div className="animate-bounce text-[#444] text-xs font-mono tracking-wider">
            v scroll v
          </div>
        </div>
      </div>
    </div>
  );
}

function PromptText({ text }) {
  // Parse prompt like "~ ❯" or "Portfolio main ❯"
  const parts = text.split(" ");
  const chevron = parts.pop(); // ❯
  const rest = parts.join(" ");

  return (
    <>
      <span className="text-[#7aa2f7]">{rest} </span>
      <span className="text-[#9ece6a]">{chevron} </span>
    </>
  );
}

function Cursor({ visible }) {
  return (
    <span
      className={`inline-block h-[18px] w-[8px] translate-y-[3px] ${
        visible ? "bg-[#c0caf5]" : "bg-transparent"
      }`}
    />
  );
}
