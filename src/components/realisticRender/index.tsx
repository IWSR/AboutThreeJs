/*
 * @Author: your Name
 * @Date: 2024-02-18 03:10:24
 * @LastEditors: your Name
 * @LastEditTime: 2024-03-24 20:03:52
 * @Description:
 */
import * as THREE from "three";
import { useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

function RealisticRender() {
  const shadowRef = useRef<THREE.DirectionalLight | null>(null);

  const {
    directionalLightIntensity,
    directionalLightX,
    directionalLightY,
    directionalLightZ,
    setRotationForAxisAngleY,
    envMapIntensity,
    toneMapping,
    toneMappingExposure,
  } = useControls({
    directionalLightIntensity: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.01,
    },
    directionalLightX: {
      value: 0.25,
      min: -100,
      max: 100,
      step: 0.001,
    },
    directionalLightY: {
      value: 3,
      min: -100,
      max: 100,
      step: 0.001,
    },
    directionalLightZ: {
      value: -2.2,
      min: -1000,
      max: 1000,
      step: 0.001,
    },
    setRotationForAxisAngleY: {
      value: Math.PI * 0.5,
      min: -Math.PI,
      max: Math.PI,
      step: 0.001,
    },
    envMapIntensity: {
      value: 5,
      min: 0,
      max: 10,
      step: 0.001,
    },
    // Tone Mapping通常用于将渲染出的HDR图像转换为LDR图像
    // 直接看效果就行
    toneMapping: {
      options: {
        NoToneMapping: THREE.NoToneMapping, // 不进行色调映射
        LinearToneMapping: THREE.LinearToneMapping, // 线性映射
        ReinhardToneMapping: THREE.ReinhardToneMapping, // Reinhard算法
        CineonToneMapping: THREE.CineonToneMapping, // Filmic算法
        ACESFilmicToneMapping: THREE.ACESFilmicToneMapping, // ACES Filmic算法
        // AgXToneMapping: THREE.AgXToneMapping,
        // NeutralToneMapping: THREE.NeutralToneMapping,
        CustomToneMapping: THREE.CustomToneMapping, // 需要自己写 glsl
      },
    },
    /**
     * 用于控制色调映射曝光的属性。它是一个浮点数，其值范围为0到1。

     * 值越高，图像越亮。

     * 值越低，图像越暗。

     * 默认值为0.5，表示中间曝光。
    */
    toneMappingExposure: {
      value: 5,
      min: 0,
      max: 10,
      step: 0.001,
    },
  });

  // gl 为 renderer
  const { gl, scene } = useThree();
  console.log(gl.outputColorSpace, "gl");
  // https://discourse.threejs.org/t/updates-to-color-management-in-three-js-r152/50791?page=2
  // gl.outputEncoding 废弃
  gl.outputColorSpace = THREE.SRGBColorSpace;
  gl.toneMappingExposure = 3;
  gl.shadowMap.enabled = true;
  gl.shadowMap.type = THREE.PCFSoftShadowMap;

  const gltf = useGLTF(
    "/models/realisticRender/models/FlightHelmet/glTF/FlightHelmet.gltf",
  );

  const [environmentMap] = useLoader(THREE.CubeTextureLoader, [
    [
      "/textures/environmentMaps/0/px.jpg",
      "/textures/environmentMaps/0/nx.jpg",
      "/textures/environmentMaps/0/py.jpg",
      "/textures/environmentMaps/0/ny.jpg",
      "/textures/environmentMaps/0/pz.jpg",
      "/textures/environmentMaps/0/nz.jpg",
    ],
  ]);

  useEffect(() => {
    /**
     * https://threejs.org/docs/#api/en/constants/Renderer
     * THREE.NoToneMapping 的可选值
     * https://docs.pmnd.rs/react-three-fiber/api/canvas
     * renderer 的设置中 antialias 默认为 true
     * 该项与抗锯齿相关（SSAA FSAA MSAA）
     */
    gl.toneMapping = toneMapping;
    gl.toneMappingExposure = toneMappingExposure;
  }, [gl, toneMapping, toneMappingExposure]);

  useEffect(() => {
    if (environmentMap) {
      // environmentMap.encoding = THREE.sRGBEncoding;
      // 贴图编码
      environmentMap.encoding = THREE.SRGBColorSpace;
      scene.background = environmentMap;
      // 将环境贴图应用到模型上 实现1
      scene.environment = environmentMap;
      scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          console.log(child);
          // 将环境贴图应用到模型上 实现2（与 1 等价）
          // child.material.envMap = environmentMap;
          child.material.envMapIntensity = envMapIntensity;
          // 对模型自身加入阴影
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene, environmentMap, envMapIntensity]);

  useEffect(() => {
    gltf.scene.scale.set(10, 10, 10);
    gltf.scene.position.set(0, -4, 0);
    gltf.scene.rotation.y = setRotationForAxisAngleY;
  }, [gltf.scene, setRotationForAxisAngleY]);

  useEffect(() => {
    if (shadowRef.current) {
      shadowRef.current.shadow.camera.far = 15;
      shadowRef.current.shadow.mapSize = new THREE.Vector2(1024, 1024);
      shadowRef.current.updateMatrixWorld(); // updateMatrixWorld() 方法会强制更新光源及其阴影的矩阵
    }
  }, [shadowRef]);

  return (
    <>
      {/* <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial />
      </mesh> */}
      <primitive object={gltf.scene} />
      <directionalLight
        ref={shadowRef}
        castShadow
        intensity={directionalLightIntensity}
        color={"#ffffff"}
        position={[directionalLightX, directionalLightY, directionalLightZ]}
      />
      <OrbitControls />
    </>
  );
}

export default RealisticRender;
