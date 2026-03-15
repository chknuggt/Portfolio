import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import LazyVimScreen from "@/components/lazyvim-screen";

export default function FullscreenTransition() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Start small (like the macbook screen) and scale to fullscreen
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.5, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], [16, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <div ref={ref} className="relative -mt-[30vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{
            scale,
            opacity,
            borderRadius,
          }}
          className="h-screen w-screen origin-center overflow-hidden"
        >
          <LazyVimScreen />
        </motion.div>
      </div>
      {/* Extra scroll space to drive the animation */}
      <div className="h-[80vh]" />
    </div>
  );
}
