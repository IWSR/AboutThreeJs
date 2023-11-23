import { Object3DNode } from "@react-three/fiber";

declare module "@react-three/fiber" {
  interface ThreeElements {
    orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>;
  }
}

declare module "*.glsl" {
  const value: string;
  export default value;
}
