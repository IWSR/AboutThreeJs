import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useShadowCameraHelper } from "@/tools";
import { useControls } from "leva";

function ShadowTest() {
  const [bakedShadow] = useLoader(THREE.TextureLoader, [
    "/textures/bake/bakedShadow.jpg",
  ]);

  const material = useRef<THREE.Material>(
    new THREE.MeshStandardMaterial({
      roughness: 0.7,
    }),
  );

  const materialWithBakedShadow = useRef<THREE.Material>(
    new THREE.MeshBasicMaterial({
      map: bakedShadow,
    }),
  );

  const dcLight = useRef<THREE.DirectionalLight>(null);
  const spotLight = useRef<THREE.SpotLight>(null);
  const pointLight = useRef<THREE.PointLight>(null);

  useEffect(() => {
    if (dcLight.current) {
      // 会影响阴影质量
      dcLight.current.shadow.mapSize.width = 1024;
      dcLight.current.shadow.mapSize.height = 1024;
      // 设置near far的目的是？
      dcLight.current.shadow.camera.near = 1;
      dcLight.current.shadow.camera.far = 6;
      // 这里的目的？
      dcLight.current.shadow.camera.top = 2;
      dcLight.current.shadow.camera.right = 2;
      dcLight.current.shadow.camera.bottom = -2;
      dcLight.current.shadow.camera.left = -2;

      // dcLight.current.shadow.radius = 10;
    }
  }, [dcLight]);

  useEffect(() => {
    if (spotLight.current) {
      // 会影响阴影质量
      spotLight.current.shadow.mapSize.width = 1024;
      spotLight.current.shadow.mapSize.height = 1024;
      // 设置near far的目的是？
      spotLight.current.shadow.camera.near = 1;
      spotLight.current.shadow.camera.far = 6;

      spotLight.current.shadow.camera.fov = 30;

      // dcLight.current.shadow.radius = 10;
    }
  }, [spotLight]);

  useEffect(() => {
    if (pointLight.current) {
      // 会影响阴影质量
      pointLight.current.shadow.mapSize.width = 1024;
      pointLight.current.shadow.mapSize.height = 1024;
      // 设置near far的目的是？
      pointLight.current.shadow.camera.near = 1;
      pointLight.current.shadow.camera.far = 6;

      // pointLight.current.shadow.camera.fov = 30;

      // dcLight.current.shadow.radius = 10;
    }
  }, [pointLight]);

  const { isBaked } = useControls({
    isBaked: false,
  });

  const {
    showDirectionalLight,
    directionalLightIntensity,
    directionalLightX,
    directionalLightY,
    directionalLightZ,
  } = useControls({
    showDirectionalLight: false,
    directionalLightIntensity: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
    directionalLightX: {
      value: 1.23,
      min: -5,
      max: 5,
      step: 0.001,
    },
    directionalLightY: {
      value: 0.66,
      min: -5,
      max: 5,
      step: 0.001,
    },
    directionalLightZ: {
      value: 0,
      min: -5,
      max: 5,
      step: 0.001,
    },
  });

  const { showPointLight, pointLightX, pointLightY, pointLightZ } = useControls(
    {
      showPointLight: false,
      pointLightX: {
        value: -1,
        min: -5,
        max: 5,
        step: 0.001,
      },
      pointLightY: {
        value: 1,
        min: -5,
        max: 5,
        step: 0.001,
      },
      pointLightZ: {
        value: 0,
        min: -5,
        max: 5,
        step: 0.001,
      },
    },
  );

  const {
    showSpotLight,
    spotLightDistance,
    spotLightX,
    spotLightY,
    spotLightZ,
  } = useControls({
    showSpotLight: false,
    spotLightDistance: {
      value: 10,
      min: 0,
      max: 10,
      step: 0.001,
    },
    spotLightX: {
      value: 0,
      min: -5,
      max: 5,
      step: 0.001,
    },
    spotLightY: {
      value: 2,
      min: -5,
      max: 5,
      step: 0.001,
    },
    spotLightZ: {
      value: 2,
      min: -5,
      max: 5,
      step: 0.001,
    },
  });

  useShadowCameraHelper(dcLight, showDirectionalLight);

  useShadowCameraHelper(spotLight, showSpotLight);

  useShadowCameraHelper(pointLight, showPointLight);

  return (
    <>
      <mesh material={material.current} castShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
      </mesh>

      <mesh
        position={[0, -0.65, 0]}
        rotation={[-0.5 * Math.PI, 0, 0]}
        material={isBaked ? materialWithBakedShadow.current : material.current}
        receiveShadow
      >
        <planeGeometry args={[5, 5]} />
      </mesh>

      <ambientLight intensity={0.5} color={0xffffff} />

      {showDirectionalLight && (
        <directionalLight
          ref={dcLight}
          intensity={directionalLightIntensity}
          position={[directionalLightX, directionalLightY, directionalLightZ]}
          color={0xffffff}
          castShadow={showDirectionalLight}
        />
      )}

      {showSpotLight && (
        <spotLight
          ref={spotLight}
          intensity={1}
          color={0xffffff}
          distance={spotLightDistance}
          decay={1}
          angle={Math.PI * 0.3}
          penumbra={1}
          position={[spotLightX, spotLightY, spotLightZ]}
          castShadow={showSpotLight}
        />
      )}

      {showPointLight && (
        <pointLight
          ref={pointLight}
          color={0xffffff}
          intensity={5}
          position={[pointLightX, pointLightY, pointLightZ]}
          castShadow={showPointLight}
        />
      )}

      <OrbitControls />
    </>
  );
}

export default ShadowTest;
