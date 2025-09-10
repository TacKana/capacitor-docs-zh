---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - Web/PWA 平台实现
contributors:
  - eric-horodyski
sidebar_label: Web/PWA 平台实现
slug: /plugins/tutorial/web
---

# Web/PWA 平台实现

在设计插件 API 时，我们发现 Web 平台已经原生支持屏幕方向功能（当然，移动设备除外）。你可能会问：既然这样，为什么我们的插件还需要实现 Web 版本...难道不能通过代码检测用户是否在 Web 环境，然后直接使用 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">屏幕方向 Web API</a>，其他平台才使用插件吗？

Web Native 应用的核心信条是"一次编写，处处运行"。这一原则同样适用于插件开发——使用 Capacitor 插件的开发者应该能够通过相同的插件类和方法在所有平台上实现功能。

因此，作为优秀开发者，我们将把屏幕方向 Web API 封装在 `ScreenOrientation` 插件的 Web 实现中。

## 扩展 Capacitor 的 WebPlugin 类

新建文件 `src/plugins/screen-orientation/web.ts`，这里将编写 `ScreenOrientation` 插件的 Web 实现。

首先声明 `ScreenOrientationWeb` 类并继承 `WebPlugin`：

```typescript
import { WebPlugin } from '@capacitor/core';
import type { ScreenOrientationPlugin } from './definitions';

export class ScreenOrientationWeb extends WebPlugin {
  constructor() {
    super();
  }
}
```

Capacitor 的 `WebPlugin` 类包含了通知监听器的逻辑，我们将利用它在屏幕方向变化时通知监听器。更新构造函数如下：

```typescript
constructor() {
   super();
   window.screen.orientation.addEventListener("change", () => {
     const type = window.screen.orientation.type;
     this.notifyListeners("screenOrientationChange", { type });
   });
 }
```

`WebPlugin` 类已经实现了 `ScreenOrientationPlugin` 接口中定义的 `addListener()` 和 `removeAllListeners()` 方法，因此不需要额外实现。

## 实现剩余方法

接下来完成 `ScreenOrientationPlugin` 接口的实现。首先调整类定义使其显式实现该接口：

```typescript
export class ScreenOrientationWeb
  extends WebPlugin
  implements ScreenOrientationPlugin
{
```

然后在 `ScreenOrientationWeb` 类中实现剩余方法：

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

要将 `ScreenOrientationWeb` 注册为插件的 Web 实现，需要使用 `registerPlugin()` 的第二个参数。打开 `src/plugins/screen-orientation/index.ts` 并更新 `ScreenOrientation` 变量的声明：

```typescript
const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
  {
    web: () => import('./web').then(m => new m.ScreenOrientationWeb()),
  },
);
```

## 测试功能

现在可以测试 Web 实现了。使用 `ionic serve` 启动应用，通过浏览器的开发者工具模拟移动设备横竖屏切换。虽然"旋转设备"按钮由于 Web 平台对 `window.screen.orientation.lock()` 支持有限而无法工作，但手动旋转设备方向时应该能看到不同的设计效果。

一个平台实现完成了，还有两个待实现！在深入 iOS 和 Android 代码之前，我们需要考虑如何组织和抽象代码。下一步我们将探讨一些代码抽象模式。