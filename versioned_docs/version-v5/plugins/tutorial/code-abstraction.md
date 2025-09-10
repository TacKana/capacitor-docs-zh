---
title: 构建 Capacitor 插件
description: Capacitor 插件构建指南 - 代码抽象模式
contributors:
  - eric-horodyski
sidebar_label: 代码抽象模式
slug: /plugins/tutorial/code-abstraction-patterns
---

# Capacitor 插件抽象模式

Capacitor 插件的复杂度各不相同。以<a href="https://capacitorjs.com/docs/plugins" target="_blank">官方 Capacitor 插件</a>为例：<a href="https://github.com/ionic-team/capacitor-plugins/blob/main/toast/android/src/main/java/com/capacitorjs/plugins/toast/Toast.java" target="_blank">Toast 插件</a>的 Android 实现非常简单，而<a href="https://github.com/ionic-team/capacitor-plugins/tree/main/push-notifications/android/src/main/java/com/capacitorjs/plugins/pushnotifications" target="_blank">推送通知</a>插件则包含多个文件，结构相当复杂。

根据插件的复杂度和需求，将一个插件的开发工作视为独立的软件项目并不为过，特别是在 iOS 和 Android 的实现需求存在差异时。

因此，我们有必要重温设计模式，并了解标准的 Capacitor 插件代码抽象方法。

## 设计模式基础

设计模式是针对软件设计中常见问题的通用、可复用的解决方案。它们不是具体的编程解决方案，而是指导如何通过代码抽象来解决重复出现问题的蓝图。

即使您没有意识到，您可能已经使用过设计模式。Angular 大量依赖依赖注入和单例模式，React 使用中介者和状态模式，推送通知则运用了观察者模式。

作为开发者，您应该善用设计模式库来为 Capacitor 插件创建合适的代码抽象。

以下是关于设计模式的优秀资源：

- <a href="https://www.oreilly.com/library/view/head-first-design/0596007124/" target="_blank">《Head First 设计模式》（O'Reilly 出版）</a>
- <a href="https://refactoring.guru/design-patterns" target="_blank">设计模式（重构大师）</a>

> 个人而言，我在项目规划阶段会翻阅《Head First 设计模式》，在编码时则经常浏览《重构大师》。

## 常见的模式实践

如果您研究足够多的 Capacitor 插件源代码，会发现某些设计模式在插件开发者中特别受欢迎。

**桥接模式**

桥接模式将抽象与实现分离，通过将实现类封装在接口类内部的机制来实现。

官方 Capacitor 插件大量使用桥接模式，以 Device 插件为例：

```swift
@objc func getLanguageCode(_ call: CAPPluginCall) {
    let code = implementation.getLanguageCode()
    call.resolve([ "value": code ])
}
```

为何这一模式特别适合 Capacitor 插件？

- 您可以在抽象层关注高层逻辑，在实现层处理平台细节
- 向客户端隐藏实现细节
- 可以相互独立地引入新实现
- 创建与平台无关的类和实现

**外观模式**

外观模式为包含多个组件的复杂子系统提供简单接口。它可能不会暴露子系统的所有功能，但会提供客户端关心的核心特性。

部分较复杂的官方 Capacitor 插件使用外观模式，例如本地通知插件：

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

这一模式的优势在于：

- 使代码与复杂子系统隔离
- 保护客户端代码不受子系统变更影响
- 将子系统分层结构化

## ScreenOrientation 插件将采用哪种模式？

`ScreenOrientation` 插件将采用桥接模式。虽然我们尚未讨论插件功能所需的底层 iOS 和 Android API，但您将在下一步（iOS 实现）中看到，该插件的 API 实现相对简单直接。