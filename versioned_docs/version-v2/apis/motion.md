---
title: Motion
description: 运动 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/motion
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

运动 API 用于追踪加速度计和设备方向（罗盘航向等）数据。

- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [接口](#接口)

## 权限

该插件目前使用 Web API 实现。大多数浏览器在使用此 API 前需要获取权限。要请求权限，可以在任何用户触发的操作（如按钮点击）中提示用户：

```typescript
myButton.addEventListener('click', async () => {
  try {
    await DeviceMotionEvent.requestPermission();
  } catch (e) {
    // 处理错误
    return;
  }

  // 用户批准后，即可开始监听：
  const { Motion } = Capacitor.Plugins;
  Capacitor.Plugins.Motion.addListener('accel', (event) => {});
});
```

### 示例

```typescript
const { Motion } = Capacitor.Plugins;
Motion.addListener('accel', (event) => {});
```

请参阅 [DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent) API 以了解 `event` 中提供的数据。

## API

### addListener(...)

```typescript
addListener(eventName: 'accel', listenerFunc: (event: MotionEventResult) => void) => PluginListenerHandle
```

监听加速度计数据

| 参数                | 类型                                                                      |
| ------------------- | ------------------------------------------------------------------------- |
| **`eventName`**     | <code>"accel"</code>                                                      |
| **`listenerFunc`**  | <code>(event: <a href="#motioneventresult">MotionEventResult</a>) =&gt; void</code> |

**返回值：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'orientation', listenerFunc: (event: MotionOrientationEventResult) => void) => PluginListenerHandle
```

监听设备方向变化（罗盘航向等）

| 参数                | 类型                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| **`eventName`**     | <code>"orientation"</code>                                                                      |
| **`listenerFunc`**  | <code>(event: <a href="#motionorientationeventresult">MotionOrientationEventResult</a>) =&gt; void</code> |

**返回值：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除此插件的所有原生监听器

---

### 接口

#### PluginListenerHandle

| 属性          | 类型                         |
| ------------- | ---------------------------- |
| **`remove`**  | <code>() =&gt; void</code>   |

#### MotionEventResult

| 属性                                  | 类型                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| **`acceleration`**                    | `{ x: number; y: number; z: number; }`            |
| **`accelerationIncludingGravity`**    | `{ x: number; y: number; z: number; }`            |
| **`rotationRate`**                    | `{ alpha: number; beta: number; gamma: number; }` |
| **`interval`**                        | <code>number</code>                                          |

#### MotionOrientationEventResult

| 属性          | 类型                |
| ------------- | ------------------- |
| **`alpha`**   | <code>number</code> |
| **`beta`**    | <code>number</code> |
| **`gamma`**   | <code>number</code> |