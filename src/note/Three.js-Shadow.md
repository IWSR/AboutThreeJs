# Three.js —— Shadow

## mapSize

mapSize 是用于设置光源的阴影贴图的大小的属性。阴影贴图是用来存储场景中物体的阴影信息的图像。贴图的大小会影响阴影的精度和质量。

## 透视相机

near 属性代表阴影相机的近裁剪面。它定义了相机视锥体中距离相机最近的可见点的距离。物体离相机比这个距离更近的部分将不会被阴影相机渲染，因此不会产生阴影。

far 属性代表阴影相机的远裁剪面。它定义了相机视锥体中距离相机最远的可见点的距离。物体离相机比这个距离更远的部分也将不会被阴影相机渲染，同样不会产生阴影。

通过调整这两个属性，您可以控制阴影相机的渲染范围，以确保只有需要阴影的物体被包括在阴影贴图中。这可以帮助提高性能，因为不需要渲染远离相机的物体。

top、right、bottom 和 left 这四个属性分别表示视锥体的上、右、下和左边界。它们一起定义了相机在场景中可以看到哪些物体。通过调整这些属性，您可以控制阴影相机的视野范围，以确保只有需要产生阴影的物体被包括在视锥体内。

## shadow map algorithm

### THREE.BasicShadowMap （性能好，表现一般）

THREE.BasicShadowMap 是 Three.js 中的一个阴影映射类型。它是阴影映射的一种方法，用于渲染实时阴影效果。

BasicShadowMap 通常用于性能要求较低的场景，它提供了一种相对简单的方式来生成阴影。然而，它的质量可能不如其他高级阴影映射技术，如 PCFSoftShadowMap 或 PCFShadowMap，但它的性能更好。

要在 Three.js 中使用 BasicShadowMap，你需要配置场景中的光源（通常是平行光或聚光灯）以生成阴影，并将 renderer.shadowMap 设置为 THREE.BasicShadowMap，以告诉渲染器使用基本的阴影映射。

### THREE.PCFShadowMap（default）

THREE.PCFShadowMap 是 Three.js 中的一种阴影映射类型，它代表 Percentage Closer Filtering (PCF) 阴影映射。PCF 是一种用于提高阴影质量的技术，特别是减少阴影锯齿效应的技术。

在 PCF 阴影映射中，多个样本点被用于确定一个像素是否被阴影遮挡，然后根据这些样本的结果来平滑阴影边缘，从而减少锯齿效应。THREE.PCFShadowMap 通常用于需要更高质量阴影的场景，但它可能会比 BasicShadowMap 要慢一些。

要在 Three.js 中使用 THREE.PCFShadowMap，你需要配置场景中的光源（通常是平行光或聚光灯）以生成阴影，并将 renderer.shadowMap 设置为 THREE.PCFShadowMap，以告诉渲染器使用 PCF 阴影映射。

### THREE.PCFSoftShadowMap

THREE.PCFSoftShadowMap 是 Three.js 中的一种阴影映射类型，它代表 Percentage Closer Filtering Soft Shadows (PCF Soft Shadows) 阴影映射。PCF Soft Shadows 是一种用于创建柔和、更真实的阴影效果的技术。

与普通的 PCF 阴影映射不同，PCF Soft Shadows 通过在每个阴影像素周围采样多个点并应用柔和的混合来创建更加平滑和逼真的阴影。这可以减轻锯齿效应，使阴影的边缘看起来更柔和。

要在 Three.js 中使用 THREE.PCFSoftShadowMap，你需要配置场景中的光源（通常是平行光或聚光灯）以生成阴影，并将 renderer.shadowMap 设置为 THREE.PCFSoftShadowMap，以告诉渲染器使用 PCF Soft Shadows。

### THREE.VSMShadowMap

THREE.VSMShadowMap 代表 Variance Shadow Mapping (VSM) 阴影映射，是 Three.js 中的一种阴影渲染技术。VSM 阴影映射是一种用于实现柔和、高质量阴影的技术，特别适用于需要真实感和精细阴影的场景。

Variance Shadow Mapping 通过计算阴影像素的方差来实现柔和阴影。这种方法可以减轻锯齿效应，使阴影边缘看起来更加平滑。与传统的硬阴影映射技术相比，VSM 能够提供更高质量的阴影效果，特别是在光源和接收阴影物体之间有大量小型细节的情况下。

要在 Three.js 中使用 THREE.VSMShadowMap，你需要将渲染器的阴影映射类型设置为 THREE.VSMShadowMap，并且要确保你的光源（通常是平行光或聚光灯）配置为支持阴影。
