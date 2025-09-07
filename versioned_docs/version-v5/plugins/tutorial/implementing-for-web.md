---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - Web/PWA 平台实现
contributors:
  - eric-horodyski
sidebar_label: Web/PWA 平台实现
slug: /plugins/tutorial/web
---

# Web/PWA 平台实现方案

在设计插件 API 时，我们发现 Web 平台其实已经原生支持屏幕方向功能（当然移动设备除外）。你可能会问：既然这样，为什么我们的插件还需要 Web 实现？难道不能通过编程检测用户是否在 Web 环境，然后直接使用 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">Screen Orientation Web API</a>，否则再调用插件吗？

Web Native 应用的核心原则是"一次编写，处处运行"。这个理念同样适用于插件开发——使用 Capacitor 插件的开发者应该能够通过相同的插件类和方法调用，在所有平台上获得一致的实现。

因此，作为优秀的开发者，我们需要将 Screen Orientation Web API 封装到 `ScreenOrientation` 插件的 Web 实现中。

## 扩展 Capacitor 的 WebPlugin 类

新建文件 `src/plugins/screen-orientation/web.ts`，这里将编写插件在 Web 平台的实现。

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

Capacitor 的 `WebPlugin` 类包含通知监听器的逻辑，我们将利用它在屏幕方向变化时触发回调。更新构造函数如下：

```typescript
constructor() {
   super();
   window.screen.orientation.addEventListener("change", () => {
     const type = window.screen.orientation.type;
     this.notifyListeners("screenOrientationChange", { type });
   });
 }
```

`WebPlugin` 基类已经实现了 `ScreenOrientationPlugin` 接口中的 `addListener()` 和 `removeAllListeners()` 方法，我们无需额外处理。

## 实现其余接口方法

让类定义明确实现 `ScreenOrientationPlugin` 接口：

```typescript
export class ScreenOrientationWeb
  extends WebPlugin
  implements ScreenOrientationPlugin
{
```

然后在类中实现剩余的接口方法：

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

## 注册 Web 平台实现

要通过 `registerPlugin()` 的第二个参数注册 Web 实现。更新 `src/plugins/screen-orientation/index.ts` 中的插件声明：

```typescript
const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
  {
    web: () => import('./web').then(m => new m.ScreenOrientationWeb()),
  },
);
```

## 实际测试！

现在可以测试 Web 实现了。使用 `ionic serve` 启动应用，通过浏览器开发者工具模拟移动设备的横竖屏切换。虽然"旋转设备"按钮可能无法正常工作（因为 `window.screen.orientation.lock()` 的 Web 支持有限），但你应该能通过手动旋转看到不同方向的设计效果。

一个平台实现完成，还剩两个！在深入 iOS 和 Android 代码前，我们需要考虑代码组织和抽象模式。下一步让我们探讨一些代码抽象模式。