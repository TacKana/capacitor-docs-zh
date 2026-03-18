---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 代码抽象模式
contributors:
  - eric-horodyski
sidebar_label: 代码抽象模式
slug: /plugins/tutorial/code-abstraction-patterns
---

# Capacitor 插件抽象模式

为 Capacitor 构建的插件在复杂程度上各不相同。让我们以 <a href="https://capacitorjs.com/docs/plugins" target="_blank">官方 Capacitor 插件</a> 为例：<a href="https://github.com/ionic-team/capacitor-plugins/blob/main/toast/android/src/main/java/com/capacitorjs/plugins/toast/Toast.java" target="_blank">Toast 插件</a> 的 Android 实现相对简单，而 <a href="https://github.com/ionic-team/capacitor-plugins/tree/main/push-notifications/android/src/main/java/com/capacitorjs/plugins/pushnotifications" target="_blank">推送通知</a> 插件则相当复杂，包含多个文件。

根据插件的复杂度和需求，将构建插件所需的工作范围视为一个独立的软件项目并不过分，特别是当 iOS 和 Android 平台的实现要求存在差异时。

话虽如此，我们有必要重温一下设计模式，并回顾 Capacitor 插件中标准的代码抽象方式。

## 设计模式入门

设计模式是解决软件设计中常见问题的通用、可复用的方案。设计模式并非针对具体问题的编程解决方案；相反，它们是关于如何抽象代码来解决重复出现问题的指南或蓝图。

即使您没有意识到，您很可能已经使用过设计模式。Angular 严重依赖依赖注入（Dependency Injection）和单例（Singleton）模式。React 使用了中介者（Mediator）和状态（State）模式。推送通知则运用了观察者（Observer）模式。

作为开发者，您应该有能力运用设计模式库中的知识，为您的 Capacitor 插件构建合适的代码抽象。

以下是一些描述设计模式并提供示例的优秀资源：

- <a href="https://www.oreilly.com/library/view/head-first-design/0596007124/" target="_blank">《Head First 设计模式》（O'Reilly 出版社）</a>
- <a href="https://refactoring.guru/design-patterns" target="_blank">设计模式（Refactoring Guru）</a>

> 就我个人而言，我手头常备一本《Head First 设计模式》，在项目规划阶段翻阅，而在埋头写代码时则会浏览 Refactoring Guru 网站。

## 实际应用中的模式

如果您查看足够多的 Capacitor 插件源代码，会发现某些设计模式在 Capacitor 插件开发者中特别受欢迎。

**桥接设计模式（Bridge Design Pattern）**

桥接设计模式将代码的抽象部分与其实现部分分离。它是一种将实现类封装在接口类内部的设计机制。

官方 Capacitor 插件大量使用了桥接模式，可以从设备插件的这个示例中看出来：

```swift
@objc func getLanguageCode(_ call: CAPPluginCall) {
    let code = implementation.getLanguageCode()
    call.resolve([ "value": code ])
}
```

为什么这种设计模式特别适合 Capacitor 插件？

- 您可以在抽象层专注于高层逻辑，在实现层专注于平台细节。
- 您对客户端隐藏了实现细节。
- 您可以独立地引入新的实现。
- 您可以创建平台无关的类和实现。

**外观设计模式（Facade Design Pattern）**

外观设计模式为包含许多移动部件的复杂子系统提供了一个简单的接口。它可能不会暴露子系统的所有功能，但会暴露客户端关心的功能。

一些更复杂的官方 Capacitor 插件使用了外观模式，包括本地通知插件：

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

为什么这种设计模式也适合 Capacitor 插件？

- 您可以将代码与子系统的复杂性隔离。
- 您可以保护客户端代码免受子系统代码变更的影响。
- 您可以将子系统结构分层。

## 屏幕方向插件将使用哪种模式？

`ScreenOrientation` 插件将使用桥接设计模式。虽然我们尚未讨论实现插件功能所需的底层 iOS 和 Android API，但正如您将在下一步（iOS 实现）中看到的，实现我们插件的 API 是直接且相对简单的。