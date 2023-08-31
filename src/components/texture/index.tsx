import { extend, useLoader, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useControls } from "leva";

extend({ OrbitControls });

function TextureTest() {
  const three = useThree(); // 获取 three 实例

  const [
    alphaMap,
    colorMap,
    aoMap,
    displacementMap,
    metalnessMap,
    normalMap,
    roughnessMap,
  ] = useLoader(THREE.TextureLoader, [
    "/textures/door/alpha.jpg",
    "/textures/door/color.jpg",
    "/textures/door/ambientOcclusion.jpg",
    "/textures/door/height.jpg",
    "/textures/door/metalness.jpg",
    "/textures/door/normal.jpg",
    "/textures/door/roughness.jpg",
  ]);

  const mesh = useRef<THREE.Mesh>(null);

  const {
    toggleMap,
    toggleAlphaMap,
    toggleAoMap,
    toggleDisplacementMap,
    toggleNormalMap,
    toggleMetalnessMap,
    toggleRoughnessMap,
    metalness,
    roughness,
  } = useControls({
    toggleMap: true,
    toggleAlphaMap: true,
    toggleAoMap: true,
    toggleDisplacementMap: true,
    toggleNormalMap: true,
    toggleMetalnessMap: true,
    toggleRoughnessMap: true,
    metalness: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
    },
    roughness: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
    },
  });

  // useFrame((state, delta) => {
  // requestAnimationFrame
  // console.log(state)
  // console.log('tick', delta)
  // })

  useEffect(() => {
    console.log(mesh);
    if (mesh.current) {
      const material = mesh.current.material as THREE.Material;
      material.needsUpdate = true;
    }
  }, [
    toggleMap,
    toggleAlphaMap,
    toggleAoMap,
    toggleDisplacementMap,
    toggleNormalMap,
    toggleMetalnessMap,
    toggleRoughnessMap,
    metalness,
    roughness,
    mesh,
  ]);

  return (
    <>
      <ambientLight intensity={2} />
      <mesh ref={mesh}>
        <planeGeometry args={[2, 2, 100, 100]} />
        <meshStandardMaterial
          map={toggleMap && colorMap}
          alphaMap={toggleAlphaMap ? alphaMap : null}
          transparent
          aoMap={toggleAoMap ? aoMap : null}
          displacementMap={toggleDisplacementMap ? displacementMap : null}
          displacementScale={0.1}
          normalMap={toggleNormalMap ? normalMap : null}
          metalnessMap={toggleMetalnessMap ? metalnessMap : null}
          metalness={metalness}
          roughnessMap={toggleRoughnessMap ? roughnessMap : null}
          roughness={roughness}
        />
      </mesh>
      <orbitControls args={[three.camera, three.gl.domElement]} />
    </>
  );
}

export default TextureTest;
