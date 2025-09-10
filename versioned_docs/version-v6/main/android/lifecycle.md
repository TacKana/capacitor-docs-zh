---
title: Android Lifecycle
description: Android生命周期
contributors:
  - mlynch
  - jcesarmobile
slug: /android/lifecycle
---

# Android生命周期

理解Android Activity生命周期对于构建符合用户预期的应用至关重要。

本文档将重点解释与Capacitor相关的生命周期机制。如需更全面的信息，Android官方文档中的[Activity生命周期](https://developer.android.com/guide/components/activities/activity-lifecycle.html)是最权威的参考资料。

## 处理应用重启

Android应用经常会调用其他应用（或Activity）来实现复杂功能，例如相机或浏览器功能。

在某些情况下，当设备内存不足时，启动新的Activity可能会导致当前应用被终止以释放内存。

这种情况下，当新Activity返回数据时，你的应用需要能够恢复用户之前的操作状态。