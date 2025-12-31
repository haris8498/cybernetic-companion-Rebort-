import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Robot3DProps {
  mousePosition: { x: number; y: number };
}

const Robot3D = ({ mousePosition }: Robot3DProps) => {
  const headRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Group>(null);

  // Bright, highly visible glowing materials
  const glowCyanMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x00ffff),
    emissive: new THREE.Color(0x00ffff),
    emissiveIntensity: 4,
    metalness: 0.9,
    roughness: 0.1,
  }), []);

  const glowPurpleMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xff00ff),
    emissive: new THREE.Color(0xff00ff),
    emissiveIntensity: 3,
    metalness: 0.9,
    roughness: 0.1,
  }), []);

  const metalMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x4488ff),
    emissive: new THREE.Color(0x1155cc),
    emissiveIntensity: 0.5,
    metalness: 0.95,
    roughness: 0.15,
  }), []);

  const darkMetalMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x2266dd),
    emissive: new THREE.Color(0x0044aa),
    emissiveIntensity: 0.3,
    metalness: 0.95,
    roughness: 0.1,
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Head follows mouse with smooth interpolation
    if (headRef.current) {
      const targetRotationY = mousePosition.x * 0.5;
      const targetRotationX = -mousePosition.y * 0.3;
      
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY,
        0.08
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotationX,
        0.08
      );
    }

    // Body follows mouse slightly
    if (bodyRef.current) {
      const targetRotationY = mousePosition.x * 0.15;
      bodyRef.current.rotation.y = THREE.MathUtils.lerp(
        bodyRef.current.rotation.y,
        targetRotationY,
        0.03
      );
    }

    // Eye glow pulsing
    if (leftEyeRef.current && rightEyeRef.current) {
      const pulseIntensity = 1.5 + Math.sin(time * 3) * 0.5;
      (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulseIntensity;
      (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulseIntensity;
    }

    // Antenna wobble
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(time * 2) * 0.1;
      antennaRef.current.rotation.x = Math.cos(time * 1.5) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group scale={1.2}>
        {/* Body */}
        <group ref={bodyRef} position={[0, -0.5, 0]}>
          {/* Main torso */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.6, 0.8, 1.2, 16]} />
            <primitive object={darkMetalMaterial} attach="material" />
          </mesh>
          
          {/* Chest plate */}
          <mesh position={[0, 0.1, 0.5]}>
            <boxGeometry args={[0.8, 0.6, 0.2]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>
          
          {/* Chest glow strips */}
          <mesh position={[0.2, 0.1, 0.62]}>
            <boxGeometry args={[0.08, 0.4, 0.05]} />
            <primitive object={glowCyanMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.2, 0.1, 0.62]}>
            <boxGeometry args={[0.08, 0.4, 0.05]} />
            <primitive object={glowCyanMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0.1, 0.62]}>
            <boxGeometry args={[0.08, 0.4, 0.05]} />
            <primitive object={glowPurpleMaterial} attach="material" />
          </mesh>

          {/* Shoulder joints */}
          <mesh position={[0.75, 0.3, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.75, 0.3, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>

          {/* Arms */}
          <mesh position={[1.05, -0.1, 0]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.1, 0.12, 0.7, 8]} />
            <primitive object={darkMetalMaterial} attach="material" />
          </mesh>
          <mesh position={[-1.05, -0.1, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.1, 0.12, 0.7, 8]} />
            <primitive object={darkMetalMaterial} attach="material" />
          </mesh>

          {/* Arm glow rings */}
          <mesh position={[1.1, -0.3, 0]} rotation={[0, 0, 0.3]}>
            <torusGeometry args={[0.13, 0.02, 8, 16]} />
            <primitive object={glowCyanMaterial} attach="material" />
          </mesh>
          <mesh position={[-1.1, -0.3, 0]} rotation={[0, 0, -0.3]}>
            <torusGeometry args={[0.13, 0.02, 8, 16]} />
            <primitive object={glowCyanMaterial} attach="material" />
          </mesh>

          {/* Waist */}
          <mesh position={[0, -0.7, 0]}>
            <cylinderGeometry args={[0.4, 0.5, 0.3, 12]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>

          {/* Hip joints */}
          <mesh position={[0.35, -1, 0]}>
            <sphereGeometry args={[0.18, 12, 12]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.35, -1, 0]}>
            <sphereGeometry args={[0.18, 12, 12]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>

          {/* Legs */}
          <mesh position={[0.35, -1.5, 0]}>
            <cylinderGeometry args={[0.12, 0.15, 0.8, 8]} />
            <primitive object={darkMetalMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.35, -1.5, 0]}>
            <cylinderGeometry args={[0.12, 0.15, 0.8, 8]} />
            <primitive object={darkMetalMaterial} attach="material" />
          </mesh>

          {/* Feet */}
          <mesh position={[0.35, -2, 0.1]}>
            <boxGeometry args={[0.25, 0.15, 0.4]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.35, -2, 0.1]}>
            <boxGeometry args={[0.25, 0.15, 0.4]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>

          {/* Feet glow */}
          <mesh position={[0.35, -2.05, 0.25]}>
            <boxGeometry args={[0.2, 0.03, 0.15]} />
            <primitive object={glowCyanMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.35, -2.05, 0.25]}>
            <boxGeometry args={[0.2, 0.03, 0.15]} />
            <primitive object={glowCyanMaterial} attach="material" />
          </mesh>
        </group>

        {/* Neck */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.3, 8]} />
          <primitive object={metalMaterial} attach="material" />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 0.9, 0]}>
          {/* Main head */}
          <mesh>
            <boxGeometry args={[1, 0.8, 0.9]} />
            <primitive object={darkMetalMaterial} attach="material" />
          </mesh>

          {/* Face plate */}
          <mesh position={[0, 0, 0.46]}>
            <boxGeometry args={[0.9, 0.7, 0.05]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>

          {/* Visor */}
          <mesh position={[0, 0.1, 0.5]}>
            <boxGeometry args={[0.75, 0.25, 0.05]} />
            <meshStandardMaterial 
              color="#0a0a15"
              metalness={1}
              roughness={0}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Eyes */}
          <mesh ref={leftEyeRef} position={[-0.2, 0.1, 0.53]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <primitive object={glowCyanMaterial.clone()} attach="material" />
          </mesh>
          <mesh ref={rightEyeRef} position={[0.2, 0.1, 0.53]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <primitive object={glowCyanMaterial.clone()} attach="material" />
          </mesh>

          {/* Eye rings */}
          <mesh position={[-0.2, 0.1, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.13, 0.02, 8, 16]} />
            <primitive object={glowPurpleMaterial} attach="material" />
          </mesh>
          <mesh position={[0.2, 0.1, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.13, 0.02, 8, 16]} />
            <primitive object={glowPurpleMaterial} attach="material" />
          </mesh>

          {/* Mouth area */}
          <mesh position={[0, -0.15, 0.5]}>
            <boxGeometry args={[0.4, 0.08, 0.03]} />
            <primitive object={glowCyanMaterial} attach="material" />
          </mesh>
          
          {/* Mouth grill lines */}
          {[-0.12, -0.04, 0.04, 0.12].map((x, i) => (
            <mesh key={i} position={[x, -0.25, 0.5]}>
              <boxGeometry args={[0.03, 0.1, 0.02]} />
              <primitive object={metalMaterial} attach="material" />
            </mesh>
          ))}

          {/* Side panels */}
          <mesh position={[0.52, 0, 0]}>
            <boxGeometry args={[0.05, 0.6, 0.7]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.52, 0, 0]}>
            <boxGeometry args={[0.05, 0.6, 0.7]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>

          {/* Ear lights */}
          <mesh position={[0.55, 0, 0]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <primitive object={glowPurpleMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.55, 0, 0]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <primitive object={glowPurpleMaterial} attach="material" />
          </mesh>

          {/* Antenna */}
          <group ref={antennaRef} position={[0, 0.5, 0]}>
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[0.03, 0.04, 0.3, 8]} />
              <primitive object={metalMaterial} attach="material" />
            </mesh>
            <mesh position={[0, 0.35, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <primitive object={glowCyanMaterial} attach="material" />
            </mesh>
          </group>

          {/* Top ridge */}
          <mesh position={[0, 0.42, 0]}>
            <boxGeometry args={[0.6, 0.05, 0.5]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

export default Robot3D;