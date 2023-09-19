import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import CANNON from 'cannon-es';

export default function PhysicsTest() {
  const [environmentMapTexture] = useLoader(THREE.CubeTextureLoader, [
    [
      "/textures/environmentMaps/0/px.jpg",
      "/textures/environmentMaps/0/nx.jpg",
      "/textures/environmentMaps/0/py.jpg",
      "/textures/environmentMaps/0/ny.jpg",
      "/textures/environmentMaps/0/pz.jpg",
      "/textures/environmentMaps/0/nz.jpg",
    ],
  ]);

  const sphereMaterial = useRef<THREE.Material>(
    new THREE.MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
      envMap: environmentMapTexture,
      envMapIntensity: 0.5,
    }),
  );

  const planeMaterial = useRef<THREE.Material>(
    new THREE.MeshStandardMaterial({
      color: "#777777",
      metalness: 0.3,
      roughness: 0.4,
      envMap: environmentMapTexture,
      envMapIntensity: 0.5,
    }),
  );

  const directionalLightRef = useRef<THREE.DirectionalLight | null>(null);

  useEffect(() => {
    if (directionalLightRef.current) {
      directionalLightRef.current.shadow.mapSize.set(1024, 1024);
      directionalLightRef.current.shadow.camera.far = 15;
      directionalLightRef.current.shadow.camera.left = -7;
      directionalLightRef.current.shadow.camera.top = 7;
      directionalLightRef.current.shadow.camera.right = 7;
      directionalLightRef.current.shadow.camera.bottom = -7;
    }
  }, [directionalLightRef]);

  return (
    <>
      <mesh material={sphereMaterial.current} position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
      </mesh>

      <mesh
        material={planeMaterial.current}
        rotation={[-Math.PI * 0.5, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
      </mesh>

      <ambientLight color={"0xffffff"} intensity={0.7} />

      <directionalLight
        color={"0xffffff"}
        intensity={0.2}
        position={[5, 5, 5]}
        castShadow
      />

      <OrbitControls />
    </>
  );
}
