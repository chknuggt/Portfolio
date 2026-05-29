import React, { createContext, useContext, ReactNode } from "react";
import { usePortfolio } from "./PortfolioContext";

export interface TrackInfo {
  title: string;
  artist: string;
  cover: string;
}

interface AudioContextType {
  audio: HTMLAudioElement;
  audioState: any;
  controls: {
    play: () => Promise<void> | void;
    pause: () => Promise<void> | void;
    toggle: () => Promise<void> | void;
    volume: (value: number) => void;
  };
  audioRef: React.RefObject<HTMLAudioElement>;
  track: TrackInfo | null;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { music } = usePortfolio();
  const currentTrack = music[0] ?? null;

  const [audio, audioState, controls, audioRef] = useAudio({
    src: currentTrack?.audio ?? "",
    autoReplay: true
  });

  const track: TrackInfo | null = currentTrack
    ? { title: currentTrack.title, artist: currentTrack.artist, cover: currentTrack.cover }
    : null;

  return (
    <AudioContext.Provider value={{ audio, audioState, controls, audioRef, track }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
};
