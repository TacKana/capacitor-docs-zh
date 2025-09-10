---
title: Motion Capacitor 插件 API
description: Motion API 用于追踪加速度计和设备方向（如指南针朝向等）
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/motion/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/motion/src/definitions.ts
sidebar_label: Motion
---

# @capacitor/motion

Motion API 用于追踪加速度计和设备方向（如指南针朝向等）

## 安装

```bash
npm install @capacitor/motion
npx cap sync
```

## 权限说明

本插件目前基于 Web API 实现。大多数浏览器需要用户授权才能使用此 API。可以通过用户主动触发的动作（如按钮点击）来请求权限：

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

  // 用户授权后可以开始监听：
  accelHandler = await Motion.addListener('accel', (event) => {
    console.log('设备运动事件:', event);
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

关于 'accel' 事件提供的数据结构，请参考
[`DeviceMotionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent)
API 文档。

## API 参考

<docgen-index>

- [`addListener('accel', ...)`](#addlisteneraccel-)
- [`addListener('orientation', ...)`](#addlistenerorientation-)
- [`removeAllListeners()`](#removealllisteners)
- [接口定义](#interfaces)
- [类型别名](#type-aliases)

</docgen-index>

<docgen-api>

### addListener('accel', ...)

```typescript
addListener(eventName: 'accel', listenerFunc: AccelListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

添加加速度计数据监听器

| 参数               | 类型                                                    |
| ------------------ | ------------------------------------------------------- |
| **`eventName`**    | <code>'accel'</code>                                    |
| **`listenerFunc`** | <code><a href="#accellistener">AccelListener</a></code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 1.0.0

---

### addListener('orientation', ...)

```typescript
addListener(eventName: 'orientation', listenerFunc: OrientationListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

添加设备方向变化监听器（指南针朝向等）

| 参数               | 类型                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'orientation'</code>                                          |
| **`listenerFunc`** | <code><a href="#orientationlistener">OrientationListener</a></code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 1.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除该插件附加的所有监听器

**自版本:** 1.0.0

---

### Interfaces

#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

#### AccelListenerEvent

| 属性                               | 类型                                                  | 说明                                                                                                   | 版本  |
| ---------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----- |
| **`acceleration`**                 | <code><a href="#acceleration">Acceleration</a></code> | 包含设备在 X/Y/Z 三轴上加速度的对象。<a href="#acceleration">Acceleration</a> 单位为 m/s               | 1.0.0 |
| **`accelerationIncludingGravity`** | <code><a href="#acceleration">Acceleration</a></code> | 包含设备在 X/Y/Z 三轴上加速度（含重力影响）的对象。<a href="#acceleration">Acceleration</a> 单位为 m/s | 1.0.0 |
| **`rotationRate`**                 | <code><a href="#rotationrate">RotationRate</a></code> | 包含设备在 alpha/beta/gamma 三轴方向上旋转速率的对象。旋转速率单位为度/秒                              | 1.0.0 |
| **`interval`**                     | <code>number</code>                                   | 从设备获取数据的间隔时间（毫秒）                                                                       | 1.0.0 |

#### Acceleration

| 属性    | 类型                | 说明               | 版本  |
| ------- | ------------------- | ------------------ | ----- |
| **`x`** | <code>number</code> | X 轴方向的加速度值 | 1.0.0 |
| **`y`** | <code>number</code> | Y 轴方向的加速度值 | 1.0.0 |
| **`z`** | <code>number</code> | Z 轴方向的加速度值 | 1.0.0 |

#### RotationRate

| 属性        | 类型                | 说明                         | 版本  |
| ----------- | ------------------- | ---------------------------- | ----- |
| **`alpha`** | <code>number</code> | 绕 Z 轴旋转的角速度（度/秒） | 1.0.0 |
| **`beta`**  | <code>number</code> | 绕 X 轴旋转的角速度（度/秒） | 1.0.0 |
| **`gamma`** | <code>number</code> | 绕 Y 轴旋转的角速度（度/秒） | 1.0.0 |

### Type Aliases

#### AccelListener

<code>
  (event: <a href="#accellistenerevent">AccelListenerEvent</a>): void
</code>

#### OrientationListener

<code>
  (event: <a href="#rotationrate">RotationRate</a>): void
</code>

#### OrientationListenerEvent

<code>
  <a href="#rotationrate">RotationRate</a>
</code>

</docgen-api>
