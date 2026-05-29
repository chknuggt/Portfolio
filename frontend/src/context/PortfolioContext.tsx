import { createContext, useContext, useEffect, useState } from "react";
import {
  api,
  type AboutSections,
  type Education,
  type Experience,
  type MusicTrack,
  type Profile,
  type Project,
  type Skill,
  type SocialLink,
} from "~/lib/api";

interface PortfolioData {
  profile: Profile | null;
  projects: Project[];
  socialLinks: SocialLink[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  music: MusicTrack[];
  about: AboutSections;
  loaded: boolean;
}

const defaultData: PortfolioData = {
  profile: null,
  projects: [],
  socialLinks: [],
  experience: [],
  education: [],
  skills: [],
  music: [],
  about: {},
  loaded: false,
};

const PortfolioContext = createContext<PortfolioData>(defaultData);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultData);

  useEffect(() => {
    Promise.allSettled([
      api.profile(),
      api.projects(),
      api.socialLinks(),
      api.experience(),
      api.education(),
      api.skills(),
      api.music(),
      api.about(),
    ]).then(([profile, projects, socialLinks, experience, education, skills, music, about]) => {
      setData({
        profile: profile.status === "fulfilled" ? profile.value : null,
        projects: projects.status === "fulfilled" ? projects.value : [],
        socialLinks: socialLinks.status === "fulfilled" ? socialLinks.value : [],
        experience: experience.status === "fulfilled" ? experience.value : [],
        education: education.status === "fulfilled" ? education.value : [],
        skills: skills.status === "fulfilled" ? skills.value : [],
        music: music.status === "fulfilled" ? music.value : [],
        about: about.status === "fulfilled" ? about.value : {},
        loaded: true,
      });
    });
  }, []);

  return <PortfolioContext.Provider value={data}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
