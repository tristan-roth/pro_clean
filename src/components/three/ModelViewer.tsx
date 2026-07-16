"use client";

import { Component, Suspense, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, ContactShadows, useGLTF } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

const MODEL_URL = "/scene.glb";

interface ModelViewerProps {
  /** Progression de scroll de la section (0 → 1), fournie par framer-motion. */
  scrollProgress: MotionValue<number>;
}

/**
 * Modèle 3D — auto-centré et auto-dimensionné quel que soit le GLB fourni
 * (il suffit de remplacer /public/scene.glb pour changer d'objet).
 * Rotation douce pilotée par le scroll + flottement d'atelier au repos.
 */
function Model({ scrollProgress }: ModelViewerProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL);

  const normalizedScale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return 2.7 / maxDim;
  }, [scene]);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.getElapsedTime();
    g.rotation.y =
      -0.5 + scrollProgress.get() * Math.PI * 0.85 + Math.sin(t * 0.22) * 0.05;
    g.rotation.x = 0.1 + Math.sin(t * 0.35) * 0.02;
    g.position.y = Math.sin(t * 0.7) * 0.04;
  });

  return (
    <group ref={group} scale={normalizedScale}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

/** Garde-fou : si le GLB est absent ou invalide, on n'affiche simplement rien
 *  (le panneau carbone derrière le canvas reste seul visible). */
class CanvasErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function ModelViewer({ scrollProgress }: ModelViewerProps) {
  return (
    <CanvasErrorBoundary>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.7, 4.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Éclairage d'atelier : lampe principale chaude + contre-jour vapeur */}
        <ambientLight intensity={0.55} />
        <hemisphereLight args={["#e8ecef", "#15151a", 0.5]} />
        <directionalLight position={[4, 6, 3]} intensity={2.1} color="#fff4e6" />
        <directionalLight position={[-5, 3, -4]} intensity={0.9} color="#6fb3cb" />
        <pointLight position={[0, -2, 3]} intensity={0.35} color="#a4d4e4" />

        <Suspense fallback={null}>
          <Model scrollProgress={scrollProgress} />
          <ContactShadows
            position={[0, -1.45, 0]}
            opacity={0.55}
            scale={7}
            blur={2.6}
            far={3}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </CanvasErrorBoundary>
  );
}

useGLTF.preload(MODEL_URL);
