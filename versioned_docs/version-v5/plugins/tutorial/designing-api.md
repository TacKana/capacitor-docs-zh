---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 设计插件 API
contributors:
  - eric-horodyski
sidebar_label: 设计插件 API
slug: /plugins/tutorial/designing-the-plugin-api
---

# 设计插件 API

构建 Capacitor 插件时，首要且最关键的一步就是设计 API 接口。这个 API 将成为我们编写各平台具体实现时遵循的契约规范。

我们可以使用 TypeScript 来定义插件 API，它既能作为实现时的约束规范，又能提供 TypeScript 的诸多优势，如代码补全和类型检查。

## 等一下，你真的需要插件吗？

你可能会惊讶，现代浏览器已经能实现许多所谓"原生功能"——比如检查电池状态、语音识别，没错，甚至屏幕方向控制。在构建 Web 原生应用时，经常会发现过去需要插件才能实现的功能，现在已有现成的 Web API 可用。

> 在针对某个功能开发插件前，建议先查看 <a href="https://whatwebcando.today/" target="_blank">What Web Can Do Today</a> 这类网站，确认所需功能是否已有现成 Web API。

既然屏幕方向控制已有 Web API，为什么还要专门开发插件？查看 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">屏幕方向 Web API</a> 会发现，iOS 目前并未实现该 API（截至本文撰写时），这意味着我们需要自行提供实现。对于 Android 平台，虽然可以直接使用 Web API，但出于教学目的，我们将选择原生实现方式。

## 定义 ScreenOrientation API

虽然不能直接使用 Web API，但我们可以参照其模式设计插件接口：

| 方法名            | 输入参数                            | 返回值                                                |
| ----------------- | ----------------------------------- | ----------------------------------------------------- |
| orientation       |                                     | `Promise<{ type: OrientationType }>`                  |
| lock              | `{ orientation: OrientationLockType }` | `Promise<void>`                                       |
| unlock            |                                     | `Promise<void>`                                       |
| addListener       | `(orientation: { type: OrientationType })` | `Promise<PluginListenerHandle> & PluginListenerHandle`|
| removeAllListeners|                                     | `Promise<void>`                                       |

这里有个额外优势：我们可以直接使用 TypeScript 内置的 DOM 类型定义中的 `OrientationType` 和 `OrientationLockType`。

现在创建插件 API 的目录结构。新建子文件夹 `src/plugins/screen-orientation`，并添加以下文件：

- `definitions.ts`
- `index.ts`

在 `definitions.ts` 中添加如下代码：

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
   * 监听屏幕方向变化事件
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

为了在 Capacitor 应用中使用该插件，需要通过 `@capacitor/core` 导出的 `registerPlugin()` 模块进行注册。

在 `index.ts` 中添加如下代码：

```typescript
import { registerPlugin } from '@capacitor/core';

import type { ScreenOrientationPlugin } from './definitions';

const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
);

export * from './definitions';
export { ScreenOrientation };
```

以上代码创建了一个与插件实现代码关联的对象。

至此 API 设计已完成，接下来我们将构建调用该 API 的用户界面。这将帮助我们更便捷地在实现各平台集成时进行测试。下一步：开始使用这个插件 API。