import { useState, useEffect } from "react";
import ComputersCanvas from "./components/ComputersCanvas";

const SCROLL_ZONE_HEIGHT = 300;

function App() {
  const [revealOpacity, setRevealOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollZonePx = (SCROLL_ZONE_HEIGHT / 100) * window.innerHeight;
      const revealStart = scrollZonePx;
      const revealEnd = revealStart + window.innerHeight;

      if (window.scrollY <= revealStart) {
        setRevealOpacity(0);
      } else if (window.scrollY >= revealEnd) {
        setRevealOpacity(1);
      } else {
        setRevealOpacity((window.scrollY - revealStart) / (revealEnd - revealStart));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ background: "#050816" }}>
      {/* Fixed 3D canvas behind everything */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
      }}>
        <ComputersCanvas />
      </div>

      {/* Scrollable content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Hero section */}
        <section style={{ height: "100vh", pointerEvents: "none" }}>
          <div style={{ padding: "120px 40px" }}>
            <h1 style={{
              color: "white",
              fontSize: "3rem",
              fontWeight: "bold",
              margin: 0,
            }}>
              Hi, I'm <span style={{ color: "#915EFF" }}>Mario</span>
            </h1>
            <p style={{
              color: "#aaa6c3",
              fontSize: "1.2rem",
              marginTop: "8px",
            }}>
              Full Stack Developer
            </p>
          </div>
        </section>

        {/* Spacer for 3D zoom animation */}
        <section style={{ height: "200vh" }} />

        {/* Reveal zone - extra scroll to fade in the portfolio */}
        <section style={{ height: "200vh" }} />
      </div>

      {/* Actual portfolio page - fades in over the 3D scene */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 10,
        opacity: revealOpacity,
        pointerEvents: revealOpacity > 0.5 ? "auto" : "none",
        transition: "opacity 0.1s ease",
      }}>
        <PortfolioPage />
      </div>
    </div>
  );
}

function PortfolioPage() {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#0a0a0a",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
        Welcome to my <span style={{ color: "#915EFF" }}>Portfolio</span>
      </h1>
      <p style={{ color: "#aaa6c3", fontSize: "1.2rem", marginTop: "12px" }}>
        This is where the actual site will go
      </p>
    </div>
  );
}

export default App;
