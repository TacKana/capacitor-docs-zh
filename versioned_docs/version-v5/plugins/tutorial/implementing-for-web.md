---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 实现 Web/PWA 平台
contributors:
  - eric-horodyski
sidebar_label: 实现 Web/PWA 平台
slug: /plugins/tutorial/web
---

# 实现 Web/PWA 平台

在设计插件 API 时，我们发现 Web 已经支持屏幕方向功能（当然，移动设备除外）。您可能会问，我们的插件有 Web 实现还有什么意义……难道不能以编程方式检测用户是否在 Web 上，如果是在 Web 上就使用 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">Screen Orientation Web API</a>，否则使用插件吗？

Web 原生应用的信条是"一次编写，到处运行。"这也适用于插件；使用 Capacitor 插件的开发者应该能够使用相同的插件类和方法，并且它们为所有平台都实现了。

因此，我们将成为良好的开发者公民，将 Screen Orientation Web API 包装在 `ScreenOrientation` 插件的 Web 实现中。

## 扩展 Capacitor 的 WebPlugin 类

打开一个新文件 `src/plugins/screen-orientation/web.ts`。这个文件将是我们编写 `ScreenOrientation` 插件 Web 实现的地方。

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

Capacitor 的 `WebPlugin` 类包含通知任何插件监听器的逻辑，我们将用它来在屏幕方向改变时通知监听器。当 Screen Orientation Web API 的 change 事件触发时，让我们通知任何监听器。像这样更新构造函数：

```typescript
constructor() {
   super();
   window.screen.orientation.addEventListener("change", () => {
     const type = window.screen.orientation.type;
     this.notifyListeners("screenOrientationChange", { type });
   });
 }
```

`WebPlugin` 类包含了在 `ScreenOrientationPlugin` 接口中定义的 `addListener()` 和 `removeAllListeners()` 方法的实现。不需要额外的工作即可使用这些方法。

## 实现其余方法

让我们完成 `ScreenOrientationPlugin` 接口的实现。首先调整类定义，使其_真正_实现该接口：

```typescript
export class ScreenOrientationWeb
  extends WebPlugin
  implements ScreenOrientationPlugin
{
```

然后将剩余的方法作为 `ScreenOrientationWeb` 类的一部分来实现：

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

要将 `ScreenOrientationWeb` 注册为我们插件的 Web 实现，我们需要使用 `registerPlugin()` 的第二个输入参数。打开 `src/plugins/screen-orientation/index.ts`，并像这样更新 `ScreenOrientation` 变量的声明：

```typescript
const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
  {
    web: () => import('./web').then(m => new m.ScreenOrientationWeb()),
  },
);
```

## 测试一下！

测试 Web 实现。使用 `ionic serve` 提供您的应用，您可以使用浏览器的开发工具在竖屏和横屏屏幕方向下模拟移动设备。"Rotate my Device"按钮不起作用，因为 `window.screen.orientation.lock()` 的 Web 支持较差，但如果您使用开发者工具手动旋转方向，您应该能够看到不同的设计。

一个平台已经实现，还有两个！在深入 iOS 和 Android 代码之前，我们应该考虑如何模式化和抽象代码。让我们在下一步——代码抽象模式中回顾一些模式。
