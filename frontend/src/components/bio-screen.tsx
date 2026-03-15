import { motion, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

export default function BioScreen({
  scrollYProgress,
}: {
  scrollYProgress?: MotionValue<number>;
}) {
  const bootOpacity = useTransform(
    scrollYProgress ?? ({ get: () => 0 } as MotionValue<number>),
    [0.55, 0.65, 0.98, 0.99],
    [0, 1, 1, 0]
  );

  return (
    <div className="relative h-full w-full bg-black">
      {/* Arch boot menu */}
      <motion.div
        style={{ opacity: bootOpacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="flex w-[70%] flex-col items-center font-mono text-[6px] leading-[10px] text-[#aaaaaa]">
          <div className="w-full border border-[#aaaaaa] px-2 py-1">
            <div className="bg-[#aaaaaa] px-1 text-center text-black">
              Arch Linux install medium (x86_64, UEFI)
            </div>
            <div className="px-1 text-center">
              Arch Linux install medium (x86_64, UEFI) with speech
            </div>
            <div className="px-1 text-center">
              Memtest86+
            </div>
            <div className="px-1 text-center">
              EFI Shell
            </div>
            <div className="px-1 text-center">
              Reboot Into Firmware Interface
            </div>
          </div>
          <div className="mt-3 text-center">
            Boot in 15s.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
