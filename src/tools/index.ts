import * as THREE from "three";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export const useShadowCameraHelper = (
  light: React.RefObject<THREE.Light> | null,
) => {
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (light?.current) {
      const shadowCamera = light.current.shadow?.camera;
      // camera 必然存在，这里的声明或许有问题
      const helper = new THREE.CameraHelper(shadowCamera as THREE.Camera);
      scene.add(helper);
    }
  }, [light, scene]);
};
