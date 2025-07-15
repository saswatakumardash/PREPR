"use client"

import React, { useRef } from 'react';
import { Canvas, useFrame, extend, useLoader } from '@react-three/fiber';
import { OrbitControls, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const diskVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const diskFragmentShader = `
  varying vec2 vUv;
  uniform float time;
  void main() {
    float r = length(vUv - 0.5) * 2.0;
    float theta = atan(vUv.y - 0.5, vUv.x - 0.5);
    float swirl = 0.5 + 0.5 * sin(theta * 8.0 + time * 2.0);
    float disk = smoothstep(0.7, 0.95, r) * (1.0 - smoothstep(0.95, 1.0, r));
    vec3 color = mix(vec3(1.0, 0.8, 0.2), vec3(1.0, 0.4, 0.1), swirl);
    color = mix(color, vec3(1.0), pow(1.0 - r, 8.0));
    gl_FragColor = vec4(color, disk * 0.85);
  }
`;
const AccretionDiskMaterial = shaderMaterial(
  { time: 0 },
  diskVertexShader,
  diskFragmentShader
);
extend({ AccretionDiskMaterial });

function RealisticBlackHole() {
  const blackHoleRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, '/blackhole.jpg');
  useFrame(() => {
    if (blackHoleRef.current) {
      blackHoleRef.current.rotation.y += 0.0015;
    }
  });
  return (
    <mesh ref={blackHoleRef}>
      <sphereGeometry args={[0.7, 64, 64]} />
      <meshStandardMaterial map={texture} roughness={0.8} metalness={0.9} />
    </mesh>
  );
}

export default function Login3DEffect({ height = 220 }) {
  return (
    <div style={{ width: '100%', height, position: 'relative', background: 'transparent' }}>
      <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} style={{ width: '100%', height: '100%', background: 'transparent' }}>
        <RealisticBlackHole />
        <ambientLight intensity={25.0} />
        <pointLight position={[0, 0, 5]} intensity={0.0} color="#b3caff" />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate autoRotate autoRotateSpeed={0.7} />
      </Canvas>
    </div>
  );
} 