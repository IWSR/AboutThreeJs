import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import vertexShader from "./shaders/test2/vertex.glsl?raw";
import fragmentShader from "./shaders/test2/fragment.glsl?raw";
import { useEffect, useRef } from "react";
// import { useLoader, useFrame } from "@react-three/fiber";

function Shaders() {
  const planeRef = useRef<THREE.Mesh | null>(null);
  const shadowMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  // const [testTexture] = useLoader(THREE.TextureLoader, [
  //   "/textures/test/jVNBxYI.jpg",
  // ]);

  useEffect(() => {
    if (planeRef.current) {
      const count = planeRef.current.geometry.attributes.position.count;
      const randoms = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        randoms[i] = Math.random();
      }
      // 可以在 glsl 内访问到
      planeRef.current.geometry.setAttribute(
        "aRandom",
        new THREE.BufferAttribute(randoms, 1),
      );
      console.log(planeRef.current.geometry);
    }
  }, [planeRef]);

  // useFrame(({ clock }) => {
  //   const time = clock.getElapsedTime();

  //   if (shadowMaterialRef.current) {
  //     shadowMaterialRef.current.uniforms.uTime.value = time;
  //   }
  // });

  return (
    <>
      <mesh ref={planeRef}>
        <planeGeometry args={[1, 1, 32, 32]} />
        {/* <shaderMaterial
          ref={shadowMaterialRef}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          side={THREE.DoubleSide}
          uniforms={{
            uFrequency: { value: new THREE.Vector2(10, 5) },
            uTime: { value: 0.0 },
            uColor: { value: new THREE.Color("red") },
            uTexture: { value: testTexture },
          }}
          // wireframe
          transparent
        /> */}
        <shaderMaterial
          ref={shadowMaterialRef}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          side={THREE.DoubleSide}
          // uniforms={{
          //   uFrequency: { value: new THREE.Vector2(10, 5) },
          //   uTime: { value: 0.0 },
          //   uColor: { value: new THREE.Color("red") },
          //   uTexture: { value: testTexture },
          // }}
          // wireframe
          transparent
        />
      </mesh>
      <OrbitControls />
    </>
  );
}

export default Shaders;
