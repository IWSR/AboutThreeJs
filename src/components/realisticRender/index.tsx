/*
 * @Author: your Name
 * @Date: 2024-02-18 03:10:24
 * @LastEditors: your Name
 * @LastEditTime: 2024-03-09 01:04:09
 * @Description:
 */
import * as THREE from "three";
import { useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";
// import { useEffect } from "react";

function RealisticRender() {
  const {
    directionalLightIntensity,
    directionalLightX,
    directionalLightY,
    directionalLightZ,
    setRotationForAxisAngleY,
  } = useControls({
    directionalLightIntensity: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.01,
    },
    directionalLightX: {
      value: 0.25,
      min: -100,
      max: 100,
      step: 0.001,
    },
    directionalLightY: {
      value: 3,
      min: -100,
      max: 100,
      step: 0.001,
    },
    directionalLightZ: {
      value: -2.2,
      min: -1000,
      max: 1000,
      step: 0.001,
    },
    setRotationForAxisAngleY: {
      value: Math.PI * 0.5,
      min: -Math.PI,
      max: Math.PI,
      step: 0.001,
    },
  });

  const { scene } = useThree();

  const gltf = useGLTF(
    "/models/realisticRender/models/FlightHelmet/glTF/FlightHelmet.gltf",
  );

  const [environmentMap] = useLoader(THREE.CubeTextureLoader, [
    [
      "/textures/environmentMaps/0/px.jpg",
      "/textures/environmentMaps/0/nx.jpg",
      "/textures/environmentMaps/0/py.jpg",
      "/textures/environmentMaps/0/ny.jpg",
      "/textures/environmentMaps/0/pz.jpg",
      "/textures/environmentMaps/0/nz.jpg",
    ],
  ]);

  useEffect(() => {
    if (environmentMap) {
      scene.background = environmentMap;
    }
  }, [scene, environmentMap]);

  useEffect(() => {
    gltf.scene.scale.set(10, 10, 10);
    gltf.scene.position.set(0, -4, 0);
    gltf.scene.rotation.y = setRotationForAxisAngleY;
  }, [gltf.scene, setRotationForAxisAngleY]);

  return (
    <>
      {/* <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial />
      </mesh> */}
      <primitive object={gltf.scene} />
      <directionalLight
        intensity={directionalLightIntensity}
        color={"#ffffff"}
        position={[directionalLightX, directionalLightY, directionalLightZ]}
      />
      <OrbitControls />
    </>
  );
}

export default RealisticRender;
