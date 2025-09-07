---
title: 构建Capacitor插件
description: Capacitor插件构建指南 - 代码抽象模式
contributors:
  - eric-horodyski
sidebar_label: 代码抽象模式
slug: /plugins/tutorial/code-abstraction-patterns
---

# Capacitor插件抽象模式

为Capacitor构建的插件在复杂度上差异很大。以<a href="https://capacitorjs.com/docs/plugins" target="_blank">官方Capacitor插件</a>为例：<a href="https://github.com/ionic-team/capacitor-plugins/blob/main/toast/android/src/main/java/com/capacitorjs/plugins/toast/Toast.java" target="_blank">Toast插件</a>的Android实现非常简单，而<a href="https://github.com/ionic-team/capacitor-plugins/tree/main/push-notifications/android/src/main/java/com/capacitorjs/plugins/pushnotifications" target="_blank">推送通知</a>插件则包含多个文件，实现相当复杂。

根据插件的复杂度和需求，将插件构建工作视作一个独立软件项目并不为过——特别是当iOS和Android平台的实现要求存在差异时。

因此，我们有必要重温设计模式并了解标准Capacitor插件的代码抽象方式。

## 设计模式基础

设计模式是解决软件设计中常见问题的通用可复用方案。它们不是具体的编程解法，而是指导代码抽象以解决重复问题的蓝图框架。

你可能已经使用过设计模式而不自知。Angular重度依赖依赖注入和单例模式，React采用了中介者和状态模式，推送通知则运用了观察者模式。

作为开发者，你可以灵活运用设计模式库来构建适合Capacitor插件的代码抽象。

推荐的设计模式学习资源：
- <a href="https://www.oreilly.com/library/view/head-first-design/0596007124/" target="_blank">《Head First设计模式》(O'Reilly出版)</a>
- <a href="https://refactoring.guru/design-patterns" target="_blank">设计模式(Refactoring Guru)</a>

> 个人建议：在项目规划阶段我会翻阅《Head First设计模式》，编码时则常参考Refactoring Guru网站。

## 常见应用模式

研究多个Capacitor插件源码后，你会发现某些设计模式特别受插件开发者青睐。

**桥接模式**

桥接模式将抽象与实现分离，通过接口类封装实现类的设计机制。

官方Capacitor插件大量使用桥接模式，以Device插件为例：

```swift
@objc func getLanguageCode(_ call: CAPPluginCall) {
    let code = implementation.getLanguageCode()
    call.resolve([ "value": code ])
}
```

该模式为何适合Capacitor插件？
- 抽象层专注高层逻辑，实现层处理平台细节
- 向客户端隐藏实现细节
- 可独立引入新实现
- 创建与平台无关的类和实现

**外观模式**

外观模式为复杂子系统提供简化接口，虽然不暴露全部功能，但包含客户端所需的核心特性。

部分复杂的官方插件（如本地通知插件）采用了外观模式：

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

该模式的优势在于：
- 隔离代码与子系统复杂度
- 保护客户端代码免受子系统变更影响
- 实现子系统分层结构

## 屏幕方向插件将采用哪种模式？

`ScreenOrientation`插件将采用桥接模式。虽然我们尚未讨论实现插件功能所需的底层iOS/Android API，但正如你将在下一步iOS实现中看到的，该插件的API实现相对简单直接。