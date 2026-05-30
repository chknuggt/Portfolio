import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { usePortfolio } from "../context/PortfolioContext";
import { useStore } from "../stores";
import { wallpapers } from "../configs";

interface AppIcon {
  id: string;
  label: string;
  icon?: string | null;
  href?: string | null;
  color?: string;
  symbol?: string;
}

type OpenApp = "bear" | "safari" | "typora" | "files" | null;

export default function Mobile() {
  const { profile, projects, about, bearNotes, typoraDocument, finderItems, socialLinks } = usePortfolio();
  const dark = useStore((s) => s.dark);
  const [time, setTime] = useState(() => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  const [openApp, setOpenApp] = useState<OpenApp>(null);
  const [selectedNote, setSelectedNote] = useState<typeof bearNotes[0] | null>(null);
  const [filesStack, setFilesStack] = useState<Array<{ id: string | null; name: string }>>([{ id: null, name: "Browse" }]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const touchStartY = useRef<number>(0);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50);
    else setSearchQuery("");
  }, [searchOpen]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (dy < -60) setSearchOpen(true);
  };

  const systemApps: AppIcon[] = [
    { id: "github",   label: "GitHub",   icon: "/img/icons/github.png",   href: profile?.github ?? null },
    { id: "spotify",  label: "Spotify",  icon: "/img/icons/spotify.png",  href: "https://open.spotify.com" },
    { id: "vscode",   label: "VSCode",   icon: "/img/icons/vscode.png",   href: about.vscode_url ?? null },
    { id: "terminal", label: "Terminal", icon: "/img/icons/terminal.png",  href: null },
    { id: "facetime", label: "FaceTime", icon: "/img/icons/facetime.png",  href: profile?.email ? `mailto:${profile.email}` : null },
    { id: "chess",    label: "Chess",    icon: "/img/icons/chess.svg",     href: about.chess_url ?? null },
  ];

  const projectApps: AppIcon[] = projects.map((p) => ({
    id: p.id,
    label: p.title,
    icon: p.icon || null,
    href: p.live_url || p.github_url || null,
  }));

  const allApps: AppIcon[] = [...systemApps];

  const searchResults = searchQuery.trim()
    ? allApps.filter((a) => a.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const dockApps: AppIcon[] = [
    { id: "files",  label: "Files",  icon: "/img/icons/folder-blue.png" },
    { id: "bear",   label: "Bear",   icon: "/img/icons/bear.png" },
    { id: "safari", label: "Safari", icon: "/img/icons/safari.png" },
    { id: "typora", label: "Typora", icon: "/img/icons/typora.png" },
  ];

  const handleTap = (app: AppIcon) => {
    if (app.id === "files" || app.id === "bear" || app.id === "safari" || app.id === "typora") {
      setOpenApp(app.id as OpenApp);
    } else if (app.href) {
      window.open(app.href, "_blank");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        userSelect: "none",
        position: "relative",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Subtle overlay to improve readability */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)", pointerEvents: "none" }} />

      {/* Status bar */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px 0", color: "#fff" }}>
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.3px" }}>{time}</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span className="i-bi:reception-4" style={{ fontSize: 15 }} />
          <span className="i-bi:wifi" style={{ fontSize: 15 }} />
          <span className="i-bi:battery-full" style={{ fontSize: 17 }} />
        </div>
      </div>

      {/* Scrollable icon grid */}
      <div style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 1, padding: "16px 16px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px 8px" }}>
          {systemApps.map((app) => (
            <HomeIcon key={app.id} app={app} onTap={handleTap} />
          ))}
        </div>
      </div>

      {/* Swipe hint */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "4px 0 4px", color: "rgba(255,255,255,0.4)", fontSize: 11 }}>
        swipe up to search
      </div>

      {/* Dock */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 16px 28px" }}>
        <div style={{
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          borderRadius: 28,
          padding: "12px 20px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          border: "1px solid rgba(255,255,255,0.25)",
        }}>
          {dockApps.map((app) => (
            <HomeIcon key={app.id} app={app} onTap={handleTap} dockMode />
          ))}
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div style={{ position: "absolute", inset: 0, zIndex: 30, display: "flex", flexDirection: "column", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)" }}>
          <div style={{ padding: "56px 20px 12px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.18)", borderRadius: 14, padding: "10px 16px" }}>
              <span className="i-bi:search" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", flexShrink: 0 }} />
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 17, caretColor: "#fff" }}
              />
            </div>
            <button onClick={() => setSearchOpen(false)} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.8)", fontSize: 16, cursor: "pointer", padding: "0 4px" }}>
              Cancel
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "0 20px" }}>
            {searchResults.length > 0 ? (
              <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 16, overflow: "hidden" }}>
                {searchResults.map((app, i) => (
                  <div
                    key={app.id}
                    onClick={() => { if (app.href) window.open(app.href, "_blank"); setSearchOpen(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderBottom: i < searchResults.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none", cursor: "pointer" }}
                  >
                    <SearchIconThumb app={app} />
                    <span style={{ color: "#fff", fontSize: 16 }}>{app.label}</span>
                    <span className="i-bi:chevron-right" style={{ marginLeft: "auto", color: "rgba(255,255,255,0.4)", fontSize: 13 }} />
                  </div>
                ))}
              </div>
            ) : searchQuery.trim() ? (
              <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 15, marginTop: 40 }}>No results</div>
            ) : null}
          </div>
        </div>
      )}

      {/* Bear — full-screen like Safari */}
      {openApp === "safari" && (
        <MobileSafari dark={dark} socialLinks={socialLinks} onClose={() => setOpenApp(null)} />
      )}

      {openApp === "bear" && (
        <MobileBear dark={dark} bearNotes={bearNotes} onClose={() => { setOpenApp(null); setSelectedNote(null); }} />
      )}

      {/* App modals (Files + Typora) */}
      {openApp && openApp !== "safari" && openApp !== "bear" && (
        <AppModal title={openApp === "files" ? "Files" : "Typora"} dark={dark} onClose={() => { setOpenApp(null); setFilesStack([{ id: null, name: "Browse" }]); }}>

          {openApp === "typora" && (
            <pre style={{ fontFamily: "-apple-system, sans-serif", whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.7, color: dark ? "#d1d1d6" : "#3c3c43", margin: 0 }}>
              {typoraDocument?.content ?? "No document found."}
            </pre>
          )}

          {openApp === "files" && (() => {
            const currentId = filesStack[filesStack.length - 1].id;
            const currentTitle = filesStack[filesStack.length - 1].name;
            const canGoBack = filesStack.length > 1;
            const isProjectsFolder = currentTitle === "Projects";

            type FilesItem =
              | { kind: "folder"; id: string; name: string }
              | { kind: "project"; id: string; name: string; icon: string | null; link: string | null };

            const items: FilesItem[] = isProjectsFolder
              ? projects.map(p => ({ kind: "project" as const, id: p.id, name: p.title, icon: p.icon || null, link: p.live_url || p.github_url || null }))
              : finderItems.filter(i => i.parent_id === currentId).map(i => ({ kind: "folder" as const, id: i.id, name: i.name }));

            return (
              <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Files header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 4px 8px" }}>
                  <button
                    onClick={() => canGoBack && setFilesStack(s => s.slice(0, -1))}
                    style={{ width: 36, height: 36, borderRadius: "50%", background: canGoBack ? (dark ? "#2c2c2e" : "#e5e5ea") : "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: canGoBack ? "pointer" : "default" }}
                  >
                    {canGoBack && <span className="i-bi:chevron-left" style={{ fontSize: 16, color: "#007aff" }} />}
                  </button>
                  <span style={{ fontWeight: 700, fontSize: 17, color: dark ? "#fff" : "#000" }}>{currentTitle}</span>
                  <div style={{ width: 36 }} />
                </div>

                {/* Search bar */}
                <div style={{ background: dark ? "#1c1c1e" : "#e5e5ea", borderRadius: 12, padding: "9px 14px", display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <span className="i-bi:search" style={{ fontSize: 14, color: dark ? "#8e8e93" : "#6c6c70" }} />
                  <span style={{ fontSize: 15, color: dark ? "#8e8e93" : "#6c6c70" }}>Search</span>
                </div>

                {/* Grid */}
                {items.length === 0 ? (
                  <div style={{ textAlign: "center", color: dark ? "#8e8e93" : "#6c6c70", fontSize: 15, marginTop: 40 }}>This folder is empty</div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px 16px" }}>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (item.kind === "folder") setFilesStack(s => [...s, { id: item.id, name: item.name }]);
                          else if (item.link) window.open(item.link, "_blank");
                        }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}
                      >
                        {item.kind === "folder" ? (
                          <img src="/img/icons/folder-blue.png" alt="" style={{ width: 72, height: 56, objectFit: "contain" }} draggable={false} />
                        ) : (
                          <MobileProjectIcon name={item.name} icon={item.icon} dark={dark} />
                        )}
                        <span style={{ fontSize: 12, fontWeight: 600, color: dark ? "#fff" : "#000", textAlign: "center", wordBreak: "break-word" }}>{item.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </AppModal>
      )}
    </div>
  );
}

function MobileSafari({ dark, socialLinks, onClose }: { dark: boolean; socialLinks: Array<{ id: string; title: string; img?: string; link: string; category: string }>; onClose: () => void }) {
  const [url, setUrl] = useState("");
  const [activeUrl, setActiveUrl] = useState("");
  const [iframeKey, setIframeKey] = useState(0);
  const [showFallback, setShowFallback] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bg = dark ? "#1c1c1e" : "#f2f2f7";
  const toolbarBg = dark ? "rgba(28,28,30,0.92)" : "rgba(242,242,247,0.92)";
  const textColor = dark ? "#fff" : "#000";
  const subColor = dark ? "#8e8e93" : "#6c6c70";

  const navigate = (href: string) => {
    let target = href;
    if (!/^https?:\/\//i.test(target)) target = `https://${target}`;
    setActiveUrl(target);
    setUrl(target);
    setShowFallback(false);
    setIframeKey(k => k + 1);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowFallback(true), 1500);
    inputRef.current?.blur();
  };

  const favorites = socialLinks.filter(l => l.category === "favorites");
  const frequent  = socialLinks.filter(l => l.category === "freq");
  const hostname = activeUrl ? (() => { try { return new URL(activeUrl).hostname; } catch { return activeUrl; } })() : "";

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 20, display: "flex", flexDirection: "column", background: bg, fontFamily: "-apple-system, sans-serif" }}>

      {/* Top URL bar */}
      <div style={{ background: toolbarBg, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, paddingTop: 48, paddingLeft: 16, paddingRight: 16, paddingBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {activeUrl && (
            <button onClick={() => { setActiveUrl(""); setUrl(""); }} style={{ background: "transparent", border: "none", color: "#007aff", fontSize: 22, cursor: "pointer", padding: "0 2px", display: "flex" }}>
              <span className="i-bi:chevron-left" />
            </button>
          )}
          <div style={{ flex: 1, background: dark ? "#2c2c2e" : "#e5e5ea", borderRadius: 12, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
            {!activeUrl && <span className="i-bi:lock-fill" style={{ fontSize: 12, color: subColor, flexShrink: 0 }} />}
            <input
              ref={inputRef}
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && navigate(url)}
              placeholder="Search or enter website name"
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: textColor, fontSize: 15, textAlign: activeUrl ? "left" : "center", minWidth: 0 }}
            />
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#007aff", fontSize: 15, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>Done</button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {!activeUrl ? (
          /* Start page */
          <div style={{ height: "100%", overflowY: "auto", padding: "24px 20px" }}>
            {favorites.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: textColor, marginBottom: 16 }}>Favorites</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px 8px" }}>
                  {favorites.map(link => (
                    <button key={link.id} onClick={() => navigate(link.link)} style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: 0 }}>
                      <div style={{ width: 52, height: 52, borderRadius: 12, background: dark ? "#2c2c2e" : "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.15)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {link.img ? <img src={link.img} alt="" style={{ width: 32, height: 32, objectFit: "contain" }} /> : <span className="i-bi:globe2" style={{ fontSize: 24, color: "#007aff" }} />}
                      </div>
                      <span style={{ fontSize: 11, color: subColor, textAlign: "center", maxWidth: 60, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {frequent.length > 0 && (
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: textColor, marginBottom: 16 }}>Frequently Visited</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px 8px" }}>
                  {frequent.map(link => (
                    <button key={link.id} onClick={() => navigate(link.link)} style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: 0 }}>
                      <div style={{ width: 52, height: 52, borderRadius: 12, background: dark ? "#2c2c2e" : "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.15)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {link.img ? <img src={link.img} alt="" style={{ width: 32, height: 32, objectFit: "contain" }} /> : <span className="i-bi:globe2" style={{ fontSize: 24, color: "#007aff" }} />}
                      </div>
                      <span style={{ fontSize: 11, color: subColor, textAlign: "center", maxWidth: 60, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Iframe + fallback */
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <iframe key={iframeKey} src={activeUrl} style={{ width: "100%", height: "100%", border: "none", background: "#fff" }} title="Safari" />
            {showFallback && (
              <div style={{ position: "absolute", inset: 0, background: dark ? "rgba(28,28,30,0.97)" : "rgba(242,242,247,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 32 }}>
                <span className="i-bi:globe2" style={{ fontSize: 48, color: subColor }} />
                <div style={{ fontSize: 17, fontWeight: 600, color: textColor, textAlign: "center" }}>Can't open {hostname}</div>
                <div style={{ fontSize: 14, color: subColor, textAlign: "center" }}>This site doesn't allow embedding.</div>
                <button onClick={() => window.open(activeUrl, "_blank")} style={{ marginTop: 8, background: "#007aff", color: "#fff", border: "none", borderRadius: 12, padding: "12px 28px", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
                  Open in Browser
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom toolbar */}
      <div style={{ background: toolbarBg, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, paddingTop: 10, paddingLeft: 32, paddingRight: 32, paddingBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => { setActiveUrl(""); setUrl(""); }} disabled={!activeUrl} style={{ background: "transparent", border: "none", cursor: !activeUrl ? "default" : "pointer", color: !activeUrl ? subColor : "#007aff", fontSize: 22, display: "flex", alignItems: "center", opacity: !activeUrl ? 0.35 : 1 }}>
          <span className="i-bi:chevron-left" />
        </button>
        <button disabled style={{ background: "transparent", border: "none", cursor: "default", color: subColor, fontSize: 22, display: "flex", alignItems: "center", opacity: 0.35 }}>
          <span className="i-bi:chevron-right" />
        </button>
        <button onClick={() => activeUrl && window.open(activeUrl, "_blank")} disabled={!activeUrl} style={{ background: "transparent", border: "none", cursor: !activeUrl ? "default" : "pointer", color: !activeUrl ? subColor : "#007aff", fontSize: 22, display: "flex", alignItems: "center", opacity: !activeUrl ? 0.35 : 1 }}>
          <span className="i-bi:box-arrow-up" />
        </button>
        <button disabled style={{ background: "transparent", border: "none", cursor: "default", color: subColor, fontSize: 22, display: "flex", alignItems: "center", opacity: 0.35 }}>
          <span className="i-bi:book" />
        </button>
        <button disabled style={{ background: "transparent", border: "none", cursor: "default", color: subColor, fontSize: 22, display: "flex", alignItems: "center", opacity: 0.35 }}>
          <span className="i-bi:square-fill" />
        </button>
      </div>
    </div>
  );
}

function AppModal({ title, dark, onClose, children }: { title: string; dark: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 20, display: "flex", flexDirection: "column", background: dark ? "#000" : "#f2f2f7" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 20px 12px", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: dark ? "#fff" : "#000" }}>{title}</span>
        <button onClick={onClose} style={{ background: dark ? "#2c2c2e" : "#e5e5ea", border: "none", borderRadius: 14, padding: "5px 14px", fontSize: 15, color: dark ? "#fff" : "#000", cursor: "pointer" }}>Done</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
        {children}
      </div>
    </div>
  );
}

type BearNote = { id: string; title: string; excerpt: string; content?: string | null };

function MobileBear({ dark, bearNotes, onClose }: { dark: boolean; bearNotes: BearNote[]; onClose: () => void }) {
  const [selectedNote, setSelectedNote] = useState<BearNote | null>(null);

  const bg = dark ? "#1c1c1e" : "#f2f2f7";
  const textColor = dark ? "#fff" : "#000";
  const subColor = dark ? "#8e8e93" : "#6c6c70";
  const bodyColor = dark ? "#d1d1d6" : "#3c3c43";
  const sepColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const circleStyle: React.CSSProperties = {
    width: 42, height: 42, borderRadius: 21,
    background: dark ? "#2c2c2e" : "#e5e5ea",
    border: "none", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  };

  if (selectedNote) {
    return (
      <div style={{ position: "absolute", inset: 0, zIndex: 20, background: bg, display: "flex", flexDirection: "column", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
        {/* Detail header */}
        <div style={{ paddingTop: 52, paddingLeft: 20, paddingRight: 20, paddingBottom: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <button onClick={() => setSelectedNote(null)} style={circleStyle}>
              <span className="i-bi:chevron-left" style={{ fontSize: 18, color: textColor }} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 14, background: dark ? "#2c2c2e" : "#e5e5ea", borderRadius: 24, paddingTop: 10, paddingBottom: 10, paddingLeft: 18, paddingRight: 18 }}>
              <span className="i-bi:info-circle" style={{ fontSize: 17, color: textColor }} />
              <span className="i-bi:three-dots-vertical" style={{ fontSize: 17, color: textColor }} />
            </div>
          </div>
        </div>
        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", paddingLeft: 20, paddingRight: 20, paddingBottom: 40 }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 style={{ fontSize: 28, fontWeight: 700, color: textColor, marginTop: 0, marginBottom: 16, lineHeight: 1.2 }}>{children}</h1>,
              h2: ({ children }) => <h2 style={{ fontSize: 22, fontWeight: 700, color: textColor, marginTop: 24, marginBottom: 10 }}>{children}</h2>,
              h3: ({ children }) => <h3 style={{ fontSize: 18, fontWeight: 600, color: textColor, marginTop: 18, marginBottom: 8 }}>{children}</h3>,
              p: ({ children }) => <p style={{ fontSize: 16, lineHeight: 1.75, color: bodyColor, marginTop: 0, marginBottom: 14 }}>{children}</p>,
              ul: ({ children }) => <ul style={{ paddingLeft: 0, listStyle: "none", margin: "8px 0" }}>{children}</ul>,
              ol: ({ children }) => <ol style={{ paddingLeft: 20, margin: "8px 0" }}>{children}</ol>,
              li: ({ children }) => (
                <li style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 16, lineHeight: 1.6, color: bodyColor }}>
                  <span style={{ color: "#007aff", flexShrink: 0, marginTop: 2 }}>•</span>
                  <span>{children}</span>
                </li>
              ),
              a: ({ children, href }) => <a href={href} target="_blank" rel="noreferrer" style={{ color: "#007aff", textDecoration: "none" }}>{children}</a>,
              strong: ({ children }) => <strong style={{ fontWeight: 700, color: textColor }}>{children}</strong>,
              em: ({ children }) => <em style={{ fontStyle: "italic" }}>{children}</em>,
              code: ({ children }) => <code style={{ background: dark ? "#2c2c2e" : "#e5e5ea", borderRadius: 5, paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2, fontSize: 14, fontFamily: "monospace", color: bodyColor }}>{children}</code>,
              hr: () => <hr style={{ border: "none", borderTop: `1px solid ${sepColor}`, margin: "20px 0" }} />,
              blockquote: ({ children }) => <blockquote style={{ borderLeft: `3px solid #007aff`, paddingLeft: 12, margin: "12px 0", color: subColor }}>{children}</blockquote>,
            }}
          >
            {`# ${selectedNote.title}\n\n${selectedNote.content ?? ""}`}
          </ReactMarkdown>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 20, background: bg, display: "flex", flexDirection: "column", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
      {/* List header */}
      <div style={{ paddingTop: 52, paddingLeft: 20, paddingRight: 20, paddingBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button style={circleStyle}>
            <span className="i-bi:list" style={{ fontSize: 22, color: textColor }} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 5, cursor: "default" }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: textColor }}>Notes</span>
            <span className="i-bi:chevron-down" style={{ fontSize: 13, color: textColor }} />
          </div>
          <button style={circleStyle} onClick={onClose}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#007aff" }}>Done</span>
          </button>
        </div>
      </div>

      {/* Note list */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {bearNotes.map((note) => (
          <div
            key={note.id}
            onClick={() => setSelectedNote(note)}
            style={{ paddingTop: 16, paddingBottom: 16, paddingLeft: 20, paddingRight: 20, borderBottom: `1px solid ${sepColor}`, cursor: "pointer" }}
          >
            <div style={{ fontWeight: 700, fontSize: 17, color: textColor, marginBottom: 6 }}>{note.title}</div>
            <div style={{ fontSize: 15, color: subColor, lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {note.excerpt}
            </div>
            <div style={{ marginTop: 8, fontSize: 13, color: subColor }}>Just now</div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button
        style={{ position: "absolute", bottom: 28, right: 20, width: 56, height: 56, borderRadius: 28, background: "#007aff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,122,255,0.45)" }}
      >
        <span className="i-bi:pencil" style={{ fontSize: 22, color: "#fff" }} />
      </button>
    </div>
  );
}

function MobileProjectIcon({ name, icon, dark }: { name: string; icon: string | null; dark: boolean }) {
  const [failed, setFailed] = useState(false);
  if (icon && !failed) {
    return <img src={icon} alt="" onError={() => setFailed(true)} style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover" }} draggable={false} />;
  }
  return (
    <div style={{ width: 60, height: 60, borderRadius: 14, background: dark ? "#2c2c2e" : "#e5e5ea", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: 22, fontWeight: 700, color: dark ? "#fff" : "#3c3c43" }}>{name.charAt(0).toUpperCase()}</span>
    </div>
  );
}

function SearchIconThumb({ app }: { app: AppIcon }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{ width: 36, height: 36, borderRadius: 9, background: app.color ?? "#a3aaae", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {app.icon && !failed ? (
        <img src={app.icon} alt="" onError={() => setFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : app.symbol ? (
        <span className={app.symbol} style={{ fontSize: 18, color: "#fff" }} />
      ) : (
        <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{app.label.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}

function HomeIcon({ app, onTap, dockMode = false }: { app: AppIcon; onTap: (a: AppIcon) => void; dockMode?: boolean }) {
  const [failed, setFailed] = useState(false);
  const size = dockMode ? 62 : 60;

  const iconEl = app.icon && !failed ? (
    <img
      src={app.icon}
      alt=""
      draggable={false}
      onError={() => setFailed(true)}
      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
    />
  ) : app.symbol ? (
    <span className={app.symbol} style={{ fontSize: dockMode ? 28 : 26, color: "#fff" }} />
  ) : (
    <span style={{ fontSize: dockMode ? 24 : 22, fontWeight: 700, color: "#fff" }}>{app.label.charAt(0).toUpperCase()}</span>
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", WebkitTapHighlightColor: "transparent" }}
      onClick={() => onTap(app)}
    >
      <div style={{
        width: size,
        height: size,
        borderRadius: size * 0.225,
        background: app.color ?? (app.icon && !failed ? "transparent" : "#a3aaae"),
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
        flexShrink: 0,
      }}>
        {iconEl}
      </div>
      {!dockMode && (
        <span style={{
          color: "#fff",
          fontSize: 11,
          fontWeight: 500,
          textAlign: "center",
          textShadow: "0 1px 3px rgba(0,0,0,0.6)",
          lineHeight: 1.2,
          maxWidth: 70,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}>
          {app.label}
        </span>
      )}
    </div>
  );
}
