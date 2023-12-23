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

  const {
    uBigWavesElevation,
    uBigWavesFrequencyX,
    uBigWavesFrequencyY,
    uBigWavesSpeed,
    uDepthColor,
    uSurfaceColor,
    uColorOffset,
    uColorMultiplier,
    uSmallWavesElevation,
    uSmallWavesFrequency,
    uSmallWavesSpeed,
    uSmallIterations,
  } = useControls({
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
    uBigWavesSpeed: {
      value: 0.75,
      min: 0,
      max: 4,
      step: 0.001,
    },
    uDepthColor: "#186691",
    uSurfaceColor: "#9bd8ff",
    uColorOffset: {
      value: 0.25,
      min: 0,
      max: 1,
      step: 0.001,
    },
    uColorMultiplier: {
      value: 2,
      min: 0,
      max: 10,
      step: 0.001,
    },
    uSmallWavesElevation: {
      value: 0.15,
      min: 0,
      max: 1,
      step: 0.001,
    },
    uSmallWavesFrequency: {
      value: 3.0,
      min: 0,
      max: 30,
      step: 0.001,
    },
    uSmallWavesSpeed: {
      value: 0.2,
      min: 0,
      max: 4,
      step: 0.001,
    },
    uSmallIterations: {
      value: 4.0,
      min: 0,
      max: 5,
      step: 1,
    },
  });

  const uniforms = useRef({
    uBigWavesElevation: { value: uBigWavesElevation },
    uBigWavesFrequency: {
      value: new THREE.Vector2(uBigWavesFrequencyX, uBigWavesFrequencyY),
    },
    uTime: { value: 0 },
    uBigWavesSpeed: { value: uBigWavesSpeed },
    uDepthColor: { value: new THREE.Color(uDepthColor) },
    uSurfaceColor: { value: new THREE.Color(uSurfaceColor) },
    uColorOffset: { value: uColorOffset },
    uColorMultiplier: { value: uColorMultiplier },
    uSmallWavesElevation: { value: uSmallWavesElevation },
    uSmallWavesFrequency: { value: uSmallWavesFrequency },
    uSmallWavesSpeed: { value: uSmallWavesSpeed },
    uSmallIterations: { value: uSmallIterations },
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.uTime.value = time;
      shaderMaterialRef.current.uniforms.uBigWavesElevation.value =
        uBigWavesElevation;
      shaderMaterialRef.current.uniforms.uBigWavesFrequency.value =
        new THREE.Vector2(uBigWavesFrequencyX, uBigWavesFrequencyY);
      shaderMaterialRef.current.uniforms.uBigWavesSpeed.value = uBigWavesSpeed;
      shaderMaterialRef.current.uniforms.uDepthColor.value = new THREE.Color(
        uDepthColor,
      );
      shaderMaterialRef.current.uniforms.uSurfaceColor.value = new THREE.Color(
        uSurfaceColor,
      );
      shaderMaterialRef.current.uniforms.uColorOffset.value = uColorOffset;
      shaderMaterialRef.current.uniforms.uColorMultiplier.value =
        uColorMultiplier;
      shaderMaterialRef.current.uniforms.uSmallWavesElevation.value =
        uSmallWavesElevation;
      shaderMaterialRef.current.uniforms.uSmallWavesFrequency.value =
        uSmallWavesFrequency;
      shaderMaterialRef.current.uniforms.uSmallWavesSpeed.value =
        uSmallWavesSpeed;
      shaderMaterialRef.current.uniforms.uSmallIterations.value =
        uSmallIterations;
    }
  });

  return (
    <>
      <mesh ref={planeRef}>
        <planeGeometry args={[2, 2, 512, 512]} />
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
