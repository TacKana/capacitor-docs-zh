---
title: Android 问题故障排除
description: Android 问题故障排除
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/android/troubleshooting
---

# Android 问题故障排除

创建一个 100% 完美的原生管理工具几乎是不可能的，您迟早会遇到 Android 工作流各个部分的各种问题。

本指南旨在记录常见的 Android 问题及可能的解决方案。

## Android 工具箱

每位 Android 开发者都会学到一些调试 Android 问题的常用技巧，您应该将它们融入到您的工作流中：

### Google、Google 再 Google

每当您遇到 Android、Gradle 或模拟器的问题时，第一步应该是将错误信息复制并粘贴到 Google 中搜索。

Capacitor 使用标准的 Android 工具包，因此如果您遇到问题，很可能许多 Android 开发者也遇到过，并且存在相应的解决方案。

解决方案可能简单到更新依赖项、运行 Gradle 同步或清除缓存。

### 清理/重新构建

清理和重新构建可以解决许多构建问题：

![Android Clean and Build](../../../static/img/v3/docs/android/clean-rebuild.png)

### 清除缓存/重启

如果您确信已解决问题，但 Android Studio 或 Gradle 不认可，通常的解决方案是让 Android Studio 清除其缓存并重启程序。

这可以通过 File 菜单轻松完成：

![Android Invalidate Caches](../../../static/img/v3/docs/android/invalidate-caches.png)

## 错误："package android.support.\* does not exist"

当某些 Cordova 或 Capacitor 插件使用了旧的 android support 依赖项而未使用新的 AndroidX 等价物时，会出现此错误。
您应该在插件仓库中报告此问题，以便维护者将插件更新为使用 AndroidX 依赖项。

作为一种变通方法，您也可以使用 jetifier 修补该插件：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误："Unable to load native-bridge.js. Capacitor will not function!"

当 Capacitor 的 `native-bridge.js` 文件未复制到原生项目时，会出现此错误。

解决方法很简单：运行 `npx cap copy android` 复制此文件。

## 错误："Please select Android SDK"

此错误通常是由于需要同步 Gradle 导致的，您需要在更新依赖项和更改项目设置后定期执行此操作。

要手动同步 Gradle，请从主菜单栏中打开 File -> Sync Project with Gradle Files：

![Sync Gradle](../../../static/img/v3/docs/android/sync-gradle.png)

## 错误："APK Can't be installed"

APK 无法安装到模拟器或设备上通常是因为存在具有相同包名的现有应用。当尝试运行您的应用时，您可能会看到类似这样的错误：

![Android APK Failed](../../../static/img/v3/docs/android/apk-failed.png)

解决方案是移除任何旧应用，并确保您的包名在 `AndroidManifest.xml` 中是最新的，且不与您正在开发的其他应用冲突。

最后，为保险起见请执行清理和重新构建。

## 重建您的项目

Capacitor 允许您管理自己的 Android 项目。与任何 IDE 支持的项目一样，有时事情会变得不同步，唯一的解决方案是重建项目。

为此，请按以下步骤操作：

1. 将您创建的任何源代码（例如 `app/android/src` 中的 Java 文件、manifest 文件或资源文件）复制到 `app/android` 之外的安全位置。
2. 接下来，确保您运行的是更新版本的 Capacitor CLI：`npm install @capacitor/cli@2`
3. 删除 android 目录：`rm -rf android/`
4. 从 Capacitor 重新创建 Android 应用：`npx cap add android`
5. 将您保存的源文件复制回项目中

## 使用 ProGuard

ProGuard 是一种用于缩小、混淆和减少应用大小的工具。通过在 `build.gradle` 中将 `minifyEnabled` 选项设置为 `true` 来启用它。在使用依赖其代码在运行时可读（例如代码反射）的插件或自定义原生代码时，此过程有时会导致 Capacitor 出现问题。ProGuard 会扫描代码以尝试优化和缩小应用大小，有时此过程可能会移除对插件功能至关重要的类或方法。

将 [以下规则](https://github.com/ionic-team/capacitor/blob/2.x/android/capacitor/proguard-rules.pro) 添加到您的 Android 项目的 `proguard-rules.pro` 文件中。这些规则应能解决任何 Capacitor 核心功能和核心插件的问题。

如果在添加这些规则后仍然遇到任何问题，请尝试识别源插件或原生代码，并添加一条规则来覆盖特定的插件代码，例如：

```
-keep class com.mythirdpartyplugin.** { *; }
```

如果您确定某个 Capacitor 插件导致了 ProGuard 问题，并且您不介意所有插件都免除 ProGuard 处理，则以下 ProGuard 规则将覆盖任何插件类代码：

```
-keep public class * extends com.getcapacitor.Plugin
```