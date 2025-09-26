---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - Web/PWA 平台实现
contributors:
  - eric-horodyski
sidebar_label: Web/PWA 平台实现
slug: /plugins/tutorial/web
---

# Web/PWA 平台实现

在设计插件 API 时，我们发现 Web 平台本身已支持屏幕方向功能（当然移动设备除外）。您可能会问："为什么还需要为 web 实现插件？能否直接检测用户是否在 Web 端，然后使用 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">Screen Orientation Web API</a>，其他平台再使用插件？"

Web Native 应用的核心理念是"一次编写，处处运行"。这同样适用于插件开发，使用 Capacitor 插件的开发者应该能够通过相同的插件类和方法在所有平台上实现功能。

因此，我们将遵循最佳实践，将 Screen Orientation Web API 封装到 `ScreenOrientation` 插件的 web 实现中。

## 继承 Capacitor 的 WebPlugin 类

新建文件 `src/plugins/screen-orientation/web.ts`，这里将编写 `ScreenOrientation` 插件的 web 实现。

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

Capacitor 的 `WebPlugin` 类包含了通知插件监听器的逻辑，我们将利用它来告知监听器屏幕方向的变化。更新构造函数如下：

```typescript
constructor() {
   super();
   window.screen.orientation.addEventListener("change", () => {
     const type = window.screen.orientation.type;
     this.notifyListeners("screenOrientationChange", { type });
   });
 }
```

`WebPlugin` 类已经实现了 `ScreenOrientationPlugin` 接口中的 `addListener()` 和 `removeAllListeners()` 方法，无需额外实现。

## 实现剩余方法

调整类定义使其正式实现 `ScreenOrientationPlugin` 接口：

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
        '当前浏览器不支持 ScreenOrientation API',
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
        '当前浏览器不支持 ScreenOrientation API',
      );
    }
    try {
      await (screen.orientation as any).lock(options.orientation);
    } catch {
      throw this.unavailable(
        '当前浏览器不支持 ScreenOrientation API',
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
        '当前浏览器不支持 ScreenOrientation API',
      );
    }
    try {
      screen.orientation.unlock();
    } catch {
      throw this.unavailable(
        '当前浏览器不支持 ScreenOrientation API',
      );
    }
  }
```

## 注册 Web 实现

要将 `ScreenOrientationWeb` 注册为插件的 web 实现，需要在 `registerPlugin()` 的第二个参数中指定。更新 `src/plugins/screen-orientation/index.ts` 中的插件声明：

```typescript
const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
  {
    web: () => import('./web').then(m => new m.ScreenOrientationWeb()),
  },
);
```

## 测试运行！

使用 `ionic serve` 运行应用，可以通过浏览器开发者工具模拟移动设备的横竖屏切换。虽然"旋转设备"按钮可能不生效（因为 Web 平台对 `window.screen.orientation.lock()` 支持有限），但手动旋转方向时应该能看到不同的布局效果。

一个平台实现完成，还有两个！在深入 iOS 和 Android 代码前，我们需要考虑如何组织代码抽象。下一步我们将探讨代码抽象模式。