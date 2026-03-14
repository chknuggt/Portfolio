import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <span style={{
        fontSize: 14,
        color: "#f1f1f1",
        fontWeight: 800,
      }}>
        {progress.toFixed(0)}%
      </span>
    </Html>
  );
};

export default CanvasLoader;
