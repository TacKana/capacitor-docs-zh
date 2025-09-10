---
title: 构建Capacitor插件
description: 构建Capacitor插件 - 设计插件API
contributors:
  - eric-horodyski
sidebar_label: 设计插件API
slug: /plugins/tutorial/designing-the-plugin-api
---

# 设计插件API

构建Capacitor插件时，首要（也可以说是最重要）的步骤就是设计API。这个API将成为我们编写各平台具体实现时需要遵循的契约。

我们可以使用TypeScript来定义插件API，它不仅作为实现时的规范，还能享受TypeScript带来的智能提示和类型检查等优势。

## 等一下，你真的需要插件吗？

你可能不知道，现代浏览器已经能实现许多我们认为"需要原生功能"的操作，比如检查电池状态、语音识别，甚至是屏幕方向控制。在构建Web Native应用时，经常会发现一些原本需要插件才能实现的功能，现在通过Web API就能直接使用。

> 在针对某个功能开发插件前，建议先访问 <a href="https://whatwebcando.today/" target="_blank">What Web Can Do Today</a> 这类网站，确认所需功能是否已作为Web API提供。

既然屏幕方向控制已有Web API，为什么我们还要自己开发呢？查看 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">Screen Orientation Web API</a> 会发现（截至本文撰写时）iOS并未实现该API，这意味着我们需要自行提供实现。对于Android平台，虽然可以直接使用Web API，但出于教学目的，我们将选择原生实现屏幕方向控制功能。

## 定义ScreenOrientation API

虽然无法直接使用Web API，但我们可以参考它的设计来建模我们的插件API：

| 方法名称           | 输入参数                              | 返回值                                              |
| ------------------ | ------------------------------------- | --------------------------------------------------- |
| orientation        |                                       | `Promise<ScreenOrientationResult>`                |
| lock               | `options: OrientationLockOptions` | `Promise<void>`                                     |
| unlock             |                                       | `Promise<void>`                                     |
| addListener        | `(orientation: ScreenOrientationResult)` | `Promise<PluginListenerHandle>` |
| removeAllListeners |                                       | `Promise<void>`                                     |

这里有个额外优势：我们可以直接使用TypeScript内置的DOM类型中的`OrientationType`。由于TypeScript 5.2+移除了`OrientationLockType`，我们需要自行定义。

现在创建目录结构来存放插件API。新建`src/plugins/screen-orientation`子文件夹，并添加以下文件：

- `definitions.ts`
- `index.ts`

在`definitions.ts`中填入以下代码：

```typescript
import type { PluginListenerHandle } from '@capacitor/core';

export interface OrientationLockOptions {
  /**
   * 注意：TypeScript v5.2+用户应从@capacitor/screen-orientation导入OrientationLockType
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
   * 获取当前屏幕方向
   */
  orientation(): Promise<ScreenOrientationResult>;

  /**
   * 锁定屏幕方向
   */
  lock(options: OrientationLockOptions): Promise<void>;

  /**
   * 解除屏幕方向锁定
   */
  unlock(): Promise<void>;

  /**
   * 监听屏幕方向变化
   */
  addListener(
    eventName: 'screenOrientationChange',
    listenerFunc: (orientation: ScreenOrientationResult) => void,
  ): Promise<PluginListenerHandle>;

  /**
   * 移除所有监听器
   */
  removeAllListeners(): Promise<void>;
}
```

## 注册ScreenOrientation插件

为了在Capacitor应用中使用插件，我们需要通过`@capacitor/core`导出的`registerPlugin()`模块进行注册。

在`index.ts`中填入以下代码：

```typescript
import { registerPlugin } from '@capacitor/core';

import type { ScreenOrientationPlugin } from './definitions';

const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>('ScreenOrientation');

export * from './definitions';
export { ScreenOrientation };
```

上述代码创建了一个与我们插件实现代码关联的对象。

API设计已完成，接下来我们将构建调用该API的用户界面，这将帮助我们在实现各平台集成时更方便地进行测试。下一步：开始使用这个插件API。