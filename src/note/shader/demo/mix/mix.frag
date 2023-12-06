#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main() {
  vec2 uv = (gl_FragCoord.xy * 30.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  vec3 color = vec3(0.0);
  vec3 color1 = vec3(0.89, 0.85, 0.24);
  vec3 color2 = vec3(0.35, 0.73, 0.12);
  vec3 pct = vec3(uv.x);
  color = mix(color1, color2, pct);
  gl_FragColor = vec4(color, 1.0);
}
