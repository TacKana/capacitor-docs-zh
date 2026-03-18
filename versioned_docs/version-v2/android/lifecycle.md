---
title: Android 生命周期
description: Android 生命周期
contributors:
  - mlynch
  - jcesarmobile
---

# Android 生命周期

理解 Android Activity 生命周期对于构建符合 Android 用户期望的应用至关重要。

本文档将尝试解释与 Capacitor 相关的生命周期。更多详细信息，请参阅官方 Android 文档中的 [Activity 生命周期](https://developer.android.com/guide/components/activities/activity-lifecycle.html) 参考，这是最佳资源。

## 处理应用重启

Android 应用通常会利用其他应用（或 Activity）来实现自身应用难以包含的复杂功能，例如相机或浏览器功能。

在某些情况下，当设备内存不足时，启动新的 Activity 可能会导致你的应用被终止，以释放内存。

在这种情况下，当新的 Activity 将数据返回到你的应用时，你的应用需要向用户展示能恢复用户之前操作状态的应用界面。