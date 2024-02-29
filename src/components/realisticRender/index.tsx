// import * as THREE from "three";
// import { useThree } from "@react-three/fiber";
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

  const { scene } = useGLTF(
    "/models/realisticRender/models/FlightHelmet/glTF/FlightHelmet.gltf",
  );

  useEffect(() => {
    scene.scale.set(10, 10, 10);
    scene.position.set(0, -4, 0);
    scene.rotation.y = setRotationForAxisAngleY;
  }, [scene, setRotationForAxisAngleY]);

  return (
    <>
      {/* <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial />
      </mesh> */}
      <primitive object={scene} />
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
