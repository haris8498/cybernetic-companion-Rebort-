import { Canvas } from '@react-three/fiber';
import { Environment, Stars, OrbitControls } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import Robot3D from './Robot3D';
import ParticleField from './ParticleField';

const RobotScene = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting for visibility */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff00ff" />
          <pointLight position={[0, 5, 5]} intensity={2} color="#ffffff" />
          <spotLight
            position={[0, 10, 5]}
            angle={0.4}
            penumbra={1}
            intensity={2}
            color="#00ffff"
            castShadow
          />
          <spotLight
            position={[-5, -5, 5]}
            angle={0.5}
            penumbra={0.5}
            intensity={1.5}
            color="#ff00ff"
          />

          {/* Background elements */}
          <Stars
            radius={100}
            depth={50}
            count={2000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          <ParticleField />

          {/* Robot */}
          <Robot3D mousePosition={mousePosition} />

          {/* Environment for reflections */}
          <Environment preset="night" />

          {/* Allow some orbit control but limited */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
            maxAzimuthAngle={Math.PI / 4}
            minAzimuthAngle={-Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RobotScene;