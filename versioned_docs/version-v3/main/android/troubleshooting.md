---
title: 解决 Android 问题
sidebar_label: 故障排除
description: Android 问题排查指南
contributors:
  - mlynch
  - jcesarmobile
slug: /android/troubleshooting
---

# Android 问题排查指南

要打造一个完美无缺的原生管理工具几乎是不可能的，您迟早会在 Android 工作流程的某些环节遇到各种问题。

本指南旨在记录常见的 Android 问题及其可能的解决方案。

## Android 工具箱

每位 Android 开发者都会掌握一些调试 Android 问题的常用技巧，您应该将这些技巧融入自己的工作流程中：

### 善用搜索引擎

每当遇到 Android、Gradle 或模拟器相关的问题时，您的第一步都应该是将错误信息复制并粘贴到搜索引擎中搜索。

Capacitor 使用标准的 Android 工具链，因此如果您遇到了问题，很可能许多 Android 开发者也曾遇到过同样的问题，并且已经有解决方案了。

解决方案可能很简单，比如更新依赖项、运行 Gradle 同步或清除缓存。

### Gradle 同步

如果您从 npm 安装了一个新的插件，但在 Android 构建中无法使用或看到该插件，请尝试使用 Android Studio 右上角的“Sync Project with Gradle Files”按钮（图标看起来像一头大象）。这将重新同步您的原生 Android 代码以包含新的插件代码，从而允许您使用新插件。更多信息，请参阅 [GitHub 上的此问题](https://github.com/ionic-team/capacitor/issues/4012)。

它还可以帮助解决许多其他看似随机的问题，因此当遇到大多数 Android 构建问题时，运行“Sync Project with Gradle Files”总是一个很好的第一步。

### 清理与重建

清理和重建可以解决许多构建问题：

![Android 清理与构建](../../../../static/img/v3/docs/android/clean-rebuild.png)

### 清除缓存并重启

如果您确信已经修复了问题，但 Android Studio 或 Gradle 似乎不认同，通常的解决方案是让 Android Studio 清除其缓存并重启程序。

这可以通过文件菜单轻松完成：

![Android 清除缓存](../../../../static/img/v3/docs/android/invalidate-caches.png)

## 错误："package android.support.* does not exist"

当某些 Cordova 或 Capacitor 插件使用了旧的 Android 支持库依赖，而没有使用新的 AndroidX 等效库时，会出现此错误。
您应该在插件仓库中报告此问题，以便维护者可以更新插件以使用 AndroidX 依赖。

作为临时解决方案，您也可以使用 jetifier 来修补插件：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误："Please select Android SDK"

此错误通常是由于需要同步 Gradle 导致的，在更新依赖项和更改项目设置后，您需要定期执行此操作。

要手动同步 Gradle，请从主菜单栏打开 File -> Sync Project with Gradle Files：

![同步 Gradle](../../../../static/img/v3/docs/android/sync-gradle.png)

## 错误："APK 无法安装"

APK 无法安装到模拟器或设备上，通常是由于存在具有相同包名的现有应用程序。当您尝试运行应用程序时，可能会看到类似这样的错误：

![Android APK 安装失败](../../../../static/img/v3/docs/android/apk-failed.png)

解决方案是删除任何旧应用程序，并确保您的包名在 `AndroidManifest.xml` 中是最新的，并且不与其他正在开发的应用程序冲突。

最后，为了保险起见，进行一次清理和重建。

## 重新创建项目

Capacitor 允许您管理自己的 Android 项目。就像任何由 IDE 支持的项目一样，有时项目会严重不同步，以至于唯一的解决方案就是重建项目。

要执行此操作，请按照以下步骤进行：

1. 将您创建的任何源代码（例如 `app/android/src` 中的 Java 文件、清单文件或资源文件）复制到 `app/android` 之外的安全位置。
2. 接下来，确保您正在运行最新版本的 Capacitor CLI：`npm install @capacitor/cli@latest`
3. 删除 android 目录：`rm -rf android/`
4. 从 Capacitor 重新创建 Android 应用程序：`npx cap add android`
5. 将保存的源文件复制回项目中

## 插件未实现

在 Android 上，如果 Capacitor 找不到插件或无法将其代码注入到 WebView 中，则可能会发生这种情况。

首先，请确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync android`。

最后，使用 Android Studio 右上角的“Sync Project with Gradle Files”按钮（图标看起来像一头大象）。这将重新同步您的原生 Android 代码以包含新的插件代码，从而允许您使用新插件。

另外，如果您是从 Capacitor 1 或 2 迁移过来的，请确保您已启用[自动插件加载功能](https://capacitorjs.com/docs/v3/updating/3-0#switch-to-automatic-android-plugin-loading)。

如果仍然收到“Plugin not implemented”错误，请确保您没有使用 Service Worker，因为这会阻止 Capacitor 和插件代码的注入。或者，如果您想使用 Service Worker，可以使用[此变通方法](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390)来使注入工作。

## 使用 Proguard

ProGuard 是一个用于缩小、混淆和减少应用程序体积的工具。它通过在 `build.gradle` 中将 `minifyEnabled` 选项设置为 `true` 来启用。此过程有时在使用插件或某些依赖运行时可读代码（例如代码反射）的自定义原生代码时，可能会导致 Capacitor 出现问题。ProGuard 会扫描代码以尝试优化并缩小应用程序的体积，有时此过程可能会移除对插件功能很重要的类或方法。

自 Capacitor v3.2.3 起，Capacitor 包含了涵盖 Capacitor 插件核心功能、权限和活动结果的 ProGuard 规则。如果您使用的 Capacitor 版本早于 v3.2.3，请将[以下规则](https://github.com/ionic-team/capacitor/blob/3.x/android/capacitor/proguard-rules.pro)添加到您的 Android 项目的 `proguard-rules.pro` 文件中。这些规则应该可以解决任何核心 Capacitor 功能和核心插件的问题。

如果在添加这些规则后仍然遇到任何问题，请尝试识别源插件或原生代码，并添加规则以覆盖特定的插件代码，例如：

```
-keep class com.mythirdpartyplugin.** { *; }
```

如果您确定是 Capacitor 插件导致了 ProGuard 问题，以下 ProGuard 规则将涵盖任何插件类代码，如果您不介意所有插件都免于 ProGuard 处理的话：

```
-keep public class * extends com.getcapacitor.Plugin
```