import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function StarfieldPoints() {
    const pointsRef = useRef();

    useFrame((state, delta) => {
        pointsRef.current.rotation.y += delta * 0.01;
    });

    const positions = useMemo(() => {
        const count = 3000;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
        }
        return positions;
    }, []);

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.1} color="#aaaaaa" />
        </points>
    );
}

const StarfieldBackground = () => {
    return (
        <div className="starfield-canvas">
            <Canvas camera={{ fov: 75 }} dpr={[1, 2]}>
                <StarfieldPoints />
            </Canvas>
        </div>
    );
};

export default React.memo(StarfieldBackground);