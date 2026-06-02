---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 为 Web/PWA 实现
contributors:
  - eric-horodyski
sidebar_label: 为 Web/PWA 实现
slug: /plugins/tutorial/web
---

# 为 Web/PWA 实现

在设计插件 API 时，我们发现 Web 已经支持屏幕方向功能（当然，移动设备除外）。你可能会问："我们的插件有 Web 实现有什么意义？难道我们不能通过编程方式检测用户是否在 Web 上，然后使用 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">屏幕方向 Web API</a>，否则使用插件吗？"

Web Native 应用程序的核心理念是"一次编写，随处运行。"这也适用于插件；使用 Capacitor 插件的开发者应该能够使用相同的插件类和方法，并且它们能够在所有平台上实现。

因此，我们将做优秀的开发者，将屏幕方向 Web API 封装在 `ScreenOrientation` 插件的 Web 实现中。

## 扩展 Capacitor 的 WebPlugin 类

打开一个新文件 `src/plugins/screen-orientation/web.ts`。这个文件将用于编写 `ScreenOrientation` 插件的 Web 实现。

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

Capacitor 的 `WebPlugin` 类包含通知所有插件监听器的逻辑，我们将用它来告知监听器屏幕方向已更改。在屏幕方向 Web API 的 change 事件触发时通知所有监听器。更新构造函数如下：

```typescript
constructor() {
   super();
   window.screen.orientation.addEventListener("change", () => {
     const type = window.screen.orientation.type;
     this.notifyListeners("screenOrientationChange", { type });
   });
 }
```

`WebPlugin` 类包含了 `ScreenOrientationPlugin` 接口中定义的 `addListener()` 和 `removeAllListeners()` 方法的实现。无需额外工作即可使用这些方法。

## 实现其余方法

让我们完成 `ScreenOrientationPlugin` 接口的实现。首先调整类定义，使其*真正*实现该接口：

```typescript
export class ScreenOrientationWeb
  extends WebPlugin
  implements ScreenOrientationPlugin
{
```

然后在 `ScreenOrientationWeb` 类中实现其余方法：

```typescript
 async orientation(): Promise<ScreenOrientationResult> {
    if (typeof screen === 'undefined' || !screen.orientation) {
      throw this.unavailable(
        '此浏览器不支持 ScreenOrientation API',
      );
    }
    return { type: screen.orientation.type };
  }

 async lock(options: OrientationLockOptions): Promise<void> {
    // 参见 https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1615
    if (
      typeof screen === 'undefined' ||
      !screen.orientation ||
      !(screen.orientation as any).lock
    ) {
      throw this.unavailable(
        '此浏览器不支持 ScreenOrientation API',
      );
    }
    try {
      await (screen.orientation as any).lock(options.orientation);
    } catch {
      throw this.unavailable(
        '此浏览器不支持 ScreenOrientation API',
      );
    }
  }

 async unlock(): Promise<void> {
    if (
      typeof screen === 'undefined' ||
      !screen.orientation ||
      !screen.orientation.unlock
    ) {
      throw this.unavailable(
        '此浏览器不支持 ScreenOrientation API',
      );
    }
    try {
      screen.orientation.unlock();
    } catch {
      throw this.unavailable(
        '此浏览器不支持 ScreenOrientation API',
      );
    }
  }
```

## 注册 Web 实现

要将 `ScreenOrientationWeb` 注册为我们插件的 Web 实现，我们需要使用 `registerPlugin()` 的第二个输入参数。打开 `src/plugins/screen-orientation/index.ts` 并按如下方式更新 `ScreenOrientation` 变量的声明：

```typescript
const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
  {
    web: () => import('./web').then(m => new m.ScreenOrientationWeb()),
  },
);
```

## 测试一下！

测试 Web 实现。使用 `ionic serve` 运行你的应用程序，然后你可以使用浏览器的开发者工具模拟移动设备的竖屏和横屏方向。"Rotate my Device"按钮可能不起作用，因为 `window.screen.orientation.lock()` 在 Web 上的支持较差，但如果你使用开发者工具手动旋转方向，应该能够看到不同的设计界面。

一个平台已实现，还有两个！在深入研究 iOS 和 Android 代码之前，我们应该考虑如何设计和抽象代码。让我们在下一步中回顾一些模式：代码抽象模式。
