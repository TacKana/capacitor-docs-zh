---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - Web/PWA 平台实现
contributors:
  - eric-horodyski
sidebar_label: Web/PWA 平台实现
slug: /plugins/tutorial/web
---

# Web/PWA 平台实现

在设计插件 API 时，我们发现 Web 平台已经支持屏幕方向功能（当然，移动设备除外）。你可能会问："我们的插件为什么需要 Web 实现？难道我们不能通过编程检测用户是否在 Web 平台上，然后使用 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">Screen Orientation Web API</a>，否则就使用插件吗？"

Web Native 应用的核心原则是"一次编写，随处运行"。这同样适用于插件；使用 Capacitor 插件的开发者应该能够使用相同的插件类和方法，并在所有平台上都有相应的实现。

因此，作为优秀的开发者，我们将把 Screen Orientation Web API 封装到 `ScreenOrientation` 插件的 Web 实现中。

## 扩展 Capacitor 的 WebPlugin 类

新建文件 `src/plugins/screen-orientation/web.ts`。我们将在此文件中编写 `ScreenOrientation` 插件的 Web 实现。

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

Capacitor 的 `WebPlugin` 类包含了通知插件监听器的逻辑，我们将用它来告知监听器屏幕方向何时发生变化。当 Screen Orientation Web API 的 change 事件触发时，更新构造函数来通知所有监听器：

```typescript
constructor() {
   super();
   window.screen.orientation.addEventListener("change", () => {
     const type = window.screen.orientation.type;
     this.notifyListeners("screenOrientationChange", { type });
   });
 }
```

`WebPlugin` 类已经实现了 `ScreenOrientationPlugin` 接口中定义的 `addListener()` 和 `removeAllListeners()` 方法。使用这些方法不需要额外的工作。

## 实现剩余方法

让我们完成 `ScreenOrientationPlugin` 接口的实现。首先调整类定义，使其真正实现该接口：

```typescript
export class ScreenOrientationWeb
  extends WebPlugin
  implements ScreenOrientationPlugin
{
```

然后在 `ScreenOrientationWeb` 类中实现剩余方法：

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

要将 `ScreenOrientationWeb` 注册为我们插件的 Web 实现，需要使用 `registerPlugin()` 的第二个输入参数。打开 `src/plugins/screen-orientation/index.ts`，更新 `ScreenOrientation` 变量的声明：

```typescript
const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
  {
    web: () => import('./web').then(m => new m.ScreenOrientationWeb()),
  },
);
```

## 测试一下！

现在测试 Web 实现。使用 `ionic serve` 启动你的应用程序，你可以使用浏览器的开发者工具来模拟移动设备的竖屏和横屏方向。"Rotate my Device" 按钮可能无法正常工作，因为 Web 平台对 `window.screen.orientation.lock()` 的支持有限，但通过开发者工具手动旋转方向，你应该能看到不同的设计效果。

一个平台已实现，还有两个平台待完成！在深入 iOS 和 Android 代码之前，我们应该考虑如何进行模式化和抽象化。让我们在下一步中回顾一些代码抽象模式。