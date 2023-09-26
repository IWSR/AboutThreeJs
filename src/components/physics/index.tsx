import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as CANNON from "cannon-es";

export default function PhysicsTest() {
  const { scene } = useThree();

  const textures = useRef(
    useLoader(THREE.CubeTextureLoader, [
      [
        "/textures/environmentMaps/0/px.jpg",
        "/textures/environmentMaps/0/nx.jpg",
        "/textures/environmentMaps/0/py.jpg",
        "/textures/environmentMaps/0/ny.jpg",
        "/textures/environmentMaps/0/pz.jpg",
        "/textures/environmentMaps/0/nz.jpg",
      ],
    ]),
  );

  // const sphere = useRef<THREE.Mesh | null>(null);

  // const sphereMaterial = useRef<THREE.Material>(
  //   new THREE.MeshStandardMaterial({
  //     metalness: 0.3,
  //     roughness: 0.4,
  //     envMap: textures.current[0],
  //     envMapIntensity: 0.5,
  //   }),
  // );

  const planeMaterial = useRef<THREE.Material>(
    new THREE.MeshStandardMaterial({
      color: "#777777",
      metalness: 0.3,
      roughness: 0.4,
      envMap: textures.current[0],
      envMapIntensity: 0.5,
    }),
  );

  const directionalLight = useRef<THREE.DirectionalLight | null>(null);

  const materials = useRef<{ [key: string]: CANNON.Material }>({
    default: new CANNON.Material("default"),
  });

  const contactMaterial = useRef<{ [key: string]: CANNON.ContactMaterial }>({
    default: new CANNON.ContactMaterial(
      materials.current.default,
      materials.current.default,
      {
        friction: 0.1, // 摩擦力
        restitution: 0.7, // 用于描述碰撞之后物体反弹的弹性程度。它决定了碰撞后物体在碰撞表面上的反弹程度或者反弹速度。
      },
    ),
  });

  const world = useRef<CANNON.World>(
    new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.82, 0),
    }),
  );

  const sphereBody = useRef<CANNON.Body>(
    new CANNON.Body({
      mass: 1,
      shape: new CANNON.Sphere(0.5),
      position: new CANNON.Vec3(0, 3, 0),
      material: materials.current.default,
    }),
  );

  const floorBody = useRef<CANNON.Body>(
    new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      // position: new CANNON.Vec3(0, 3, 0),
      material: materials.current.default,
    }),
  );

  const oldElapsedTime = useRef(0);

  const objectsToUpdate = useRef<
    {
      body: CANNON.Body;
      mesh: THREE.Mesh;
    }[]
  >([]);

  useEffect(() => {
    // 四元数旋转 world 内平面
    floorBody.current.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI * 0.5,
    );
  }, []);

  useEffect(() => {
    if (directionalLight.current) {
      directionalLight.current.shadow.mapSize.set(1024, 1024);
      directionalLight.current.shadow.camera.far = 15;
      directionalLight.current.shadow.camera.left = -7;
      directionalLight.current.shadow.camera.top = 7;
      directionalLight.current.shadow.camera.right = 7;
      directionalLight.current.shadow.camera.bottom = -7;
    }
  }, [directionalLight]);

  useEffect(() => {
    // sphereBody.current.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0));

    world.current.addBody(sphereBody.current);
    world.current.addBody(floorBody.current);
    world.current.addContactMaterial(contactMaterial.current.default);
  }, [world, sphereBody, floorBody]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const deltaTime = time - oldElapsedTime.current;
    oldElapsedTime.current = time;
    // dt: number, timeSinceLastCalled?: number, maxSubSteps?: number
    world.current.step(1 / 60, deltaTime, 3);
    if (objectsToUpdate.current.length) {
      // sphere.current.position.copy(sphereBody.current.position);

      for (const object of objectsToUpdate.current) {
        object.mesh.position.copy(object.body.position);
      }
    }
    // sphereBody.current.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.current?.position);
  });

  // const clickHandle = useCallback(() => {
  //   if (sphere.current) {
  //     sphere.current.position.y = 3;
  //     sphereBody.current.position.y = 3;
  //   }
  // }, [sphere, sphereBody]);

  const createSphere = useCallback(
    (
      radius: number,
      position:
        | CANNON.Vec3
        | THREE.Vector3
        | {
            x: number;
            y: number;
            z: number;
          },
    ) => {
      const [environmentMapTexture] = textures.current;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 20, 20),
        new THREE.MeshStandardMaterial({
          metalness: 0.3,
          roughness: 0.4,
          envMap: environmentMapTexture,
        }),
      );

      mesh.castShadow = true;
      mesh.position.copy(position as THREE.Vector3);
      scene.add(mesh);

      const shape = new CANNON.Sphere(radius);
      const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape,
        material: materials.current.default,
      });
      body.position.copy(position as CANNON.Vec3);
      world.current.addBody(body);

      objectsToUpdate.current.push({
        mesh,
        body,
      });
    },
    [scene],
  );

  useEffect(() => {
    createSphere(0.5, { x: 0, y: 3, z: 0 });
  }, [createSphere]);

  return (
    <>
      {/* <mesh
        ref={sphere}
        material={sphereMaterial.current}
        position={[0, 3, 0]}
        castShadow
        onClick={clickHandle}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
      </mesh> */}

      <mesh
        material={planeMaterial.current}
        rotation={[-Math.PI * 0.5, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
      </mesh>

      <ambientLight color={"white"} intensity={0.7} />

      <directionalLight
        color={"white"}
        intensity={0.2}
        position={[5, 5, 5]}
        castShadow
      />

      <OrbitControls />
    </>
  );
}
