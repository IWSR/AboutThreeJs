# Three.js —— Material

- color: THREE.Color / 0xff0000 / red / #ff0000 /rgb(255, 0, 0)
- map: (map)
- wireframe: (boolean) it will show the triangles that compose the geometry
- transparent: (boolean)
- opacity: (number 0~1)
- alphaMap:(map) control the transparency with a texture
- side: THREE.FrontSide / THREE.BackSide / THREE.DoubleSide

## MeshBasicMaterial

> 通常用于创建没有光照影响的材质。它在渲染时不考虑光照效果，直接使用基本的颜色或纹理。

- 无光照影响： MeshBasicMaterial 不会受到光照的影响，它的颜色或纹理将始终保持不变。这使得它适用于创建不受光照影响的基本材质，如纹理贴图、颜色块等。
- 基本颜色或纹理： 你可以使用 color 属性来设置物体的基本颜色。此外，你还可以使用纹理贴图来覆盖物体的颜色，从而实现更多的细节和外观效果。
- 无阴影和高光： 由于 MeshBasicMaterial 不考虑光照，所以它不会产生阴影和高光效果。这使得它在一些简单的场景中使用非常方便。

## MeshNormalMaterial

> 用于渲染 3D 模型的法线信息。法线信息是指在每个顶点上定义的向量，用于表示表面的朝向和曲率。MeshNormalMaterial 允许你可视化模型的法线，从而更好地理解模型的几何结构。

- 法线可视化： MeshNormalMaterial 会根据模型的法线信息来渲染表面。这可以让你看到模型表面的法线方向，从而更好地了解模型的几何形状和曲率。
- 无光照影响： 与 MeshLambertMaterial 或 MeshStandardMaterial 不同，MeshNormalMaterial 并不考虑光照效果。它只关注法线信息，而不会受到光照的影响。
- 法线贴图： 除了使用模型的实际法线信息外，你还可以将法线贴图应用到 MeshNormalMaterial 上。法线贴图是一种纹理，用于在不改变模型几何的情况下调整法线方向，从而在视觉上改变表面的外观。

## MeshMatcapMaterial

> Matcap 是一种技术，通过预先渲染的球形贴图来模拟物体的表面外观，从而在渲染时产生非常逼真的效果。

- Matcap 效果： MeshMatcapMaterial 使用预先渲染的 Matcap 贴图来模拟物体表面的外观。Matcap 贴图是包含不同照明条件下物体表面光照效果的贴图，通过在每个点上查找对应的 Matcap 值，可以在渲染时获得逼真的外观。

- 高质量外观： 由于 Matcap 技术的特性，使用 MeshMatcapMaterial 可以获得非常高质量的外观效果，包括光滑的高光和阴影。

- 无光照设置： 与其他需要光照信息的材质不同，MeshMatcapMaterial 不需要光照设置，因为 Matcap 贴图已经包含了各种光照情况下的表面外观。

## MeshDepthMaterial

> 用于渲染 3D 模型的深度信息。深度信息是指从相机视角到每个像素的距离，它常用于实现深度效果和阴影效果,而不是用于展示物体的外观。

- 深度信息可视化： MeshDepthMaterial 可以将模型渲染为其深度信息的可视化。这意味着不同深度的像素将使用不同的颜色表示，从而在渲染时呈现出深度信息。

- 用于阴影计算： 深度信息常用于计算阴影效果。通过渲染场景的深度图，可以在光照计算过程中确定哪些像素处于阴影中。

- 无颜色和光照： 与其他材质类型不同，MeshDepthMaterial 不考虑颜色和光照效果。它仅关注深度信息，因此在渲染时不会有颜色变化和光照效果。

## MeshLambertMaterial

> 它基于 Lambert 光照模型，考虑了漫反射光照效果，是在基础光照环境下创建物体的常用材质之一。如果你需要更高级的光照效果，例如镜面反射和折射，你可能需要考虑使用其他材质类型，如 MeshPhongMaterial 或 MeshStandardMaterial。

- 漫反射光照： MeshLambertMaterial 考虑了漫反射光照效果，即物体表面上的光线均匀地反射到各个方向。这使得物体表面呈现出柔和的外观，不会产生明显的镜面高光。

