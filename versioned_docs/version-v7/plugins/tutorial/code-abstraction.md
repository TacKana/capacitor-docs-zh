---
title: Building a Capacitor Plugin
description: Capacitor插件开发 - 代码抽象模式
contributors:
  - eric-horodyski
sidebar_label: 代码抽象模式
slug: /plugins/tutorial/code-abstraction-patterns
---

# Capacitor插件抽象模式

为Capacitor构建的插件在复杂度上可能各不相同。以<a href="https://capacitorjs.com/docs/plugins" target="_blank">官方Capacitor插件</a>为例：<a href="https://github.com/ionic-team/capacitor-plugins/blob/main/toast/android/src/main/java/com/capacitorjs/plugins/toast/Toast.java" target="_blank">Toast插件</a>的Android实现非常简单，而<a href="https://github.com/ionic-team/capacitor-plugins/tree/main/push-notifications/android/src/main/java/com/capacitorjs/plugins/pushnotifications" target="_blank">推送通知插件</a>则相当复杂，包含多个文件。

根据插件的复杂度和需求，将一个插件的开发工作视为独立软件项目并不为过，特别是当iOS和Android平台的实现需求差异较大时。

因此，我们有必要重温设计模式并了解Capacitor插件中常见的代码抽象方式。

## 设计模式基础

设计模式是针对软件设计中常见问题的通用、可复用的解决方案。它们并非具体的编程实现，而是指导开发者如何通过代码抽象来解决重复出现的问题框架。

即使您没有意识到，很可能已经使用过设计模式。Angular大量依赖依赖注入和单例模式。React采用了中介者和状态模式。推送通知则使用了观察者模式。

作为开发者，您可以自由运用设计模式库中的各种模式，为Capacitor插件构建合适的代码抽象。

以下是介绍设计模式的优质资源：

- <a href="https://www.oreilly.com/library/view/head-first-design/0596007124/" target="_blank">《Head First设计模式》（O'Reilly出版社）</a>
- <a href="https://refactoring.guru/design-patterns" target="_blank">设计模式（Refactoring Guru）</a>

> 就个人而言，我在项目规划阶段会翻阅《Head First设计模式》，而在编写代码时会浏览Refactoring Guru网站。

## 实际应用中的模式

如果研究足够多的Capacitor插件源码，您会发现某些设计模式在插件开发者中特别受欢迎。

**桥接模式**

桥接模式将抽象与实现分离，通过将实现类封装在接口类中的设计机制。

官方Capacitor插件广泛使用桥接模式，以下来自Device插件的示例就是明证：

```swift
@objc func getLanguageCode(_ call: CAPPluginCall) {
    let code = implementation.getLanguageCode()
    call.resolve([ "value": code ])
}
```

为何这种模式特别适合Capacitor插件？

- 您可以在抽象层专注高层逻辑，在实现层处理平台细节
- 向客户端隐藏实现细节
- 可以相互独立地引入新实现
- 能创建平台无关的类和实现

**外观模式**

外观模式为包含多个组件的复杂子系统提供简单接口。它可能不会暴露子系统的全部功能，但会提供客户端关心的核心特性。

部分较复杂的官方Capacitor插件使用外观模式，比如本地通知插件：

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

为何这种模式适合Capacitor插件？

- 使代码与复杂子系统隔离
- 保护客户端代码不受子系统变更影响
- 可以将子系统分层组织

## 屏幕方向插件将采用哪种模式？

`ScreenOrientation`插件将采用桥接设计模式。虽然我们尚未讨论实现插件功能所需的底层iOS和Android API，但正如您将在下一步（iOS实现）中看到的，该插件API的实现相对简单直接。