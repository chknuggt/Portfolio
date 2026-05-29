import { usePortfolio } from "../../context/PortfolioContext";
import { useStore } from "../../stores";
import type { FinderItem } from "../../lib/api";

interface TreeItem {
  id: string;
  name: string;
  type: "folder" | "file" | "project";
  link?: string | null;
  icon?: string | null;
  children?: TreeItem[];
}

const buildTree = (items: FinderItem[], parentId: string | null = null): TreeItem[] =>
  items
    .filter((i) => i.parent_id === parentId)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((i) => ({
      id: i.id,
      name: i.name,
      type: i.type,
      link: i.link,
      icon: i.icon,
      children: i.type === "folder" ? buildTree(items, i.id) : undefined,
    }));

function ProjectIcon({ name, icon }: { name: string; icon?: string | null }) {
  const [failed, setFailed] = useState(false);
  const initial = name.charAt(0).toUpperCase();

  if (icon && !failed) {
    return (
      <img
        src={icon}
        className="w-16 h-16 drop-shadow-sm object-contain rounded-2xl"
        alt=""
        draggable={false}
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div className="w-16 h-16 flex items-center justify-center rounded-2xl drop-shadow-sm" style={{ background: "#a3aaae" }}>
      <span className="font-semibold text-2xl" style={{ color: "#f5f5f7", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>{initial}</span>
    </div>
  );
}


export default function Finder() {
  const { finderItems, projects } = usePortfolio();
  const finderPath = useStore((state) => state.finderPath);
  const setFinderPath = useStore((state) => state.setFinderPath);
  const dark = useStore((state) => state.dark);

  const fileSystem = useMemo(() => {
    const tree = buildTree(finderItems);
    const projectsFolder = tree.find((i) => i.name === "Projects" && i.type === "folder");
    if (projectsFolder) {
      const injected: TreeItem[] = projects.map((p) => ({
        id: p.id,
        name: `${p.title}.proj`,
        type: "project",
        link: p.github_url || p.live_url || null,
        icon: p.icon || null,
      }));
      projectsFolder.children = [...(projectsFolder.children ?? []), ...injected];
    }
    return tree;
  }, [finderItems, projects]);

  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [history, setHistory] = useState<string[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Navigate to finderPath when Finder opens
  useEffect(() => {
    if (finderPath) {
      const path = [finderPath];
      setCurrentPath(path);
      setHistory([[],  path]);
      setHistoryIndex(1);
      setFinderPath(null);
    }
  }, [finderPath]);

  const getCurrentItems = (path?: string[]): TreeItem[] => {
    const p = path ?? currentPath;
    let items = fileSystem;
    for (const segment of p) {
      const folder = items.find((i) => i.name === segment && (i.type === "folder"));
      if (folder?.children) items = folder.children;
      else break;
    }
    return items;
  };

  const navigateTo = (path: string[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(path);
    setSelectedItem(null);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      setSelectedItem(null);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      setSelectedItem(null);
    }
  };

  const handleDoubleClick = (item: TreeItem) => {
    if (item.type === "folder") {
      navigateTo([...currentPath, item.name]);
    } else if (item.link) {
      window.open(item.link, "_blank");
    }
  };

  const renderIcon = (item: TreeItem) => {
    if (item.type === "folder") {
      return <img src="/img/icons/folder-blue.png" className="w-16 h-16 drop-shadow-sm" alt="" draggable={false} />;
    }
    if (item.type === "project") {
      return <ProjectIcon name={item.name} icon={item.icon} />;
    }
    return (
      <div className="w-16 h-16 flex items-center justify-center">
        <span className="i-bi:file-earmark-text text-4xl text-gray-400" />
      </div>
    );
  };

  const handleSidebarClick = (name: string) => {
    const folder = fileSystem.find((i) => i.name === name);
    if (folder) navigateTo([name]);
    else navigateTo([]);
  };

  const items = getCurrentItems();
  const currentTitle = currentPath.length > 0 ? currentPath[currentPath.length - 1] : "marioselef";

  return (
    <div className="h-full flex flex-col text-sm" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
      {/* Toolbar */}
      <div
        className="flex items-center h-12 px-2 border-b"
        style={{
          borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.12)",
          background: dark
            ? "linear-gradient(180deg, rgba(40,40,40,0.98) 0%, rgba(30,30,30,0.98) 100%)"
            : "linear-gradient(180deg, rgba(244,244,244,0.95) 0%, rgba(234,234,234,0.95) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-1 mr-3">
          <button
            className={`w-7 h-7 flex items-center justify-center rounded disabled:opacity-25 ${dark ? "hover:bg-white/10" : "hover:bg-black/5"}`}
            onClick={goBack}
            disabled={historyIndex === 0}
          >
            <span className={`i-bi:chevron-left text-sm ${dark ? "text-gray-300" : "text-gray-600"}`} />
          </button>
          <button
            className={`w-7 h-7 flex items-center justify-center rounded disabled:opacity-25 ${dark ? "hover:bg-white/10" : "hover:bg-black/5"}`}
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
          >
            <span className={`i-bi:chevron-right text-sm ${dark ? "text-gray-300" : "text-gray-600"}`} />
          </button>
        </div>
        <div className={`flex-1 text-center font-semibold text-base ${dark ? "text-gray-100" : "text-gray-800"}`}>
          {currentTitle}
        </div>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-black/5">
            <span className="i-bi:grid-3x3 text-sm text-gray-500" />
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-black/5">
            <span className="i-bi:search text-sm text-gray-500" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className="w-44 py-2 overflow-auto border-r flex-shrink-0"
          style={{
            borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.1)",
            background: dark ? "rgba(30,30,32,0.95)" : "rgba(244,244,246,0.85)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="px-4 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
            Favorites
          </div>
          {fileSystem.filter(i => i.type === "folder").map((item) => (
            <button
              key={item.id}
              className={`w-full text-left px-4 py-[3px] flex items-center gap-2 text-[13px] ${
                currentPath.length === 1 && currentPath[0] === item.name
                  ? "bg-blue-500/15 text-blue-600 rounded-md mx-1 w-[calc(100%-8px)]"
                  : dark ? "text-gray-300 hover:bg-white/8" : "text-gray-700 hover:bg-black/5"
              }`}
              onClick={() => handleSidebarClick(item.name)}
            >
              <span className="i-bi:folder-fill text-base text-blue-500" />
              {item.name}
            </button>
          ))}

          <div className="px-4 py-1 mt-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
            Locations
          </div>
          <button
            className={`w-full text-left px-4 py-[3px] flex items-center gap-2 text-[13px] ${
              currentPath.length === 0
                ? "bg-blue-500/15 text-blue-600 rounded-md mx-1 w-[calc(100%-8px)]"
                : dark ? "text-gray-300 hover:bg-white/8" : "text-gray-700 hover:bg-black/5"
            }`}
            onClick={() => navigateTo([])}
          >
            <span className="i-bi:laptop text-base text-gray-500" />
            marioselef's Mac
          </button>
        </div>

        {/* Main content */}
        <div
          className="flex-1 p-6 overflow-auto"
          style={{ background: dark ? "rgb(28,28,30)" : "rgb(255,255,255)" }}
        >
          {items.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              This folder is empty
            </div>
          ) : (
            <div className="flex flex-wrap gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col items-center w-24 cursor-default select-none rounded-lg p-2 ${
                    selectedItem === item.id
                      ? "bg-blue-500/15"
                      : dark ? "hover:bg-white/5" : "hover:bg-black/3"
                  }`}
                  onClick={() => setSelectedItem(item.id)}
                  onDoubleClick={() => handleDoubleClick(item)}
                >
                  {renderIcon(item)}
                  <span className={`text-xs mt-1 text-center leading-tight line-clamp-2 ${
                    selectedItem === item.id
                      ? "text-blue-500"
                      : dark ? "text-gray-200" : "text-gray-800"
                  }`}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="px-4 py-1 border-t text-[11px] text-gray-400"
        style={{
          borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
          background: dark ? "rgba(30,30,32,0.95)" : "rgba(244,244,246,0.9)",
        }}
      >
        {items.length} item{items.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
