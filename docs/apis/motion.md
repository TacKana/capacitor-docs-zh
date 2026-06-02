---
title: Motion - Capacitor 插件 API
description: Motion API 用于追踪加速度计和设备方向（指南针朝向等）。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/motion/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/motion/src/definitions.ts
sidebar_label: 动作传感器
translated: true
source_hash: 63b810e0
---

# @capacitor/motion

Motion API 用于追踪加速度计和设备方向（指南针朝向等）。

## 安装

```bash
npm install @capacitor/motion
npx cap sync
```

## 权限

此插件目前使用 Web API 实现。大多数浏览器需要获得权限后才能使用此 API。要请求权限，请在用户发起的任何操作（如按钮点击）中提示用户：

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

  // 一旦用户批准，就可以开始监听：
  accelHandler = await Motion.addListener('accel', event => {
    console.log('设备运动事件：', event);
  });
});

// 停止加速度监听器
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

请参阅
[`DeviceMotionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent)
API 以了解 'accel' 事件中提供的数据。

## API

<docgen-index>

* [`addListener('accel', ...)`](#addlisteneraccel-)
* [`addListener('orientation', ...)`](#addlistenerorientation-)
* [`removeAllListeners()`](#removealllisteners)
* [接口](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### addListener('accel', ...)

```typescript
addListener(eventName: 'accel', listenerFunc: AccelListener) => Promise<PluginListenerHandle>
```

添加加速度计数据的监听器

| 参数                | 类型                                                    |
| ------------------ | ------------------------------------------------------- |
| **`eventName`**    | <code>'accel'</code>                                    |
| **`listenerFunc`** | <code><a href="#accellistener">AccelListener</a></code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**始于：** 1.0.0

--------------------


### addListener('orientation', ...)

```typescript
addListener(eventName: 'orientation', listenerFunc: OrientationListener) => Promise<PluginListenerHandle>
```

添加设备方向变化（指南针朝向等）的监听器

| 参数                | 类型                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'orientation'</code>                                          |
| **`listenerFunc`** | <code><a href="#orientationlistener">OrientationListener</a></code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**始于：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除附加到此插件的所有监听器。

**始于：** 1.0.0

--------------------


### 接口


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### AccelListenerEvent

| 属性                                 | 类型                                                  | 描述                                                                                                                                                             | 始于 |
| ---------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`acceleration`**                 | <code><a href="#acceleration">Acceleration</a></code> | 一个对象，提供设备在 X、Y、Z 三个轴上的加速度。<a href="#acceleration">Acceleration</a> 以 m/s 表示。                              | 1.0.0 |
| **`accelerationIncludingGravity`** | <code><a href="#acceleration">Acceleration</a></code> | 一个对象，提供设备在 X、Y、Z 三个轴上包含重力影响的加速度。<a href="#acceleration">Acceleration</a> 以 m/s 表示。   | 1.0.0 |
| **`rotationRate`**                 | <code><a href="#rotationrate">RotationRate</a></code> | 一个对象，提供设备在三个方向轴 alpha、beta 和 gamma 上的方向变化率。Rotation rate 以度/秒表示。 | 1.0.0 |
| **`interval`**                     | <code>number</code>                                   | 一个数字，表示从设备获取数据的时间间隔，以毫秒为单位。                                                                 | 1.0.0 |


#### Acceleration

| 属性    | 类型                | 描述                                  | 始于 |
| ------- | ------------------- | -------------------------------------------- | ----- |
| **`x`** | <code>number</code> | 沿 X 轴的加速度量。 | 1.0.0 |
| **`y`** | <code>number</code> | 沿 Y 轴的加速度量。 | 1.0.0 |
| **`z`** | <code>number</code> | 沿 Z 轴的加速度量。 | 1.0.0 |


#### RotationRate

| 属性        | 类型                | 描述                                                      | 始于 |
| ----------- | ------------------- | ---------------------------------------------------------------- | ----- |
| **`alpha`** | <code>number</code> | 绕 Z 轴旋转的量，以度/秒表示。 | 1.0.0 |
| **`beta`**  | <code>number</code> | 绕 X 轴旋转的量，以度/秒表示。 | 1.0.0 |
| **`gamma`** | <code>number</code> | 绕 Y 轴旋转的量，以度/秒表示。 | 1.0.0 |


### 类型别名


#### AccelListener

<code>(event: <a href="#accellistenerevent">AccelListenerEvent</a>): void</code>


#### OrientationListener

<code>(event: <a href="#rotationrate">RotationRate</a>): void</code>


#### OrientationListenerEvent

<code><a href="#rotationrate">RotationRate</a></code>

</docgen-api>
