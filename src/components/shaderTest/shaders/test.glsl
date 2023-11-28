#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    // 将像素位置转换至(0, 1)内
    vec2 st = gl_FragCoord.xy/u_resolution;

    // 在0.1-0.9的位置进行插值，这里的y是什么?
    float y = smoothstep(0.1,0.9,st.x);
    // 为什么要把 y 存在颜色里
    vec3 color = vec3(y);
    // 虽然知道这里是在画绿色的曲线，两个smoothstep相减是想做什么。。。
    // smoothstep 的曲线即使不做其他操作也和图里的差不多啊
    float pct = plot(st,y);
    // 这里感觉像是根据像素位置计算颜色，靠近左边的黑vec3(0.0, 0.0, 0.0)，靠近右边的白vec3(1.0, 1.0, 1.0)
    // 在曲线上则绘制绿色，但这个pct里面存着的到底是什么信息？
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}
