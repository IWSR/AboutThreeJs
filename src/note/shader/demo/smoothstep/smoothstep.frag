#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float band(float t, float start, float end, float blur) {
  // smoothstep 的参数可以理解为 x 从 edge0 到 edge1 范围内进行平滑阶跃
  // 但 smoothstep 返回的仅为一个值
  float d1 = smoothstep(start - blur, start + blur, t);
  float d2 = smoothstep(end + blur, end - blur, t);
  float d = d1 * d2; // 取交集
  return d;
}

float rect(vec2 uv) {
  float rect1 = band(uv.y, -0.1, 0.1, 0.001);
  float rect2 = band(uv.x, -0.3, 0.3, 0.001);
  return rect2 * rect1;
}

// void main() {
//   // 坐标标准化
//   vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
//   float d = rect(uv);
//   gl_FragColor = vec4(vec3(d), 1.0);
// }

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  float d = smoothstep(0.2, 0.4, uv.y);

  gl_FragColor = vec4(vec3(d), 1.0);
}
