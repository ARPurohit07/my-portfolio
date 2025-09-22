import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const StarfieldBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: currentMount,
      alpha: true,
    });

    // --- OPTIMIZATIONS ---
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance

    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- Background Starfield Generation ---
    const starfieldGeometry = new THREE.BufferGeometry();
    const starfieldCount = 3000; // REDUCED from 5000
    const starfieldPositions = new Float32Array(starfieldCount * 3);
    for (let i = 0; i < starfieldCount; i++) {
      starfieldPositions[i * 3 + 0] = (Math.random() - 0.5) * 200;
      starfieldPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starfieldPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    starfieldGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starfieldPositions, 3)
    );
    const starfieldMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: "#aaaaaa",
    });
    const starfield = new THREE.Points(starfieldGeometry, starfieldMaterial);
    scene.add(starfield);

    let animationFrameId;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      starfield.rotation.y = elapsedTime * 0.01;
      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);
      starfieldGeometry.dispose();
      starfieldMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={mountRef} className="starfield-canvas"></canvas>;
};

// --- OPTIMIZATION ---
export default React.memo(StarfieldBackground);
