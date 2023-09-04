import { Canvas } from "@react-three/fiber";
// import TextureTest from "./components/texture";
// import MaterialTest from "./components/material";
// import LightTest from "./components/lights";
import ShadowTest from "./components/shadow";
import "./styles/init.less";
import "./styles/app.less";

function App() {
  return (
    <div id="canvas-container">
      <Canvas shadows>
        {/* <TextureTest /> */}
        {/* <MaterialTest /> */}
        {/* <LightTest /> */}
        <ShadowTest />
      </Canvas>
    </div>
  );
}

export default App;
