import { Canvas } from "@react-three/fiber";
import TextureTest from "./components/texture";
import "./styles/init.less";
import "./styles/app.less";

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <TextureTest />
      </Canvas>
    </div>
  );
}

export default App;
