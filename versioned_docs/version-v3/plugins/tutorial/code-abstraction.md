---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 代码抽象模式
contributors:
  - eric-horodyski
sidebar_label: 代码抽象模式
slug: /plugins/tutorial/code-abstraction-patterns
---

# Capacitor 插件抽象模式

为 Capacitor 构建的插件复杂程度各不相同。让我们以<a href="https://capacitorjs.com/docs/v3/plugins" target="_blank">官方 Capacitor 插件</a>为例：<a href="https://github.com/ionic-team/capacitor-plugins/blob/main/toast/android/src/main/java/com/capacitorjs/plugins/toast/Toast.java" target="_blank">Toast 插件</a>的 Android 实现很简单，而 <a href="https://github.com/ionic-team/capacitor-plugins/tree/main/push-notifications/android/src/main/java/com/capacitorjs/plugins/pushnotifications" target="_blank">Push Notifications</a> 则相当复杂，包含多个文件。

根据插件的复杂程度和需求，将构建插件所需的工作范围界定为一个独立的软件项目并不为过，特别是当 iOS 和 Android 之间的实现需求存在差异时。

话虽如此，重温设计模式并回顾标准的 Capacitor 插件代码抽象是很有必要的。

## 设计模式入门

设计模式是软件设计中常见问题的通用、可复用的解决方案。设计模式不是问题的程序化解决方案，而是关于抽象代码以解决重复出现问题的指南或蓝图。

即使你没有意识到，你也很可能已经使用过设计模式。Angular 严重依赖依赖注入和单例模式。React 使用中介者模式和状态模式。推送通知使用观察者模式。

作为开发者，你应该能够灵活运用设计模式库来为你的 Capacitor 插件打造合适的代码抽象。

一些描述和提供设计模式示例的优秀资源有：

- <a href="https://www.oreilly.com/library/view/head-first-design/0596007124/" target="_blank">Head First 设计模式（O'Reilly 出版）</a>
- <a href="https://refactoring.guru/design-patterns" target="_blank">设计模式（Refactoring Guru）</a>

> 就个人而言，我会在项目规划阶段翻阅一本《Head First 设计模式》，在埋头写代码时浏览 Refactoring Guru。

## 实际中的模式

如果你看了足够多的 Capacitor 插件源代码，你会发现某些设计模式在 Capacitor 插件开发者中很受欢迎。

**桥接设计模式**

桥接设计模式将代码的抽象与实现分离。它是一种将实现类封装在接口类内部的设计机制。

官方 Capacitor 插件大量使用了桥接模式，以下来自 Device 插件的示例可以证明：

```swift
@objc func getLanguageCode(_ call: CAPPluginCall) {
    let code = implementation.getLanguageCode()
    call.resolve([ "value": code ])
}
```

为什么这种设计模式如此适合 Capacitor 插件？

- 你可以专注于抽象中的高级逻辑和实现中的平台细节。
- 你对客户端隐藏了实现细节。
- 你可以独立地引入新的实现。
- 你可以创建与平台无关的类和实现。

**外观设计模式**

外观设计模式为包含许多移动部件的复杂子系统提供了一个简单接口。它可能不暴露子系统的所有功能，但它确实暴露了客户端关心的功能。

一些更复杂的官方 Capacitor 插件使用了外观模式，包括 Local Notifications 插件：

```java
@Override
public void load() {
    super.load();
    notificationStorage = new NotificationStorage(getContext());
    manager = new LocalNotificationManager( … );
    manager.createNotificationChannel();
    notificationChannelManager = new NotificationChannelManager(getActivity());
    staticBridge = this.bridge;
}
```

为什么这种设计模式适合 Capacitor 插件？

- 你可以将代码与子系统的复杂性隔离开来。
- 你可以保护客户端代码免受子系统代码变更的影响。
- 你可以将子系统分层组织。

## 屏幕方向插件将使用哪种模式？

`ScreenOrientation` 插件将使用桥接设计模式。虽然我们还没有涉及执行插件所需操作所需的底层 iOS 和 Android API，但实现我们的插件 API 是直接且相对简单的，你将在下一步中看到：iOS 实现。
