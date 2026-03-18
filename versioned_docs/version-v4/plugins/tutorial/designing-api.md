---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 设计插件 API
contributors:
  - eric-horodyski
sidebar_label: 设计插件 API
slug: /plugins/tutorial/designing-the-plugin-api
---

# 设计插件 API

构建 Capacitor 插件的第一步——也可以说是最重要的一步——是设计 API。API 是我们在编写每个平台的特定实现时需要遵循的契约。

我们可以使用 TypeScript 来定义插件 API；它将在实现时作为我们的契约，并提供 TypeScript 带来的便利，例如代码补全和类型检查。

## 等等，你真的需要插件吗？

无论你信不信，现代 Web 浏览器可以实现许多我们认为是“原生功能”的操作，例如检查电池状态、语音识别，以及屏幕方向。在构建 Web Native 应用时，我们经常看到过去需要插件才能访问的功能现在已作为 Web API 提供。

> 在为特定功能构建插件之前，我们建议查看诸如 <a href="https://whatwebcando.today/" target="_blank">What Web Can Do Today</a> 这样的网站，看看你所需的功能是否已作为 Web API 提供。

如果屏幕方向功能已经有 Web API，我们为什么还要费心构建一个呢？查看 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">Screen Orientation Web API</a> 可以看到，iOS 并未实现该 API（截至本文撰写时），这意味着我们需要自己提供实现。至于 Android，我们可以在应用运行于 Android 平台时直接使用 Screen Orientation Web API——但出于学习目的，我们将采用原生方式实现屏幕方向功能。

## 定义 ScreenOrientation API

我们可能无法直接使用 Screen Orientation Web API，但可以参照它来设计我们插件的 API：

| 方法名             | 输入参数                               | 返回值                                                |
| ------------------ | -------------------------------------- | ----------------------------------------------------- |
| orientation        |                                        | `Promise<{ type: OrientationType }>`                  |
| lock               | `{ orientation: OrientationLockType }` | `Promise<void>`                                       |
| unlock             |                                        | `Promise<void>`                                       |
| addListener        | `(orientation: { type: OrientationType })` | `Promise<PluginListenerHandle> & PluginListenerHandle` |
| removeAllListeners |                                        | `Promise<void>`                                       |

这里有一个额外的好处：我们可以使用 TypeScript 现有 DOM 类型定义中提供的 `OrientationType` 和 `OrientationLockType` 类型。

让我们设置一个目录来存放插件 API。创建一个新的子文件夹 `src/plugins/screen-orientation`，并在其中添加以下文件：

- `definitions.ts`
- `index.ts`

在 `definitions.ts` 中填入以下代码：

```typescript
import type { PluginListenerHandle } from '@capacitor/core';

export interface ScreenOrientationPlugin {
  /**
   * 返回屏幕当前的朝向。
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
   * 监听屏幕方向的变化。
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

在 `index.ts` 中填入以下代码：

```typescript
import { registerPlugin } from '@capacitor/core';

import type { ScreenOrientationPlugin } from './definitions';

const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
);

export * from './definitions';
export { ScreenOrientation };
```

上面的代码创建了一个链接到插件实现代码的对象。

API 设计已经完成；接下来我们将构建一个调用该 API 的用户界面。这样，在实现每个平台集成时，测试会更加方便。下一步：使用插件 API。