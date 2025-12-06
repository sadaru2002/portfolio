'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

interface RobotModelProps {
    mousePosition: { x: number; y: number };
    isHovering: boolean;
}

function RobotModel({ mousePosition, isHovering }: RobotModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const gltf = useLoader(GLTFLoader, '/futuristic_flying_animated_robot_-_low_poly.glb');
    const mixerRef = useRef<THREE.AnimationMixer | null>(null);

    useEffect(() => {
        if (gltf.animations.length > 0) {
            mixerRef.current = new THREE.AnimationMixer(gltf.scene);
            const action = mixerRef.current.clipAction(gltf.animations[0]);
            action.play();
        }
        return () => { mixerRef.current?.stopAllAction(); };
    }, [gltf]);

    useFrame((state, delta) => {
        mixerRef.current?.update(delta);

        if (groupRef.current) {
            const targetY = isHovering ? 0 : mousePosition.x * 1.2;
            const targetX = isHovering ? 0 : -mousePosition.y * 0.5;
            const targetZ = isHovering ? 0 : -mousePosition.x * 0.15;

            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.12);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                THREE.MathUtils.clamp(targetX, -0.4, 0.4),
                0.12
            );
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZ, 0.08);
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <primitive object={gltf.scene} scale={2.2} position={[0, 0, 0]} />
        </group>
    );
}

export default function Robot3D() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [showMessages, setShowMessages] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -((e.clientY / window.innerHeight) * 2 - 1);
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Start showing messages after page has loaded (wait 3 seconds)
        const timer = setTimeout(() => setShowMessages(true), 3000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div
            className="fixed -bottom-35 right-0 z-50"
            style={{ width: '200px', height: '300px' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Messages - only render when showMessages is true */}
            {showMessages && (
                <>
                    {/* Message 1 - shows 0-3s */}
                    <div className="robot-msg robot-msg-1">
                        Hey friend! I&apos;m Robot 👋
                    </div>

                    {/* Message 2 - shows 3.5-6.5s */}
                    <div className="robot-msg robot-msg-2">
                        Scroll down to know more 🚀
                    </div>
                </>
            )}

            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent', pointerEvents: 'auto' }}
            >
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} color="#00F0FF" />
                <directionalLight position={[-5, -5, 5]} intensity={0.8} color="#FF00FF" />
                <pointLight position={[0, 2, 3]} intensity={1.2} color="#00FFFF" />

                <Suspense fallback={null}>
                    <RobotModel mousePosition={mousePosition} isHovering={isHovering} />
                </Suspense>
            </Canvas>

            <style jsx global>{`
                .robot-msg {
                    position: absolute;
                    bottom: 290px;
                    right: 10px;
                    padding: 12px 16px;
                    background: linear-gradient(135deg, rgba(0, 20, 40, 0.95) 0%, rgba(0, 10, 30, 0.98) 100%);
                    border: 1px solid rgba(0, 240, 255, 0.5);
                    border-radius: 16px 16px 4px 16px;
                    box-shadow: 0 4px 20px rgba(0, 240, 255, 0.2);
                    max-width: 220px;
                    color: #fff;
                    font-size: 14px;
                    font-family: system-ui, sans-serif;
                    line-height: 1.4;
                    opacity: 0;
                    pointer-events: none;
                    z-index: 100;
                }

                .robot-msg-1 {
                    animation: showMsg 6s ease-out forwards;
                }

                .robot-msg-2 {
                    animation: showMsg 6s ease-out 7s forwards;
                }

                @keyframes showMsg {
                    0% { opacity: 0; transform: scale(0.9) translateY(10px); }
                    10% { opacity: 1; transform: scale(1) translateY(0); }
                    90% { opacity: 1; transform: scale(1) translateY(0); }
                    100% { opacity: 0; transform: scale(0.9) translateY(-10px); }
                }
            `}</style>
        </div>
    );
}
