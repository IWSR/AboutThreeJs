import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import vertexShader from "./shader/water/water.vert?raw";
import fragmentShader from "./shader/water/water.frag?raw";
import { useControls } from "leva";

function RagingSea() {
  const planeRef = useRef<THREE.Mesh | null>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  const { uBigWavesElevation, uBigWavesFrequencyX, uBigWavesFrequencyY } =
    useControls({
      uBigWavesElevation: {
        value: 0.2,
        min: 0,
        max: 1,
        step: 0.001,
      },
      uBigWavesFrequencyX: {
        value: 4,
        min: 0,
        max: 10,
        step: 0.001,
      },
      uBigWavesFrequencyY: {
        value: 1.5,
        min: 0,
        max: 10,
        step: 0.001,
      },
    });

  const uniforms = useRef({
    uBigWavesElevation: { value: 0.2 },
    uBigWavesFrequency: {
      value: new THREE.Vector2(4, 1.5),
    },
    uTime: { value: 0 },
    uBigWavesSpeed: { value: 0.75 },
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.uTime.value = time;
      shaderMaterialRef.current.uniforms.uBigWavesElevation.value =
        uBigWavesElevation;
      shaderMaterialRef.current.uniforms.uBigWavesFrequency.value =
        new THREE.Vector2(uBigWavesFrequencyX, uBigWavesFrequencyY);
    }
  });

  return (
    <>
      <mesh ref={planeRef}>
        <planeGeometry args={[2, 2, 128, 128]} />
        <shaderMaterial
          ref={shaderMaterialRef}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms.current}
        />
      </mesh>
      <OrbitControls />
    </>
  );
}

export default RagingSea;
