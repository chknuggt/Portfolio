import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import LazyVimScreen from "@/components/lazyvim-screen";
import BioScreen from "@/components/bio-screen";

export default function MacbookScrollAnimation() {
  return (
    <div className="w-full">
      <MacbookScroll
        title={
          <div className="flex flex-col items-center gap-4">
            <p className="font-mono text-sm text-[#565f89] md:text-base">
              <span className="text-[#9ece6a]">marios@arch</span>
              <span className="text-[#565f89]">:</span>
              <span className="text-[#7aa2f7]">~</span>
              <span className="text-[#565f89]">$</span>
              <span className="text-[#c0caf5]"> neofetch --stack</span>
            </p>
            <h2 className="text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
              My <span className="text-[#16f2b3]">Stack</span>
            </h2>
            <p className="max-w-md text-center font-mono text-sm text-[#565f89] md:text-base">
              the tools, languages & frameworks I work with daily
            </p>
          </div>
        }
        showGradient={true}
        secondScreen={<BioScreen />}
      >
        <LazyVimScreen />
      </MacbookScroll>
    </div>
  );
}
