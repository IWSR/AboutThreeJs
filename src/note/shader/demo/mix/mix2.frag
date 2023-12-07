#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.149, 0.141, 0.912);
vec3 colorB = vec3(1.000, 0.833, 0.224);

float plot(vec2 st, float pct) {
  /**
    画线，线段长度为 0.02
    得到一个在 st.y 上的平滑阶梯函数。通过相减操作，两个阶梯函数的过渡部分会相互抵消，
    留下的是一个在 pct-0.01 到 pct+0.01 之间的区域为 1，而在其他地方为 0 的图案。
  */
  return smoothstep(pct - 0.01, pct, st.y) -
    smoothstep(pct, pct + 0.01, st.y);
}

void main() {
  // 归一化
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);

  vec3 pct = vec3(st.x);

    // pct.r = smoothstep(0.0,1.0, st.x);
    // pct.g = sin(st.x*PI);
    // pct.b = pow(st.x,0.5);

  color = mix(colorA, colorB, pct);

  // Plot transition lines for each channel
  // 这样的操作可以用于在图形或图像中突出显示或强调特定通道的过渡区域。
  color = mix(color, vec3(1.0, 0.0, 0.0), plot(st, pct.r));
  color = mix(color, vec3(0.0, 1.0, 0.0), plot(st, pct.g));
  color = mix(color, vec3(0.0, 0.0, 1.0), plot(st, pct.b));

  gl_FragColor = vec4(color, 1.0);
}
