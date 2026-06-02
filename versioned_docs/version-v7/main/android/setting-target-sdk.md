---
title: 设置 Android 目标 SDK
sidebar_label: 设置目标 SDK
description: 设置 Android 目标 SDK
slug: /android/setting-target-sdk
---

# 设置 Android 目标 SDK

所有 Android 应用都必须指定一个目标 SDK 版本，即该应用设计运行的 Android 版本。每年，Google 都会发布 Android 操作系统更新，并随之提高应用需要 targeting 的版本号。通常，[截止日期为每年的 8 月 31 日](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)。因此，保持你的应用与最新版本的 Android 保持同步非常重要。在 Capacitor 应用中，这是通过在 `/android/variables.gradle` 文件中指定目标 SDK 来完成的。

```groovy
targetSdkVersion = 35
```

## Capacitor Android 要求

在 Capacitor 中，Android 目标 SDK 版本与 Capacitor 的主版本号紧密相关。这意味着虽然你可以将目标 SDK 更改为更高的版本并重新构建应用，但你的应用很可能会遇到原本不存在的问题。Capacitor 团队每年发布一个新的 Capacitor 主版本，其中包括对新目标 SDK 版本的支持，以确保应用始终符合 Google 的要求。因此，保持你的应用与最新的 Capacitor 主版本同步非常重要。

## Android 目标 SDK 对照表

下表显示了 Capacitor Android 支持的目标 SDK 版本。

| Capacitor Android | 目标 SDK 版本 |
| ----------------- | -------------- |
| 7.x               | 35             |
| 6.x               | 34             |
| 5.x               | 33             |
| 4.x               | 32             |
| 3.x               | 30             |
| 2.x               | 29             |
| 1.x               | 28             |

## 自定义目标 SDK 版本

Capacitor Android 不支持自定义目标 SDK 版本。每个版本的 Capacitor Android 都需要特定的目标 SDK 版本，并且仅对该匹配版本提供支持。
