import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// ====================================================
// PROCEDURAL TECH LOGO COMPONENTS (NEUTRAL PLATINUM/SILVER)
// ====================================================

const ReactLogo = () => (
  <group scale={0.16}>
    <mesh>
      <torusGeometry args={[0.8, 0.04, 8, 48]} />
      <meshBasicMaterial color="#A1A1AA" />
    </mesh>
    <mesh rotation={[0, Math.PI / 3, 0]}>
      <torusGeometry args={[0.8, 0.04, 8, 48]} />
      <meshBasicMaterial color="#A1A1AA" />
    </mesh>
    <mesh rotation={[0, -Math.PI / 3, 0]}>
      <torusGeometry args={[0.8, 0.04, 8, 48]} />
      <meshBasicMaterial color="#A1A1AA" />
    </mesh>
    <mesh>
      <sphereGeometry args={[0.14, 16, 16]} />
      <meshBasicMaterial color="#A1A1AA" />
    </mesh>
  </group>
);

const PythonLogo = () => (
  <group scale={0.14}>
    <mesh position={[0, 0.12, 0]}>
      <boxGeometry args={[0.26, 0.26, 0.12]} />
      <meshStandardMaterial color="#D4D4D8" roughness={0.25} metalness={0.8} />
    </mesh>
    <mesh position={[0, -0.12, 0]}>
      <boxGeometry args={[0.26, 0.26, 0.12]} />
      <meshStandardMaterial color="#A1A1AA" roughness={0.25} metalness={0.8} />
    </mesh>
    <mesh position={[-0.12, 0.12, 0]}>
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshBasicMaterial color="#D4D4D8" />
      </mesh>
      <mesh position={[0.12, -0.12, 0]}>
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshBasicMaterial color="#A1A1AA" />
    </mesh>
  </group>
);

const DjangoLogo = () => (
  <group scale={0.16}>
    <mesh>
      <boxGeometry args={[0.3, 0.35, 0.1]} />
      <meshStandardMaterial color="#D4D4D8" roughness={0.2} metalness={0.85} />
    </mesh>
    <mesh position={[0.08, 0, 0.06]}>
      <boxGeometry args={[0.08, 0.24, 0.04]} />
      <meshBasicMaterial color="#FFFFFF" />
    </mesh>
  </group>
);

const DBLogo = () => (
  <group scale={0.14}>
    <mesh position={[0, 0.3, 0]}>
      <cylinderGeometry args={[0.3, 0.3, 0.18, 32]} />
      <meshStandardMaterial color="#D4D4D8" roughness={0.3} metalness={0.2} />
    </mesh>
    <mesh position={[0, 0, 0]}>
      <cylinderGeometry args={[0.3, 0.3, 0.18, 32]} />
      <meshStandardMaterial color="#D4D4D8" roughness={0.3} metalness={0.2} />
    </mesh>
    <mesh position={[0, -0.3, 0]}>
      <cylinderGeometry args={[0.3, 0.3, 0.18, 32]} />
      <meshStandardMaterial color="#D4D4D8" roughness={0.3} metalness={0.2} />
    </mesh>
  </group>
);

const CloudLogo = () => (
  <group scale={0.16}>
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.28, 16, 16]} />
      <meshStandardMaterial color="#A1A1AA" roughness={0.35} />
    </mesh>
    <mesh position={[-0.22, -0.06, 0]}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="#A1A1AA" roughness={0.35} />
    </mesh>
    <mesh position={[0.22, -0.06, 0]}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="#A1A1AA" roughness={0.35} />
    </mesh>
    <mesh position={[0, -0.12, 0]}>
      <boxGeometry args={[0.5, 0.14, 0.2]} />
      <meshStandardMaterial color="#A1A1AA" roughness={0.35} />
    </mesh>
  </group>
);

