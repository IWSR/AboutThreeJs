uniform vec2 uFrequency;
uniform float uTime;

attribute float aRandom; // 这个属性是我们在前面自己设置的

varying float vRandom; // 给片元着色器用的
varying vec2 vUv;
varying float elevation;

void main() {
  // transform the position 矩阵
  // modelMatrix apply transformations reative to the Mesh (position, rotation, scale)
  // viewMatrix apply transformations relative to the camera (position, rotation, field of view, near, far)
  // projectionMatrix transform the coordinates (坐标) into the clip space coordinates（裁切空间坐标）
  // modelViewMatrix = viewMatrix * modelMatrix

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
  elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

  modelPosition.z += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionMatrix = projectionMatrix * viewPosition;

  gl_Position = projectionMatrix;

  vRandom = aRandom;
  vUv = uv;
}
