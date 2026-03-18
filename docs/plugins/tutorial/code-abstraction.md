---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 代码抽象模式
contributors:
  - eric-horodyski
sidebar_label: 代码抽象模式
slug: /plugins/tutorial/code-abstraction-patterns
---

# Capacitor 插件抽象模式

为 Capacitor 构建的插件在复杂度上可以有很大差异。我们以 <a href="https://capacitorjs.com/docs/plugins" target="_blank">官方 Capacitor 插件</a> 为例：<a href="https://github.com/ionic-team/capacitor-plugins/blob/main/toast/android/src/main/java/com/capacitorjs/plugins/toast/Toast.java" target="_blank">Toast 插件</a> 的 Android 实现非常简单，而 <a href="https://github.com/ionic-team/capacitor-plugins/tree/main/push-notifications/android/src/main/java/com/capacitorjs/plugins/pushnotifications" target="_blank">Push Notifications</a> 则相当复杂，包含多个文件。

根据插件的复杂度和需求，将构建插件所需的工作范围界定为一个独立的软件项目并不为过，特别是当 iOS 和 Android 平台的实现要求存在差异时。

因此，重温设计模式并回顾标准的 Capacitor 插件代码抽象模式是很有必要的。

## 设计模式基础

设计模式是针对软件设计中常见问题的通用、可复用的解决方案。设计模式并非问题的程序化解决方案；相反，它们是指导或蓝图，用于抽象代码以解决反复出现的问题。

即使您没有意识到，您很可能已经使用过设计模式。Angular 严重依赖依赖注入和单例模式。React 使用中介者和状态模式。推送通知使用观察者模式。

作为开发者，您应当自如地运用设计模式库来构建适合您 Capacitor 插件的代码抽象。

以下是一些描述并提供设计模式示例的优秀资源：

- <a href="https://www.oreilly.com/library/view/head-first-design/0596007124/" target="_blank">Head First Design Patterns (O'Reilly Publishing)</a>
- <a href="https://refactoring.guru/design-patterns" target="_blank">Design Patterns (Refactoring Guru)</a>

> 就我个人而言，我会在项目规划阶段翻阅《Head First Design Patterns》，而在埋头写代码时浏览 Refactoring Guru。

## 实际应用中的模式

如果您查看足够多的 Capacitor 插件源代码，会发现某些设计模式在 Capacitor 插件开发者中很受欢迎。

**桥接设计模式**

桥接设计模式将代码的抽象与实现分离。它是一种设计机制，将实现类封装在接口类内部。

官方 Capacitor 插件大量使用桥接模式，Device 插件中的这个例子就是明证：

```swift
@objc func getLanguageCode(_ call: CAPPluginCall) {
    let code = implementation.getLanguageCode()
    call.resolve([ "value": code ])
}
```

为什么这种设计模式如此适合 Capacitor 插件？

- 您可以在抽象层专注高层逻辑，在实现层专注平台细节。
- 您向客户端隐藏了实现细节。
- 您可以独立地引入新的实现。
- 您可以创建平台无关的类和实现。

**外观设计模式**

外观设计模式为包含许多移动部件的复杂子系统提供了一个简单接口。它可能不会暴露子系统的所有功能，但会暴露客户端关心的特性。

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

- 您可以将代码与子系统的复杂性隔离开来。
- 您可以保护客户端代码免受子系统代码变更的影响。
- 您可以将子系统结构化为多个层次。

## 屏幕方向插件将使用什么模式？

`ScreenOrientation` 插件将使用桥接设计模式。虽然我们尚未涉及插件所需操作背后的 iOS 和 Android API，但正如您将在下一步开始的 iOS 实现中所见，实现我们插件的 API 是直接且相对简单的。