const GitLogo = () => (
  <group scale={0.15}>
    <mesh position={[-0.12, 0, 0]}>
      <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
      <meshBasicMaterial color="#D4D4D8" />
    </mesh>
    <mesh position={[0.08, 0.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
      <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
      <meshBasicMaterial color="#D4D4D8" />
    </mesh>
    <mesh position={[-0.12, -0.3, 0]}>
      <sphereGeometry args={[0.07, 12, 12]} />
      <meshBasicMaterial color="#D4D4D8" />
    </mesh>
    <mesh position={[-0.12, 0.3, 0]}>
      <sphereGeometry args={[0.07, 12, 12]} />
      <meshBasicMaterial color="#D4D4D8" />
    </mesh>
    <mesh position={[0.2, 0.22, 0]}>
      <sphereGeometry args={[0.07, 12, 12]} />
      <meshBasicMaterial color="#D4D4D8" />
    </mesh>
  </group>
);

const AIChipLogo = () => (
  <group scale={0.16}>
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.06]} />
      <meshStandardMaterial color="#D4D4D8" roughness={0.25} metalness={0.7} />
    </mesh>
    {[-0.2, 0, 0.2].map((pos, idx) => (
      <group key={idx}>
        <mesh position={[pos, 0.3, 0]}>
          <boxGeometry args={[0.03, 0.1, 0.015]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[pos, -0.3, 0]}>
          <boxGeometry args={[0.03, 0.1, 0.015]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[-0.3, pos, 0]}>
          <boxGeometry args={[0.1, 0.03, 0.015]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0.3, pos, 0]}>
          <boxGeometry args={[0.1, 0.03, 0.015]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>
    ))}
  </group>
);

const APINodeLogo = () => (
  <group scale={0.15}>
    <mesh>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color="#A1A1AA" roughness={0.15} />
    </mesh>
    {[0, 1, 2].map((idx) => {
      const angle = (idx * Math.PI * 2) / 3;
      const x = Math.cos(angle) * 0.32;
      const y = Math.sin(angle) * 0.32;
      return (
        <group key={idx}>
          <mesh position={[x / 2, y / 2, 0]} rotation={[0, 0, angle]}>
            <cylinderGeometry args={[0.015, 0.015, 0.32, 8]} />
            <meshBasicMaterial color="#D4D4D8" />
          </mesh>
          <mesh position={[x, y, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color="#D4D4D8" />
          </mesh>
        </group>
      );
    })}
  </group>
);

// Orbit Wrapper Component
const OrbitingIcon = ({ children, radius, speed, yOffset, spinSpeed, index, globalSpeed }) => {
  const ref = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed * globalSpeed + (index * Math.PI * 2) / 8;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = yOffset + Math.sin(t * 1.5) * 0.08;
      
      ref.current.rotation.x = state.clock.getElapsedTime() * spinSpeed * 0.4;
      ref.current.rotation.y = state.clock.getElapsedTime() * spinSpeed;
    }
  });

  return <group ref={ref}>{children}</group>;
};

// ====================================================
// MAIN SCENE COMPONENT
// ====================================================

