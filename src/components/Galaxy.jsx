import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Galaxy = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: currentMount, alpha: true });
        
        // --- OPTIMIZATIONS ---
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance
        
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        camera.position.set(0, 5, 6);
        camera.lookAt(scene.position);

        // --- Main Spiral Galaxy Generation ---
        const totalStars = 50000; // REDUCED from 80000
        const galaxyGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(totalStars * 3);
        const colors = new Float32Array(totalStars * 3);
        const bulgeCount = 15000; // REDUCED from 25000
        const bulgeRadius = 1.5;
        const bulgeColor = new THREE.Color("#FFDDBB");
        const armColorInside = new THREE.Color("#ff6030");
        const armColorOutside = new THREE.Color("#1b3984");
        const armRadius = 6.0;
        const branches = 5;
        const spin = 1.2;

        for (let i = 0; i < totalStars; i++) {
            const i3 = i * 3;
            if (i < bulgeCount) {
                const r = Math.random() * bulgeRadius;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                positions[i3] = r * Math.sin(phi) * Math.cos(theta) * (Math.random() * 0.5 + 0.5);
                positions[i3 + 1] = r * Math.cos(phi) * 0.3;
                positions[i3 + 2] = r * Math.sin(phi) * Math.sin(theta) * (Math.random() * 0.5 + 0.5);
                colors[i3] = bulgeColor.r;
                colors[i3 + 1] = bulgeColor.g;
                colors[i3 + 2] = bulgeColor.b;
            } else {
                const r = Math.random() * armRadius;
                const spinAngle = r * spin;
                const branchAngle = ((i % branches) / branches) * Math.PI * 2;
                const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * r;
                const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.1 * r;
                const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * r;
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
        galaxyGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        galaxyGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        const galaxyMaterial = new THREE.PointsMaterial({ size: 0.022, sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true });
        const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
        galaxy.rotation.x = -Math.PI / 5;
        scene.add(galaxy);

        let animationFrameId;
        const clock = new THREE.Clock();
        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            galaxy.rotation.y = elapsedTime * 0.05;
            renderer.render(scene, camera);
            animationFrameId = window.requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.cancelAnimationFrame(animationFrameId);
            galaxyGeometry.dispose();
            galaxyMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return <canvas ref={mountRef} className="galaxy-canvas"></canvas>;
};

// --- OPTIMIZATION ---
export default React.memo(Galaxy);