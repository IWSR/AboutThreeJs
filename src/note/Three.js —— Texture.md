# Three.js —— Texture

Mesh 在 Three.js 内是一个重要的概念，它是用于在场景中渲染三维物体的关键组件。Mesh 通过结合 Geometry（几何体） 与 Material （材质）创建出了可以在渲染器内显示的可视化对象。

在 Three.js 中，Material 可以包含复数个 Texture（纹理 / 贴图）用以描述物体表面的细节，如物体表面的凹凸可以使用法线贴图（normal map）或者位移贴图（displacement map）、物体表面的环境映射可以使用环境光贴图（spherical map / cube map）、物体表面的 kd （漫反射系数、也属于材质的一部分属性） 与不需要实时计算的阴影（Ambient Occlusion map）等也可以使用 Texture 来实现。

## 常见 Texture 的类型

Texture 根据不同的使用场景可被分为多种类型，以下将介绍其中常见的一部分。

### Color Map（颜色贴图）

Color Map 用于将颜色信息应用到三维模型的表面。它是物体材质的一部分，用于赋予模型以特定的颜色。Color Texture 可以包含物体的基本颜色，也可以用于模拟物体的纹理、图案、细节等。

其作用包括：

* **基本颜色：** 最常见的用途是为物体提供基本的颜色。你可以将一张纯色的贴图应用到物体上，从而使物体呈现特定的外观。这可以用于模拟各种不同类型的材质，如金属、塑料、木材等。
* **纹理：** 你可以将一张包含图案、纹理或细节的贴图应用到物体上，从而在模拟物体表面的视觉细节时提供更多的控制。这可以使物体看起来更加真实，比如木纹、石纹等。
* **颜色变化：** 通过在贴图中使用不同的颜色区域，你可以使物体的颜色在不同的部分发生变化，从而实现艺术上的效果或者强调物体的特定部分。
* **定制效果：** 你可以使用 Color Texture 来实现各种视觉效果，比如为一个车辆模型添加品牌标志，或者为一个角色模型添加独特的外观。

### Alpha Map

Alpha Map 用于指定三维模型表面上每个像素的透明度值（Alpha 通道）。透明度贴图允许你在渲染时控制物体的透明程度，从而实现透明、半透明和不透明的效果。

