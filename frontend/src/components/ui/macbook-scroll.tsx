"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import ArchInstallSequence from "@/components/arch-install-sequence";
import HyprlandWindows from "@/components/hyprland-windows";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
} from "@tabler/icons-react";
import { IconSearch } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconCommand } from "@tabler/icons-react";
import { IconCaretLeftFilled } from "@tabler/icons-react";
import { IconCaretDownFilled } from "@tabler/icons-react";


const TerminalLine = ({ children, scrollYProgress, index, total, startAt = 0.05, endAt = 0.3, className = "", isCommand = false }: {
  children: React.ReactNode;
  scrollYProgress: import("motion/react").MotionValue<number>;
  index: number;
  total: number;
  startAt?: number;
  endAt?: number;
  className?: string;
  isCommand?: boolean;
}) => {
  const step = (endAt - startAt) / total;
  const lineStart = startAt + index * step;
  const lineEnd = isCommand ? lineStart + step * 1.2 : lineStart + step * 0.15;
  const opacity = useTransform(scrollYProgress, [lineStart, lineEnd], [0, 1]);
  const y = useTransform(scrollYProgress, [lineStart, isCommand ? lineEnd : lineStart + step * 0.1], [8, 0]);

  // For commands: use clipPath to reveal text character by character
  const clipRight = useTransform(scrollYProgress, [lineStart, lineEnd], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  if (isCommand) {
    return (
      <motion.div style={{ opacity: 1, y }} className={className}>
        <motion.div style={{ clipPath: clipRight }}>
          {children}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
};

export const MacbookScroll = ({
  src,
  showGradient,
  title,
  badge,
  children,
  secondScreen,
}: {
  src?: string;
  showGradient?: boolean;
  title?: React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  secondScreen?: React.ReactNode;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);
  const [fullScaleX, setFullScaleX] = useState(4);
  const [fullScaleY, setFullScaleY] = useState(4);
  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
    setFullScaleX(window.innerWidth / 512);
    setFullScaleY(window.innerHeight / 384);
  }, []);
  const bootRef = useRef<HTMLElement>(null);
  const [bootEl, setBootEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById("boot-sequence");
    if (el) {
      (bootRef as React.MutableRefObject<HTMLElement>).current = el;
      setBootEl(el);
    }
  }, []);

  const { scrollYProgress: bootProgress } = useScroll({
    target: bootEl ? bootRef as React.RefObject<HTMLElement> : undefined,
    offset: ["start start", "end start"],
  });

  const [showOverlay, setShowOverlay] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShowOverlay(v >= 0.999);
  });

  const overlayOpacity = useTransform(scrollYProgress, [0.999, 1], [0, 1]);

  // Boot sequence phases driven by boot section scroll
  const [showInstallTerminal, setShowInstallTerminal] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= 0.999) {
      const boot = bootProgress.get();
      setShowInstallTerminal(boot < 0.45);
      setShowDesktop(boot >= 0.45);
    }
  });

  useMotionValueEvent(bootProgress, "change", (v) => {
    if (!showOverlay) return;
    setShowInstallTerminal(v < 0.45);
    setShowDesktop(v >= 0.45);
  });

  const scaleX = useTransform(scrollYProgress, [0.15, 0.35], [1.2, isMobile ? 1 : 1.5]);
  const scaleY = useTransform(scrollYProgress, [0.15, 0.35], [0.6, isMobile ? 1 : 1.5]);
  const translate = useMotionValue(0);
  const rotate = useTransform(scrollYProgress, [0.1, 0.2], [-28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Side panels - parallax: scroll up slower than page (0.4x speed)
  const sideOpacity = useTransform(scrollYProgress, [0, 0.01, 0.4, 0.55], [0, 1, 1, 0]);
  const sideY = useTransform(scrollYProgress, [0, 1], [0, 500]);

  return (
    <div ref={ref} className="relative h-[300vh]">

      {/* Sticky screen - pins to viewport center */}
      <div className="sticky top-[50vh] z-10 flex -translate-y-1/2 justify-center [perspective:800px]">
        <div className="scale-[0.35] sm:scale-50 md:scale-100">
          <Lid
            src={src}
            scaleX={scaleX}
            scaleY={scaleY}
            rotate={rotate}
            translate={translate}
            secondScreen={secondScreen}
            scrollYProgress={scrollYProgress}>
            {children}
          </Lid>
        </div>
      </div>

      {/* Title text - positioned at top */}
      <div className="pointer-events-none absolute inset-x-0 top-[20vh] z-0 flex justify-center">
        <motion.h2
          style={{
            translateY: textTransform,
            opacity: textOpacity,
          }}
          className="w-full text-center">
          {title || (
            <span>
              This Macbook is built with Tailwindcss. <br /> No kidding.
            </span>
          )}
        </motion.h2>
      </div>

      {/* Keyboard base - positioned where the laptop initially appears */}
      <div className="pointer-events-none absolute inset-x-0 top-[50vh] z-0 flex justify-center">
        <div className="scale-[0.35] sm:scale-50 md:scale-100">
          <div className="relative -z-10 mt-[12rem] h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-[#272729]">
            {/* above keyboard bar */}
            <div className="relative h-10 w-full">
              <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
            </div>
            <div className="relative flex">
              <div className="mx-auto h-full w-[10%] overflow-hidden">
                <SpeakerGrid />
              </div>
              <div className="mx-auto h-full w-[80%]">
                <Keypad />
              </div>
              <div className="mx-auto h-full w-[10%] overflow-hidden">
                <SpeakerGrid />
              </div>
            </div>
            <Trackpad />
            <div
              className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
            {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
          </div>
        </div>
      </div>

      {/* Arch boot sequence overlay */}
      {showOverlay && (
        <div className="fixed inset-0 z-50">

          {/* Desktop wallpaper */}
          {showDesktop && (
            <div className="absolute inset-0">
              <img
                src="/arch-wallpaper.png"
                alt="Desktop"
                className="h-full w-full object-cover"
              />
              {/* Top bar */}
              <div className="absolute inset-x-0 top-0 z-10 flex h-7 items-center justify-between bg-[#1a1b26]/90 px-3 font-mono text-[11px] text-[#a9b1d6] backdrop-blur-sm">
                {/* Left - workspaces */}
                <div className="flex items-center gap-2">
                  <span className="text-[#565f89]">󰖯</span>
                  <span className="text-[#a9b1d6]">1</span>
                  <span className="h-2 w-2 rounded-full bg-[#7aa2f7]" />
                  <span className="text-[#565f89]">3</span>
                  <span className="text-[#565f89]">4</span>
                  <span className="text-[#565f89]">5</span>
                </div>
                {/* Center - clock */}
                <div className="flex items-center gap-1">
                  <span>Sunday 13:37</span>
                  <span className="text-[#565f89]">↻</span>
                </div>
                {/* Right - system tray */}
                <div className="flex items-center gap-2 text-[#a9b1d6]">
                  <span>‹</span>
                  <span>⚡</span>
                  <span>▼</span>
                  <span>🔊</span>
                  <span>⚙</span>
                  <span>🔖</span>
                </div>
              </div>

              {/* Hyprland tiling windows */}
              <HyprlandWindows scrollYProgress={bootProgress} />
            </div>
          )}

          {/* Arch install terminal */}
          {showInstallTerminal && (
            <div className="absolute inset-0">
              <ArchInstallSequence scrollProgress={bootProgress} />
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
  children,
  secondScreen,
  scrollYProgress,
}: {
  scaleX: import("motion/react").MotionValue<number>;
  scaleY: import("motion/react").MotionValue<number>;
  rotate: import("motion/react").MotionValue<number>;
  translate: import("motion/react").MotionValue<number>;
  src?: string;
  children?: React.ReactNode;
  secondScreen?: React.ReactNode;
  scrollYProgress: import("motion/react").MotionValue<number>;
}) => {
  const screenRef = useRef(null);
  const clipPercent = useMotionValue(0);

  // Reveal second screen starting at 0.2 (when lid is fully open) over the next 0.15 of scroll
  const secondScreenClip = useTransform(scrollYProgress, [0.2, 0.35], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);

  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2">
        <div
          style={{
            boxShadow: "0px 2px 0px 2px #171717 inset",
          }}
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]">
          <span className="text-white">
            <AceternityLogo />
          </span>
        </div>
      </div>
      <motion.div
        ref={screenRef}
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformOrigin: "top",
        }}
        className="absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[#010101] p-2">
        <div className="absolute inset-0 rounded-lg bg-[#1a1b26]" />
        {children ? (
          <div
            className="absolute inset-0 h-full w-full overflow-hidden rounded-lg bg-[#1a1b26]">
            <div className="absolute inset-0 bg-[#1a1b26]">
              {children}
            </div>
            {secondScreen && (
              <motion.div
                style={{ clipPath: secondScreenClip, backgroundColor: "#1a1b26" }}
                className="absolute inset-0 z-10">
                {React.isValidElement(secondScreen)
                  ? React.cloneElement(secondScreen as React.ReactElement<any>, { scrollYProgress })
                  : secondScreen}
              </motion.div>
            )}
          </div>
        ) : (
          <img
            src={src}
            alt="aceternity logo"
            className="absolute inset-0 h-full w-full rounded-lg object-cover object-left-top" />
        )}
      </motion.div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="mx-auto my-1 h-32 w-[40%] rounded-xl"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}></div>
  );
};

export const Keypad = () => {
  return (
    <div
      className="mx-1 h-full [transform:translateZ(0)] rounded-md bg-[#050505] p-1 [will-change:transform]">
      {/* First Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start">
          esc
        </KBtn>
        <KBtn>
          <IconBrightnessDown className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F1</span>
        </KBtn>
        <KBtn>
          <IconBrightnessUp className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F2</span>
        </KBtn>
        <KBtn>
          <IconTable className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F3</span>
        </KBtn>
        <KBtn>
          <IconSearch className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F4</span>
        </KBtn>
        <KBtn>
          <IconMicrophone className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F5</span>
        </KBtn>
        <KBtn>
          <IconMoon className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F6</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackPrev className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F7</span>
        </KBtn>
        <KBtn>
          <IconPlayerSkipForward className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackNext className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconVolume3 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F10</span>
        </KBtn>
        <KBtn>
          <IconVolume2 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F11</span>
        </KBtn>
        <KBtn>
          <IconVolume className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F12</span>
        </KBtn>
        <KBtn>
          <div
            className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
            <div className="h-full w-full rounded-full bg-black" />
          </div>
        </KBtn>
      </div>
      {/* Second row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn>
          <span className="block">~</span>
          <span className="mt-1 block">`</span>
        </KBtn>
        <KBtn>
          <span className="block">!</span>
          <span className="block">1</span>
        </KBtn>
        <KBtn>
          <span className="block">@</span>
          <span className="block">2</span>
        </KBtn>
        <KBtn>
          <span className="block">#</span>
          <span className="block">3</span>
        </KBtn>
        <KBtn>
          <span className="block">$</span>
          <span className="block">4</span>
        </KBtn>
        <KBtn>
          <span className="block">%</span>
          <span className="block">5</span>
        </KBtn>
        <KBtn>
          <span className="block">^</span>
          <span className="block">6</span>
        </KBtn>
        <KBtn>
          <span className="block">&</span>
          <span className="block">7</span>
        </KBtn>
        <KBtn>
          <span className="block">*</span>
          <span className="block">8</span>
        </KBtn>
        <KBtn>
          <span className="block">(</span>
          <span className="block">9</span>
        </KBtn>
        <KBtn>
          <span className="block">)</span>
          <span className="block">0</span>
        </KBtn>
        <KBtn>
          <span className="block">&mdash;</span>
          <span className="block">_</span>
        </KBtn>
        <KBtn>
          <span className="block">+</span>
          <span className="block"> = </span>
        </KBtn>
        <KBtn
          className="w-10 items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end">
          delete
        </KBtn>
      </div>
      {/* Third row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start">
          tab
        </KBtn>
        <KBtn>
          <span className="block">Q</span>
        </KBtn>
        <KBtn>
          <span className="block">W</span>
        </KBtn>
        <KBtn>
          <span className="block">E</span>
        </KBtn>
        <KBtn>
          <span className="block">R</span>
        </KBtn>
        <KBtn>
          <span className="block">T</span>
        </KBtn>
        <KBtn>
          <span className="block">Y</span>
        </KBtn>
        <KBtn>
          <span className="block">U</span>
        </KBtn>
        <KBtn>
          <span className="block">I</span>
        </KBtn>
        <KBtn>
          <span className="block">O</span>
        </KBtn>
        <KBtn>
          <span className="block">P</span>
        </KBtn>
        <KBtn>
          <span className="block">{`{`}</span>
          <span className="block">{`[`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`}`}</span>
          <span className="block">{`]`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`|`}</span>
          <span className="block">{`\\`}</span>
        </KBtn>
      </div>
      {/* Fourth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start">
          caps lock
        </KBtn>
        <KBtn>
          <span className="block">A</span>
        </KBtn>
        <KBtn>
          <span className="block">S</span>
        </KBtn>
        <KBtn>
          <span className="block">D</span>
        </KBtn>
        <KBtn>
          <span className="block">F</span>
        </KBtn>
        <KBtn>
          <span className="block">G</span>
        </KBtn>
        <KBtn>
          <span className="block">H</span>
        </KBtn>
        <KBtn>
          <span className="block">J</span>
        </KBtn>
        <KBtn>
          <span className="block">K</span>
        </KBtn>
        <KBtn>
          <span className="block">L</span>
        </KBtn>
        <KBtn>
          <span className="block">{`:`}</span>
          <span className="block">{`;`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`"`}</span>
          <span className="block">{`'`}</span>
        </KBtn>
        <KBtn
          className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end">
          return
        </KBtn>
      </div>
      {/* Fifth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start">
          shift
        </KBtn>
        <KBtn>
          <span className="block">Z</span>
        </KBtn>
        <KBtn>
          <span className="block">X</span>
        </KBtn>
        <KBtn>
          <span className="block">C</span>
        </KBtn>
        <KBtn>
          <span className="block">V</span>
        </KBtn>
        <KBtn>
          <span className="block">B</span>
        </KBtn>
        <KBtn>
          <span className="block">N</span>
        </KBtn>
        <KBtn>
          <span className="block">M</span>
        </KBtn>
        <KBtn>
          <span className="block">{`<`}</span>
          <span className="block">{`,`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`>`}</span>
          <span className="block">{`.`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`?`}</span>
          <span className="block">{`/`}</span>
        </KBtn>
        <KBtn
          className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end">
          shift
        </KBtn>
      </div>
      {/* sixth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <span className="block">fn</span>
          </div>
          <div className="flex w-full justify-start pl-1">
            <IconWorld className="h-[6px] w-[6px]" />
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <IconChevronUp className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">control</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="w-[8.2rem]"></KBtn>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <div
          className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
          <KBtn className="h-3 w-6">
            <IconCaretUpFilled className="h-[6px] w-[6px]" />
          </KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6">
              <IconCaretLeftFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretDownFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretRightFilled className="h-[6px] w-[6px]" />
            </KBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export const KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = true,
}: {
  className?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
  backlit?: boolean;
}) => {
  return (
    <div
      className={cn(
        "[transform:translateZ(0)] rounded-[4px] p-[0.5px] [will-change:transform]",
        backlit && "bg-white/[0.2] shadow-xl shadow-white"
      )}>
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]",
          className
        )}
        style={{
          boxShadow:
            "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
        }}>
        <div
          className={cn(
            "flex w-full flex-col items-center justify-center text-[5px] text-neutral-200",
            childrenClassName,
            backlit && "text-white"
          )}>
          {children}
        </div>
      </div>
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}></div>
  );
};

export const OptionKey = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <svg
      fill="none"
      version="1.1"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}>
      <rect stroke="currentColor" strokeWidth={2} x="18" y="5" width="10" height="2" />
      <polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 " />
      <rect
        id="_Transparent_Rectangle_"
        className="st0"
        width="32"
        height="32"
        stroke="none" />
    </svg>
  );
};

const AceternityLogo = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-white">
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round" />
    </svg>
  );
};
