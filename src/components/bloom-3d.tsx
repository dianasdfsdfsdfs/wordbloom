import { Canvas, useFrame } from '@react-three/fiber/native';
import { Component, type ReactNode, useRef } from 'react';
import { View } from 'react-native';
import type { Group } from 'three';

import { Bloom } from './bloom';

type Vec3 = [number, number, number];

function Petal({ angle, radius, scale, tilt, color }: { angle: number; radius: number; scale: Vec3; tilt: number; color: string }) {
  return (
    <group rotation={[0, angle, 0]}>
      <mesh position={[0, 0.04, radius]} rotation={[tilt, 0, 0]} scale={scale}>
        <sphereGeometry args={[1, 18, 18]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.05} />
      </mesh>
    </group>
  );
}

function Flower() {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.45;
    g.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.06;
  });

  const outer = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2);
  const inner = Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2 + Math.PI / 6);

  return (
    <group ref={group} rotation={[0.5, 0, 0]}>
      {outer.map((a, i) => (
        <Petal key={`o${i}`} angle={a} radius={0.95} scale={[0.36, 0.12, 1.0]} tilt={-0.35} color="#C81414" />
      ))}
      {inner.map((a, i) => (
        <Petal key={`i${i}`} angle={a} radius={0.5} scale={[0.28, 0.11, 0.72]} tilt={-0.72} color="#E62424" />
      ))}
      <mesh>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial color="#2A850E" emissive="#0a2e05" roughness={0.5} />
      </mesh>
    </group>
  );
}

/** Falls back to the flat SVG bloom if the GL canvas errors on this device. */
class Bloom3DBoundary extends Component<{ size: number; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Bloom size={this.props.size} /> : this.props.children;
  }
}

export interface Bloom3DProps {
  size?: number;
}

/** Animated 3D garnet blossom rendered with three.js over expo-gl. */
export function Bloom3D({ size = 180 }: Bloom3DProps) {
  return (
    <Bloom3DBoundary size={size}>
      <View style={{ width: size, height: size }} pointerEvents="none">
        <Canvas gl={{ alpha: true }} camera={{ position: [0, 1.4, 3.4], fov: 42 }} style={{ flex: 1 }}>
          <ambientLight intensity={0.75} />
          <directionalLight position={[3, 4, 3]} intensity={1.15} />
          <pointLight position={[-2, -1, 2]} intensity={0.6} color="#ff8a8a" />
          <Flower />
        </Canvas>
      </View>
    </Bloom3DBoundary>
  );
}
