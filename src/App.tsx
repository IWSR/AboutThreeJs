import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
// import TextureTest from "./components/texture";
// import MaterialTest from "./components/material";
// import LightTest from "./components/lights";
import ShadowTest from "./components/shadow";
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
        <ShadowTest />
      </Canvas>
    </div>
  );
}

export default App;