export const Avatar3DScene = () => {
  const containerRef = useRef();
  const groupRef = useRef();
  const cursorLightRef = useRef();
  
  // Animation refs for layers
  const glassPlateRef = useRef();
  const frostedRingRef = useRef();
  const energyRingRef = useRef();
  const whiteRingRef = useRef();
  const scannerRef = useRef();
  const particlesRef = useRef();
  
  // Background depth refs
  const gridRef = useRef();
  const bgSphere1Ref = useRef();
  const bgSphere2Ref = useRef();

  const [hovered, setHovered] = useState(false);

  // Pre-generate dynamic particles around the boundary
  const { particlePositions, particleData } = useMemo(() => {
    const count = 30;
    const pos = new Float32Array(count * 3);
    const data = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.25 + Math.random() * 0.8;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (Math.random() - 0.5) * 1.2;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      data.push({
        angle,
        radius,
        speed: 0.12 + Math.random() * 0.22,
        yOffset: y,
        zOffset: z,
        phase: Math.random() * Math.PI * 2
      });
    }
    return { particlePositions: pos, particleData: data };
  }, []);

  // Frame animation loop
  useFrame((state) => {
    const { x, y } = state.pointer;
    const t = state.clock.getElapsedTime();

    // Lerp parent container rotation based on mouse (Tilt effect)
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.38, 0.08);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.38, 0.08);
      
      // Hover translation lift and scale
      const targetZ = hovered ? 0.35 : 0.0;
      const targetScale = hovered ? 1.06 : 1.0;
      
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.08);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08));
    }

    // Specular Highlight point light follows cursor (crystal white reflections)
    if (cursorLightRef.current) {
      cursorLightRef.current.position.x = THREE.MathUtils.lerp(cursorLightRef.current.position.x, x * 2.2, 0.1);
      cursorLightRef.current.position.y = THREE.MathUtils.lerp(cursorLightRef.current.position.y, y * 2.2 + 0.1, 0.1);
      cursorLightRef.current.intensity = THREE.MathUtils.lerp(cursorLightRef.current.intensity, hovered ? 2.6 : 1.8, 0.08);
    }

    // --- ANIME LAYER ACTIONS ---
    // Layer 1 & 2: Glass lens and frosted torus slight float / rotate offset
    if (glassPlateRef.current) {
      glassPlateRef.current.rotation.z = Math.sin(t * 0.4) * 0.08;
    }
    if (frostedRingRef.current) {
      frostedRingRef.current.rotation.y = -t * (hovered ? 0.45 : 0.18);
      frostedRingRef.current.rotation.z = Math.cos(t * 0.5) * 0.12;
    }

    // Layer 3: Energy ring breathing scale pulsation
    if (energyRingRef.current) {
      energyRingRef.current.rotation.z = t * (hovered ? 0.8 : 0.25);
      const breath = 1.0 + Math.sin(t * 2.2) * 0.035;
      energyRingRef.current.scale.setScalar(breath);
    }

    // Layer 4: Thin white glow ring multi-axis rotation
    if (whiteRingRef.current) {
      whiteRingRef.current.rotation.y = t * 0.12;
      whiteRingRef.current.rotation.x = -t * 0.06;
    }

    // Layer 5: Scanning hologram sweep (loops periodically)
    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(t * 1.4) * 1.25;
      const scanGlow = Math.max(0, Math.sin(t * 0.4)) * 0.65;
      scannerRef.current.material.opacity = scanGlow;
    }

    // Update Sparkle particles positioning
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      const speedMult = hovered ? 2.4 : 1.0;
      for (let i = 0; i < particleData.length; i++) {
        const p = particleData[i];
        p.angle += state.delta * p.speed * speedMult;
        const radiusOsc = p.radius + Math.sin(t * 1.8 + p.phase) * 0.06;
        
        positions[i * 3] = Math.cos(p.angle) * radiusOsc;
        positions[i * 3 + 1] = Math.sin(p.angle) * radiusOsc + Math.cos(t * 0.7 + p.phase) * 0.05;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Background mesh drift & spheres float
    if (gridRef.current) {
      gridRef.current.rotation.z = t * 0.015;
      gridRef.current.scale.setScalar(1.0 + Math.sin(t * 0.3) * 0.02);
    }
    if (bgSphere1Ref.current) {
      bgSphere1Ref.current.position.y = 0.8 + Math.sin(t * 0.5) * 0.15;
      bgSphere1Ref.current.position.x = -1.35 + Math.cos(t * 0.4) * 0.08;
    }
    if (bgSphere2Ref.current) {
      bgSphere2Ref.current.position.y = -0.7 + Math.cos(t * 0.6) * 0.12;
      bgSphere2Ref.current.position.x = 1.35 + Math.sin(t * 0.5) * 0.1;
    }
  });

  const orbitItems = [
    { component: <ReactLogo />, radius: 2.5, speed: 0.15, yOffset: 0.15, spinSpeed: 0.4 },
    { component: <PythonLogo />, radius: 2.2, speed: -0.18, yOffset: -0.35, spinSpeed: 0.3 },
    { component: <DjangoLogo />, radius: 2.7, speed: 0.12, yOffset: 0.45, spinSpeed: 0.5 },
    { component: <AIChipLogo />, radius: 2.3, speed: -0.14, yOffset: 0.2, spinSpeed: 0.25 },
    { component: <DBLogo />, radius: 2.6, speed: 0.16, yOffset: -0.5, spinSpeed: 0.45 },
    { component: <GitLogo />, radius: 2.4, speed: -0.15, yOffset: -0.2, spinSpeed: 0.3 },
    { component: <APINodeLogo />, radius: 2.5, speed: 0.13, yOffset: -0.1, spinSpeed: 0.35 },
    { component: <CloudLogo />, radius: 2.2, speed: -0.16, yOffset: 0.3, spinSpeed: 0.2 }
  ];

  return (
    <group position={[0, 0.1, 0]} ref={containerRef}>
      {/* Dynamic Lighting Setup (Pristine studio highlights) */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[8, 8, 8]} intensity={1.8} color="#FFFFFF" />
      <directionalLight position={[-8, 4, -8]} intensity={0.4} color="#E4E4E7" />
      <pointLight position={[0, 0, 2.5]} intensity={0.8} color="#FFFFFF" />
      
      {/* Specular Highlight Spot / Mouse Tracking Point Light */}
      <pointLight ref={cursorLightRef} position={[0, 0, 1.8]} intensity={1.8} color="#FFFFFF" distance={4.5} decay={1.4} />

      {/* ==================================================== */}
      {/* BACKGROUND DEPTH LAYERS */}
      {/* ==================================================== */}
      <group>
        {/* Soft Blurred Ambient Light Spheres */}
        <mesh ref={bgSphere1Ref} position={[-1.35, 0.8, -0.8]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshBasicMaterial color="#E4E4E7" transparent opacity={0.12} />
        </mesh>
        <mesh ref={bgSphere2Ref} position={[1.35, -0.7, -1.0]}>
          <sphereGeometry args={[0.48, 32, 32]} />
          <meshBasicMaterial color="#E4E4E7" transparent opacity={0.1} />
        </mesh>

        {/* Subtle Animated Background Mesh Grid */}
        <mesh ref={gridRef} position={[0, 0, -0.5]} rotation={[0.4, 0.25, 0]}>
          <planeGeometry args={[4.8, 4.8, 14, 14]} />
          <meshBasicMaterial color="#E4E4E7" wireframe transparent opacity={0.035} />
        </mesh>
      </group>

      {/* ==================================================== */}
      {/* INTERACTIVE 3D PLATINUM/GLASS FRAME MODULE */}
      {/* ==================================================== */}
      <Float speed={1.0} rotationIntensity={0.3} floatIntensity={0.4}>
        <group ref={groupRef}>
          {/* Glowing Shadow Outline Backdrop */}
          <mesh position={[0, 0, 0.015]}>
            <circleGeometry args={[1.24, 64]} />
            <meshBasicMaterial color="#E4E4E7" transparent opacity={0.2} />
          </mesh>

          {/* Layer 1: Soft Floating Glass Plate (High Refraction & Specular) */}
          <mesh ref={glassPlateRef} position={[0, 0, 0.075]}>
            <circleGeometry args={[1.22, 64]} />
            <meshPhysicalMaterial
              transmission={0.94}
              thickness={0.5}
              roughness={0.04}
              clearcoat={1.0}
              clearcoatRoughness={0.03}
              color="#FFFFFF"
              transparent
              opacity={0.35}
            />
          </mesh>

          {/* Layer 2: Semi-Transparent Frosted Ring */}
          <mesh ref={frostedRingRef} position={[0, 0, 0.06]}>
            <torusGeometry args={[1.24, 0.026, 16, 90]} />
            <meshPhysicalMaterial
              transmission={0.78}
              thickness={0.8}
              roughness={0.35}
              color="#FFFFFF"
              transparent
              opacity={0.45}
            />
          </mesh>

          {/* Layer 3: Animated Breathing Silver Energy Ring */}
          <mesh ref={energyRingRef} position={[0, 0, 0.05]}>
            <torusGeometry args={[1.33, 0.015, 12, 80]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.6} />
          </mesh>

          {/* Layer 4: Thin White Glow Ring */}
          <mesh ref={whiteRingRef} position={[0, 0, 0.04]}>
            <torusGeometry args={[1.41, 0.006, 8, 80]} />
            <meshBasicMaterial color="#E4E4E7" transparent opacity={0.6} />
          </mesh>

          {/* Layer 5: Holographic Scanning Sweep Bar */}
          <mesh ref={scannerRef} position={[0, 0, 0.082]}>
            <boxGeometry args={[2.3, 0.012, 0.01]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0} blending={THREE.AdditiveBlending} />
          </mesh>

          {/* Layer 6: Dynamic Particle Sparkles */}
          <points ref={particlesRef}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[particlePositions, 3]}
              />
            </bufferGeometry>
            <pointsMaterial
              color="#FFFFFF"
              size={0.05}
              transparent
              opacity={0.75}
              sizeAttenuation
              depthWrite={false}
            />
          </points>

          {/* Invisible Interactive Hitbox Area */}
          <mesh 
            position={[0, 0, 0.09]} 
            onPointerOver={() => setHovered(true)} 
            onPointerOut={() => setHovered(false)}
            visible={false}
          >
            <circleGeometry args={[1.4, 32]} />
          </mesh>
        </group>
      </Float>

      {/* ==================================================== */}
      {/* MINIMAL ORBITING TECH ICONS (QUIET OUTER BOUNDS) */}
      {/* ==================================================== */}
      <group>
        {orbitItems.map((item, idx) => (
          <OrbitingIcon
            key={idx}
            index={idx}
            radius={item.radius}
            speed={item.speed}
            yOffset={item.yOffset}
            spinSpeed={item.spinSpeed}
            globalSpeed={hovered ? 2.2 : 1.0}
          >
            {item.component}
          </OrbitingIcon>
        ))}
      </group>

      {/* Floating contact shadow grounding */}
      <ContactShadows
        position={[0, -2.25, 0]}
        opacity={hovered ? 0.32 : 0.22}
        scale={6}
        blur={hovered ? 2.8 : 2.2}
        far={4.0}
      />
    </group>
  );
};

export default Avatar3DScene;
