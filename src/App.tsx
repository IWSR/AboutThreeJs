import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
// import TextureTest from "./components/texture";
// import MaterialTest from "./components/material";
// import LightTest from "./components/lights";
// import ShadowTest from "./components/shadow";
// import ParticleTest from "./components/particle";
// import RaycasterTest from "./components/raycaster";
// import PhysicsTest from "./components/physics";
import ImportedModels from "./components/importedModel";
import "./styles/init.less";
import "./styles/app.less";

function App() {
  const { enabled, shadowMapAlgorithm } = useControls({
    enabled: true,
    shadowMapAlgorithm: {
      options: {
        BasicShadowMap: THREE.BasicShadowMap,
        PCFShadowMap: THREE.PCFShadowMap,
        PCFSoftShadowMap: THREE.PCFSoftShadowMap,
        VSMShadowMap: THREE.VSMShadowMap,
      },
    },
  });
  return (
    <div id="canvas-container">
      <Canvas
        shadows={{
          enabled, // 没生效。。
          type: shadowMapAlgorithm,
        }}
      >
        {/* <TextureTest /> */}
        {/* <MaterialTest /> */}
        {/* <LightTest /> */}
        {/* <ShadowTest /> */}
        {/* <ParticleTest /> */}
        {/* <RaycasterTest /> */}
        {/* <PhysicsTest /> */}
        <ImportedModels />
      </Canvas>
    </div>
  );
}

export default App;
