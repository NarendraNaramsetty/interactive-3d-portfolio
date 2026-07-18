import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';

const NeuralNetwork = () => {
  const lineGeometryRef = useRef();
  const instancedMeshRef = useRef();
  const scrollPercent = usePortfolioStore((state) => state.scrollPercent);

  const nodeCount = 45;

  // Initialize node states
  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < nodeCount; i++) {
      // Random coordinates inside a bounding sphere
      const r = Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const position = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.25,
        (Math.random() - 0.5) * 0.25,
        (Math.random() - 0.5) * 0.25
      );

      arr.push({
        position,
        velocity,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Scroll increases network processing velocity
    const speedMultiplier = 1.0 + (scrollPercent * 0.05);

    // Update node positions and instanced mesh matrices
    nodes.forEach((node, i) => {
      node.position.addScaledVector(node.velocity, state.delta * speedMultiplier);

      // Bounce nodes when they drift too far out of the 2.4-unit sphere boundary
      if (node.position.length() > 2.4) {
        node.position.setLength(2.4);
        node.velocity.negate();
      }

      // Update scale and position matrices
      const dummy = new THREE.Object3D();
      dummy.position.copy(node.position);
      
      // Node pulse effect to look like computing nodes
      const pulseScale = 0.07 + Math.sin(t * 3.5 + node.pulseOffset) * 0.025;
      dummy.scale.set(pulseScale, pulseScale, pulseScale);
      dummy.updateMatrix();
      
      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    });

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;

    // Calculate connections dynamically based on proximity
    const linePositions = [];
    const maxConnectDistance = 1.25 + (scrollPercent * 0.005);

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < maxConnectDistance) {
          linePositions.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          );
        }
      }
    }

    // Set connection coordinates into buffer geometry attributes
    if (linePositions.length > 0 && lineGeometryRef.current) {
      const posArray = new Float32Array(linePositions);
      lineGeometryRef.current.setAttribute(
        'position',
        new THREE.BufferAttribute(posArray, 3)
      );
      lineGeometryRef.current.setDrawRange(0, posArray.length / 3);
      lineGeometryRef.current.attributes.position.needsUpdate = true;
    } else if (lineGeometryRef.current) {
      lineGeometryRef.current.setDrawRange(0, 0);
    }
  });

  return (
    <group>
      {/* Node Spheres */}
      <instancedMesh ref={instancedMeshRef} args={[null, null, nodeCount]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#6366F1" // Indigo neural nodes
          roughness={0.15}
          metalness={0.8}
        />
      </instancedMesh>

      {/* Dynamic Connection lines */}
      <lineSegments>
        <bufferGeometry ref={lineGeometryRef} />
        <lineBasicMaterial
          color="#14B8A6" // Teal synaptic bonds
          transparent
          opacity={0.35}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
};

// Outer floating nebula cloud particles
const AmbientNebula = () => {
  const count = 180;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.035;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#818CF8"
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
};

export const HeroScene = () => {
  return (
    <group position={[0, 0.15, 0]}>
      {/* Lights optimized for glossy nodes */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#6366F1" />
      <pointLight position={[0, 0, 0]} intensity={2.0} color="#14B8A6" distance={5} />

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.0}>
        <NeuralNetwork />
      </Float>

      <AmbientNebula />

      {/* Floating contact shadow grounding */}
      <ContactShadows
        position={[0, -2.4, 0]}
        opacity={0.3}
        scale={6}
        blur={2.5}
        far={4.0}
      />
    </group>
  );
};
export default HeroScene;
