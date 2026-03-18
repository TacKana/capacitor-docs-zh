---
title: Motion Capacitor Plugin API
description: Motion API 用于追踪加速度计和设备方向（如罗盘航向等）
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/motion/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/motion/src/definitions.ts
sidebar_label: Motion
---

# @capacitor/motion

Motion API 用于追踪加速度计和设备方向（如罗盘航向等）

## 安装

```bash
npm install @capacitor/motion
npx cap sync
```

## 权限

本插件目前使用 Web API 实现。大多数浏览器在使用此 API 前需要获取权限。可以通过任何用户触发的操作（例如按钮点击）来请求用户授权：

```typescript
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';


let accelHandler: PluginListenerHandle;

myButton.addEventListener('click', async () => {
  try {
    await DeviceMotionEvent.requestPermission();
  } catch (e) {
    // 处理错误
    return;
  }

  // 用户授权后，即可开始监听：
  accelHandler = await Motion.addListener('accel', event => {
    console.log('设备运动事件：', event);
  });
});

// 停止加速度监听
const stopAcceleration = () => {
  if (accelHandler) {
    accelHandler.remove();
  }
};

// 移除所有监听器
const removeListeners = () => {
  Motion.removeAllListeners();
};
```

请参阅 [`DeviceMotionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent) API 以了解 'accel' 事件提供的数据。

## API

<docgen-index>

* [`addListener('accel', ...)`](#addlisteneraccel-)
* [`addListener('orientation', ...)`](#addlistenerorientation-)
* [`removeAllListeners()`](#removealllisteners)
* [接口](#接口)
* [类型别名](#类型别名)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### addListener('accel', ...)

```typescript
addListener(eventName: 'accel', listenerFunc: AccelListener) => Promise<PluginListenerHandle>
```

添加加速度计数据监听器

| 参数                 | 类型                                                       |
| -------------------- | ---------------------------------------------------------- |
| **`eventName`**      | <code>'accel'</code>                                       |
| **`listenerFunc`**   | <code><a href="#accellistener">AccelListener</a></code>    |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自：** 1.0.0

--------------------


### addListener('orientation', ...)

```typescript
addListener(eventName: 'orientation', listenerFunc: OrientationListener) => Promise<PluginListenerHandle>
```

添加设备方向变化监听器（如罗盘航向等）

| 参数                 | 类型                                                                     |
| -------------------- | ------------------------------------------------------------------------ |
| **`eventName`**      | <code>'orientation'</code>                                               |
| **`listenerFunc`**   | <code><a href="#orientationlistener">OrientationListener</a></code>      |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除附加到此插件的所有监听器。

**自：** 1.0.0

--------------------


### 接口


#### PluginListenerHandle

| 属性           | 类型                                      |
| -------------- | ----------------------------------------- |
| **`remove`**   | <code>() =&gt; Promise&lt;void&gt;</code> |


#### AccelListenerEvent

| 属性                                   | 类型                                                    | 描述                                                                                                             | 自     |
| -------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------ |
| **`acceleration`**                     | <code><a href="#acceleration">Acceleration</a></code>   | 提供设备在 X、Y、Z 三个轴上的加速度的对象。<a href="#acceleration">Acceleration</a> 以 m/s 为单位表示             | 1.0.0  |
| **`accelerationIncludingGravity`**     | <code><a href="#acceleration">Acceleration</a></code>   | 提供设备在 X、Y、Z 三个轴上（包含重力影响）的加速度的对象。<a href="#acceleration">Acceleration</a> 以 m/s 为单位表示 | 1.0.0  |
| **`rotationRate`**                     | <code><a href="#rotationrate">RotationRate</a></code>   | 提供设备在 alpha、beta 和 gamma 三个方向轴上方向变化速率的对象。旋转速率以度/秒为单位表示                        | 1.0.0  |
| **`interval`**                         | <code>number</code>                                     | 表示从设备获取数据的时间间隔（以毫秒为单位）的数字                                                               | 1.0.0  |


#### Acceleration

| 属性       | 类型                | 描述                           | 自     |
| ---------- | ------------------- | ------------------------------ | ------ |
| **`x`**    | <code>number</code> | 沿 X 轴的加速度大小            | 1.0.0  |
| **`y`**    | <code>number</code> | 沿 Y 轴的加速度大小            | 1.0.0  |
| **`z`**    | <code>number</code> | 沿 Z 轴的加速度大小            | 1.0.0  |


#### RotationRate

| 属性           | 类型                | 描述                                   | 自     |
| -------------- | ------------------- | -------------------------------------- | ------ |
| **`alpha`**    | <code>number</code> | 绕 Z 轴的旋转量，以度/秒为单位         | 1.0.0  |
| **`beta`**     | <code>number</code> | 绕 X 轴的旋转量，以度/秒为单位         | 1.0.0  |
| **`gamma`**    | <code>number</code> | 绕 Y 轴的旋转量，以度/秒为单位         | 1.0.0  |


### 类型别名


#### AccelListener

<code>(event: <a href="#accellistenerevent">AccelListenerEvent</a>): void</code>


#### OrientationListener

<code>(event: <a href="#rotationrate">RotationRate</a>): void</code>


#### OrientationListenerEvent

<code><a href="#rotationrate">RotationRate</a></code>

</docgen-api>