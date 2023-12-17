void main() {
  // modelMatrix viewMatrix 在 shaderMaterial 内有声明
  vec4 modelPosition = modelMatrix * vec4(position, 10);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
