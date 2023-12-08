# 常用函数

## abs()

abs 是用于计算绝对值的函数。它接受一个参数并返回其绝对值。

```glsl
  float x = -5.0;
  float absX = abs(x); // absX 等于 5.0
```

在矢量和矩阵上也可以使用 abs 函数，它将逐元素计算每个元素的绝对值。

```glsl
  vec3 vec = vec3(-2.0, 3.0, -4.0);
  vec3 absVec = abs(vec); // absVec 等于 vec3(2.0, 3.0, 4.0)
```

## sign()

sign 函数用于获取一个数的符号信息。具体而言，sign 返回一个表示输入值的符号的浮点数，其定义如下：

- 如果输入值为负数，sign 返回 -1.0。
- 如果输入值为零，sign 返回 0.0。
- 如果输入值为正数，sign 返回 1.0。

```glsl
float x = -5.0;
float signX = sign(x); // signX 等于 -1.0

float y = 8.0;
float signY = sign(y); // signY 等于 1.0

float z = 0.0;
float signZ = sign(z); // signZ 等于 0.0
```

sign 函数可以应用于各种支持数值操作的数据类型，包括浮点数、整数等。在矢量和矩阵上，sign 函数将逐元素计算每个元素的符号。

```glsl
vec3 vec = vec3(-2.0, 3.0, 0.0);
vec3 signVec = sign(vec); // signVec 等于 vec3(-1.0, 1.0, 0.0)
```

### ceil/floor()

ceil 和 floor 函数用于取上限和取下限，分别用于将浮点数向上舍入或向下舍入到最接近的整数。

- ceil(x)：返回不小于 x 的最小整数，即向正无穷方向舍入。
- floor(x)：返回不大于 x 的最大整数，即向负无穷方向舍入。

```glsl
float x = 5.8;
float ceilX = ceil(x);   // ceilX 等于 6.0

float y = -3.2;
float floorY = floor(y); // floorY 等于 -4.0
```

这两个函数也适用于矢量和矩阵，它们将逐元素地应用于每个元素。

```glsl
vec3 vec = vec3(2.5, -1.7, 3.3);
vec3 ceilVec = ceil(vec);   // ceilVec 等于 vec3(3.0, -1.0, 4.0)
vec3 floorVec = floor(vec); // floorVec 等于 vec3(2.0, -2.0, 3.0)
```

总体而言，ceil 和 floor 函数对于控制浮点数的舍入非常有用，尤其在需要整数值时。

### smoothstep()

smoothstep 是在GLSL（OpenGL着色器语言）中常用的插值函数，用于在两个边界之间进行平滑插值。smoothstep 函数采用三个参数：edge0，edge1，和 x，并返回介于0和1之间的值，表示在 edge0 和 edge1 之间插值的平滑过渡。

```glsl
float smoothstep(float edge0, float edge1, float x);
```

- 当 x 小于 edge0 时，smoothstep 返回 0.0。
- 当 x 大于 edge1 时，smoothstep 返回 1.0。
- 当 x 在 edge0 和 edge1 之间时，smoothstep 返回一个在这个范围内平滑变化的值。

这个平滑过渡是通过 Hermite 样条插值来实现的，它确保在边界处导数连续，从而避免了插值时的锯齿状效果。

```glsl
float edge0 = 2.0;
float edge1 = 5.0;
float x = 3.8;

float result = smoothstep(edge0, edge1, x);
```

在这个示例中，result 将是介于0和1之间的值，表示在 edge0 和 edge1 之间进行的平滑插值。 x 的值决定了插值的位置。

```glsl
smoothstep(edge0, edge1, x) = t * t * (3 - 2 * t)
```

其中 t 是 clamp((x - edge0) / (edge1 - edge0), 0, 1)。

![Alt text](../image/smoothstep2.png)

### step

step 函数用于执行阶梯函数。阶梯函数在某个边界点上跳跃，表示当输入值小于边界时返回0.0，大于等于边界时返回1.0。

```glsl
float step(float edge, float x);
```

- 当 x 小于 edge 时，step 返回 0.0。
- 当 x 大于等于 edge 时，step 返回 1.0。

这个函数的用途之一是在着色器中创建阶梯状效果，例如将连续的颜色映射到离散的颜色区间。

```glsl
float edge = 3.0;
float x = 2.5;

float result = step(edge, x); // 0.0
```

step 函数也可以应用于矢量和矩阵，将逐元素执行。例如：

```glsl
vec3 edge = vec3(1.0, 2.0, 3.0);
vec3 vec = vec3(0.5, 2.5, 4.0);

vec3 resultVec = step(edge, vec); // resultVec 等于 vec3(0.0, 1.0, 1.0)

```

### mod

mod 函数用于计算除法的余数。mod 函数的定义如下：

```glsl
float mod(float x, float y);
```

mod 函数返回 x 除以 y 的余数。具体计算方式可以用以下公式表示：

```glsl
result = x - y * floor(x / y);
```

mod 函数可用于周期性动画、纹理坐标的循环等场景。

### mix

```
T mix(T x, T y, float a);
```

这里，T 是要进行插值的值的类型，可以是 float、vec2、vec3、vec4 等。参数 x 和 y 是要进行插值的两个值，而参数 a 是插值的权重，通常在 0.0 到 1.0 之间。

函数的计算方式为：

```
result = x * (1.0 - a) + y * a;
```

### clamp

> 在图形编程中，clamp 函数常用于确保值在一定范围内，例如在颜色计算、法线计算等方面。

```glsl
T clamp(T x, T minVal, T maxVal);
```

这里，T 是要进行限制的值的类型，可以是 float、vec2、vec3、vec4 等。参数 x 是要进行限制的值，而 minVal 和 maxVal 分别是允许的最小和最大值。

clamp 函数的计算方式为：

```glsl
result = min(max(x, minVal), maxVal);
```

这意味着如果 x 小于 minVal，则结果为 minVal；如果 x 大于 maxVal，则结果为 maxVal；否则结果为 x。

示例

```glsl
float result1 = clamp(2.5, 0.0, 1.0);  // 结果为 1.0
vec3 result2 = clamp(vec3(0.2, -1.0, 0.8), vec3(0.0, -0.5, 0.0), vec3(1.0, 0.5, 1.0));  // 结果为 (0.2, -0.5, 0.8)
```

SDF-符号距离函数 ???

### fract

> 用于返回一个数的小数部分，即去除整数部分后的部分。

```glsl
float fract(float x);
vec2 fract(vec2 x);
vec3 fract(vec3 x);
vec4 fract(vec4 x);
```

- 对于标量（float），fract 返回输入值 x 的小数部分。
- 对于向量（vec2、vec3、vec4），fract 分别返回向量中每个分量的小数部分。

```glsl
float result = fract(3.75); // 结果为 0.75
```

在图形编程中，fract 常用于创建周期性的效果，如循环纹理映射或动画。通过获取时间的小数部分，可以实现周期性的变化，而不受时间的整数部分影响。
