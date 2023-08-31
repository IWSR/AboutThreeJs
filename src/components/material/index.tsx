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
  MeshPhongMaterial?: THREE.MeshPhongMaterial;
  MeshToonMaterial?: THREE.MeshToonMaterial;
};

type MaterialType = keyof MaterialCachesTypes;

function MaterialTest() {
  const three = useThree();

  const [matcapTexture, gradientsTexture] = useLoader(THREE.TextureLoader, [
    "/textures/matcaps/1.png",
    "/textures/gradients/5.jpg",
  ]);

  console.log(gradientsTexture);

  const cache = useRef<MaterialCachesTypes>({
    MeshBasicMaterial: new THREE.MeshBasicMaterial(),
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
        MeshPhongMaterial: "MeshPhongMaterial",
        MeshToonMaterial: "MeshToonMaterial",
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
        case "MeshPhongMaterial":
          (material as THREE.MeshPhongMaterial).shininess = 1000; // control reflection
          (material as THREE.MeshPhongMaterial).specular = new THREE.Color(
            0xff00ff,
          ); // control the color of reflection
          break;
        case "MeshToonMaterial":
          gradientsTexture.minFilter = THREE.NearestFilter;
          gradientsTexture.magFilter = THREE.NearestFilter;
          gradientsTexture.generateMipmaps = false; // If generateMipmaps is set to true, Three.js will automatically create mipmaps for the texture. Remember that mipmaps consume memory
          (material as THREE.MeshToonMaterial).gradientMap = gradientsTexture;
          break;
      }
      (cache.current[
        materialType as MaterialType
      ] as MaterialCachesTypes[MaterialType]) = material;
    }

    setMaterial(material);
  }, [materialType, cache, matcapTexture, gradientsTexture]);

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
      <ambientLight intensity={0.5} color={"white"} />
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
