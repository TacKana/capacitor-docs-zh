---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 设计插件 API
contributors:
  - eric-horodyski
sidebar_label: 设计插件 API
slug: /plugins/tutorial/designing-the-plugin-api
---

# 设计插件 API

构建 Capacitor 插件时，首要且最关键的一步就是设计 API。API 是我们编写各平台具体实现时必须遵循的契约。

我们可以使用 TypeScript 来定义插件 API，它既作为实现时的规范，又能享受 TypeScript 带来的便利，如代码补全和类型检查。

## 等等，你真的需要为此开发插件吗？

你可能想不到，现代浏览器已经能实现许多我们认为需要"原生功能"才能完成的任务，比如检查电池状态、语音识别，甚至屏幕方向控制。在构建 Web 原生应用时，我们常会发现原本需要插件实现的功能现在已作为 Web API 提供。

> 在为某个功能开发插件前，建议先访问 <a href="https://whatwebcando.today/" target="_blank">What Web Can Do Today</a> 等网站，确认所需功能是否已作为 Web API 提供。

既然屏幕方向已有 Web API，为什么还要专门开发插件呢？查看 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">屏幕方向 Web API</a> 就会发现，iOS 目前（本文撰写时）尚未实现该 API，这意味着我们需要自行提供实现。对于 Android 平台，虽然可以直接使用 Web API，但出于教学目的，我们将选择原生实现屏幕方向功能。

## 定义 ScreenOrientation API

虽然无法直接使用屏幕方向 Web API，但我们可以参考其模型来设计插件 API：

| 方法名称          | 输入参数                              | 返回值                                               |
| ----------------- | ------------------------------------- | --------------------------------------------------- |
| orientation       |                                       | `Promise<{ type: OrientationType }>`               |
| lock              | `{ orientation: OrientationLockType }`| `Promise<void>`                                    |
| unlock            |                                       | `Promise<void>`                                    |
| addListener       | `(orientation: { type: OrientationType })` | `Promise<PluginListenerHandle> & PluginListenerHandle` |
| removeAllListeners |                                       | `Promise<void>`                                    |

这里有个额外优势：我们可以直接使用 TypeScript DOM 类型定义中已有的 `OrientationType` 和 `OrientationLockType`。

现在创建目录来存放插件 API。新建子文件夹 `src/plugins/screen-orientation` 并添加以下文件：

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

要在 Capacitor 应用中使用插件，需要通过 `@capacitor/core` 导出的 `registerPlugin()` 方法进行注册。

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

以上代码创建了一个与插件实现代码关联的对象。

至此 API 设计已完成。接下来我们将构建调用该 API 的用户界面，这将有助于我们在实现各平台集成时进行测试。下一步：使用插件 API。