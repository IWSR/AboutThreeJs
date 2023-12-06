#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  uv *= 10.0;
  uv = fract(uv);
  gl_FragColor = vec4(vec2(uv), 1.0, 1.0);
}
