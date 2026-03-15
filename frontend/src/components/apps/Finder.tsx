import React, { useState } from "react";

interface FileItem {
  name: string;
  type: "folder" | "file";
  link?: string;
  children?: FileItem[];
}

const fileSystem: FileItem[] = [
  {
    name: "Projects",
    type: "folder",
    children: [
      { name: "WaterFilterNet", type: "file", link: "https://waterfilternet.com" },
      { name: "Choirokoitia Heritage App", type: "file", link: "https://github.com/chknuggt" },
      { name: "Chess Game (Unity)", type: "file", link: "https://github.com/chknuggt" },
      { name: "SaaS CMS Builder", type: "file", link: "https://github.com/chknuggt" },
      { name: "AI Trading Pipeline", type: "file", link: "https://github.com/chknuggt" },
      { name: "macOS Portfolio", type: "file", link: "https://github.com/chknuggt" },
    ]
  },
  {
    name: "Documents",
    type: "folder",
    children: [
      { name: "Resume.pdf", type: "file", link: "/resume.pdf" },
    ]
  },
  {
    name: "Downloads",
    type: "folder",
    children: []
  },
  {
    name: "Desktop",
    type: "folder",
    children: []
  },
];

const sidebarFavorites = [
  { name: "Recents", icon: "i-bi:clock" },
  { name: "Applications", icon: "i-bi:grid-3x3-gap" },
  { name: "Desktop", icon: "i-bi:display" },
  { name: "Documents", icon: "i-bi:file-earmark" },
  { name: "Downloads", icon: "i-bi:arrow-down-circle" },
];

const sidebarLocations = [
  { name: "marioselef's Mac", icon: "i-bi:laptop" },
];

export default function Finder() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [history, setHistory] = useState<string[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const getCurrentItems = (path?: string[]): FileItem[] => {
    const p = path ?? currentPath;
    let items = fileSystem;
    for (const segment of p) {
      const folder = items.find(i => i.name === segment && i.type === "folder");
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

  const handleDoubleClick = (item: FileItem) => {
    if (item.type === "folder") {
      navigateTo([...currentPath, item.name]);
    } else if (item.link) {
      window.open(item.link, "_blank");
    }
  };

  const handleSidebarClick = (name: string) => {
    const folder = fileSystem.find(i => i.name === name);
    if (folder) {
      navigateTo([name]);
    } else if (name === "marioselef's Mac") {
      navigateTo([]);
    } else {
      navigateTo([]);
    }
  };

  const items = getCurrentItems();
  const currentTitle = currentPath.length > 0 ? currentPath[currentPath.length - 1] : "marioselef";

  return (
    <div className="h-full flex flex-col text-sm" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
      {/* Toolbar */}
      <div
        className="flex items-center h-12 px-2 border-b"
        style={{
          borderColor: "rgba(0,0,0,0.12)",
          background: "linear-gradient(180deg, rgba(244,244,244,0.95) 0%, rgba(234,234,234,0.95) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Nav buttons */}
        <div className="flex items-center gap-1 mr-3">
          <button
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-black/5 disabled:opacity-25"
            onClick={goBack}
            disabled={historyIndex === 0}
          >
            <span className="i-bi:chevron-left text-sm text-gray-600" />
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-black/5 disabled:opacity-25"
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
          >
            <span className="i-bi:chevron-right text-sm text-gray-600" />
          </button>
        </div>

        {/* Title */}
        <div className="flex-1 text-center font-semibold text-gray-800 text-base">
          {currentTitle}
        </div>

        {/* Right toolbar icons */}
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
            borderColor: "rgba(0,0,0,0.1)",
            background: "rgba(244,244,246,0.85)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Favorites */}
          <div className="px-4 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
            Favorites
          </div>
          {sidebarFavorites.map(item => (
            <button
              key={item.name}
              className={`w-full text-left px-4 py-[3px] flex items-center gap-2 text-[13px] ${
                (currentPath.length === 1 && currentPath[0] === item.name)
                  ? "bg-blue-500/15 text-blue-600 rounded-md mx-1 w-[calc(100%-8px)]"
                  : "text-gray-700 hover:bg-black/5"
              }`}
              onClick={() => handleSidebarClick(item.name)}
            >
              <span className={`${item.icon} text-base text-blue-500`} />
              {item.name}
            </button>
          ))}

          {/* Locations */}
          <div className="px-4 py-1 mt-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
            Locations
          </div>
          {sidebarLocations.map(item => (
            <button
              key={item.name}
              className={`w-full text-left px-4 py-[3px] flex items-center gap-2 text-[13px] ${
                currentPath.length === 0
                  ? "bg-blue-500/15 text-blue-600 rounded-md mx-1 w-[calc(100%-8px)]"
                  : "text-gray-700 hover:bg-black/5"
              }`}
              onClick={() => handleSidebarClick(item.name)}
            >
              <span className={`${item.icon} text-base text-gray-500`} />
              {item.name}
            </button>
          ))}
        </div>

        {/* Main content - icon grid */}
        <div className="flex-1 p-6 overflow-auto" style={{ background: "rgb(255,255,255)" }}>
          {items.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              This folder is empty
            </div>
          ) : (
            <div className="flex flex-wrap gap-6">
              {items.map(item => (
                <div
                  key={item.name}
                  className={`flex flex-col items-center w-24 cursor-default select-none rounded-lg p-2 ${
                    selectedItem === item.name ? "bg-blue-500/15" : "hover:bg-black/3"
                  }`}
                  onClick={() => setSelectedItem(item.name)}
                  onDoubleClick={() => handleDoubleClick(item)}
                >
                  {item.type === "folder" ? (
                    <img src="/img/icons/folder-blue.png" className="w-16 h-16 drop-shadow-sm" alt="" draggable={false} />
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center">
                      <span className="i-bi:file-earmark-text text-4xl text-gray-400" />
                    </div>
                  )}
                  <span className={`text-xs mt-1 text-center leading-tight line-clamp-2 ${
                    selectedItem === item.name ? "text-blue-600" : "text-gray-800"
                  }`}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div
        className="px-4 py-1 border-t text-[11px] text-gray-400"
        style={{ borderColor: "rgba(0,0,0,0.1)", background: "rgba(244,244,246,0.9)" }}
      >
        {items.length} item{items.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
