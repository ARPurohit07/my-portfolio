import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const StarfieldBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- Core Three.js Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: currentMount,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);

    // --- Starfield Generation ---
    const starfieldGeometry = new THREE.BufferGeometry();
    const starfieldCount = 3000;
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

    // --- Animation Loop ---
    let animationFrameId;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      starfield.rotation.y = elapsedTime * 0.01;
      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };
    animate();

    // --- THE ROBUST RESIZE FIX ---
    const handleResize = () => {
      // Update camera
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Force an immediate re-render after resizing
      renderer.render(scene, camera);
    };
    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      starfieldGeometry.dispose();
      starfieldMaterial.dispose();
    };
  }, []);

  return <canvas ref={mountRef} className="starfield-canvas"></canvas>;
};

export default React.memo(StarfieldBackground);
