import React from "react";
import { wallpapers } from "../../configs";
import { checkURL } from "../../utils";
import type { SiteSectionData, SiteData } from "../../types";
import { useStore } from "../../stores";
import { usePortfolio } from "../../context/PortfolioContext";

interface SafariState {
  goURL: string;
  currentURL: string;
}

interface SafariProps {
  width?: number;
}

interface NavProps {
  width: number;
  setGoURL: (url: string) => void;
  sections: SiteSectionData[];
}

interface NavSectionProps {
  width: number;
  section: SiteSectionData;
  setGoURL: (url: string) => void;
}

const NavSection = ({ width, section, setGoURL }: NavSectionProps) => {
  const grid = width < 640 ? "grid-cols-4" : "grid-cols-9";

  return (
    <div className="mx-auto w-full max-w-screen-md" p="t-8 x-4">
      <div className="font-medium ml-2 text-c-black" text="xl sm:2xl">
        {section.title}
      </div>
      <div className={`mt-3 grid grid-flow-row ${grid}`}>
        {section.sites.map((site: SiteData) => (
          <div key={`safari-nav-${site.id}`} className="h-28 flex flex-col">
            <div className="size-16 mx-auto rounded-md overflow-hidden">
              {site.img ? (
                <img
                  src={site.img}
                  alt={site.title}
                  title={site.title}
                  onClick={
                    site.inner ? () => setGoURL(site.link) : () => window.open(site.link)
                  }
                />
              ) : (
                <div
                  className="size-full flex-center cursor-default text-black"
                  onClick={
                    site.inner ? () => setGoURL(site.link) : () => window.open(site.link)
                  }
                >
                  <span text-lg>{site.title}</span>
                </div>
              )}
            </div>
            <span m="t-2 x-auto" className="text-sm text-c-black">
              {site.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const numTracker = Math.floor(Math.random() * 99 + 1);

const NavPage = ({ width, setGoURL, sections }: NavProps) => {
  const dark = useStore((state) => state.dark);

  const grid = width < 640 ? "grid-cols-4" : "grid-cols-8";
  const span = width < 640 ? "col-span-3" : "col-span-7";

  return (
    <div
      className="w-full safari-content overflow-y-scroll bg-center bg-cover text-c-black"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
    >
      <div className="w-full min-h-full pt-8 bg-c-100/80 backdrop-blur-2xl">
        {sections.map((section) => (
          <NavSection key={section.title} section={section} setGoURL={setGoURL} width={width} />
        ))}

        {/* Privacy Report */}
        <div className="mx-auto w-full max-w-screen-md" p="t-8 x-4 b-16">
          <div font="medium" text="xl sm:2xl">
            Privacy Report
          </div>
          <div
            className={`h-16 w-full mt-4 grid ${grid} shadow-md rounded-xl text-sm`}
            bg="gray-50/70 dark:bg-gray-600/50"
          >
            <div className="col-start-1 col-span-1 flex-center space-x-2">
              <span className="i-fa-solid:shield-alt text-2xl" />
              <span className="text-xl">{numTracker}</span>
            </div>
            <div className={`col-start-2 ${span} hstack px-2`}>
              In the last seven days, Safari has prevent {numTracker} tracker from
              profiling you.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoInternetPage = () => {
  const dark = useStore((state) => state.dark);

  return (
    <div
      className="w-full safari-content bg-blue-50 overflow-y-scroll bg-center bg-cover"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
    >
      <div className="w-full h-full pb-10 backdrop-blur-2xl flex-center text-c-600 bg-c-100/80">
        <div className="text-center">
          <div className="text-2xl font-bold">You Are Not Connected to the Internet</div>
          <div className="pt-4 text-sm">
            This page can't be displayed because your computer is currently offline.
          </div>
        </div>
      </div>
    </div>
  );
};

const SafariIframe = ({ url, onBack }: { url: string; onBack: () => void }) => {
  const dark = useStore((state) => state.dark);
  const [showFallback, setShowFallback] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setShowFallback(false);
    timerRef.current = setTimeout(() => setShowFallback(true), 500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [url]);

  let hostname = "";
  try { hostname = new URL(url).hostname; } catch { hostname = url; }

  return (
    <div className="safari-content w-full relative">
      <iframe
        title="Safari"
        src={url}
        className="w-full h-full bg-white"
      />
      {showFallback && (
        <div className={`absolute inset-0 flex-center ${dark ? "bg-gray-900/95" : "bg-white/95"}`}>
          <div className="text-center p-8">
            <div className={`text-5xl mb-4 ${dark ? "text-gray-600" : "text-gray-300"}`}>
              <span className="i-bi:globe2" />
            </div>
            <div className={`text-base font-medium mb-1 ${dark ? "text-gray-200" : "text-gray-700"}`}>
              Can't open {hostname}
            </div>
            <div className={`text-sm mb-5 ${dark ? "text-gray-500" : "text-gray-400"}`}>
              This site doesn't allow embedding in iframes.
            </div>
            <div className="flex gap-3 justify-center">
              <button
                className={`px-4 py-1.5 rounded-lg text-sm ${dark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                onClick={onBack}
              >
                Go Back
              </button>
              <button
                className="px-4 py-1.5 rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => window.open(url, "_blank")}
              >
                Open in New Tab
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Safari = ({ width }: SafariProps) => {
  const wifi = useStore((state) => state.wifi);
  const { socialLinks } = usePortfolio();

  const [state, setState] = useState<SafariState>({
    goURL: "",
    currentURL: ""
  });

  const sections = useMemo((): SiteSectionData[] => {
    const categories: Record<string, SiteSectionData> = {};
    for (const link of socialLinks) {
      if (!categories[link.category]) {
        categories[link.category] = { title: link.category, sites: [] };
      }
      categories[link.category].sites.push({
        id: link.id,
        title: link.title,
        img: link.img,
        link: link.link,
      });
    }
    return Object.values(categories);
  }, [socialLinks]);

  const setGoURL = (url: string) => {
    const isValid = checkURL(url);

    if (isValid) {
      if (url.substring(0, 7) !== "http://" && url.substring(0, 8) !== "https://")
        url = `https://${url}`;
    } else if (url !== "") {
      url = `https://www.bing.com/search?q=${url}`;
    }

    setState({
      goURL: url,
      currentURL: url
    });
  };

  const pressURL = (e: React.KeyboardEvent) => {
    const keyCode = e.key;
    if (keyCode === "Enter") setGoURL((e.target as HTMLInputElement).value);
  };

  const buttonColor = state.goURL === "" ? "text-c-400" : "text-c-700";
  const grid = (width as number) < 640 ? "grid-cols-2" : "grid-cols-3";
  const hideLast = (width as number) < 640 ? "hidden" : "flex";

  return (
    <div className="w-full h-full">
      {/* browser topbar */}
      <div className={`h-10 grid ${grid} items-center bg-c-white`}>
        <div className="flex px-2">
          <button
            className={`safari-btn w-7 ${buttonColor}`}
            onClick={() => setGoURL("")}
          >
            <span className="i-jam:chevron-left text-xl" />
          </button>
          <button className="safari-btn w-7 text-c-400">
            <span className="i-jam:chevron-right text-xl" />
          </button>
          <button className="safari-btn w-9 ml-3 text-c-700">
            <span className="i-bi:layout-sidebar text-sm" />
          </button>
        </div>
        <div className="hstack space-x-2 px-2">
          <button className="safari-btn w-9 -ml-10 text-c-400">
            <span className="i-fa-solid:shield-alt text-sm" />
          </button>
          <input
            type="text"
            value={state.currentURL}
            onChange={(e) => setState({ ...state, currentURL: e.target.value })}
            onKeyPress={pressURL}
            className="h-6 w-full p-2 rounded font-normal no-outline text-sm text-center text-c-500 bg-c-200"
            border="2 transparent focus:blue-400 dark:focus:blue-500"
            placeholder="Search or enter website name"
          />
        </div>
        <div className={`${hideLast} justify-end space-x-2 px-2`}>
          <button className={`safari-btn w-9 ${buttonColor}`}>
            <span className="i-ion:share-outline" />
          </button>
          <button className="safari-btn w-9 text-c-700">
            <span className="i-ion:copy-outline" />
          </button>
        </div>
      </div>

      {/* browser content */}
      {wifi ? (
        state.goURL === "" ? (
          <NavPage setGoURL={setGoURL} width={width as number} sections={sections} />
        ) : (
          <SafariIframe url={state.goURL} onBack={() => setGoURL("")} />
        )
      ) : (
        <NoInternetPage />
      )}
    </div>
  );
};

export default Safari;
