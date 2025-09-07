---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 实现 Web/PWA 端功能
contributors:
  - eric-horodyski
sidebar_label: 实现 Web/PWA 端
slug: /plugins/tutorial/web
---

# 实现 Web/PWA 端功能

在设计插件 API 时，我们发现 Web 平台已经原生支持屏幕方向功能（当然，移动设备除外）。你可能会有疑问：为什么我们的插件还需要实现 Web 端？难道不能通过编程判断用户是否在 Web 端，然后直接使用 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">Screen Orientation Web API</a>，否则再使用插件吗？

"一次编写，随处运行"是 Web 原生应用的核心理念，这一理念同样适用于插件开发。使用 Capacitor 插件的开发者应该能够使用相同的插件类和方法，并确保它们在所有平台上都能正常工作。

因此，作为负责任的开发者，我们将把 Screen Orientation Web API 封装到 `ScreenOrientation` 插件的 Web 端实现中。

## 扩展 Capacitor 的 WebPlugin 类

新建文件 `src/plugins/screen-orientation/web.ts`，这里将编写 `ScreenOrientation` 插件的 Web 端实现。

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

Capacitor 的 `WebPlugin` 类包含了通知插件监听器的逻辑。我们将在屏幕方向发生变化时使用这个功能。更新构造函数如下：

```typescript
constructor() {
   super();
   window.screen.orientation.addEventListener("change", () => {
     const type = window.screen.orientation.type;
     this.notifyListeners("screenOrientationChange", { type });
   });
 }
```

`WebPlugin` 类已经实现了 `ScreenOrientationPlugin` 接口中定义的 `addListener()` 和 `removeAllListeners()` 方法，因此无需额外实现。

## 实现剩余方法

现在完善 `ScreenOrientationPlugin` 接口的实现。首先调整类定义，使其显式实现该接口：

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

## 注册 Web 端实现

要将 `ScreenOrientationWeb` 注册为插件的 Web 端实现，我们需要使用 `registerPlugin()` 的第二个参数。打开 `src/plugins/screen-orientation/index.ts` 并更新 `ScreenOrientation` 变量的声明：

```typescript
const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
  {
    web: () => import('./web').then(m => new m.ScreenOrientationWeb()),
  },
);
```

## 测试功能

现在可以测试 Web 端实现了。使用 `ionic serve` 启动应用，然后通过浏览器的开发者工具模拟移动设备的横竖屏方向。"旋转设备"按钮可能无法正常工作，因为 `window.screen.orientation.lock()` 在 Web 端支持有限，但你应该能通过开发者工具手动旋转方向来查看不同的设计效果。

至此已完成一个平台的实现，还有两个平台待完成！在深入 iOS 和 Android 代码之前，我们应该考虑如何设计和抽象代码。下一步让我们来探讨一些代码抽象模式。