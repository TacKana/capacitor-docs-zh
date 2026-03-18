---
title: Background Tasks
description: Background Task API
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

# 后台任务

后台任务 API 让你能够轻松运行后台任务。目前，该插件支持在应用进入后台时执行任务，并即将支持周期性的后台获取操作。



- [`beforeExit(...)`](#beforeexit)
- [`finish(...)`](#finish)
- [接口](#interfaces)



## 后台任务指南

移动操作系统对于后台任务有着严格且不断变化的指导原则。能够在后台无限期运行的应用仅限于需要播放音频、维护 VoIP 连接、为导航目的跟踪地理位置以及其他少数特定任务。所有其他应用都应当执行周期性、短暂的后台任务，例如应用进入后台时完成上传，以及定期同步数据。

那些声称能在这些核心用例之外提供无限后台操作的插件**将导致应用商店审核被拒**！这一限制对于使用任何移动应用技术的开发者来说都是相同的，不仅仅是 Capacitor。

通常来说，Android 对于后台任务的限制相对宽松，但为了在所有平台上都能良好运行，你的应用应该遵循最低通用标准进行编码。

注意：在 iOS 上，一旦你的应用进入后台，`setTimeout` 和 `setInterval` 将无法工作，因此不要在 `beforeExit` 内部使用它们。

## 示例

```typescript
import { Plugins } from '@capacitor/core';

const { App, BackgroundTask } = Plugins;

App.addListener('appStateChange', state => {
  if (!state.isActive) {
    // 应用已变为非活动状态。我们应该检查是否有剩余工作需要完成，如果有，
    // 则执行一个后台任务，以便在操作系统挂起或终止我们的应用之前完成该工作：

    let taskId = BackgroundTask.beforeExit(async () => {
      // 在这个函数中，我们可能会完成一个上传、等待网络请求结束、
      // 持久化一些数据，或执行其他任务

      // 长时间任务示例
      var start = new Date().getTime();
      for (var i = 0; i < 1e18; i++) {
        if (new Date().getTime() - start > 20000) {
          break;
        }
      }
      // 必须调用此方法以结束我们的任务，否则
      // 我们面临应用被终止的风险，并有可能
      // 被标记为影响电池寿命
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

当应用进入后台时，此方法允许你运行一个短暂的后台任务，确保你能够完成应用所需的任何工作（例如完成上传或网络请求）。这在 iOS 上尤为重要，因为通常如果不启动后台任务，任何操作都会被暂停。

此方法应在 3 分钟内完成，否则你的应用可能被操作系统终止。

完成后，此回调**必须**调用 `BackgroundTask.finish({ taskId })`，其中 `taskId` 是 `BackgroundTask.beforeExit()` 返回的值。

| 参数       | 类型                                          | 说明                                                              |
| ---------- | --------------------------------------------- | ------------------------------------------------------------------------ |
| **`cb`**   | <code><a href="#function">Function</a></code> | 当应用进入后台但尚未被终止时要执行的任务 |

**返回值:** <code>string</code>

---

### finish(...)

```typescript
finish(options: { taskId: CallbackID; }) => void
```

通知操作系统给定的任务已完成，操作系统可以继续将应用置于后台。

| 参数           | 类型                             |
| -------------- | -------------------------------- |
| **`options`**  | `{ taskId: string; }` |

---

### 接口

#### Function

创建一个新函数。

| 属性              | 类型                                          |
| ----------------- | --------------------------------------------- |
| **`prototype`**   | <code>any</code>                              |
| **`length`**      | <code>number</code>                           |
| **`arguments`**   | <code>any</code>                              |
| **`caller`**      | <code><a href="#function">Function</a></code> |

| 方法          | 签名                                                                            | 说明                                                                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **apply**     | (this: <a href="#function">Function</a>, thisArg: any, argArray?: any) =&gt; any     | 调用该函数，用指定对象替换函数的 this 值，用指定数组替换函数的参数。                                                                     |
| **call**      | (this: <a href="#function">Function</a>, thisArg: any, ...argArray: any[]) =&gt; any | 调用对象的方法，用另一个对象替换当前对象。                                                                                                                                         |
| **bind**      | (this: <a href="#function">Function</a>, thisArg: any, ...argArray: any[]) =&gt; any | 对于给定函数，创建一个与原始函数具有相同主体的绑定函数。绑定函数的 this 对象与指定对象关联，并具有指定的初始参数。 |
| **toString**  | () =&gt; string                                                                      | 返回函数的字符串表示形式。                                                                                                                                                                           |