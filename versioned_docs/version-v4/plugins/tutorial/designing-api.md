---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 设计插件 API
contributors:
  - eric-horodyski
sidebar_label: 设计插件 API
slug: /plugins/tutorial/designing-the-plugin-api
---

# 设计插件 API

构建 Capacitor 插件时，首要且最关键的一步就是设计 API。API 是我们编写各平台具体实现时需要遵循的契约。

我们可以使用 TypeScript 来定义插件 API，它既作为实现时的规范，又能享受 TypeScript 带来的智能提示和类型检查等便利功能。

## 等等，你真的需要插件吗？

你可能不知道，现代浏览器已经能实现许多"原生功能"，比如检查电池状态、语音识别，甚至屏幕方向控制。在构建 Web Native 应用时，经常会发现曾经需要插件才能实现的功能，现在已作为 Web API 提供了。

> 在开发特定功能的插件前，建议先查看 <a href="https://whatwebcando.today/" target="_blank">What Web Can Do Today</a> 等网站，确认所需功能是否已有现成的 Web API。

既然屏幕方向已有 Web API，为什么还要费心构建插件呢？查看 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">Screen Orientation Web API</a> 会发现，iOS 目前尚未实现该 API（截至本文撰写时），这意味着我们需要自行提供实现。虽然 Android 平台可以直接使用 Web API，但出于教学目的，我们将全程采用原生实现。

## 定义 ScreenOrientation API

虽然无法直接使用 Web API，但我们可以参考其设计来构建插件 API：

| 方法名             | 输入参数                                | 返回值                                                 |
| ------------------ | --------------------------------------- | ------------------------------------------------------ |
| orientation        |                                         | `Promise<{ type: OrientationType }>`                   |
| lock               | `{ orientation: OrientationLockType }`  | `Promise<void>`                                        |
| unlock             |                                         | `Promise<void>`                                        |
| addListener        | `(orientation: { type: OrientationType })` | `Promise<PluginListenerHandle> & PluginListenerHandle` |
| removeAllListeners |                                         | `Promise<void>`                                        |

这里有个额外优势：我们可以直接使用 TypeScript 内置的 DOM 类型声明中的 `OrientationType` 和 `OrientationLockType`。

现在创建插件 API 目录结构。新建子文件夹 `src/plugins/screen-orientation`，并添加以下文件：

- `definitions.ts`
- `index.ts`

在 `definitions.ts` 中添加以下代码：

```typescript
import type { PluginListenerHandle } from '@capacitor/core';

export interface ScreenOrientationPlugin {
  /**
   * 获取当前屏幕方向
   */
  orientation(): Promise<{ type: OrientationType }>;

  /**
   * 锁定屏幕方向
   */
  lock(opts: { orientation: OrientationLockType }): Promise<void>;

  /**
   * 解除屏幕方向锁定
   */
  unlock(): Promise<void>;

  /**
   * 监听屏幕方向变化
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

为了在 Capacitor 应用中使用该插件，需要使用 `@capacitor/core` 导出的 `registerPlugin()` 模块进行注册。

在 `index.ts` 中添加以下代码：

```typescript
import { registerPlugin } from '@capacitor/core';

import type { ScreenOrientationPlugin } from './definitions';

const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
);

export * from './definitions';
export { ScreenOrientation };
```

以上代码创建了一个关联到插件实现代码的对象。

API 设计完成后，接下来我们将构建调用该 API 的用户界面。这样可以在实现各平台集成时更方便地进行测试。下一步：使用插件 API。