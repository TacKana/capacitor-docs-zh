---
title: Background Tasks
description: 后台任务 API
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

# 后台任务

后台任务 API 可以轻松实现后台任务运行。当前版本支持应用进入后台时执行任务，后续将支持定期后台数据抓取操作。

- [`beforeExit(...)`](#beforeexit)
- [`finish(...)`](#finish)
- [接口定义](#interfaces)

## 后台任务指南

移动操作系统对后台任务有着严格且不断变化的限制。只有需要播放音频、维持 VoIP 连接、导航定位等核心功能的应用才能无限后台运行。其他应用只能执行短期后台任务，例如应用退到后台时完成上传操作或定期数据同步。

宣称能在核心场景外实现无限后台运行的插件*将导致应用商店审核被拒*！这一限制对所有移动应用技术开发者都适用，不仅限于 Capacitor。

虽然 Android 对后台任务的限制相对宽松，但为了确保应用在各个平台都能良好运行，建议按照最严格的标准进行开发。

注意：在 iOS 平台上，应用进入后台后 `setTimeout` 和 `setInterval` 将失效，请勿在 `beforeExit` 中使用这些方法。

## 示例

```typescript
import { Plugins } from '@capacitor/core';

const { App, BackgroundTask } = Plugins;

App.addListener('appStateChange', (state) => {
  if (!state.isActive) {
    // 应用进入非活跃状态时，检查是否有待完成任务
    // 通过后台任务确保能在系统挂起/终止应用前完成操作

    let taskId = BackgroundTask.beforeExit(async () => {
      // 在此处完成上传、网络请求、数据持久化等操作

      // 长任务示例
      var start = new Date().getTime();
      for (var i = 0; i < 1e18; i++) {
        if (new Date().getTime() - start > 20000) {
          break;
        }
      }
      // 必须调用结束方法，否则可能导致应用被终止
      // 甚至被标记为影响电池续航
      BackgroundTask.finish({
        taskId,
      });
    });
  }
});
```

## API

### beforeExit(...)

```typescript
beforeExit(cb: Function) => CallbackID
```

当应用进入后台时，该方法允许你运行短期后台任务，确保能完成上传或网络请求等关键操作。这在 iOS 上尤为重要，因为常规操作会被系统挂起。

注意：任务必须在 3 分钟内完成，否则应用可能被系统终止。

任务完成后*必须*调用 `BackgroundTask.finish({ taskId })`，其中 `taskId` 是 `beforeExit()` 的返回值。

| 参数     | 类型                                          | 说明                               |
| -------- | --------------------------------------------- | ---------------------------------- |
| **`cb`** | <code><a href="#function">Function</a></code> | 应用进入后台但未被终止前执行的任务 |

**返回值:** <code>string</code>

---

### finish(...)

```typescript
finish(options: { taskId: CallbackID; }) => void
```

通知系统指定任务已完成，允许继续后台运行。

| 参数          | 类型                  |
| ------------- | --------------------- |
| **`options`** | `{ taskId: string; }` |

---

### Interfaces

#### Function

创建新函数。

| 属性            | 类型                                          |
| --------------- | --------------------------------------------- |
| **`prototype`** | <code>any</code>                              |
| **`length`**    | <code>number</code>                           |
| **`arguments`** | <code>any</code>                              |
| **`caller`**    | <code><a href="#function">Function</a></code> |

| 方法         | 签名                                                                              | 说明                                                                                   |
| ------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **apply**    | (this: <a href="#function">Function</a>, thisArg: any, argArray?: any) => any     | 调用函数，用指定对象替换函数的 this 值，用指定数组替换函数的参数                       |
| **call**     | (this: <a href="#function">Function</a>, thisArg: any, ...argArray: any[]) => any | 调用对象方法时，用另一个对象替换当前对象                                               |
| **bind**     | (this: <a href="#function">Function</a>, thisArg: any, ...argArray: any[]) => any | 创建一个新函数，与原函数体相同。新函数的 this 对象与指定对象绑定，并具有指定的初始参数 |
| **toString** | () => string                                                                      | 返回函数的字符串表示形式                                                               |
