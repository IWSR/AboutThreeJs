precision mediump float;

// 与 vertex 不同，只能从 varyings 取到 arandom，并且需要声明在 vertex 内
varying float vRandom;
varying vec2 vUv;

uniform vec3 uColor;
uniform sampler2D uTexture;

void main()
{
  vec4 textureColor = texture2D(uTexture, vUv);
  // gl_FragColor=vec4(uColor,1.0);
  gl_FragColor = textureColor;
}