![image](https://github.com/IWSR/BLOG/assets/18499412/1fff79a9-278e-4f8b-938d-284bc8ed9497)

如图中左侧的树叶的纹理在经过黑白部分（白色区域可见、黑色区域不可见）的 Alpha Texture 处理后便会裁剪掉黑色部分的区域，从而得到右侧干净的树叶。

其作用包括：

* **透明效果：** 透明度贴图可以使物体的部分区域变得透明，从而让你能够实现像玻璃、水、烟雾等透明效果。
* **半透明效果：** 通过透明度贴图，你可以让物体的部分区域变得半透明，从而在视觉上模拟材质的半透明特性，比如薄雾、云朵等。
* **不透明物体的透明部分：** 即使是不透明的物体，也可能有部分区域需要是透明的，如一个物体上的玻璃窗户。
* **复杂的图案和纹理：** 透明度贴图可以结合颜色贴图来实现复杂的图案和纹理，其中一些区域是透明的。

### Normal Map（法线贴图）

Normal Map 被用于在渲染中模拟表面细节，从而增强物体的视觉效果。法线贴图不会改变物体的实际几何结构，而是通过在每个像素处存储法线信息，改变光照计算，从而使物体在渲染时看起来具有更多的细节和深度。由于其并不会实际改变几何结构，因此在实时光照下生成的阴影也只会是原本几何结构的现状。

其作用包括：

* **增加细节：** 法线贴图可以在不增加多边形数量的情况下，给物体表面增加细节。这使得物体看起来更加真实，因为光照效果会因为法线的改变而发生变化，营造出凹凸的效果。
* **模拟凹凸效果：** 法线贴图可以用来模拟物体表面的凹凸效果，如凹陷、突起、皱纹等。这些细节会在光照计算中产生阴影和高光，使物体看起来更具质感。
* **节省多边形数量：** 使用法线贴图可以避免使用大量的多边形来表示物体的细节，从而减轻计算负担，提高性能。

### Ambient Occlusion Map（环境遮蔽贴图）

环境遮蔽贴图（Ambient Occlusion Map）被用于在渲染中模拟环境遮蔽效果。它是一种灰度图像，其中每个像素表示物体表面在凹陷或相对遮挡的程度，从而可以用于调整物体在渲染时的光照效果，增加细节感和深度感。

其作用包括：

* **模拟遮蔽效果：** 环境遮蔽贴图可以模拟环境中的遮挡和遮蔽，使暗角和凹陷的区域看起来更暗。这增加了物体的深度感和视觉细节。
* **增强表面质感：** 通过在环境遮蔽贴图中存储凹凸信息，可以使物体的表面看起来更具纹理和质感。
* **增加真实感：** 使用环境遮蔽贴图可以增加渲染的现实感，使物体看起来更接近真实世界中的光照和遮挡效果。

### Metalness Map（金属度贴图）

Metalness Map 用于在渲染中控制物体表面的金属度属性。金属度是一个决定物体是金属性还是非金属性（绝缘体）的属性。金属度贴图在PBR（Physically Based Rendering，基于物理的渲染）中非常常见，用于实现更真实的渲染效果。

* **控制金属度：** 金属度贴图的每个像素可以表示对应区域的金属度属性。对于金属物体，金属度值较高，而对于非金属物体，金属度值较低。
* **影响反射：** 金属度会影响物体对光的反射行为。金属物体具有高反射率，而非金属物体的反射率相对较低。
* **增加真实感：** 通过使用金属度贴图，你可以让物体的不同部分表现出不同的金属性质，从而增加渲染的真实感。

### Roughness Map（粗糙度贴图）

Roughness Map 用于在渲染中控制物体表面的粗糙度属性。粗糙度是一个决定物体表面光滑度的属性，粗糙的表面会散射光线，使物体的反射更模糊，而光滑的表面会产生更锐利的反射。

其作用包括：

* **控制光滑度：** 粗糙度贴图的每个像素可以表示对应区域的粗糙度属性。高粗糙度值意味着表面更加粗糙，低粗糙度值表示表面更加光滑。
* **影响反射：** 物体表面的粗糙度会影响光线的散射程度，从而影响物体的反射行为。光滑表面会产生清晰的反射，而粗糙表面会产生模糊的反射。
* **增加真实感：** 通过使用粗糙度贴图，你可以为物体的不同部分设置不同的粗糙度，从而增加渲染的真实感和视觉细节。

## Code

这里我写了一个 [example](https://codesandbox.io/p/github/IWSR/AboutThreeJs/main?workspaceId=a22b45ee-fc74-4584-911e-f6f138beccb2) 可以进一步了解对应贴图的表现。下面聊聊我自己在学习中遇到的一些比较重要的点。

## Texture Magnification & Texture Minification （纹理放大与缩小）

在聊纹理放大/缩小前，需要明确一个前提——纹理的最小单位 texels（纹理像素） 与 pixels（像素） 不同，前者由纹理本身的精度决定大小，而后者由物理设备决定大小，因此有可能出现一个 texel 内包含多个 pixel 或是一个 pixel 内出现多个 texel 的情况。也就是说 texel 与 pixel 并不一定会完全重合，从而出现纹理覆盖到模型表面时会出现异常（如走样、摩尔纹之类的）

![image](https://github.com/IWSR/AboutThreeJs/assets/18499412/e5a61f8d-915e-4be2-a731-e99b75f21e73)

### Texture Magnification（纹理放大）

举例来说如果存在一个200 *200的纹理图像需要被应用在 500* 500 的平面上时必然会出现走样，我们需要了解纹理的每个 texel 在被应用到模型时需要经过 (u, v) 的转换，在这个例子内纹理会被拉伸放大，一个纹理像素的内容会被应用到 6.25 个像素上（也就是说这 6.25 个像素会拥有相同性质——不管是颜色还是法线方向）这显而易见的会使纹理变得模糊不清（如下图左）。

![image](https://github.com/IWSR/AboutThreeJs/assets/18499412/c51e945b-5a8e-4030-8609-c8239e4cf707)

虽然上图并非是我所举的例子，但图左的效果便是多个 pixel 使用了同一个 texel 的值导致的，在 Three.js 中也存在对应的属性（Three.NearestFilter）

> [NearestFilter](https://threejs.org/docs/index.html?q=Texture#api/en/constants/Textures) returns the value of the texture element that is nearest (in Manhattan distance) to the specified texture coordinates.

NearestFilter 的效果肉眼可见的糟糕，但好在它不需要额外的计算，对于一些不重要的内容可以选用。

除此之外，Three.js 也在纹理放大的场景下提供了LinearFilter 的选项，从描述上看不难判断出该选项基于 Bilinear Interpolation（双线性插值）

> LinearFilter is the default and returns the weighted average of the four texture elements that are closest to the specified texture coordinates, and can include items wrapped or repeated from other parts of a texture, depending on the values of [wrapS](https://threejs.org/docs/index.html#api/en/textures/Texture.wrapS) and [wrapT](https://threejs.org/docs/index.html#api/en/textures/Texture.wrapT), and on the exact mapping.

就如引言内提到的，对应像素上的值为其附近的 4 个纹理像素上的加权平均，该思想便是双线性插值的体现（Games101 p9 0:28 处有详细介绍、此处不展开），而这种方法会使图像拥有更加柔和的渐变（见上图中间部分）。

### Texture Minification 与 mipmap（纹理缩小与 mipmap）

与 Magnification 的情况相反，如果是在单个 pixel 内渲染多个 texel （如下图所示意的）。

![image](https://github.com/IWSR/AboutThreeJs/assets/18499412/4df9751e-f7a0-4d07-a7c5-ff256bb27962)

可以从图内看到一个像素内存在有多个纹素，如果按照之前 Nearest 的方式去应用距离像素中心最近的纹素的值，很显然也会丢失掉大多数信息从而导致走样（Three.NearestFilter），那如果使用上面提到的双线性插值（Three.LinearFilter）是否可以解决问题呢？如果该像素内只存在 4 个纹素倒是可以解决走样的问题，但如果一个像素内存在超过 4 个纹素那该走样的依然还是会走样，除非不断增加参与线性插值的纹素数量——比如 Bicubic Interpolation 就是通过对周围 16 个点进行加权平均从而提高精度来对抗走样，但很容易想到通过增加计算量来防止走样这样的做法无疑对性能有着很大的要求，因此为了减轻对客户端的性能开销，图形学内引入了一种名为 mipmap 的技术——将在其他机器上计算的结果塞入到 Texture 内，在 Minification 时直接使用 mipmap 上已有的计算结果从而减少对客户端的算力要求。（属于是空间换时间了，详细介绍可看 Games101 p9 0:43 或者参考资料内的 Real-Time Rendering 4th）

<img src="https://github.com/IWSR/AboutThreeJs/assets/18499412/210b16f2-2f20-4a00-a3ab-76ff563a937e" alt="image" style="zoom:50%;" />

在 Three.js 内关于 mipmap 的选项有：

* THREE.NearestMipmapNearestFilter：选择与要着色的像素大小最匹配的 mipmap，并使用 NearestFilter 条件（最靠近像素中心的纹素）生成纹理值。

* THREE.NearestMipmapLinearFilter：选择与要纹理的像素大小最匹配的两个 mipmap，并使用 NearestFilter 标准从每个 mipmap 生成纹理值。最终纹理值是这两个值的加权平均值。

* THREE.LinearMipmapNearestFilter ：选择与要纹理的像素大小最匹配的 mipmap，并使用 LinearFilter 标准（最接近像素中心的四个纹素的加权平均值）来生成纹理值。

* THREE.LinearMipmapLinearFilter：（默认）选择与要纹理的像素大小最匹配的两个 mipmap，并使用 LinearFilter 标准从每个 mipmap 生成纹理值。最终纹理值是这两个值的加权平均值。

关于 Three.js 内与纹理放大/缩小相关的官方例子可[参考](https://threejs.org/examples/#webgl_materials_texture_filters)。

### 参考资料

[GAMES101-现代计算机图形学入门-闫令琪](https://www.bilibili.com/video/BV1X7411F744?p=9&vd_source=087a5c011e05e20afe8b532203a38c3f)

[浅谈容易被忽视的纹素密度（Texel Density)](https://zhuanlan.zhihu.com/p/540899671)

[《Real-Time Rendering 4th》笔记——第六章 纹理贴图](https://ciel1012.github.io/2019/08/01/rtr6/)

[Direct3D 图形学习指南](https://learn.microsoft.com/zh-cn/windows/uwp/graphics-concepts/textures)
