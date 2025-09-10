---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 代码抽象模式
contributors:
  - eric-horodyski
sidebar_label: 代码抽象模式
slug: /plugins/tutorial/code-abstraction-patterns
---

# Capacitor 插件抽象模式

为 Capacitor 构建的插件复杂度各不相同。以 <a href="https://capacitorjs.com/docs/v3/plugins" target="_blank">官方 Capacitor 插件</a>为例：<a href="https://github.com/ionic-team/capacitor-plugins/blob/main/toast/android/src/main/java/com/capacitorjs/plugins/toast/Toast.java" target="_blank">Toast 插件</a>的 Android 实现非常简单，而 <a href="https://github.com/ionic-team/capacitor-plugins/tree/main/push-notifications/android/src/main/java/com/capacitorjs/plugins/pushnotifications" target="_blank">推送通知</a>插件则相当复杂，包含多个文件。

根据插件的复杂度和需求差异，特别是当 iOS 和 Android 平台的实现要求不同时，将插件开发视为独立的软件项目并不为过。

因此，我们有必要重温设计模式，并了解 Capacitor 插件常用的代码抽象方式。

## 设计模式基础

设计模式是软件设计中针对常见问题的通用可复用解决方案。它们不是具体的编程实现，而是指导代码抽象以解决重复问题的蓝图框架。

即使您没有意识到，您可能已经使用过设计模式。Angular 重度依赖依赖注入和单例模式，React 采用了中介者和状态模式，推送通知则运用了观察者模式。

作为开发者，您应当灵活运用设计模式库来构建适合您 Capacitor 插件的代码抽象。

推荐的设计模式学习资源包括：

- <a href="https://www.oreilly.com/library/view/head-first-design/0596007124/" target="_blank">《Head First 设计模式》（O'Reilly 出版）</a>
- <a href="https://refactoring.guru/design-patterns" target="_blank">《设计模式》（Refactoring Guru）</a>

> 就个人而言，我在项目规划阶段会翻阅《Head First 设计模式》，在编码时则会浏览《Refactoring Guru》。

## 常见实践模式

研究多个 Capacitor 插件源码后，您会发现某些设计模式在插件开发者中特别流行。

**桥接模式 (Bridge Pattern)**

桥接模式将代码抽象与实现分离，通过接口类封装具体实现类。官方 Capacitor 插件大量使用此模式，例如设备插件的典型实现：

```swift
@objc func getLanguageCode(_ call: CAPPluginCall) {
    let code = implementation.getLanguageCode()
    call.resolve([ "value": code ])
}
```

该模式特别适合 Capacitor 插件的原因：

- 抽象层专注高层逻辑，实现层处理平台细节
- 向客户端隐藏实现细节
- 各平台实现可独立扩展
- 可创建平台无关的类和实现

**外观模式 (Facade Pattern)**

外观模式为复杂子系统提供简洁接口，虽然不会暴露全部功能，但会呈现客户端关心的核心特性。复杂的官方插件如本地通知就采用了此模式：

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

该模式的优势体现在：

- 隔离代码与复杂子系统
- 保护客户端不受子系统变更影响
- 可将子系统分层组织

## 屏幕方向插件采用哪种模式？

`ScreenOrientation` 插件将采用桥接模式。虽然我们尚未讨论实现插件功能所需的底层 iOS 和 Android API，但正如您将在下一章「iOS 实现」中看到的，该插件的 API 实现相对简单直接。