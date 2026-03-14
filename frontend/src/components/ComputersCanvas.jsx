import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "./CanvasLoader";

// Stage 1: 0% - 80% scroll (wide shot to monitor)
const CAMERA_START = new THREE.Vector3(20, 0, 5.5);
const CAMERA_MID = new THREE.Vector3(1.5, -1.7, 8.3);
const LOOK_START = new THREE.Vector3(0, 0, 5.5);
const LOOK_MID = new THREE.Vector3(0, -1.7, 8.3);

// Stage 2: 80% - 100% scroll (quick zoom into screen)
const CAMERA_END = new THREE.Vector3(-8, -1.7, 8.3);
const LOOK_END = new THREE.Vector3(-10, -1.7, 8.3);

const STAGE_BREAK = 0.8;

const ScrollZoomCamera = () => {
  const { camera } = useThree();
  const scrollProgress = useRef(0);
  const targetProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollZonePx = 3 * window.innerHeight;
      const raw = scrollZonePx > 0 ? window.scrollY / scrollZonePx : 0;
      targetProgress.current = Math.min(raw, 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    scrollProgress.current += (targetProgress.current - scrollProgress.current) * 0.05;
    const t = scrollProgress.current;

    if (t <= STAGE_BREAK) {
      const stageT = t / STAGE_BREAK;
      camera.position.lerpVectors(CAMERA_START, CAMERA_MID, stageT);
      const lookAt = new THREE.Vector3().lerpVectors(LOOK_START, LOOK_MID, stageT);
      camera.lookAt(lookAt);
    } else {
      const stageT = (t - STAGE_BREAK) / (1 - STAGE_BREAK);
      camera.position.lerpVectors(CAMERA_MID, CAMERA_END, stageT);
      const lookAt = new THREE.Vector3().lerpVectors(LOOK_MID, LOOK_END, stageT);
      camera.lookAt(lookAt);
    }
  });

  return null;
};

const Computer = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");



  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -4.25, 5]}
        rotation={[-0.01, 0.1, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (isMobile) return null;

  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      style={{ height: "100%", width: "100%" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ScrollZoomCamera />
        <Computer isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
