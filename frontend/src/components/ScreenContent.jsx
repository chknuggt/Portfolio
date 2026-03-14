const ScreenContent = () => {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Tab bar */}
      <div style={{
        display: "flex",
        gap: "0",
        background: "#252526",
        padding: "0",
        marginBottom: "8px",
      }}>
        <div style={{
          padding: "6px 16px",
          background: "#1e1e1e",
          color: "#fff",
          fontSize: "12px",
          borderTop: "2px solid #007acc",
        }}>
          portfolio.js
        </div>
        <div style={{
          padding: "6px 16px",
          background: "#2d2d2d",
          color: "#888",
          fontSize: "12px",
        }}>
          about.js
        </div>
      </div>

      {/* Code content */}
      <div style={{ flex: 1, lineHeight: "1.6" }}>
        <Line num={1} text={<><Keyword>const</Keyword> <Var>developer</Var> = {'{'}</>} />
        <Line num={2} text={<>  <Prop>name</Prop>: <Str>"Mario"</Str>,</>} />
        <Line num={3} text={<>  <Prop>role</Prop>: <Str>"Full Stack Developer"</Str>,</>} />
        <Line num={4} text={<>  <Prop>skills</Prop>: [<Str>"React"</Str>, <Str>"Node.js"</Str>, <Str>"PHP"</Str>, <Str>"Docker"</Str>],</>} />
        <Line num={5} text={<>  <Prop>passion</Prop>: <Str>"Building great experiences"</Str>,</>} />
        <Line num={6} text={<>{'};'}</>} />
        <Line num={7} text="" />
        <Line num={8} text={<><Keyword>const</Keyword> <Func>createAwesome</Func> = () ={'>'} {'{'}</>} />
        <Line num={9} text={<>  <Keyword>return</Keyword> developer.<Func>skills</Func>.<Func>map</Func>(s ={'>'} <Func>build</Func>(s));</>} />
        <Line num={10} text={<>{'};'}</>} />
        <Line num={11} text="" />
        <Line num={12} text={<><Func>createAwesome</Func>();</>} />
      </div>

      {/* Terminal */}
      <div style={{
        borderTop: "1px solid #333",
        padding: "8px 0",
        marginTop: "auto",
        fontSize: "12px",
      }}>
        <span style={{ color: "#4ec9b0" }}>~/portfolio</span>
        <span style={{ color: "#888" }}> $ </span>
        <span style={{ color: "#ce9178" }}>npm run dev</span>
        <span style={{
          display: "inline-block",
          width: "7px",
          height: "14px",
          background: "#d4d4d4",
          marginLeft: "2px",
          animation: "blink 1s step-end infinite",
        }} />
      </div>
    </div>
  );
};

const Line = ({ num, text }) => (
  <div style={{ display: "flex" }}>
    <span style={{ color: "#858585", width: "30px", textAlign: "right", marginRight: "16px", userSelect: "none" }}>
      {num}
    </span>
    <span>{text}</span>
  </div>
);

const Keyword = ({ children }) => <span style={{ color: "#569cd6" }}>{children}</span>;
const Var = ({ children }) => <span style={{ color: "#9cdcfe" }}>{children}</span>;
const Prop = ({ children }) => <span style={{ color: "#9cdcfe" }}>{children}</span>;
const Str = ({ children }) => <span style={{ color: "#ce9178" }}>{children}</span>;
const Func = ({ children }) => <span style={{ color: "#dcdcaa" }}>{children}</span>;

export default ScreenContent;
