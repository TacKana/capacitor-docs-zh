---
title: 设置 Android 目标 SDK
sidebar_label: 目标 SDK 设置
description: 配置 Android 目标 SDK 版本
slug: /android/setting-target-sdk
---

所有 Android 应用都必须指定目标 SDK 版本，即应用程序设计运行的 Android 系统版本。Google 每年都会发布 Android 操作系统更新，并随之提升应用程序需要适配的版本号。通常，[这个截止日期是每年的 8 月 31 日](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)。因此，保持应用程序与最新 Android 版本同步非常重要。在 Capacitor 应用中，可以通过修改 `/android/variables.gradle` 文件来配置目标 SDK：

```groovy
targetSdkVersion = 34
```

## Capacitor Android 版本要求

在 Capacitor 中，Android 目标 SDK 版本与 Capacitor 主版本号严格绑定。虽然理论上可以将目标 SDK 修改为更高版本并重新构建应用，但极有可能导致意外问题。Capacitor 团队每年都会发布新的主版本，包含对新目标 SDK 版本的支持，以确保应用符合 Google 的要求。因此，及时将应用升级到最新的 Capacitor 主版本至关重要。

## Android 目标 SDK 对照表

下表展示了各版本 Capacitor Android 支持的目标 SDK 版本：

| Capacitor Android | 目标 SDK 版本 |
| ----------------- | ------------ |
| 6.x               | 34           |
| 5.x               | 33           |
| 4.x               | 32           |
| 3.x               | 30           |
| 2.x               | 29           |
| 1.x               | 28           |

## 自定义目标 SDK 版本说明

Capacitor Android 不支持自定义目标 SDK 版本。每个 Capacitor Android 版本都需要匹配特定的目标 SDK 版本，且仅对匹配版本提供官方支持。