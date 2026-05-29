import React from "react";
import { wallpapers } from "../configs";
import type { MacActions } from "../types";
import moment from "moment";
import { useStore } from "../stores";
import { usePortfolio } from "../context/PortfolioContext";

const shadow = "0 2px 12px rgba(0,0,0,0.8)";

export default function Login(props: MacActions) {
  const { profile } = usePortfolio();
  const dark = useStore((state) => state.dark);
  const [time, setTime] = useState(moment().format("h:mm"));
  const [date, setDate] = useState(moment().format("ddd D MMM"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("h:mm"));
      setDate(moment().format("ddd D MMM"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="size-full flex flex-col items-center text-center select-none cursor-default py-12"
      style={{
        background: `url(${dark ? wallpapers.night : wallpapers.day}) center/cover no-repeat`,
      }}
      onClick={() => props.setLogin(true)}
    >
      {/* Date + Time */}
      <div className="flex flex-col items-center pointer-events-none">
        <div
          className="text-white font-light tracking-widest"
          style={{ fontSize: "17px", letterSpacing: "0.1em", textShadow: shadow }}
        >
          {date}
        </div>
        <div
          className="text-white leading-none mt-1"
          style={{
            fontSize: "clamp(90px, 20vw, 180px)",
            fontWeight: 200,
            textShadow: shadow,
          }}
        >
          {time}
        </div>
      </div>

      {/* Spacer — pushes profile down to ~75% */}
      <div className="flex-[3]" />

      {/* Profile */}
      <div className="flex flex-col items-center gap-3 pointer-events-none">
        <img
          className="rounded-full object-cover"
          style={{
            width: "80px",
            height: "80px",
            border: "2.5px solid rgba(255,255,255,0.45)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
          }}
          src={profile?.avatar ?? "/img/ui/profile.jpg"}
          alt="avatar"
          draggable={false}
        />
        <div className="text-white font-semibold text-xl" style={{ textShadow: shadow }}>
          {profile?.name ?? "Marios Eleftheriou"}
        </div>
        <div className="text-white/80 text-sm font-light" style={{ textShadow: shadow }}>
          Click anywhere to login
        </div>
      </div>

      <div className="flex-1" />

      {/* System buttons */}
      <div
        className="flex items-center gap-16 text-white/75 text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {[
          { label: "Sleep", icon: "i-gg:sleep", action: props.sleepMac },
          { label: "Restart", icon: "i-ri:restart-line", action: props.restartMac },
          { label: "Shut Down", icon: "i-ri:shut-down-line", action: props.shutMac },
        ].map(({ label, icon, action }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-1.5 hover:text-white transition-colors"
            onClick={(e) => action(e)}
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}
            >
              <span className={`${icon} text-xl`} />
            </div>
            <span style={{ textShadow: shadow }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
