import { extend, useThree, useFrame } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { useControls } from "leva";

extend({ OrbitControls });

function LightTest() {
  const three = useThree();

  const sphere = useRef<THREE.Mesh>(null);
  const plane = useRef<THREE.Mesh>(null);
  const torus = useRef<THREE.Mesh>(null);
  const ground = useRef<THREE.Mesh>(null);
  const rectAreaLight = useRef<THREE.RectAreaLight>(null);

  const [material] = useState<THREE.Material>(new THREE.MeshStandardMaterial());

  const {
    ambientLightIntensity,
    ambientLightColor,
    directionalLightIntensity,
    directionalLightColor,
    hemisphereLightIntensity,
    hemisphereLightColor,
    groundColor,
    pointLightIntensity,
    pointLightColor,
    pointLightDistance,
    pointLightdecay,
    rectAreaLightIntensity,
    rectAreaLightColor,
    rectAreaLightWidth,
    rectAreaLightHeight,
  } = useControls({
    ambientLightIntensity: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
    },
    ambientLightColor: "#ff9900",
    directionalLightIntensity: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
    },
    directionalLightColor: "#ffef00",
    hemisphereLightIntensity: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
    },
    hemisphereLightColor: "#00FF00",
    groundColor: "#00ffcf",
    pointLightIntensity: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
    },
    pointLightColor: "#15be1a",
    pointLightDistance: {
      value: 1,
      min: 0,
      max: 5,
      step: 0.1,
    },
    pointLightdecay: {
      value: 1,
      min: 1,
      max: 2,
      step: 0.1,
    },
    rectAreaLightIntensity: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
    },
    rectAreaLightColor: "#157fbf",
    rectAreaLightWidth: {
      value: 1,
      min: 0,
      max: 2,
      step: 0.1,
    },
    rectAreaLightHeight: {
      value: 1,
      min: 0,
      max: 2,
      step: 0.1,
    },
  });

  // 声明的 bug,可以混pr
  useHelper(rectAreaLight, RectAreaLightHelper, "cyan");

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    sphere.current &&
      ((sphere.current.rotation.x = 0.5 * time),
      (sphere.current.rotation.y = 0.5 * time));
    plane.current &&
      ((plane.current.rotation.x = 0.5 * time),
      (plane.current.rotation.y = 0.5 * time));
    torus.current &&
      ((torus.current.rotation.x = 0.5 * time),
      (torus.current.rotation.y = 0.5 * time));
  });

  return (
    <>
      {/* 环境光 */}
      <ambientLight
        intensity={ambientLightIntensity}
        color={ambientLightColor}
      />
      <directionalLight
        intensity={directionalLightIntensity}
        color={directionalLightColor}
        position={[1, 0.25, 0]}
      />
      <hemisphereLight
        intensity={hemisphereLightIntensity}
        color={hemisphereLightColor}
        groundColor={groundColor}
      />
      <pointLight
        intensity={pointLightIntensity}
        color={pointLightColor}
        position={[1, -0.5, 1]}
        distance={pointLightDistance}
        decay={pointLightdecay}
      />
      {/* 只作用于 MeshStandardMaterial & MeshPhysicalMaterial */}
      <rectAreaLight
        ref={rectAreaLight}
        intensity={rectAreaLightIntensity}
        color={rectAreaLightColor}
        width={rectAreaLightWidth}
        height={rectAreaLightHeight}
        position={[-1.5, 0, 1.5]}
        // lookAt={[new THREE.Vector3()]}
      />
      <spotLight
        intensity={1}
        color={"#aa15bf"}
        distance={5}
        angle={Math.PI * 0.2}
        penumbra={0.25}
        decay={0.1}
        position={[0, 2, 3]}
      />
      <mesh ref={sphere} position={[-1.2, 0, 0]} material={material}>
        <sphereGeometry args={[0.5, 16, 16]} />
      </mesh>
      <mesh ref={plane} material={material}>
        <planeGeometry args={[1, 1]} />
      </mesh>
      <mesh ref={torus} position={[1.2, 0, 0]} material={material}>
        <torusGeometry args={[0.3, 0.2, 16, 32]} />
      </mesh>
      <mesh
        ref={ground}
        position={[0, -0.65, 0]}
        rotation={[-0.5 * Math.PI, 0, 0]}
        material={material}
      >
        <planeGeometry args={[5, 5]} />
      </mesh>
      <orbitControls args={[three.camera, three.gl.domElement]} />
    </>
  );
}

export default LightTest;
