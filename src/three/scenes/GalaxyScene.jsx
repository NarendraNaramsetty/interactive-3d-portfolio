import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';

const SkillNode = ({ position, name, category }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  // Color categories matching the skill categories
  const colors = {
    language: '#6366F1',   // Indigo
    frontend: '#38BDF8',   // Light Blue
    backend: '#10B981',    // Emerald Green
    database: '#F59E0B',   // Amber
    ai: '#A855F7',         // Purple
    tool: '#94A3B8',       // Slate
  };

  const nodeColor = colors[category] || '#ffffff';

  return (
    <group position={position}>
      {/* Small Glowing Sphere Core */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={hovered ? '#ffffff' : nodeColor} />
      </mesh>
      
      {/* Outer Halo ring (pulses on hover) */}
      <mesh scale={hovered ? 1.6 : 1}>
        <torusGeometry args={[0.12, 0.012, 8, 24]} />
        <meshBasicMaterial 
          color={nodeColor} 
          transparent 
          opacity={hovered ? 0.8 : 0.3} 
        />
      </mesh>

      {/* 3D HTML Label */}
      <Html
        distanceFactor={6}
        center
        className="pointer-events-none select-none"
      >
        <div
          className={`px-2 py-0.5 rounded border text-[10px] font-outfit whitespace-nowrap transition-all duration-300 ${
            hovered
              ? 'bg-white text-black border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
              : 'bg-obsidian-950/80 text-neutral-300 border-white/5 backdrop-blur-sm'
          }`}
          style={{
            borderColor: hovered ? '#ffffff' : `${nodeColor}33`,
            boxShadow: hovered ? '0 0 15px rgba(255,255,255,0.4)' : `0 0 10px ${nodeColor}11`,
          }}
        >
          {name}
        </div>
      </Html>
    </group>
  );
};

export const GalaxyScene = () => {
  const groupRef = useRef();
  const starsRef = useRef();

  // List of technical skills
  const skills = [
    // Languages
    { name: 'Python', category: 'language' },
    { name: 'JavaScript', category: 'language' },
    { name: 'C Lang', category: 'language' },
    { name: 'HTML / CSS', category: 'language' },
    
    // Frontend
    { name: 'React 19', category: 'frontend' },
    { name: 'Tailwind CSS', category: 'frontend' },
    { name: 'Three.js', category: 'frontend' },
    { name: 'React Three Fiber', category: 'frontend' },
    
    // Backend & DB
    { name: 'Django', category: 'backend' },
    { name: 'Django REST API', category: 'backend' },
    { name: 'PostgreSQL', category: 'database' },
    { name: 'Neon Serverless', category: 'database' },
    { name: 'MySQL', category: 'database' },
    { name: 'MongoDB', category: 'database' },
    
    // AI / ML
    { name: 'Machine Learning', category: 'ai' },
    { name: 'Natural Language Processing', category: 'ai' },
    { name: 'Sentence Transformers', category: 'ai' },
    { name: 'Whisper STT', category: 'ai' },
    { name: 'Qdrant Vector DB', category: 'ai' },
    
    // Tools
    { name: 'Git & GitHub', category: 'tool' },
    { name: 'VS Code', category: 'tool' },
    { name: 'Postman', category: 'tool' },
    { name: 'Docker', category: 'tool' },
    { name: 'Netlify / Render', category: 'tool' }
  ];

  // Distribute nodes evenly on a sphere using Fibonacci spiral algorithm
  const nodes = useMemo(() => {
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    const radius = 2.4;
    return skills.map((skill, index) => {
      const y = 1 - (index / (skills.length - 1)) * 2; // y runs from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at coordinate y
      const theta = phi * index; // golden angle rotation
      
      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;
      
      return {
        position: [x, y * radius, z],
        ...skill
      };
    });
  }, []);

  // Generate 800 background points for nebula galaxy effect
  const starsCount = 800;
  const starsPositions = useMemo(() => {
    const arr = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      // Spiral distribution
      const r = Math.pow(Math.random(), 1.5) * 4.5;
      const theta = r * 2.5 + Math.random() * 0.5; // spiral arm angle
      const arm = Math.random() > 0.5 ? 0 : Math.PI; // two arms
      
      arr[i * 3] = Math.cos(theta + arm) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.4; // thin disc
      arr[i * 3 + 2] = Math.sin(theta + arm) * r;
    }
    return arr;
  }, []);

  const scrollPercent = usePortfolioStore((state) => state.scrollPercent);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scrollFactor = scrollPercent * 0.04;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06 + scrollFactor * 0.8;
      groupRef.current.rotation.x = scrollFactor * 0.12; // Dynamic 3D tilt
    }
    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.04 + scrollFactor * 1.2;
      starsRef.current.rotation.x = scrollFactor * 0.08;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#A855F7" distance={6} />
      
      {/* Central rotating skill nodes */}
      <group ref={groupRef}>
        {nodes.map((node, index) => (
          <SkillNode
            key={index}
            position={node.position}
            name={node.name}
            category={node.category}
          />
        ))}
      </group>

      {/* Background Star Disk */}
      <Points ref={starsRef} positions={starsPositions} stride={3}>
        <PointMaterial
          transparent
          color="#A855F7"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};
export default GalaxyScene;
