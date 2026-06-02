---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 代码抽象模式
contributors:
  - eric-horodyski
sidebar_label: 代码抽象模式
slug: /plugins/tutorial/code-abstraction-patterns
---

# Capacitor 插件抽象模式

为 Capacitor 构建的插件的复杂程度各不相同。以 <a href="https://capacitorjs.com/docs/plugins" target="_blank">官方 Capacitor 插件</a>为例：<a href="https://github.com/ionic-team/capacitor-plugins/blob/main/toast/android/src/main/java/com/capacitorjs/plugins/toast/Toast.java" target="_blank">Toast 插件</a>的 Android 实现很简单，而 <a href="https://github.com/ionic-team/capacitor-plugins/tree/main/push-notifications/android/src/main/java/com/capacitorjs/plugins/pushnotifications" target="_blank">Push Notifications</a> 则相当复杂，包含多个文件。

根据插件的复杂度和需求，将构建插件所需的工作范围定义为一个独立的软件项目也不为过，特别是当 iOS 和 Android 之间的实现需求有所不同时。

话虽如此，我们有必要回顾一下设计模式，并对标准的 Capacitor 插件代码抽象进行复习。

## 设计模式基础

设计模式是软件设计中常见问题的通用、可复用的解决方案。设计模式不是解决问题的程序化方案；而是抽象代码以解决重复性问题的指南或蓝图。

即使你没有意识到，你很可能已经在使用设计模式了。Angular 高度依赖依赖注入和单例模式。React 使用中介者模式和状态模式。推送通知使用观察者模式。

作为开发者，你应该能够自如地使用设计模式库来创建适合你 Capacitor 插件的代码抽象。

以下是一些描述并提供设计模式示例的优秀资源：

- <a href="https://www.oreilly.com/library/view/head-first-design/0596007124/" target="_blank">Head First 设计模式（O'Reilly 出版社）</a>
- <a href="https://refactoring.guru/design-patterns" target="_blank">设计模式（Refactoring Guru）</a>

> 就我个人而言，我会在项目规划阶段翻阅一本 _Head First 设计模式_，而在埋头写代码时浏览 _Refactoring Guru_。

## 实际应用中的模式

如果你阅读足够多的 Capacitor 插件源码，你会发现某些设计模式在 Capacitor 插件开发者中很受欢迎。

**桥接模式**

桥接设计模式将代码的抽象从其实现中分离出来。它是一种将实现类封装在接口类中的设计机制。

官方 Capacitor 插件大量使用了桥接模式，Device 插件中的这个示例就证明了这一点：

```swift
@objc func getLanguageCode(_ call: CAPPluginCall) {
    let code = implementation.getLanguageCode()
    call.resolve([ "value": code ])
}
```

为什么这种设计模式如此适合 Capacitor 插件？

- 你可以在抽象层关注高层逻辑，在实现层关注平台细节。
- 你可以向客户端隐藏实现细节。
- 你可以独立地引入新的实现。
- 你可以创建与平台无关的类和实现。

**外观模式**

外观设计模式为包含许多移动部件的复杂子系统提供了一个简单接口。它可能不会暴露子系统的全部功能。但它会暴露客户端关心的功能。

一些更复杂的 Capacitor 官方插件使用了外观模式，包括 Local Notifications 插件：

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
- 你可以保护客户端代码免受子系统代码的任何更改的影响。
- 你可以将子系统分层组织。

## 屏幕方向插件将使用哪种模式？

`ScreenOrientation` 插件将使用桥接设计模式。虽然我们还没有涉及执行插件所需操作所需的底层 iOS 和 Android API，但实现插件 API 是直接且相对简单的，正如你将在下一步中看到的那样：iOS 实现。
