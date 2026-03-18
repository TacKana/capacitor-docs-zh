---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 代码抽象模式
contributors:
  - eric-horodyski
sidebar_label: 代码抽象模式
slug: /plugins/tutorial/code-abstraction-patterns
---

# Capacitor 插件抽象模式

为 Capacitor 构建的插件在复杂度上各不相同。让我们以 <a href="https://capacitorjs.com/docs/plugins" target="_blank">官方 Capacitor 插件</a>为例：<a href="https://github.com/ionic-team/capacitor-plugins/blob/main/toast/android/src/main/java/com/capacitorjs/plugins/toast/Toast.java" target="_blank">Toast 插件</a>的 Android 实现很简单，而 <a href="https://github.com/ionic-team/capacitor-plugins/tree/main/push-notifications/android/src/main/java/com/capacitorjs/plugins/pushnotifications" target="_blank">推送通知</a>插件则相当复杂，包含多个文件。

根据插件的复杂度和需求，将构建插件所需的工作范围定义为一个独立的软件项目并不过分，特别是当 iOS 和 Android 的实现要求不同时。

话虽如此，重温一下设计模式并回顾标准的 Capacitor 插件代码抽象是很有必要的。

## 设计模式入门

设计模式是解决软件设计中常见问题的通用、可复用的方案。设计模式并非问题的编程解决方案，而是指导或蓝图，用于抽象代码以解决反复出现的问题。

即使你没有意识到，很可能已经使用过设计模式。Angular 严重依赖依赖注入和单例模式。React 使用了中介者和状态模式。推送通知使用了观察者模式。

作为开发者，你应该有权力运用设计模式库来构建适合你 Capacitor 插件的代码抽象。

以下是描述并提供设计模式示例的一些优秀资源：

- <a href="https://www.oreilly.com/library/view/head-first-design/0596007124/" target="_blank">Head First Design Patterns (O'Reilly 出版)</a>
- <a href="https://refactoring.guru/design-patterns" target="_blank">设计模式 (Refactoring Guru)</a>

> 就个人而言，我在项目规划阶段会翻阅《Head First Design Patterns》一书，而在埋头写代码时会浏览 Refactoring Guru 网站。

## 实践中的模式

如果你查看足够多的 Capacitor 插件源代码，会发现某些设计模式在 Capacitor 插件开发者中很受欢迎。

**桥接设计模式**

桥接设计模式将代码的抽象与实现分离。这是一种将实现类封装在接口类内部的设计机制。

官方 Capacitor 插件大量使用了桥接模式，Device 插件中的这个例子就是明证：

```swift
@objc func getLanguageCode(_ call: CAPPluginCall) {
    let code = implementation.getLanguageCode()
    call.resolve([ "value": code ])
}
```

为什么这种设计模式如此适合 Capacitor 插件？

- 你可以在抽象中专注于高层逻辑，在实现中专注于平台细节
- 可以向客户端隐藏实现细节
- 可以独立地引入新的实现
- 可以创建平台无关的类和实现

**外观设计模式**

外观设计模式为包含许多组件的复杂子系统提供了一个简单接口。它可能不会暴露子系统的所有功能，但会暴露客户端关心的特性。

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

为什么这种设计模式适合 Capacitor 插件？

- 可以使代码与子系统的复杂性隔离
- 可以保护客户端代码免受子系统代码变更的影响
- 可以将子系统结构分层

## 屏幕方向插件将使用什么？

`ScreenOrientation` 插件将使用桥接设计模式。虽然我们尚未讨论实现插件功能所需的底层 iOS 和 Android API，但正如你将在下一步（iOS 实现）中看到的，实现我们的插件 API 是直接且相对简单的。