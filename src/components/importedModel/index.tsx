import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { MMDLoader } from "three/addons/loaders/MMDLoader.js";
import { MMDAnimationHelper } from "three/addons/animation/MMDAnimationHelper.js";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { useShadowCameraHelper } from "@/tools";

function Model() {
  const helper = new MMDAnimationHelper();

  const result = useLoader(
    MMDLoader,
    "/models/babala/芭芭拉/芭芭拉.pmx",
    (loader) => {
      // 自定义加载 需要再再找些例子
      console.log(loader, "wawa");
    },
    (xhr) => {
      // You can get the loading status from a callback you provide as the fourth argument.
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
  );

  helper.add(result, {
    physics: false,
  });

  console.log(result, "result");

  return (
    <primitive object={result} position={[0, 0, 0]} scale={[0.11, 0.1, 0.1]} />
  );
}

function ImportedModels() {
  const dcLight = useRef<THREE.DirectionalLight>(null);
  const spotLight = useRef<THREE.SpotLight>(null);
  const pointLight = useRef<THREE.PointLight>(null);

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
      step: 0.01,
    },
    directionalLightX: {
      value: 1.23,
      min: -10,
      max: 10,
      step: 0.001,
    },
    directionalLightY: {
      value: 0.66,
      min: -10,
      max: 10,
      step: 0.001,
    },
    directionalLightZ: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.001,
    },
  });

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

  const { ambientLightIntensity } = useControls({
    ambientLightIntensity: {
      value: 3,
      min: 0,
      max: 10,
      step: 0.01,
    },
  });

  useShadowCameraHelper(dcLight, showDirectionalLight);

  useShadowCameraHelper(spotLight, showSpotLight);

  useShadowCameraHelper(pointLight, showPointLight);

  return (
    <>
      <ambientLight intensity={ambientLightIntensity} color={"fff"} />

      <Model />

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
          intensity={1}
          position={[pointLightX, pointLightY, pointLightZ]}
          castShadow={showPointLight}
        />
      )}
      <OrbitControls />
    </>
  );
}

export default ImportedModels;
