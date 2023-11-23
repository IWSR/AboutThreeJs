# Three.js-Shaders

## Vertex Shader

> 它在图形渲染的顶点处理阶段发挥作用。Vertex shader 是一段在 GPU 上执行的程序，主要用于对输入的顶点进行变换和处理。

Vertex shader 在图形管线中的位置

```
[Input Vertex Data] -> [Vertex Shader] -> [Output Vertex Data]
```

Vertex shader 通常执行以下任务：

- 顶点变换（Vertex Transformation）： 将模型空间的顶点坐标变换到世界空间、相机空间或裁剪空间。

- 光照计算（Lighting Calculation）： 根据光照模型计算顶点的颜色或光照强度。

- 投影变换（Projection Transformation）： 将相机空间中的坐标变换到裁剪空间。

- 传递数据（Data Passing）： 将处理后的顶点数据传递给 fragment shader 以及其他渲染管线的阶段。

- 其他定制化的计算： 根据需要执行其他自定义的顶点级计算。

## Fragment Shader

> Fragment shader 是在图形渲染管线的片段处理阶段执行的程序。它负责计算每个屏幕上的像素的最终颜色。Fragment shader 接收由 vertex shader 传递的信息，并对每个片段进行光照、纹理贴图、颜色计算等操作。

Fragment shader 在图形管线中的位置如下：

```
[Input Fragment Data] -> [Fragment Shader] -> [Output Color]
```

- 顶点变换（Vertex Transformation）： 将模型空间的顶点坐标变换到世界空间、相机空间或裁剪空间。

- 光照计算（Lighting Calculation）： 根据光照模型计算顶点的颜色或光照强度。

- 投影变换（Projection Transformation）： 将相机空间中的坐标变换到裁剪空间。

- 传递数据（Data Passing）： 将处理后的顶点数据传递给 fragment shader 以及其他渲染管线的阶段。

- 其他定制化的计算： 根据需要执行其他自定义的顶点级计算

## Threejs 的 ShaderMaterial & RawShaderMaterial

> Properties like map,alphaMap,opacity, color,etc.won't work and we needto write these features ourselves

## glsl 的数据类型

int/ float/ boolean/ Vector2/ Vector3/ Vector4 / mat2, mat3, mat4(矩阵), sampler2D

```glsl
bool foo = true;

// 1
vec2 foo = vec2(1.0, 2.0); // x, y 默认值 0.0, 0.0
foo.x = 1.0;
foo.y = 2.0;
foo *= 2.0; // 所有属性都乘 2.0

// 2
vec3 purpleColor = vec3(0.0); // (x, y, z) / (r, g, b)
purpleColor.r = 0.5;
purpleColor.b = 0.5;

// 3
vec2 foo = vec2(0.0);
vec3 bar = vec3(vec2, 0.0);
vec2 foo2 = bar.xy;
vec2 foo3 = bar.yx; // swizzle

// 4
vec4 foo = vec4(1.0, 2.0, 3.0, 4.0); // (x, y, z, w) / (r, g, b, a)
vec4 bar = vec4(foo.zw, vec2(5.0, 6.0));

// int -> float convert type
float a = 1.0;
int b = 2;
float c = a * float(b);

// function
// void
float loremIpsum(float a, float b)
{
 return a + b;
}

void main()
{
 // 该函数会被自动执行
 // void 为空，不会返回值
 ...
}
```

Many built-in classic functions **sin**, **cos** , **max**, **min** , **pow**, **exp**, **mod**, **clamp**

but also very practical functions like **cross**, **dot**, **mix**, **step**, **smoothstep**, **length**, **distance**, **reflect**, **refract**, **normalize**

## glsl 的已有变量

- gl_Position
  - Will contain the position of the vertex on the screen
- attribute vec3 position
- gl_FragColor
  - Will contain the color of the fragment
  - vec4(r, g, b and a)

## Percision(精度)

The percision of float can be:

- highp
  - 可能造成性能问题，某些设备也可能不支持
- mediump
  - 通常使用的
- lowp
  - 可能由于精度不够造成bug

```glsl
precision mediump float;
```
