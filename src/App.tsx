import { Canvas } from "@react-three/fiber";
// import TextureTest from "./components/texture";
// import MaterialTest from "./components/material";
import LightTest from "./components/lights";
import "./styles/init.less";
import "./styles/app.less";

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        {/* <TextureTest /> */}
        {/* <MaterialTest /> */}
        <LightTest />
      </Canvas>
    </div>
  );
}

export default App;
