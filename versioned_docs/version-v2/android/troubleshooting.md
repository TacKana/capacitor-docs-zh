---
title: 解决 Android 问题
description: 解决 Android 问题
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/android/troubleshooting
---

# 解决 Android 问题

创建一个百分之百完美的原生管理工具几乎是不可能的，你迟早会在 Android 工作流的某些环节遇到各种问题。

本指南试图记录常见的 Android 问题及其可能的解决方案。

## Android 工具箱

每位 Android 开发者都掌握了一些调试 Android 问题的常用技巧，你应该将这些技巧融入你的工作流中：

### 善用搜索

每当你遇到 Android、Gradle 或模拟器相关的问题时，第一步应该是将错误信息复制并粘贴到搜索引擎中查找。

Capacitor 使用的是标准的 Android 工具集，因此很可能你遇到的问题许多 Android 开发者也曾遇到过，并且已有现成的解决方案。

解决方法可能很简单，比如更新依赖、运行 Gradle 同步或清除缓存。

### 清理与重建

清理并重建项目可以解决许多构建问题：

![Android 清理与构建](../../../static/img/v3/docs/android/clean-rebuild.png)

### 清除缓存并重启

如果你确信已经解决了问题，但 Android Studio 或 Gradle 似乎没有识别到，通常的解决方案是让 Android Studio 清除缓存并重启程序。

你可以通过文件菜单轻松完成此操作：

![Android 清除缓存](../../../static/img/v3/docs/android/invalidate-caches.png)

## 错误：“package android.support.* does not exist”

此错误通常发生在某些 Cordova 或 Capacitor 插件仍在使用旧的 Android 支持库依赖，而没有使用新的 AndroidX 替代版本时。
你应该在插件仓库中报告此问题，以便维护者能更新插件以使用 AndroidX 依赖。

作为临时解决方案，你也可以使用 jetifier 来修补插件：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误：“Unable to load native-bridge.js. Capacitor will not function!”

此错误发生在 Capacitor 的 `native-bridge.js` 文件没有复制到原生项目中时。

解决方法很简单：运行 `npx cap copy android` 来复制该文件。

## 错误：“Please select Android SDK”

此错误通常是 Gradle 需要同步导致的，在更新依赖和更改项目设置后，你需要定期执行此操作。

要手动同步 Gradle，请打开主菜单栏中的 File -> Sync Project with Gradle Files：

![同步 Gradle](../../../static/img/v3/docs/android/sync-gradle.png)

## 错误：“APK Can't be installed”

APK 无法安装到模拟器或设备上，通常是因为已存在相同包名的应用。尝试运行应用时，你可能会看到如下错误：

![Android APK 失败](../../../static/img/v3/docs/android/apk-failed.png)

解决方法是移除所有旧应用，并确保你的包名在 `AndroidManifest.xml` 中是最新的，并且不与你正在开发的其他应用冲突。

最后，为了保险起见，执行一次清理和重建操作。

## 重新创建项目

Capacitor 允许你管理自己的 Android 项目。与任何基于 IDE 的项目一样，有时项目会变得非常不同步，唯一的解决方案就是重建项目。

为此，请按照以下步骤操作：

1. 将你创建的任何源代码（例如 `app/android/src` 中的 Java 文件、清单文件或资源文件）复制到 `app/android` 之外的安全位置。
2. 接下来，确保你运行的是最新版本的 Capacitor CLI：`npm install @capacitor/cli@2`
3. 删除 android 目录：`rm -rf android/`
4. 从 Capacitor 重新创建 Android 应用：`npx cap add android`
5. 将你保存的源文件复制回项目中

## 使用 Proguard

ProGuard 是一个用于压缩、混淆和减小应用体积的工具。它通过在 `build.gradle` 中将 `minifyEnabled` 选项设置为 `true` 来启用。在使用依赖运行时代码可读性（例如代码反射）的插件或某些自定义原生代码时，这个过程有时会导致 Capacitor 出现问题。ProGuard 会扫描代码以尝试优化和减小应用体积，有时这个过程可能会移除对插件功能很重要的类或方法。

将[以下规则](https://github.com/ionic-team/capacitor/blob/2.x/android/capacitor/proguard-rules.pro)添加到你的 Android 项目的 `proguard-rules.pro` 文件中。这些规则应该能解决任何核心 Capacitor 功能和核心插件的问题。

如果添加这些规则后仍然遇到问题，请尝试确定源插件或原生代码，并添加规则以覆盖特定的插件代码，例如：

```
-keep class com.mythirdpartyplugin.** { *; }
```

如果你确定是某个 Capacitor 插件导致了 ProGuard 问题，并且你不介意所有插件都免于 ProGuard 处理，那么以下 ProGuard 规则将覆盖任何插件类代码：

```
-keep public class * extends com.getcapacitor.Plugin
```