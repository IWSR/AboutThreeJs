// import { useEffect } from 'react';
import { useLoader } from "@react-three/fiber";
import { MMDLoader } from "three/addons/loaders/MMDLoader.js";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

function Model() {
  const result = useLoader(
    MMDLoader,
    "/models/YYB/YYB.pmx",
    () => {
      // 自定义加载 需要再再找些例子
    },
    (xhr) => {
      // You can get the loading status from a callback you provide as the fourth argument.
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
  );
  console.log(result, "result");

  return (
    <primitive object={result} position={[0, 0, 0]} displacementScale={0.1} />
  );
}

function ImportedModels() {
  const { ambientLightIntensity } = useControls({
    ambientLightIntensity: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.1,
    },
  });

  return (
    <>
      <ambientLight intensity={ambientLightIntensity} color={"pink"} />
      <Model />
      <OrbitControls />
    </>
  );
}

export default ImportedModels;
