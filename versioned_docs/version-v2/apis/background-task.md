---
title: 后台任务
description: 后台任务 API
contributors:
  - mlynch
  - jcesarmobile
translated: true
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

# 后台任务

后台任务 API 使得运行后台任务变得简单。目前，该插件支持在应用进入后台时运行任务，并且很快将支持定期的后台获取操作。

- [`beforeExit(...)`](#beforeexit)
- [`finish(...)`](#finish)
- [接口](#接口)

## 后台任务指南

移动操作系统对后台任务有着严格且不断变化的指导方针。无限期在后台运行仅限于需要播放音频、维护 VoIP 连接、跟踪地理位置用于导航以及少量其他任务的应用。所有其他应用应执行定期、短时间的后台任务，例如在应用进入后台时完成上传，以及定期同步数据。

声称在这些核心用例之外提供无限后台操作的插件_将导致 App Store 拒绝_！这个限制对于使用任何移动应用技术的开发者都是一样的，不仅仅是 Capacitor。

一般来说，Android 对后台任务要求不那么严格，但您的应用应按照最低标准编写，以便在所有平台上表现良好。

注意：在 iOS 上，一旦您的应用进入后台，`setTimeout` 和 `setInterval` 将不再工作，因此不要在 `beforeExit` 内部使用它们。

## 示例

```typescript
import { Plugins } from '@capacitor/core';

const { App, BackgroundTask } = Plugins;

App.addListener('appStateChange', state => {
  if (!state.isActive) {
    // 应用已变为非活动状态。我们应检查是否有未完成的工作，如果有，
    // 则执行一个后台任务，以便在操作系统挂起或终止我们的应用之前完成该工作：

    let taskId = BackgroundTask.beforeExit(async () => {
      // 在此函数中，我们可能完成上传、让网络请求完成、
      // 持久化一些数据或执行其他任务

      // 长时间任务的示例
      var start = new Date().getTime();
      for (var i = 0; i < 1e18; i++) {
        if (new Date().getTime() - start > 20000) {
          break;
        }
      }
      // 必须调用来结束我们的任务，否则
      // 我们的应用有可能被终止，
      // 并可能被标记为影响电池寿命
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

当应用进入后台时，此方法允许您运行一个短期的后台任务，以确保您可以完成应用需要做的任何工作（例如完成上传或网络请求）。这在 iOS 上特别重要，因为如果不启动后台任务，任何操作通常都会被挂起。

此方法应在 3 分钟内完成，否则您的应用有可能被操作系统终止。

完成后，此回调_必须_调用 `BackgroundTask.finish({ taskId })`，其中 `taskId` 是从 `BackgroundTask.beforeExit()` 返回的值。

| 参数 | 类型 | 描述 |
| -------- | --------------------------------------------- | ------------------------------------------------------------------------ |
| **`cb`** | <code><a href="#function">Function</a></code> | 应用进入后台但在被终止前要运行的任务 |

**返回：** <code>string</code>

---

### finish(...)

```typescript
finish(options: { taskId: CallbackID; }) => void
```

通知操作系统给定的任务已完成，操作系统可以继续将应用置于后台。

| 参数 | 类型 |
| ------------- | -------------------------------- |
| **`options`** | `{ taskId: string; }` |

---

### 接口

#### Function

创建一个新函数。

| 属性 | 类型 |
| --------------- | --------------------------------------------- |
| **`prototype`** | <code>any</code>                              |
| **`length`**    | <code>number</code>                           |
| **`arguments`** | <code>any</code>                              |
| **`caller`**    | <code><a href="#function">Function</a></code> |

| 方法 | 签名 | 描述 |
| ------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **apply**    | (this: <a href="#function">Function</a>, thisArg: any, argArray?: any) =&gt; any     | 调用函数，并用指定对象替换函数的 this 值，用指定数组替换函数的参数。 |
| **call**     | (this: <a href="#function">Function</a>, thisArg: any, ...argArray: any[]) =&gt; any | 调用一个对象的方法，用另一个对象替换当前对象。 |
| **bind**     | (this: <a href="#function">Function</a>, thisArg: any, ...argArray: any[]) =&gt; any | 对于给定的函数，创建一个与原函数具有相同函数体的绑定函数。绑定函数的 this 对象与指定对象关联，并具有指定的初始参数。 |
| **toString** | () =&gt; string | 返回函数的字符串表示形式。 |
