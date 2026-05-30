import React from "react";
import { createRoot } from "react-dom/client";

import Desktop from "./pages/Desktop";
import Login from "./pages/Login";
import Boot from "./pages/Boot";
import Mobile from "./pages/Mobile";

import "@unocss/reset/tailwind.css";
import "uno.css";
import "katex/dist/katex.min.css";
import "./styles/index.css";
import { AudioProvider } from "./context/AudioContext";
import { PortfolioProvider } from "./context/PortfolioContext";


function MacOS() {
  const [login, setLogin] = useState<boolean>(false);
  const [booting, setBooting] = useState<boolean>(false);
  const [restart, setRestart] = useState<boolean>(false);
  const [sleep, setSleep] = useState<boolean>(false);

  const shutMac = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setRestart(false);
    setSleep(false);
    setLogin(false);
    setBooting(true);
  };

  const restartMac = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setRestart(true);
    setSleep(false);
    setLogin(false);
    setBooting(true);
  };

  const sleepMac = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setRestart(false);
    setSleep(true);
    setLogin(false);
    setBooting(true);
  };

  if (booting) return <Boot restart={restart} sleep={sleep} setBooting={setBooting} />;
  if (login) return <Desktop setLogin={setLogin} shutMac={shutMac} sleepMac={sleepMac} restartMac={restartMac} />;
  return <Login setLogin={setLogin} shutMac={shutMac} sleepMac={sleepMac} restartMac={restartMac} />;
}

export default function App() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile ? <Mobile /> : <MacOS />;
}

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <PortfolioProvider>
      <AudioProvider>
        <App />
      </AudioProvider>
    </PortfolioProvider>
  </React.StrictMode>
);
