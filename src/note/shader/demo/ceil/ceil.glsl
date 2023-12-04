#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main( void ) {
    vec2 uv =  (gl_FragCoord.xy) / u_resolution.y;
    vec3 col = vec3(0.0);
    uv *= 10.0;
    vec2 id = ceil(uv); //id.xy取值范围是[0,10]
    id /= 10.; //此时di.xy变成[0,1.1]
    col.xy += id; //所以渐变

    gl_FragColor = vec4(col,1.0);
}
