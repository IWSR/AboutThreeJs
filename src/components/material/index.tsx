import { extend, useThree, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useControls } from "leva";

extend({ OrbitControls });

type MaterialCachesTypes = {
  MeshBasicMaterial: THREE.MeshBasicMaterial;
  MeshNormalMaterial?: THREE.MeshNormalMaterial;
  MeshMatcapMaterial?: THREE.MeshMatcapMaterial;
  MeshDepthMaterial?: THREE.MeshDepthMaterial;
  MeshLambertMaterial?: THREE.MeshLambertMaterial;
};

type MaterialType = keyof MaterialCachesTypes;

function MaterialTest() {
  const three = useThree();

  const [matcapTexture, gradientsTexture] = useLoader(THREE.TextureLoader, [
    "/textures/matcaps/1.png",
    "/textures/gradients/3.jpg",
  ]);

  console.log(gradientsTexture);

  const cache = useRef<MaterialCachesTypes>({
    /**
     * color: THREE.Color / 0xff0000 / red / #ff0000 /rgb(255, 0, 0)
     * map: (map)
     * wireframe: (boolean) it will show the triangles that compose the geometry
     * transparent: (boolean)
     * opacity: (number 0~1)
     * alphaMap:(map) control the transparency with a texture
     * side: THREE.FrontSide / THREE.BackSide / THREE.DoubleSide
     */
    MeshBasicMaterial: new THREE.MeshBasicMaterial(),
    /**
     * flatShading: (boolean)
     */
    // MeshNormalMaterial: null,
    /**
     * matcap: (map)
     */
    // MeshMatcapMaterial: null,
    /**
     * MeshDepthMaterial will simply color the geometry in white if it's close to thenear and in black if it's close to the far value of the camera
     */
    // MeshDepthMaterial: null,
    /**
     * MeshLambertMaterial will react to light
     */
    // MeshLambertMaterial: null,
  });

  const sphere = useRef<THREE.Mesh>(null);
  const plane = useRef<THREE.Mesh>(null);
  const torus = useRef<THREE.Mesh>(null);

  const [material, setMaterial] = useState<MaterialCachesTypes[MaterialType]>(
    cache.current.MeshBasicMaterial,
  );

  const { materialType } = useControls({
    materialType: {
      options: {
        MeshBasicMaterial: "MeshBasicMaterial",
        MeshNormalMaterial: "MeshNormalMaterial",
        MeshMatcapMaterial: "MeshMatcapMaterial",
        MeshDepthMaterial: "MeshDepthMaterial",
        MeshLambertMaterial: "MeshLambertMaterial",
      },
    },
  });

  useEffect(() => {
    let material = cache.current?.[materialType as MaterialType];
    if (!material) {
      material = new THREE[materialType as MaterialType]();
      switch (materialType) {
        case "MeshMatcapMaterial":
          (material as THREE.MeshMatcapMaterial).matcap = matcapTexture;
          break;
      }
      (cache.current[
        materialType as MaterialType
      ] as MaterialCachesTypes[MaterialType]) = material;
    }

    setMaterial(material);
  }, [materialType, cache, matcapTexture]);

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
