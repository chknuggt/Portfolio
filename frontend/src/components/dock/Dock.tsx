import { useShallow } from "zustand/react/shallow";
import { useMotionValue } from "framer-motion";
import { apps } from "../../configs";
import { useStore } from "../../stores";
import { usePortfolio } from "../../context/PortfolioContext";

interface DockProps {
  open: (id: string) => void;
  showApps: {
    [key: string]: boolean;
  };
  showLaunchpad: boolean;
  toggleLaunchpad: (target: boolean) => void;
  hide: boolean;
}

export default function Dock({
  open,
  showApps,
  showLaunchpad,
  toggleLaunchpad,
  hide
}: DockProps) {
  const { dockSize, dockMag } = useStore(useShallow((state) => ({
    dockSize: state.dockSize,
    dockMag: state.dockMag
  })));

  const { profile, about } = usePortfolio();

  const dynamicLink = (id: string, fallback?: string) => {
    if (id === "github") return profile?.github ?? fallback;
    if (id === "chess") return about.chess_url ?? fallback;
    return fallback;
  };

  const [hovered, setHovered] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setHovered(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const openApp = (id: string) => {
    if (id === "launchpad") toggleLaunchpad(!showLaunchpad);
    else {
      toggleLaunchpad(false);
      open(id);
    }
  };

  const mouseX = useMotionValue<number | null>(null);

  return (
    <>
      {/* Hover trigger zone at bottom of screen */}
      <div
        className="fixed bottom-0 inset-x-0 h-2 z-50"
        onMouseEnter={() => setHovered(true)}
      />
      <div
        className={`dock fixed inset-x-0 mx-2 sm:mx-auto w-full sm:w-max overflow-x-scroll sm:overflow-visible flex justify-center transition-all duration-300 ease-out ${hide ? "z-0" : "z-50"}`}
        style={{
          bottom: hovered ? "4px" : "-80px",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          mouseX.set(null);
        }}
      >
        <ul
          className="flex space-x-2 px-2 backdrop-blur-2xl bg-c-white/20"
          border="~ c-400/40 rounded-none sm:rounded-xl"
          onMouseMove={(e) => mouseX.set(e.nativeEvent.x)}
          onMouseLeave={() => mouseX.set(null)}
          style={{
            height: `${(dockSize + 15) / 16}rem`
          }}
        >
          {apps.map((app) => (
            <DockItem
              key={`dock-${app.id}`}
              id={app.id}
              title={app.title}
              img={app.img}
              mouseX={mouseX}
              desktop={app.desktop}
              openApp={openApp}
              isOpen={app.desktop && showApps[app.id]}
              link={dynamicLink(app.id, app.link)}
              dockSize={dockSize}
              dockMag={dockMag}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