- 光照衰减： 与光源的距离远近会影响物体表面的光照强度。离光源越远的区域会受到更弱的光照，从而产生自然的光照衰减效果。

- 颜色和纹理： 可以设置 MeshLambertMaterial 的颜色属性来定义物体的基本颜色。此外，也可以使用纹理贴图来覆盖物体的颜色，实现更多的细节和外观效果。

- 不支持阴影和高光： 与一些其他材质类型不同，MeshLambertMaterial 不支持镜面高光和折射效果。它主要用于模拟基础的光照效果。

## MeshPhongMaterial

> 它基于 Phong 光照模型，提供了更高级的光照效果，包括镜面高光和折射。由于它需要计算镜面反射和折射，可能会比较耗费计算资源。如果你需要更快速的渲染，你可能需要考虑使用其他材质类型，如 MeshLambertMaterial 或 MeshStandardMaterial。

- Phong 光照模型： MeshPhongMaterial 基于 Phong 光照模型，考虑了环境光、漫反射光和镜面光照效果。这使得物体表面可以同时呈现出柔和的漫反射和高亮的镜面高光。

- 镜面高光： MeshPhongMaterial 支持镜面高光效果，即物体表面会反射光源的镜面光线，产生高亮的反射点。这在模拟具有光泽和光滑表面的物体时非常有用。

- 折射： 除了镜面高光，MeshPhongMaterial 也支持折射效果。这意味着物体可以透过其他物体看到背后的物体，产生透明和折射的效果。

- 颜色和纹理： 类似于其他材质类型，你可以使用 MeshPhongMaterial 的颜色属性来定义物体的基本颜色。你还可以应用纹理贴图来实现更丰富的外观效果。

## MeshToonMaterial

> 它类似于 MeshPhongMaterial，但设计用于模拟卡通风格的渲染效果。MeshToonMaterial 主要用于实现卡通风格的渲染，适用于一些特定的视觉风格需求。如果你需要更为真实的光照效果，你可能需要考虑使用其他材质类型，如 MeshPhongMaterial 或 MeshStandardMaterial。

- 卡通风格渲染： MeshToonMaterial 通过使用基于 Phong 光照模型的方式，模拟卡通风格的渲染效果。它在漫反射、镜面高光和阴影方面类似于 MeshPhongMaterial，但会强调更为平滑和简化的颜色过渡。

- 色块渐变： 与实际物体上的光照相反，MeshToonMaterial 使用分段的色块来表示不同亮度区域。这使得物体的颜色过渡更加平滑和简化，产生类似于卡通风格的渲染效果。

- 不支持真实光照效果： MeshToonMaterial 旨在模拟卡通风格，因此不支持真实的光照效果，如真实的镜面高光和折射。它适用于需要卡通化外观的场景。

## MeshStandardMaterial

> 它是一种高级的材质，用于渲染 3D 模型的外观。这种材质通常用于实现更真实的光照效果，包括金属感、粗糙度、环境遮挡等。由于 MeshStandardMaterial 考虑了多种光照和表面属性，它通常会在计算上消耗更多资源。它适用于需要更高级光照效果和更真实外观的场景，但在一些情况下可能会导致性能下降。

- PBR（Physically-Based Rendering）光照模型： MeshStandardMaterial 基于物理渲染（PBR）光照模型，考虑了漫反射、镜面反射、金属感、粗糙度和环境遮挡等因素，以实现更真实的外观。

- 金属感和粗糙度： 通过设置金属感（metalness）和粗糙度（roughness）属性，可以调整材质表面的金属感和光滑程度。金属感会影响光线在表面的反射方式，而粗糙度会影响光的散射效果。

- 环境遮挡： MeshStandardMaterial 支持环境遮挡贴图（AO Map），它用于模拟物体表面不受光照直接照射的区域，从而产生更真实的遮挡效果。

- 镜面反射： 与其他材质类型相比，MeshStandardMaterial 的镜面反射效果更加真实。通过设置环境贴图（envMap）可以模拟物体周围的环境反射。
