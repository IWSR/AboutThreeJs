#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 MovingCeil(vec2 uv) {
  float time = u_time * 0.2;

  if (fract(time) > 0.5) {
    if (fract(uv.y * 0.5) > 0.5) {
      uv.x += fract(time) * 2.0;
    } else {
      uv.x -= fract(time) * 2.0;
    }
  } else {
    if (fract(uv.x * 0.5) > 0.5) {
      uv.y += fract(time) * 2.0;
    } else {
      uv.y -= fract(time) * 2.0;
    }
  }

  return uv;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  uv *= 10.0;
  vec3 col = vec3(0);
  uv = MovingCeil(uv);
  uv = fract(uv) - 0.5;
  float d = length(uv);
  col += smoothstep(0.3, 0.28, d);
  gl_FragColor = vec4(col, 1.0);

  // uv *= 10.0;
  // uv = fract(uv);
  // gl_FragColor = vec4(vec2(uv), 1.0, 1.0);
}
