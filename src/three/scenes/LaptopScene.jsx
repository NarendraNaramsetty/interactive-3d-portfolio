import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';

// Orbiting technology nodes representing the stack
const TechOrbitNode = ({ speed, radiusX, radiusZ, color, name, offset = 0 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    if (meshRef.current) {
      // Calculate elliptical orbit positions
      meshRef.current.position.x = Math.cos(t) * radiusX;
      meshRef.current.position.z = Math.sin(t) * radiusZ;
      meshRef.current.position.y = Math.sin(t * 2) * 0.4; // Wave oscillation
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Halo glow ring */}
      <mesh>
        <torusGeometry args={[0.22, 0.015, 8, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export const LaptopScene = () => {
  const laptopRef = useRef();
  const screenRef = useRef();
  const scrollPercent = usePortfolioStore((state) => state.scrollPercent);

  // Slow rotation for visual engagement
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(t * 0.1) * 0.25 + scrollPercent * 0.012;
      laptopRef.current.rotation.x = scrollPercent * 0.005; // dynamic tilt
      laptopRef.current.position.y = Math.sin(t * 0.5) * 0.1; // Gentle hover floating
    }
  });

  const techStack = [
    { name: 'React', color: '#61DAFB', radiusX: 3.2, radiusZ: 2.2, speed: 0.4, offset: 0 },
    { name: 'Django', color: '#092E20', radiusX: 3.6, radiusZ: 2.5, speed: 0.35, offset: Math.PI / 3 },
    { name: 'Qdrant', color: '#FF4154', radiusX: 2.8, radiusZ: 2.0, speed: 0.5, offset: (2 * Math.PI) / 3 },
    { name: 'Whisper', color: '#10B981', radiusX: 3.0, radiusZ: 2.4, speed: 0.45, offset: Math.PI },
    { name: 'PostgreSQL', color: '#336791', radiusX: 3.4, radiusZ: 2.1, speed: 0.3, offset: (4 * Math.PI) / 3 },
  ];

  return (
    <group position={[0, -0.4, 0]}>
      {/* Environmental lights inside portal */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#6366F1" />
      <directionalLight position={[-10, -5, -5]} intensity={0.6} color="#14B8A6" />
      <pointLight position={[0, 1, 0]} intensity={1.0} color="#6366F1" distance={5} />

      <group ref={laptopRef}>
        <Center>
          {/* LAPTOP BASE */}
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[3.2, 0.08, 2.2]} />
            <meshStandardMaterial 
              color="#09090D" 
              roughness={0.2} 
              metalness={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
          {/* LAPTOP BASE GLOW EDGE */}
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[3.22, 0.09, 2.22]} />
            <meshBasicMaterial 
              color="#6366F1" 
              wireframe={true} 
              transparent 
              opacity={0.3} 
            />
          </mesh>

          {/* KEYBOARD DEPRESSION AREA */}
          <mesh position={[0, -0.01, 0.1]}>
            <boxGeometry args={[2.8, 0.01, 1.0]} />
            <meshStandardMaterial color="#030303" roughness={0.6} />
          </mesh>

          {/* SCREEN TILT hinge group */}
          <group position={[0, 0.04, -1.05]} rotation={[-0.3, 0, 0]}>
            {/* HINGE */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.06, 0.06, 2.8, 16]} />
              <meshStandardMaterial color="#12121A" metalness={0.9} />
            </mesh>

            {/* SCREEN LID BACK */}
            <mesh position={[0, 1.1, -0.02]}>
              <boxGeometry args={[3.2, 2.2, 0.05]} />
              <meshStandardMaterial 
                color="#09090D" 
                roughness={0.2} 
                metalness={0.8} 
              />
            </mesh>

            {/* SCREEN BEZEL GLOW */}
            <mesh position={[0, 1.1, 0]}>
              <boxGeometry args={[3.22, 2.22, 0.06]} />
              <meshBasicMaterial 
                color="#14B8A6" 
                wireframe={true} 
                transparent 
                opacity={0.25} 
              />
            </mesh>

            {/* ACTIVE GLOWING DISPLAY */}
            <mesh position={[0, 1.1, 0.01]} ref={screenRef}>
              <planeGeometry args={[3.0, 2.0]} />
              <meshStandardMaterial 
                color="#04040A" 
                emissive="#6366F1"
                emissiveIntensity={0.2}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>

            {/* ABSTRACT HUD WIREFRAME GRAPHICS ON SCREEN */}
            <group position={[0, 1.1, 0.02]}>
              {/* Central AI Waveform graphics represented in screen wireframes */}
              <mesh position={[0, -0.2, 0]}>
                <ringGeometry args={[0.4, 0.5, 32]} />
                <meshBasicMaterial color="#14B8A6" transparent opacity={0.6} />
              </mesh>
              <mesh position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
                <ringGeometry args={[0.25, 0.3, 4]} />
                <meshBasicMaterial color="#6366F1" transparent opacity={0.5} />
              </mesh>
              {/* Text-like blocks */}
              <mesh position={[-0.8, 0.6, 0]}>
                <planeGeometry args={[0.8, 0.1]} />
                <meshBasicMaterial color="#6366F1" transparent opacity={0.6} />
              </mesh>
              <mesh position={[0.7, 0.6, 0]}>
                <planeGeometry args={[0.5, 0.08]} />
                <meshBasicMaterial color="#14B8A6" transparent opacity={0.7} />
              </mesh>
              <mesh position={[-0.9, 0.4, 0]}>
                <planeGeometry args={[0.6, 0.05]} />
                <meshBasicMaterial color="#888899" transparent opacity={0.4} />
              </mesh>
              <mesh position={[-1.0, 0.2, 0]}>
                <planeGeometry args={[0.4, 0.05]} />
                <meshBasicMaterial color="#888899" transparent opacity={0.4} />
              </mesh>
            </group>
          </group>
        </Center>
      </group>

      {/* Orbiting Stack Orbiting Lines */}
      <mesh rotation={[Math.PI / 2, 0, 0.1]}>
        <torusGeometry args={[3.1, 0.005, 8, 64]} />
        <meshBasicMaterial color="#1E1B4B" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.2, -0.3]}>
        <torusGeometry args={[3.4, 0.005, 8, 64]} />
        <meshBasicMaterial color="#131B30" transparent opacity={0.3} />
      </mesh>

      {/* Orbiting Stack nodes */}
      {techStack.map((tech, idx) => (
        <TechOrbitNode
          key={idx}
          speed={tech.speed}
          radiusX={tech.radiusX}
          radiusZ={tech.radiusZ}
          color={tech.color}
          name={tech.name}
          offset={tech.offset}
        />
      ))}
    </group>
  );
};
export default LaptopScene;
