---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 设计插件 API
contributors:
  - eric-horodyski
sidebar_label: 设计插件 API
slug: /plugins/tutorial/designing-the-plugin-api
---

# 设计插件 API

构建 Capacitor 插件时，第一步——可以说也是最重要的一步——是设计 API。API 是我们编写各平台具体实现时要遵循的契约。

我们可以使用 TypeScript 来定义插件 API；它将在实现时作为我们的契约，并提供 TypeScript 带来的便利，例如代码补全和类型检查。

## 等等，你真的需要为此开发插件吗？

信不信由你，现代 Web 浏览器能够实现许多我们认为的“原生功能”，例如检查电池状态、语音识别，以及屏幕方向控制。在构建 Web Native 应用时，我们经常看到曾经需要插件才能访问的功能，现在已作为 Web API 提供。

> 在为特定功能构建插件之前，我们建议查看如 <a href="https://whatwebcando.today/" target="_blank">What Web Can Do Today</a> 这类网站，确认你要的功能是否已作为 Web API 提供。

如果屏幕方向控制已有 Web API，我们为什么还要费心去构建一个呢？查看 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">Screen Orientation Web API</a> 可以发现，iOS 并未实现该 API（截至本文撰写时），这意味着我们需要自己提供实现。至于 Android，当应用在 Android 平台上运行时，我们可以直接使用 Screen Orientation Web API——但出于学习目的，我们将以原生方式实现屏幕方向控制功能。

## 定义 ScreenOrientation API

我们可能无法直接使用 Screen Orientation Web API，但可以参照它来设计我们的插件 API：

| 方法名称           | 输入参数                                | 返回值                                           |
| ------------------ | --------------------------------------- | ------------------------------------------------ |
| orientation        |                                         | `Promise<ScreenOrientationResult>`             |
| lock               | `options: OrientationLockOptions`  | `Promise<void>`                                  |
| unlock             |                                         | `Promise<void>`                                  |
| addListener        | `(orientation: ScreenOrientationResult)` | `Promise<PluginListenerHandle>` |
| removeAllListeners |                                         | `Promise<void>`                                  |

这里还有一个额外的好处：我们可以使用 TypeScript 现有 DOM 类型中提供的 `OrientationType` 类型。从 TypeScript 5.2+ 开始，`OrientationLockType` 不再可用，因此我们将为其提供定义。

让我们创建一个目录来存放插件 API。新建子文件夹 `src/plugins/screen-orientation`，并在其中添加以下文件：

- `definitions.ts`
- `index.ts`

在 `definitions.ts` 中填入以下代码：

```typescript
import type { PluginListenerHandle } from '@capacitor/core';

export interface OrientationLockOptions {
  /**
   * 注意：TypeScript v5.2+ 用户应从 @capacitor/screen-orientation 导入 OrientationLockType。
   */
  orientation: OrientationLockType;
}

export type OrientationLockType =
  | 'any'
  | 'natural'
  | 'landscape'
  | 'portrait'
  | 'portrait-primary'
  | 'portrait-secondary'
  | 'landscape-primary'
  | 'landscape-secondary';

export interface ScreenOrientationResult {
  type: OrientationType;
}

export interface ScreenOrientationPlugin {
  /**
   * 返回屏幕当前的方向。
   */
  orientation(): Promise<ScreenOrientationResult>;

  /**
   * 锁定屏幕方向。
   */
  lock(options: OrientationLockOptions): Promise<void>;

  /**
   * 解锁屏幕方向。
   */
  unlock(): Promise<void>;

  /**
   * 监听屏幕方向变化。
   */
  addListener(
    eventName: 'screenOrientationChange',
    listenerFunc: (orientation: ScreenOrientationResult) => void,
  ): Promise<PluginListenerHandle>;

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

const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>('ScreenOrientation');

export * from './definitions';
export { ScreenOrientation };
```

上面的代码创建了一个链接到插件实现代码的对象。

API 设计已完成；接下来，让我们构建一个调用它的用户界面。这样做将使我们在实现每个平台集成时更容易进行测试。下一步：使用插件 API。