import { createContext, useContext, useEffect, useState } from "react";
import {
  api,
  type AboutSections,
  type BearNote,
  type FinderItem,
  type Education,
  type Experience,
  type MusicTrack,
  type Profile,
  type Project,
  type Skill,
  type SocialLink,
  type TyporaDocument,
} from "~/lib/api";

interface PortfolioData {
  profile: Profile | null;
  projects: Project[];
  bearNotes: BearNote[];
  socialLinks: SocialLink[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  music: MusicTrack[];
  about: AboutSections;
  finderItems: FinderItem[];
  typoraDocument: TyporaDocument | null;
  loaded: boolean;
}

const defaultData: PortfolioData = {
  profile: null,
  projects: [],
  bearNotes: [],
  socialLinks: [],
  experience: [],
  education: [],
  skills: [],
  music: [],
  about: {},
  finderItems: [],
  typoraDocument: null,
  loaded: false,
};

const PortfolioContext = createContext<PortfolioData>(defaultData);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultData);

  useEffect(() => {
    Promise.allSettled([
      api.profile(),
      api.projects(),
      api.bearNotes(),
      api.socialLinks(),
      api.experience(),
      api.education(),
      api.skills(),
      api.music(),
      api.about(),
      api.finderItems(),
      api.typoraDocument(),
    ]).then(([profile, projects, bearNotes, socialLinks, experience, education, skills, music, about, finderItems, typoraDocument]) => {
      setData({
        profile: profile.status === "fulfilled" ? profile.value : null,
        projects: projects.status === "fulfilled" ? projects.value : [],
        bearNotes: bearNotes.status === "fulfilled" ? bearNotes.value : [],
        socialLinks: socialLinks.status === "fulfilled" ? socialLinks.value : [],
        experience: experience.status === "fulfilled" ? experience.value : [],
        education: education.status === "fulfilled" ? education.value : [],
        skills: skills.status === "fulfilled" ? skills.value : [],
        music: music.status === "fulfilled" ? music.value : [],
        about: about.status === "fulfilled" ? about.value : {},
        finderItems: finderItems.status === "fulfilled" ? finderItems.value : [],
        typoraDocument: typoraDocument.status === "fulfilled" ? typoraDocument.value : null,
        loaded: true,
      });
    });
  }, []);

  return <PortfolioContext.Provider value={data}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
