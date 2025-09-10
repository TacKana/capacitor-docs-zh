---
title: Android Lifecycle
description: Android 生命周期
contributors:
  - mlynch
  - jcesarmobile
---

# Android 生命周期

理解 Android Activity 生命周期对于构建符合用户预期的应用至关重要。

本文档将重点解释与 Capacitor 相关的生命周期机制。如需更全面的信息，请参考 Android 官方文档中的 [Activity 生命周期指南](https://developer.android.com/guide/components/activities/activity-lifecycle.html)。

## 处理应用重启

Android 应用经常需要调用其他应用（或 Activity）来实现复杂功能，例如相机或浏览器功能。

在某些内存不足的情况下，启动新 Activity 可能导致当前应用被系统终止以释放内存。

此时，当新 Activity 返回数据时，您的应用需要恢复用户之前的状态，确保体验的连贯性。