/*
 * @Author: your Name
 * @Date: 2024-02-18 03:10:24
 * @LastEditors: your Name
 * @LastEditTime: 2024-04-17 20:26:33
 * @Description:
 */
import * as THREE from "three";
import { useThree, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
/**
 * Why postprocessing and not three/examples/jsm/postprocessing?
 * https://github.com/pmndrs/postprocessing#performance
 * https://pmndrs.github.io/postprocessing/public/docs/
 */
/**
 * https://docs.pmnd.rs/react-postprocessing/effects/dot-screen
 */
// import { EffectComposer, DotScreen, Noise } from '@react-three/postprocessing';
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import { useControls } from "leva";
import { useEffect, useRef, useMemo } from "react";

function PostProcessing() {
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
  const { gl, scene, camera, size } = useThree();
  console.log(gl.outputColorSpace, "gl");
  // https://discourse.threejs.org/t/updates-to-color-management-in-three-js-r152/50791?page=2
  // gl.outputEncoding 废弃
  gl.outputColorSpace = THREE.SRGBColorSpace;
  gl.toneMappingExposure = 3;
  gl.shadowMap.enabled = true;
  gl.shadowMap.type = THREE.PCFSoftShadowMap;

  const [effectComposer] = useMemo(() => {
    const { width, height } = size;
    const renderTarget = new THREE.WebGLRenderTarget(800, 600, {
      samples: gl.getPixelRatio() === 1 ? 2 : 0, //Defines the count of MSAA samples. Can only be used with WebGL 2(对浏览器有兼容). Default is 0
    });
    const effectComposer = new EffectComposer(gl, renderTarget);
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    effectComposer.setSize(width, height);
    effectComposer.addPass(new RenderPass(scene, camera));
    const dotScreenPass = new DotScreenPass();
    dotScreenPass.enabled = false;
    effectComposer.addPass(dotScreenPass);
    // 抗锯齿算法
    const smaaPass = new SMAAPass();
    effectComposer.addPass(smaaPass);
    /**
     * 故障
     */
    const glitchPass = new GlitchPass();
    // glitchPass.goWild = true;
    glitchPass.enabled = true;
    effectComposer.addPass(glitchPass);

    /**
     * RGBShift is availabe as a shader
     * RGB通道漂移
     */
    const rgbShiftPass = new ShaderPass(RGBShiftShader);
    rgbShiftPass.enabled = true;
    effectComposer.addPass(rgbShiftPass);
    /**
     * GammaCorrectionShader will converter the linear ebcoding to a sRGB encoding
     * 在 renderer 上设置的 outputColorSpace 对此不生效
     */
    const gammaCorrectionShader = new ShaderPass(GammaCorrectionShader);
    effectComposer.addPass(gammaCorrectionShader); // 会变亮
    /**
     * By default EffectComposer is using a WebGLRenderTarget without the antialias
     */
    return [effectComposer];
  }, [size, camera, gl, scene]);

  useEffect(() => {
    console.log(size, "size change");
  }, [size]);

  useFrame((_, delta) => {
    effectComposer.render(delta);
  }, 1); // 权重需要看下是怎么工作的

  const gltf = useGLTF(
    "/models/postProcessing/models/DamagedHelmet/glTF/DamagedHelmet.gltf",
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
      {/* // <EffectComposer>
    //   <DotScreen />
    //   <Noise /> */}
      <primitive object={gltf.scene} />
      <directionalLight
        ref={shadowRef}
        castShadow
        intensity={directionalLightIntensity}
        color={"#ffffff"}
        position={[directionalLightX, directionalLightY, directionalLightZ]}
      />
      <OrbitControls />
      {/* // </EffectComposer> */}
    </>
  );
}

export default PostProcessing;
