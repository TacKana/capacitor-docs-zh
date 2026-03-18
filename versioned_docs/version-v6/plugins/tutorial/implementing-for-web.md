---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - Web/PWA 平台实现
contributors:
  - eric-horodyski
sidebar_label: Web/PWA 平台实现
slug: /plugins/tutorial/web
---

# Web/PWA 平台实现

在设计插件 API 时，我们发现 Web 平台已经原生支持屏幕方向功能（当然，移动设备除外）。你可能想问，既然这样，为什么我们的插件还需要 Web 实现呢？难道不能通过编程方式检测用户是否在 Web 端，然后直接使用 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">屏幕方向 Web API</a>，否则再使用插件功能吗？

Web Native 应用的核心理念是“一次编写，处处运行”。这一理念同样适用于插件开发——使用 Capacitor 插件的开发者应该能够使用相同的插件类和方法，并在所有平台上获得相应的实现。

因此，作为负责任的开发者，我们将在 `ScreenOrientation` 插件的 Web 实现中封装屏幕方向 Web API。

## 扩展 Capacitor 的 WebPlugin 类

新建文件 `src/plugins/screen-orientation/web.ts`，这里将编写 `ScreenOrientation` 插件的 Web 实现。

首先声明 `ScreenOrientationWeb` 类，并让它继承 `WebPlugin`：

```typescript
import { WebPlugin } from '@capacitor/core';
import type { ScreenOrientationPlugin } from './definitions';

export class ScreenOrientationWeb extends WebPlugin {
  constructor() {
    super();
  }
}
```

Capacitor 的 `WebPlugin` 类包含了通知插件监听器的逻辑，我们将利用它来告知监听器屏幕方向何时发生变化。当屏幕方向 Web API 的 change 事件触发时，更新所有监听器。修改构造函数如下：

```typescript
constructor() {
   super();
   window.screen.orientation.addEventListener("change", () => {
     const type = window.screen.orientation.type;
     this.notifyListeners("screenOrientationChange", { type });
   });
 }
```

`WebPlugin` 类已经实现了 `ScreenOrientationPlugin` 接口中定义的 `addListener()` 和 `removeAllListeners()` 方法，我们无需为这些方法编写额外代码。

## 实现剩余方法

现在来完成 `ScreenOrientationPlugin` 接口的实现。首先调整类定义，使其真正实现该接口：

```typescript
export class ScreenOrientationWeb
  extends WebPlugin
  implements ScreenOrientationPlugin
{
```

然后将剩余的方法作为 `ScreenOrientationWeb` 类的一部分实现：

```typescript
 async orientation(): Promise<{ type: OrientationType }> {
   return { type: window.screen.orientation.type };
 }

 async lock(opts: { orientation: OrientationLockType }): Promise<void> {
   await window.screen.orientation.lock(opts.orientation);
 }

 async unlock(): Promise<void> {
   window.screen.orientation.unlock();
 }
```

## 注册 Web 实现

要将 `ScreenOrientationWeb` 注册为插件的 Web 实现，我们需要使用 `registerPlugin()` 的第二个输入参数。打开 `src/plugins/screen-orientation/index.ts`，更新 `ScreenOrientation` 变量的声明如下：

```typescript
const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
  {
    web: () => import('./web').then(m => new m.ScreenOrientationWeb()),
  },
);
```

## 立即体验！

现在来测试 Web 实现。使用 `ionic serve` 启动你的应用，然后通过浏览器的开发者工具模拟移动设备，切换横屏和竖屏方向。虽然“旋转我的设备”按钮可能无法正常工作（因为 `window.screen.orientation.lock()` 在 Web 端支持有限），但通过开发者工具手动旋转方向时，你应该能看到不同的设计效果。

一个平台实现完成，还有两个待实现！在深入 iOS 和 Android 代码之前，我们需要考虑如何构建和抽象代码。接下来让我们看看代码抽象模式。