---
title: Android Lifecycle
description: Android生命周期
contributors:
  - mlynch
  - jcesarmobile
slug: /android/lifecycle
---

# Android 生命周期

理解 Android Activity 的生命周期对于构建符合用户预期的应用至关重要。

本文档将着重解释与 Capacitor 相关的生命周期机制。如需更全面的信息，Android 官方文档中的 [Activity 生命周期](https://developer.android.com/guide/components/activities/activity-lifecycle.html) 是最权威的参考资料。

## 处理应用重启

Android 应用经常会调用其他应用（或 Activity）来实现某些复杂功能，例如相机或浏览器功能。

在某些情况下，当设备内存不足时，启动新的 Activity 可能会导致您的应用被终止以释放内存。

此时，当新 Activity 将数据返回到您的应用时，应用应当能够恢复用户之前的操作状态。