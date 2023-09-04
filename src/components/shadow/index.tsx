import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useShadowCameraHelper } from "@/tools";
import { useControls } from "leva";

function ShadowTest() {
  const material = useRef<THREE.Material>(
    new THREE.MeshStandardMaterial({
      roughness: 0.7,
    }),
  );

  const dcLight = useRef<THREE.DirectionalLight>(null);

  useEffect(() => {
    if (dcLight.current) {
      console.log(dcLight.current, "current");
      dcLight.current.shadow.mapSize.width = 1024 / 4;
      dcLight.current.shadow.mapSize.height = 1024 / 4;
    }
  }, [dcLight]);

  const {
    directionalLightIntensity,
    directionalLightX,
    directionalLightY,
    directionalLightZ,
  } = useControls({
    directionalLightIntensity: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
    },
    directionalLightX: {
      value: 0,
      min: -5,
      max: 5,
      step: 0.01,
    },
    directionalLightY: {
      value: 0,
      min: -5,
      max: 5,
      step: 0.01,
    },
    directionalLightZ: {
      value: 0,
      min: -5,
      max: 5,
      step: 0.01,
    },
  });

  // useHelper(dcLight, THREE.DirectionalLightHelper);
  // useHelper(dcLight.current.shadow.camera, THREE.CameraHelper);
  useShadowCameraHelper(dcLight);

  return (
    <>
      <mesh material={material.current} castShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
      </mesh>

      <mesh
        position={[0, -0.65, 0]}
        rotation={[-0.5 * Math.PI, 0, 0]}
        material={material.current}
        receiveShadow
      >
        <planeGeometry args={[5, 5]} />
      </mesh>
      <ambientLight intensity={1} color={0xffffff} />
      <directionalLight
        ref={dcLight}
        intensity={directionalLightIntensity}
        position={[directionalLightX, directionalLightY, directionalLightZ]}
        castShadow
      />
      <OrbitControls />
    </>
  );
}

export default ShadowTest;
