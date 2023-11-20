import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
// import { MMDAnimationHelper } from 'three/addons/animation/MMDAnimationHelper.js';

export const useShadowCameraHelper = (
  light: React.RefObject<THREE.Light> | null,
  visible: boolean = false,
) => {
  const scene = useThree((state) => state.scene);

  const helper = useRef<THREE.CameraHelper | null>(null);

  useEffect(() => {
    if (light?.current) {
      const shadowCamera = light.current.shadow?.camera;
      // camera 必然存在，这里的声明或许有问题
      !helper.current &&
        ((helper.current = new THREE.CameraHelper(
          shadowCamera as THREE.Camera,
        )),
        scene.add(helper.current));
      helper.current.visible = visible;
    } else {
      helper.current && (scene.remove(helper.current), (helper.current = null));
    }
  }, [light, visible, scene, helper]);
};

// export const useMMDAnimationHelper = () => {
//   const helper = useRef<MMDAnimationHelper | null>(null);
// };
