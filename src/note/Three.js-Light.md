# Three.js-Light

Light 比较耗费性能，能少用就少用

## ambientLight (环境光) minimal cast

> AmbientLight（环境光）是 Three.js 中的一种光源类型，它用于模拟环境中的全局光照，不会产生阴影。环境光是一种均匀分布的
>
> 环境光的作用是在没有其他光源的情况下，确保场景中的对象不会变得完全黑暗。它为对象提供了一个基本的光照，使它们可见，但不会产生明显的阴影效果。
>
> 在 Three.js 场景中，通常会将环境光与其他类型的光源（如点光源、平行光源等）一起使用，以实现更复杂的光照效果。环境光通常用于增强场景的整体亮度，并提供一种均匀的背景光照。

<img width="763" alt="image" src="https://github.com/IWSR/AboutThreeJs/assets/18499412/1ab17f63-c0a6-4cac-86b4-1a0539cecb77">

## directionalLight (环境光) moderate cost

> 它模拟了一个远处光源，光线是平行的，类似于太阳光。平行光在 Three.js 场景中通常用于模拟日光或其他来自远处的主要光源。
>
> 平行光的光线是平行的，因此它照亮所有方向，并且不会产生阴影。平行光通常用于为场景中的对象提供主要的全局光照，类似于太阳的光照效果。它是实现日光、黄昏和日落等自然光照效果的重要组成部分。

<img width="394" alt="image" src="https://github.com/IWSR/AboutThreeJs/assets/18499412/8d12d040-693e-491b-9925-a7faa16f9574">

## hemisphereLight（半球光）minimal cast

> 它用于模拟半球天空的光照效果。半球光通常用于模拟室外场景的光照，特别是在天空的上半部分和下半部分具有不同颜色和强度的情况下。
>
> 半球光的光线是从天空光颜色渐变到地面光颜色，这种渐变效果使得天空部分的光强度更强，而地面部分的光强度较弱。这种效果通常用于模拟自然光照下的场景，例如室外场景。
>
> 半球光通常不会产生明显的阴影效果，它主要用于为场景中的对象提供全局光照，但不会产生尖锐的阴影。你可以根据需要调整半球光的颜色和强度，以实现不同时间和氛围下的光照效果。

<img width="286" alt="image" src="https://github.com/IWSR/AboutThreeJs/assets/18499412/19d2bb60-5dc2-47c4-a0da-5a585ddb7ea4">

## pointLight（点光源）moderate cost

> 它模拟了一个光源，光线是从一个点向所有方向辐射出去的，类似于灯泡发出的光线。点光源通常用于模拟在场景中特定点处发光的物体，例如灯泡、星星或火焰等。

- color 是光的颜色，通常使用十六进制颜色值表示，例如 0xffffff 表示白色光。
- intensity 是光的强度，通常在 0 到 1 之间，可以控制光的亮度。
- distance 是光的有效照射距离，超过这个距离的物体将不再受到光照。这个参数可以用来模拟光线的衰减效果。
- decay 是光的衰减因子，通常在 1 到 2 之间，用于调整光线的衰减强度。

> 点光源的光线是从光源位置向所有方向辐射出去的，因此它照亮了所有在其照射范围内的对象。点光源可以用来模拟强度均匀的光源，例如灯泡发出的光。
>
> 点光源通常会产生明显的阴影效果，特别是在物体之间有阻挡关系时。你可以将点光源的位置和参数调整到适合你的场景需求，以获得所需的光照效果。

<img width="272" alt="image" src="https://github.com/IWSR/AboutThreeJs/assets/18499412/837830d9-766e-46a3-8fc4-8d9dffa4568b">

## RectAreaLight high cost

> 用于模拟矩形区域光源。与点光源或聚光灯不同，矩形区域光源投射出一个矩形的光束，可以用于模拟一些特殊的光照效果，如窗户光、屏幕光等。

- 颜色（Color）：你可以通过 color 属性来设置光源的颜色，如 light.color.set(0xff0000)，这将设置光源的颜色为红色。

- 强度（Intensity）：使用 intensity 属性来控制光源的强度。较高的强度值会产生更明亮的光照效果。

- 位置和朝向：与其他光源一样，你可以使用 position 属性来设置光源的位置，使用 rotation(lookAt?) 属性来设置光源的朝向。

- 矩形区域：RectAreaLight 是矩形区域光源，你可以通过 width 和 height 属性来定义矩形的宽度和高度。这决定了矩形光源的尺寸。

- 阴影：RectAreaLight 支持产生阴影。你可以启用阴影并配置阴影相关的属性，以模拟光源的阴影效果。

- 投射方向：光源的投射方向是垂直于矩形的表面的。你可以通过旋转光源来改变光线的投射方向。

RectAreaLight 可以用于创建一些有趣的光照效果，尤其是在需要模拟矩形区域光源的情况下。在使用时，你可以根据需求调整颜色、强度、尺寸和位置等属性来实现所需的效果。

<img width="445" alt="image" src="https://github.com/IWSR/AboutThreeJs/assets/18499412/bddbd160-ffa6-4049-a719-5ed1e5d23bd2">

## SpotLight high cost

> 它用于模拟聚光灯效果。聚光灯是一种向特定方向发射光束的灯光，通常用于突出或聚焦在特定区域内的物体。

- color
- intensity
- distance
- angle
- penumbra
- decay

- 颜色（Color）：你可以通过 color 属性来设置光源的颜色，如 light.color.set(0xffffff)，这将设置光源的颜色为白色。

- 强度（Intensity）：使用 intensity 属性来控制光源的强度。较高的强度值会产生更明亮的光照效果。

- 位置和朝向：你可以使用 position 属性来设置光源的位置，使用 target 属性来指定光线的目标位置，以确定聚光灯的朝向。

- 角度和锥体（Cone）：通过 angle 属性设置聚光灯的发射角度，以确定光束的扩散范围。penumbra 属性可以用来定义聚光灯边缘的柔和度。

- 距离和衰减：distance 属性定义了光照的最大距离，而 decay 属性控制光线在距离上的衰减速度。

- 阴影：SpotLight 支持产生阴影。你可以启用阴影并配置阴影相关的属性，以模拟光源的阴影效果。

SpotLight 可以用于模拟各种光照效果，尤其是在需要突出或聚焦在特定区域内的物体时。你可以根据需要调整颜色、强度、发射角度、距离、柔和度等属性来实现所需的效果。

<img width="377" alt="image" src="https://github.com/IWSR/AboutThreeJs/assets/18499412/1d9ce603-36d8-44cc-b614-f052b4a4b6e0">

## bake the light into texture
