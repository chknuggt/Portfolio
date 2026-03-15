import { useState, useEffect, useRef } from "react";
import { motion, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

type InstallLine =
  | { type: "cmd"; prompt: string; text: string }
  | { type: "out"; text: string };

const INSTALL_LINES: InstallLine[] = [
  { type: "cmd", prompt: "root@archiso ~ #", text: "cat /sys/firmware/efi/fw_platform_size" },
  { type: "out", text: "64" },
  { type: "cmd", prompt: "root@archiso ~ #", text: "ping -c 3 archlinux.org" },
  { type: "out", text: "PING archlinux.org (95.217.163.246) 56(84) bytes of data." },
  { type: "out", text: "64 bytes from archlinux.org: icmp_seq=1 ttl=49 time=28.3 ms" },
  { type: "out", text: "3 packets transmitted, 3 received, 0% packet loss" },
  { type: "cmd", prompt: "root@archiso ~ #", text: "timedatectl set-ntp true" },
  { type: "cmd", prompt: "root@archiso ~ #", text: "fdisk /dev/sda" },
  { type: "out", text: "Created a new GPT disklabel." },
  { type: "out", text: "Created partition 1: 1G EFI System" },
  { type: "out", text: "Created partition 2: 8G Linux swap" },
  { type: "out", text: "Created partition 3: 491G Linux filesystem" },
  { type: "cmd", prompt: "root@archiso ~ #", text: "mkfs.fat -F 32 /dev/sda1" },
  { type: "out", text: "mkfs.fat 4.2 (2021-01-31)" },
  { type: "cmd", prompt: "root@archiso ~ #", text: "mkswap /dev/sda2" },
  { type: "out", text: "Setting up swapspace version 1, size = 8 GiB" },
  { type: "cmd", prompt: "root@archiso ~ #", text: "mkfs.ext4 /dev/sda3" },
  { type: "out", text: "Writing superblocks and filesystem accounting information: done" },
  { type: "cmd", prompt: "root@archiso ~ #", text: "mount /dev/sda3 /mnt" },
  { type: "cmd", prompt: "root@archiso ~ #", text: "mount --mkdir /dev/sda1 /mnt/boot" },
  { type: "cmd", prompt: "root@archiso ~ #", text: "swapon /dev/sda2" },
  { type: "cmd", prompt: "root@archiso ~ #", text: "pacstrap -K /mnt base linux linux-firmware" },
  { type: "out", text: ":: Synchronizing package databases..." },
  { type: "out", text: "(135/135) checking package integrity    [################] 100%" },
  { type: "out", text: "==> Creating initcpio image: '/boot/initramfs-linux.img'" },
  { type: "cmd", prompt: "root@archiso ~ #", text: "genfstab -U /mnt >> /mnt/etc/fstab" },
  { type: "cmd", prompt: "root@archiso ~ #", text: "arch-chroot /mnt" },
  { type: "cmd", prompt: "[root@archiso /]#", text: "ln -sf /usr/share/zoneinfo/Europe/Athens /etc/localtime" },
  { type: "cmd", prompt: "[root@archiso /]#", text: "locale-gen" },
  { type: "out", text: "  en_US.UTF-8... done" },
  { type: "cmd", prompt: "[root@archiso /]#", text: "bootctl install" },
  { type: "out", text: 'Created EFI boot entry "Linux Boot Manager".' },
  { type: "cmd", prompt: "[root@archiso /]#", text: "useradd -m -G wheel -s /bin/bash marios" },
  { type: "cmd", prompt: "[root@archiso /]#", text: "systemctl enable NetworkManager" },
  { type: "out", text: "Created symlink ...NetworkManager.service." },
  { type: "cmd", prompt: "[root@archiso /]#", text: "exit" },
  { type: "cmd", prompt: "root@archiso ~ #", text: "umount -R /mnt" },
  { type: "cmd", prompt: "root@archiso ~ #", text: "reboot" },
];

function AboutMeBlock() {
  return (
    <div className="max-w-[480px] space-y-4 text-center">
      {/* Arch logo - drops in from above */}
      <motion.img
        src="/arch-logo.svg"
        alt=""
        initial={{ opacity: 0, y: -40, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="mx-auto w-[50px]"
      />

      {/* Title - scales up */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15, type: "spring", bounce: 0.3 }}
        className="text-[32px] font-extrabold leading-none text-white"
      >
        Hi, I'm{" "}
        <span className="text-pink-500">Marios</span>.
      </motion.h2>

      {/* Subtitle - slides from left */}
      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-[15px] font-bold leading-snug text-white"
      >
        Junior{" "}
        <span className="text-[#16f2b3]">Full-Stack & Mobile Developer</span>
        {" "}based in{" "}
        <span className="text-pink-500">Cyprus</span>
      </motion.p>

      {/* Divider - expands from center */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="mx-auto h-[1px] w-3/4 bg-gradient-to-r from-transparent via-pink-500 to-transparent"
      />

      {/* Paragraph 1 - fades up */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-[12px] font-medium leading-relaxed text-[#c0caf5]"
      >
        I fell in love with programming because it lets me{" "}
        <span className="font-bold text-[#16f2b3]">build things from nothing</span>.
        Turning an idea into working software that people actually use
        is what drives me every day.
      </motion.p>

      {/* Paragraph 2 - slides from right */}
      <motion.p
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-[12px] font-medium leading-relaxed text-[#c0caf5]"
      >
        <span className="font-bold text-pink-500">Linux</span> changed how I think
        about computers. Running{" "}
        <span className="font-bold text-[#16f2b3]">Arch</span> taught me to understand
        every layer of my system. The control and customization keep me hooked.
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.55 }}
        className="mx-auto h-[1px] w-1/2 bg-gradient-to-r from-transparent via-[#16f2b3] to-transparent"
      />

      {/* Paragraph 3 - slides from left */}
      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-[12px] font-medium leading-relaxed text-[#c0caf5]"
      >
        Outside of code, I'm deep into{" "}
        <span className="font-bold text-pink-500">financial markets</span> and{" "}
        <span className="font-bold text-pink-500">forex trading</span>.
        I independently built an{" "}
        <span className="font-bold text-[#16f2b3]">AI trading pipeline</span>
        {" "}that monitors live markets and executes trades autonomously.
      </motion.p>

      {/* Paragraph 4 - fades up */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-[12px] font-medium leading-relaxed text-[#c0caf5]"
      >
        When I'm not coding, you'll find me{" "}
        <span className="font-bold text-[#16f2b3]">kitesurfing</span> or{" "}
        <span className="font-bold text-[#16f2b3]">skating</span>.
        I like things that push me to learn fast and figure it out as I go.
      </motion.p>

      {/* Projects indicator - pops in */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.85 }}
        className="pt-3"
      >
        <div className="mx-auto h-[1px] w-1/3 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-500">
          Scroll to desktop
        </p>
        <motion.svg
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mt-2 h-4 w-4 text-[#16f2b3]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>
    </div>
  );
}

export default function ArchInstallSequence({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const aboutParallaxY = useTransform(scrollProgress, [0, 0.4], [0, -150]);
  const countRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      countRef.current += 1;
      if (countRef.current >= INSTALL_LINES.length) {
        clearInterval(interval);
        setVisibleCount(INSTALL_LINES.length);
        return;
      }
      setVisibleCount(countRef.current);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  const bootDone = visibleCount >= INSTALL_LINES.length;

  // Terminal fades out after boot, shrinks to left
  const terminalOpacity = bootDone ? 0.15 : 1;
  const beamHeight = `${(visibleCount / INSTALL_LINES.length) * 100}%`;
  const beamOpacity = visibleCount > 0 ? 1 : 0;

  return (
    <div className="relative h-full w-full bg-black">
      {/* About me - centered after terminal slides off */}
      {bootDone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          style={{ y: aboutParallaxY }}
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          <AboutMeBlock />
        </motion.div>
      )}

      {/* Terminal on the left - slides off screen after boot */}
      <motion.div
        animate={bootDone ? { x: "-100%", opacity: 0 } : { x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeIn" }}
        className="relative z-10 h-full w-[35%] overflow-hidden p-4 font-mono text-[10px] leading-[14px]"
      >
        {INSTALL_LINES.slice(0, visibleCount).map((line, i) => {
          if (line.type === "cmd") {
            return (
              <div key={i} className="whitespace-nowrap">
                <span className="text-pink-500">
                  {line.prompt}{" "}
                </span>
                <span className="text-[#16f2b3]">{line.text}</span>
              </div>
            );
          }

          return (
            <div key={i} className="text-white/70">
              {line.text}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
