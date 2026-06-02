---
title: 设置 Android Target SDK
sidebar_label: 设置 Target SDK
description: 设置 Android Target SDK
slug: /android/setting-target-sdk
---

所有 Android 应用都必须指定目标 SDK 版本，即该应用设计为其运行的 Android 版本。每年，Google 都会发布 Android 操作系统更新，并随之提高应用所需的目标版本号。通常，[这个日期是每年的 8 月 31 日](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)。因此，保持应用与最新 Android 版本同步非常重要。在 Capacitor 应用中，这是通过在 `/android/variables.gradle` 文件中指定目标 SDK 来完成的。

```groovy
targetSdkVersion = 34
```

## Capacitor Android 要求

在 Capacitor 中，Android 目标 SDK 版本与 Capacitor 的主版本密切相关。这意味着虽然您可以将目标 SDK 更改为更高版本并重新构建应用，但应用很可能会遇到原本不存在的问题。Capacitor 团队每年都会发布一个包含新目标 SDK 版本支持的新主版本 Capacitor，以确保应用符合 Google 的要求。因此，保持应用与最新的 Capacitor 主版本同步非常重要。

## Android Target SDK 对照表

下表显示了 Capacitor Android 支持的目标 SDK 版本。

| Capacitor Android | 目标 SDK 版本 |
| ----------------- | ------------------ |
| 6.x               | 34                 |
| 5.x               | 33                 |
| 4.x               | 32                 |
| 3.x               | 30                 |
| 2.x               | 29                 |
| 1.x               | 28                 |

## 自定义 Target SDK 版本

Capacitor Android 不支持自定义目标 SDK 版本。每个版本的 Capacitor Android 都需要特定的目标 SDK 版本，并且仅对该匹配版本提供支持。
