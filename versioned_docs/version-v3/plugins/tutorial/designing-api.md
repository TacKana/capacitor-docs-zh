---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 设计插件 API
contributors:
  - eric-horodyski
sidebar_label: 设计插件 API
slug: /plugins/tutorial/designing-the-plugin-api
---

# 设计插件 API

构建 Capacitor 插件时，第一步——也可以说是最重要的一步——是设计 API。API 是我们在编写每个平台的具体实现时将遵循的契约。

我们可以使用 TypeScript 定义插件 API；它将作为我们实现时的契约，并提供 TypeScript 带来的便利，例如代码补全和类型检查。

## 等等，你真的需要为这个功能开发插件吗？

信不信由你，现代 Web 浏览器已经可以完成许多我们认为是“原生功能”的事情，比如检查电池状态、语音识别，是的，还有屏幕方向。在构建 Web Native 应用时，看到曾经需要插件才能访问的功能现在可以通过 Web API 实现，这种情况并不罕见。

> 在为特定功能构建插件之前，我们建议查看诸如 <a href="https://whatwebcando.today/" target="_blank">What Web Can Do Today</a> 之类的网站，看看你需要的功能是否已经作为 Web API 提供。

如果屏幕方向已经有 Web API，我们为什么还要费力去构建一个呢？查看 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">Screen Orientation Web API</a> 可以发现，iOS 没有实现该 API（截至本文撰写时），这意味着我们需要自己提供实现。至于 Android，当我们的应用在 Android 平台上运行时，我们可以直接使用 Screen Orientation Web API——但为了教学目的，我们将以原生方式实现屏幕方向功能。

## 定义 ScreenOrientation API

我们可能无法直接使用 Screen Orientation Web API，但可以根据它来设计我们插件的 API：

| 方法名称           | 输入参数                                | 返回值                                                 |
| ------------------ | --------------------------------------- | ------------------------------------------------------ |
| orientation        |                                         | `Promise<{ type: OrientationType }>`                   |
| lock               | `{ orientation: OrientationLockType }`  | `Promise<void>`                                        |
| unlock             |                                         | `Promise<void>`                                        |
| addListener        | `(orientation: { type: OrientationType })` | `Promise<PluginListenerHandle> & PluginListenerHandle` |
| removeAllListeners |                                         | `Promise<void>`                                        |

这里还有一个额外优势：我们可以使用 TypeScript 现有 DOM 类型中可用的 `OrientationType` 和 `OrientationLockType` 类型。

让我们设置一个目录来存放插件 API。创建一个新的子文件夹 `src/plugins/screen-orientation`，并在其中添加以下文件：

- `definitions.ts`
- `index.ts`

将以下代码填入 `definitions.ts`：

```typescript
import type { PluginListenerHandle } from '@capacitor/core';

export interface ScreenOrientationPlugin {
  /**
   * 返回屏幕当前的方向。
   */
  orientation(): Promise<{ type: OrientationType }>;

  /**
   * 锁定屏幕方向。
   */
  lock(opts: { orientation: OrientationLockType }): Promise<void>;

  /**
   * 解锁屏幕方向。
   */
  unlock(): Promise<void>;

  /**
   * 监听屏幕方向变化。
   */
  addListener(
    eventName: 'screenOrientationChange',
    listenerFunc: (orientation: { type: OrientationType }) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * 移除所有监听器。
   */
  removeAllListeners(): Promise<void>;
}
```

## 注册 ScreenOrientation 插件

为了在 Capacitor 应用中使用该插件，我们需要使用从 `@capacitor/core` 导出的 `registerPlugin()` 模块来注册它。

将以下代码填入 `index.ts`：

```typescript
import { registerPlugin } from '@capacitor/core';

import type { ScreenOrientationPlugin } from './definitions';

const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
);

export * from './definitions';
export { ScreenOrientation };
```

上面的代码创建了一个链接到我们插件实现代码的对象。

API 设计已经完成；接下来让我们构建一个将调用该 API 的用户界面。这样做将使我们更容易在实现每个平台集成时进行测试。我们的下一步是：使用插件 API。