#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float sdfSegment(vec2 p, vec2 a, vec2 b) {
  vec2 ap = p - a;
  vec2 ab = b - a;

  float k = clamp(dot(ap, ab)/dot(ab, ab), 0.0, 1.0);
  float d = length(ap-k*ab);
  return d;
}

void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float dl = step(sdfSegment(p, vec2(0.0, 0.1), vec2(0.0, 0.5)), 0.03);
  gl_FragColor = vec4(dl);
}
