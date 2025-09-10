---
title: Android Lifecycle
description: Android 生命周期
contributors:
  - mlynch
  - jcesarmobile
slug: /android/lifecycle
---

# Android 生命周期

理解 Android 活动生命周期对于构建符合用户预期的应用至关重要。

本文档主要阐释与 Capacitor 相关的生命周期机制。如需更全面的信息，请参阅 Android 官方文档中的 [Activity 生命周期](https://developer.android.com/guide/components/activities/activity-lifecycle.html) 参考指南。

## 处理应用重启

Android 应用经常需要调用其他应用（或活动）来实现复杂功能，例如相机或浏览器功能。

在某些内存不足的情况下，启动新活动可能导致系统终止当前应用以释放内存。

此时，当新活动返回数据至您的应用时，应当恢复用户之前的操作状态，呈现连续的使用体验。