---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 设计插件 API
contributors:
  - eric-horodyski
sidebar_label: 设计插件 API
slug: /plugins/tutorial/designing-the-plugin-api
---

# 设计插件 API

构建 Capacitor 插件的第一步——也可以说是最重要的一步——是设计 API。API 是我们在编写各平台具体实现时将遵循的契约。

我们可以使用 TypeScript 来定义插件 API；它将作为我们实现时的契约，并提供 TypeScript 带来的便利，如代码自动补全和类型检查。

## 等等，你真的需要为此开发插件吗？

信不信由你，现代 Web 浏览器已经可以实现许多我们认为是“原生功能”的操作，例如检查电池状态、语音识别，没错，还有屏幕方向。在构建 Web 原生应用时，我们常常会发现，过去需要插件才能实现的功能，现在已作为 Web API 提供。

> 在为特定功能开发插件之前，我们建议访问诸如 <a href="https://whatwebcando.today/" target="_blank">What Web Can Do Today</a> 这样的网站，查看您所需的功能是否已作为 Web API 提供。

既然屏幕方向已有 Web API，我们为何还要费心自行开发呢？查看 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">屏幕方向 Web API</a> 可以发现，iOS 目前（截至撰写时）并未实现该 API，这意味着我们需要自行提供实现。至于 Android，我们的应用在 Android 平台上运行时可以直接使用屏幕方向 Web API——但出于教学目的，我们将以原生方式实现屏幕方向功能。

## 定义 ScreenOrientation API

我们或许不能直接使用屏幕方向 Web API，但可以参照它来设计插件的 API：

| 方法名称           | 输入参数                               | 返回值                                                  |
| ------------------ | -------------------------------------- | ------------------------------------------------------- |
| orientation        |                                        | `Promise<{ type: OrientationType }>`                    |
| lock               | `{ orientation: OrientationLockType }` | `Promise<void>`                                         |
| unlock             |                                        | `Promise<void>`                                         |
| addListener        | `(orientation: { type: OrientationType })` | `Promise<PluginListenerHandle> & PluginListenerHandle`  |
| removeAllListeners |                                        | `Promise<void>`                                         |

这样做还有一个额外的好处：我们可以使用 TypeScript 现有 DOM 类型定义中的 `OrientationType` 和 `OrientationLockType` 类型。

让我们设置一个目录来存放插件 API。新建子文件夹 `src/plugins/screen-orientation`，并在其中添加以下文件：

- `definitions.ts`
- `index.ts`

在 `definitions.ts` 中填入以下代码：

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

以上代码创建了一个对象，该对象链接到我们插件的实现代码。

API 设计已完成；接下来我们将构建一个调用该 API 的用户界面。这样做将使我们更容易在实现各平台集成时进行测试。下一步：使用插件 API。