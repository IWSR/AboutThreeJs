import { useRef } from "react";
import * as THREE from "three";

export default function RaycasterTest() {
  const material = useRef<THREE.Material>(
    new THREE.MeshBasicMaterial({
      color: "#ff0000",
    }),
  );
  // const ray = useRef<{
  //   origin: THREE.Vector3,
  //   direction: THREE.Vector3
  // }>({
  //   origin: new THREE.Vector3(-3, 0, 0),
  //   direction: new THREE.Vector3(10, 0, 0)
  // });

  return (
    <>
      {/* 这里的事件是利用 Raycaster 实现的 */}
      <mesh
        material={material.current}
        position={[-2, 0, 0]}
        onClick={(e) => {
          console.log("click", e);
        }}
      >
        <sphereGeometry args={[0.5, 16, 16]} />
      </mesh>
      <mesh material={material.current}>
        <sphereGeometry args={[0.5, 16, 16]} />
      </mesh>
      <mesh material={material.current} position={[2, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
      </mesh>
    </>
  );
}
