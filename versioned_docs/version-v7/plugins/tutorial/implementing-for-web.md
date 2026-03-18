---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - Web/PWA 平台实现
contributors:
  - eric-horodyski
sidebar_label: Web/PWA 平台实现
slug: /plugins/tutorial/web
---

# Web/PWA 平台实现

在设计插件 API 时，我们发现 Web 平台已经支持屏幕方向功能（当然，移动设备除外）。你可能会问："我们的插件为什么还需要 Web 实现？难道不能通过编程方式检测用户是否在 Web 平台上，然后使用 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">屏幕方向 Web API</a>，否则就使用插件吗？"

Web Native 应用的核心理念是"一次编写，处处运行"。这同样适用于插件；使用 Capacitor 插件的开发者应该能够使用相同的插件类和方法，并在所有平台上获得实现。

因此，作为优秀的开发者，我们将把屏幕方向 Web API 封装在 `ScreenOrientation` 插件的 Web 实现中。

## 扩展 Capacitor 的 WebPlugin 类

新建文件 `src/plugins/screen-orientation/web.ts`。我们将在这个文件中编写 `ScreenOrientation` 插件的 Web 实现。

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

Capacitor 的 `WebPlugin` 类包含了通知插件监听器的逻辑，我们将用它来告知监听器屏幕方向何时发生变化。当屏幕方向 Web API 的 change 事件触发时，让我们通知所有监听器。更新构造函数如下：

```typescript
constructor() {
   super();
   window.screen.orientation.addEventListener("change", () => {
     const type = window.screen.orientation.type;
     this.notifyListeners("screenOrientationChange", { type });
   });
 }
```

`WebPlugin` 类已经实现了 `ScreenOrientationPlugin` 接口中定义的 `addListener()` 和 `removeAllListeners()` 方法。使用这些方法无需额外工作。

## 实现剩余方法

让我们完成 `ScreenOrientationPlugin` 接口的实现。首先调整类定义，使其真正实现该接口：

```typescript
export class ScreenOrientationWeb
  extends WebPlugin
  implements ScreenOrientationPlugin
{
```

然后将剩余方法作为 `ScreenOrientationWeb` 类的一部分实现：

```typescript
 async orientation(): Promise<ScreenOrientationResult> {
    if (typeof screen === 'undefined' || !screen.orientation) {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
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
        'ScreenOrientation API not available in this browser',
      );
    }
    try {
      await (screen.orientation as any).lock(options.orientation);
    } catch {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
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
        'ScreenOrientation API not available in this browser',
      );
    }
    try {
      screen.orientation.unlock();
    } catch {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
  }
```

## 注册 Web 实现

要将 `ScreenOrientationWeb` 注册为我们插件的 Web 实现，需要使用 `registerPlugin()` 的第二个输入参数。打开 `src/plugins/screen-orientation/index.ts`，按如下方式更新 `ScreenOrientation` 变量的声明：

```typescript
const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
  {
    web: () => import('./web').then(m => new m.ScreenOrientationWeb()),
  },
);
```

## 测试一下！

现在测试 Web 实现。使用 `ionic serve` 启动你的应用，你可以使用浏览器的开发者工具来模拟移动设备的竖屏和横屏方向。"旋转我的设备"按钮可能无法正常工作，因为 Web 平台对 `window.screen.orientation.lock()` 的支持有限，但你应该能通过开发者工具手动旋转方向来看到不同的设计效果。

一个平台实现完成，还有两个！在深入 iOS 和 Android 代码之前，我们应该考虑如何设计和抽象代码。让我们在下一步回顾一些模式：代码抽象模式。