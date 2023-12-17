import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import vertexShader from "./shader/water/water.vert?raw";
import fragmentShader from "./shader/water/water.frag?raw";
console.log(vertexShader, fragmentShader);
function RagingSea() {
  const planeRef = useRef<THREE.Mesh | null>(null);

  return (
    <>
      <mesh ref={planeRef}>
        <planeGeometry args={[2, 2, 128, 128]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
      </mesh>
      <OrbitControls />
    </>
  );
}

export default RagingSea;
