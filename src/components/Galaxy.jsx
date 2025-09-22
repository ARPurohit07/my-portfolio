import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// This is the component that does the actual rendering and animation
function GalaxyPoints() {
  const pointsRef = useRef();

  // The useFrame hook runs on every single frame, perfect for animation
  useFrame((state, delta) => {
    pointsRef.current.rotation.y += delta * 0.05;
  });

  // We use useMemo to calculate the star positions only once
  const [positions, colors] = useMemo(() => {
    const totalStars = 50000;
    const positions = new Float32Array(totalStars * 3);
    const colors = new Float32Array(totalStars * 3);
    const bulgeCount = 15000;
    const bulgeRadius = 1.5;
    const bulgeColor = new THREE.Color("#FFDDBB");
    const armColorInside = new THREE.Color("#ff6030");
    const armColorOutside = new THREE.Color("#1b3984");
    const armRadius = 6.0;
    const branches = 5;
    const spin = 1.2;
    for (let i = 0; i < totalStars; i++) {
      /* ... (star generation logic is the same) ... */ const i3 = i * 3;
      if (i < bulgeCount) {
        const r = Math.random() * bulgeRadius;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[i3] =
          r * Math.sin(phi) * Math.cos(theta) * (Math.random() * 0.5 + 0.5);
        positions[i3 + 1] = r * Math.cos(phi) * 0.3;
        positions[i3 + 2] =
          r * Math.sin(phi) * Math.sin(theta) * (Math.random() * 0.5 + 0.5);
        colors[i3] = bulgeColor.r;
        colors[i3 + 1] = bulgeColor.g;
        colors[i3 + 2] = bulgeColor.b;
      } else {
        const r = Math.random() * armRadius;
        const spinAngle = r * spin;
        const branchAngle = ((i % branches) / branches) * Math.PI * 2;
        const randomX =
          Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * r;
        const randomY =
          Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.1 * r;
        const randomZ =
          Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * r;
        positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;
        const mixedColor = armColorInside.clone();
        mixedColor.lerp(armColorOutside, r / armRadius);
        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }
    }

    return [positions, colors];
  }, []);

  return (
    <points ref={pointsRef} rotation={[-Math.PI / 5, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
}

const Galaxy = () => {
  return (
    <div className="galaxy-canvas">
      <Canvas
        camera={{ position: [0, 5, 6], fov: 75 }}
        dpr={[1, 2]} /* This caps the pixel ratio for performance */
      >
        <GalaxyPoints />
      </Canvas>
    </div>
  );
};

export default React.memo(Galaxy);
