import { wallpapers } from "../configs";
import { useStore } from "../stores";
import { usePortfolio } from "../context/PortfolioContext";

interface LaunchpadProps {
  show: boolean;
  toggleLaunchpad: (target: boolean) => void;
}

const placeholderText = "Search";

function LaunchpadIcon({ title, img }: { title: string; img: string }) {
  const [failed, setFailed] = useState(false);
  const initial = title.charAt(0).toUpperCase();
  const src = img.startsWith("/") ? img : `/${img}`;

  if (img && !failed) {
    return (
      <img
        src={src}
        alt={title}
        title={title}
        className="w-14 sm:w-20 mx-auto rounded-2xl"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div
      className="w-14 sm:w-20 h-14 sm:h-20 mx-auto flex items-center justify-center rounded-2xl"
      style={{ background: "#a3aaae" }}
    >
      <span className="font-semibold text-2xl sm:text-3xl" style={{ color: "#f5f5f7" }}>{initial}</span>
    </div>
  );
}

export default function Launchpad({ show, toggleLaunchpad }: LaunchpadProps) {
  const dark = useStore((state) => state.dark);
  const { projects } = usePortfolio();

  const [searchText, setSearchText] = useState("");
  const [focus, setFocus] = useState(false);

  const apps = useMemo(
    () =>
      projects.map((p) => ({
        id: p.id,
        title: p.title,
        img: p.icon,
        link: p.live_url || p.github_url || "",
      })),
    [projects]
  );

  const search = () => {
    if (searchText === "") return apps;
    const text = searchText.toLowerCase();
    return apps.filter(
      (item) =>
        item.title.toLowerCase().includes(text) || item.id.toLowerCase().includes(text)
    );
  };

  return (
    <div
      className="z-30 transform scale-110 size-full fixed overflow-hidden bg-center bg-cover"
      id="launchpad"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`,
        opacity: show ? 1 : 0,
        visibility: show ? "visible" : "hidden",
        transition: "opacity 0.2s",
      }}
      onClick={() => toggleLaunchpad(false)}
    >
      <div className="size-full absolute bg-gray-900/20 backdrop-blur-2xl">
        <div
          className="mx-auto flex h-7 w-64 mt-5 bg-gray-200/10 border border-rounded-md border-gray-200/30"
          onClick={(e) => e.stopPropagation()}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        >
          <div className={`${focus ? "w-6 duration-200" : "w-26 delay-250"} hstack justify-end`}>
            <span className="i-bx:search ml-1 text-white" />
          </div>
          <input
            className="flex-1 min-w-0 no-outline bg-transparent px-1 text-sm text-white"
            placeholder={placeholderText}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="max-w-[1100px] mx-auto mt-8 w-full px-4 sm:px-10 grid grid-flow-row grid-cols-4 sm:grid-cols-7">
          {search().map((app) => (
            <div key={`launchpad-${app.id}`} className="h-32 sm:h-36 flex flex-col">
              <a
                href={app.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <LaunchpadIcon title={app.title} img={app.img} />
              </a>
              <span className="mt-2 mx-auto text-white text-xs sm:text-sm">
                {app.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
