import { Canvas } from "@react-three/fiber";
// import TextureTest from "./components/texture";
import MaterialTest from "./components/material";
import "./styles/init.less";
import "./styles/app.less";

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        {/* <TextureTest /> */}
        <MaterialTest />
      </Canvas>
    </div>
  );
}

export default App;
