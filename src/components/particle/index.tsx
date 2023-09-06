import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";

function ParticleTest() {
  const particles = useRef<THREE.BufferGeometry>(null);
  // const particles = useRef<THREE.Points>(null);

  const [particleMap] = useLoader(THREE.TextureLoader, [
    "/textures/particles/2.png",
  ]);

  useEffect(() => {
    const count = 20000;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }
    console.log(colors);

    particles.current?.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    particles.current?.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3),
    );
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (particles.current) {
      for (let i = 0; i < 20000; i++) {
        const i3 = i * 3;
        const x = particles.current.attributes.position.array[i3];
        // 访问每个顶点的 y
        // 在 x-z平面上下波动
        // 需要注意底下的 time + x
        particles.current.attributes.position.array[i3 + 1] = Math.sin(
          time + x,
        );
      }
      particles.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <points>
        {/* <sphereGeometry args={[1, 32, 32]}></sphereGeometry> */}
        <bufferGeometry ref={particles} attach="geometry" />
        <pointsMaterial
          // map={particleMap}
          alphaMap={particleMap}
          /**
           * 透明度测试用于确定一个像素是否应该被渲染或被丢弃，
           * 通常用于实现类似于透明度遮罩的效果。
           * 当设置了 alphaTest 时，渲染器将测试像素的透明度，并根据测试结果决定是否渲染像素。
           * 0-1
           * 这里的设定可以舍弃 alphaMap 上的黑边
           */
          // alphaTest={0.01}
          /**
           * 深度测试是一种用于确定像素渲染顺序的技术，它确保离观察者更远的像素不会遮挡离观察者更近的像素。这有助于实现逼真的渲染效果。
           * 默认情况下，大多数 Three.js 材质的 depthTest 属性都是开启的（设置为 true），这意味着它们将参与深度测试。这通常是您想要的行为，因为它确保了正确的渲染顺序。
           * 然而，在某些情况下，您可能希望关闭深度测试 (丢失深度信息会导致无法分清前后，如果存在多个物体会变得诡异)。例如，如果您正在渲染半透明或透明的对象，并且希望它们按照绘制顺序渲染，而不考虑深度，则可以将 depthTest 属性设置为 false。
           */
          // depthTest={false}
          /**
           * 用于控制是否允许写入深度缓冲区（depth buffer）。深度缓冲区是用于存储渲染的像素的深度信息的图像缓冲区。深度信息用于确定像素渲染的顺序，以确保离观察者更近的像素不会被更远的像素遮挡。

          * 默认情况下，大多数 Three.js 材质的 depthWrite 属性都是开启的（设置为 true），这表示它们将写入深度缓冲区。这通常是您想要的行为，因为它允许渲染引擎根据深度信息正确渲染场景。

          * 然而，在某些情况下，您可能希望禁止特定材质写入深度缓冲区。例如，如果您正在渲染透明或半透明的对象，您可能希望这些对象在深度缓冲区中不留下痕迹，以便其他对象可以正确遮挡它们。

          * 在这种情况下，您可以将材质的 depthWrite 属性设置为 false，以禁止写入深度缓冲区。
          */
          depthWrite={false}
          /**
           * 用于控制渲染对象时如何混合（合成）其颜色值与背景的颜色值。
           * blending 属性允许您实现透明、半透明以及其他特效，以便更好地呈现场景中的不同物体。
           * 该属性会影响性能
           */
          blending={THREE.AdditiveBlending}
          /**
           * 当您设置了 vertexColors 属性并为每个顶点指定了颜色时，
           * Three.js 将使用这些颜色来渲染几何体的顶点。这可以用于实现各种效果，如着色、渐变和自定义颜色。
           */
          vertexColors
          color={new THREE.Color("#ff88cc")}
          size={0.1}
          sizeAttenuation
          transparent
        />
      </points>

      <OrbitControls />
    </>
  );
}

export default ParticleTest;
