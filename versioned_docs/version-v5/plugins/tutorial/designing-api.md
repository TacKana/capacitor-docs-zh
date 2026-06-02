---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 设计插件 API
contributors:
  - eric-horodyski
sidebar_label: 设计插件 API
slug: /plugins/tutorial/designing-the-plugin-api
---

# 设计插件 API

构建 Capacitor 插件的第一步——也可以说是最重要的一步——是设计 API。API 是我们在编写每个平台的特定实现时将遵守的契约。

我们可以使用 TypeScript 来定义插件 API；它将作为我们实现时的契约，并提供 TypeScript 带来的便利，如代码补全和类型检查。

## 等等，你真的需要一个插件来实现这个功能吗？

信不信由你，现代 Web 浏览器可以做到许多我们认为属于"原生功能"的事情，例如检查电池状态、语音识别，以及，是的，屏幕方向。在构建 Web 原生应用时，经常会发现一些曾经需要插件才能访问的功能现在已经成为 Web API。

> 在为特定功能构建插件之前，我们建议查看诸如 <a href="https://whatwebcando.today/" target="_blank">What Web Can Do Today</a> 这样的网站，看看您要找的功能是否已经作为 Web API 可用。

如果屏幕方向已经有 Web API，为什么我们还要费心去构建一个呢？查看 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">Screen Orientation Web API</a>，我们可以看到 iOS 并没有实现该 API（截至撰写本文时），这意味着我们需要自己提供实现。就 Android 而言，当我们的应用在 Android 平台上运行时，我们可以直接使用 Screen Orientation Web API——但为了教学目的，我们将原生实现屏幕方向功能。

## 定义 ScreenOrientation API

我们可能无法直接使用 Screen Orientation Web API，但我们可以将插件的 API 建模为与之类似：

| 方法名称            | 输入参数                                        | 返回值                                                   |
| ------------------- | ----------------------------------------------- | -------------------------------------------------------- |
| orientation         |                                                 | `Promise<{ type: OrientationType }>`                     |
| lock                | `{ orientation: OrientationLockType }`          | `Promise<void>`                                          |
| unlock              |                                                 | `Promise<void>`                                          |
| addListener         | `(orientation: { type: OrientationType })`      | `Promise<PluginListenerHandle> & PluginListenerHandle`   |
| removeAllListeners  |                                                 | `Promise<void>`                                          |

这里还有一个额外的好处；我们可以通过 TypeScript 现有的 DOM 类型定义来使用 `OrientationType` 和 `OrientationLockType` 类型。

让我们建立一个目录来存放我们的插件 API。创建一个新的子文件夹 `src/plugins/screen-orientation`，并在其中添加以下文件：

- `definitions.ts`
- `index.ts`

用以下代码填充 `definitions.ts`：

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
   * 移除所有监听器
   */
  removeAllListeners(): Promise<void>;
}
```

## 注册 ScreenOrientation 插件

为了在 Capacitor 应用中使用该插件，我们需要使用从 `@capacitor/core` 导出的 `registerPlugin()` 模块来注册它。

用以下代码填充 `index.ts`：

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

API 设计完成；让我们构建一个将调用它的用户界面。这样做将使我们在实现每个平台集成时更容易测试。下一步：使用插件 API。
