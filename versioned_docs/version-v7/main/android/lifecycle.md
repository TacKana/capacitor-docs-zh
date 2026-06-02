---
title: Android 生命周期
description: Android 生命周期
contributors:
  - mlynch
  - jcesarmobile
slug: /android/lifecycle
---

# Android 生命周期

理解 Android Activity 生命周期对于构建符合 Android 用户预期的应用至关重要。

本文档旨在解释与 Capacitor 相关的生命周期。如需了解更多信息，官方 Android 文档中的 [Activity 生命周期](https://developer.android.com/guide/components/activities/activity-lifecycle.html)参考是最佳资源。

## 处理应用重启

Android 应用经常会调用其他应用（或 Activity）来实现那些过于复杂而无法包含在自身应用中的功能，例如相机或浏览器功能。

在某些情况下，当设备内存不足时，启动一个新的 Activity 可能会导致你的应用被杀死以释放内存。

在这种情况下，当新的 Activity 将数据返回给你的应用时，你的应用应该向用户展示一个能够恢复用户之前操作状态的应用界面。
