#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main() {
  vec2 uv = (gl_FragCoord.xy * 30.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float d1 = smoothstep(0.0, 0.082, mod(uv.x, 1.0));
  float d2 = smoothstep(0.0, 0.082, mod(uv.y, 1.0));
  float d = d1*d2;
  gl_FragColor = vec4(d);
}
