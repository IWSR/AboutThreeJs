import { extend, useThree, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useControls } from "leva";

extend({ OrbitControls });

type MaterialCachesType = {
  meshBasicMaterial: THREE.Material;
  meshNormalMaterial?: THREE.Material | null;
  meshMatcapMaterial?: THREE.Material | null;
  meshDepthMaterial?: THREE.Material | null;
  meshLambertMaterial?: THREE.Material | null;
};

function MaterialTest() {
  const three = useThree();

  const [matcapTexture, gradientsTexture] = useLoader(THREE.TextureLoader, [
    "/textures/matcaps/1.png",
    "/textures/gradients/3.jpg",
  ]);

  console.log(gradientsTexture);

  const cache = useRef<MaterialCachesType>({
    /**
     * color: THREE.Color / 0xff0000 / red / #ff0000 /rgb(255, 0, 0)
     * map: (map)
     * wireframe: (boolean) it will show the triangles that compose the geometry
     * transparent: (boolean)
     * opacity: (number 0~1)
     * alphaMap:(map) control the transparency with a texture
     * side: THREE.FrontSide / THREE.BackSide / THREE.DoubleSide
     */
    meshBasicMaterial: new THREE.MeshBasicMaterial(),
    /**
     * flatShading: (boolean)
     */
    meshNormalMaterial: null,
    /**
     * matcap: (map)
     */
    meshMatcapMaterial: null,
    /**
     * MeshDepthMaterial will simply color the geometry in white if it's close to thenear and in black if it's close to the far value of the camera
     */
    meshDepthMaterial: null,
    /**
     * meshLambertMaterial will react to light
     */
    meshLambertMaterial: null,
  });

  const sphere = useRef<THREE.Mesh>(null);
  const plane = useRef<THREE.Mesh>(null);
  const torus = useRef<THREE.Mesh>(null);

  const [material, setMaterial] = useState<THREE.Material>(
    cache.current.meshBasicMaterial,
  );

  const { materialKind } = useControls({
    materialKind: {
      options: {
        meshBasicMaterial: "meshBasicMaterial",
        meshNormalMaterial: "meshNormalMaterial",
        meshMatcapMaterial: "meshMatcapMaterial",
        meshDepthMaterial: "meshDepthMaterial",
        meshLambertMaterial: "meshLambertMaterial",
      },
    },
  });

  useEffect(() => {
    switch (materialKind) {
      case "meshBasicMaterial":
        setMaterial(cache.current.meshBasicMaterial);
        break;
      case "meshNormalMaterial": // 法线
        if (cache.current?.meshNormalMaterial) {
          setMaterial(cache.current.meshNormalMaterial);
        } else {
          const material = new THREE.MeshNormalMaterial();
          cache.current.meshNormalMaterial = material;
          setMaterial(cache.current.meshNormalMaterial);
        }
        break;
      case "meshMatcapMaterial":
        if (cache.current?.meshMatcapMaterial) {
          setMaterial(cache.current.meshMatcapMaterial);
        } else {
          const material = new THREE.MeshMatcapMaterial({
            matcap: matcapTexture,
          });
          cache.current.meshMatcapMaterial = material;
          setMaterial(cache.current.meshMatcapMaterial);
        }
        break;
      case "meshDepthMaterial":
        if (cache.current?.meshDepthMaterial) {
          setMaterial(cache.current.meshDepthMaterial);
        } else {
          const material = new THREE.MeshDepthMaterial();
          cache.current.meshMatcapMaterial = material;
          setMaterial(cache.current.meshMatcapMaterial);
        }
        break;
      case "meshLambertMaterial":
        if (cache.current?.meshLambertMaterial) {
          setMaterial(cache.current.meshLambertMaterial);
        } else {
          const material = new THREE.MeshLambertMaterial();
          cache.current.meshLambertMaterial = material;
          setMaterial(cache.current.meshLambertMaterial);
        }
        break;
    }
  }, [materialKind, cache, matcapTexture]);

  useEffect(() => {
    console.log(sphere);
  }, [sphere]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    sphere.current &&
      ((sphere.current.rotation.x = 0.5 * time),
      (sphere.current.rotation.y = 0.5 * time));
    plane.current &&
      ((plane.current.rotation.x = 0.5 * time),
      (plane.current.rotation.y = 0.5 * time));
    torus.current &&
      ((torus.current.rotation.x = 0.5 * time),
      (torus.current.rotation.y = 0.5 * time));
  });

  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.5} color={"red"} />
      {/* 点光源 */}
      <pointLight position={[2, 3, 4]} intensity={20} color={"white"} />
      <mesh ref={sphere} position={[-1.2, 0, 0]} material={material}>
        <sphereGeometry args={[0.5, 16, 16]} />
      </mesh>
      <mesh ref={plane} material={material}>
        <planeGeometry args={[1, 1]} />
      </mesh>
      <mesh ref={torus} position={[1.2, 0, 0]} material={material}>
        <torusGeometry args={[0.3, 0.2, 16, 32]} />
      </mesh>
      <orbitControls args={[three.camera, three.gl.domElement]} />
    </>
  );
}

export default MaterialTest;
