---
title: Motion
description: 运动传感器 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/motion
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Motion API 用于追踪加速度计和设备方向（罗盘朝向等）数据

- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [接口定义](#interfaces)

## 权限说明

本插件当前基于 Web API 实现。多数浏览器在使用前需要获取权限。可通过用户触发操作（如按钮点击）来请求权限：

```typescript
myButton.addEventListener('click', async () => {
  try {
    await DeviceMotionEvent.requestPermission();
  } catch (e) {
    // 处理错误
    return;
  }

  // 用户授权后即可开始监听：
  const { Motion } = Capacitor.Plugins;
  Capacitor.Plugins.Motion.addListener('accel', (event) => {});
});
```

### 使用示例

```typescript
const { Motion } = Capacitor.Plugins;
Motion.addListener('accel', (event) => {});
```

请参考 [DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent) API 以了解事件参数详情。

## API 参考

### addListener(...)

```typescript
addListener(eventName: 'accel', listenerFunc: (event: MotionEventResult) => void) => PluginListenerHandle
```

监听加速度计数据

| 参数                | 类型                                                                                |
| ------------------- | ----------------------------------------------------------------------------------- |
| **`eventName`**     | <code>"accel"</code>                                                                |
| **`listenerFunc`**  | <code>(event: <a href="#motioneventresult">MotionEventResult</a>) =&gt; void</code> |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'orientation', listenerFunc: (event: MotionOrientationEventResult) => void) => PluginListenerHandle
```

监听设备方向变化（罗盘朝向等）

| 参数                | 类型                                                                                                      |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| **`eventName`**     | <code>"orientation"</code>                                                                                |
| **`listenerFunc`**  | <code>(event: <a href="#motionorientationeventresult">MotionOrientationEventResult</a>) =&gt; void</code> |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除本插件的所有监听器

---

### 接口定义

#### PluginListenerHandle

| 属性            | 类型                       |
| --------------- | -------------------------- |
| **`remove`**    | <code>() =&gt; void</code> |

#### MotionEventResult

| 属性                                | 类型                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| **`acceleration`**                  | `{ x: number; y: number; z: number; }`            |
| **`accelerationIncludingGravity`**  | `{ x: number; y: number; z: number; }`            |
| **`rotationRate`**                  | `{ alpha: number; beta: number; gamma: number; }` |
| **`interval`**                      | <code>number</code>                                          |

#### MotionOrientationEventResult

| 属性         | 类型                |
| ------------ | ------------------- |
| **`alpha`**  | <code>number</code> |
| **`beta`**   | <code>number</code> |
| **`gamma`**  | <code>number</code> |