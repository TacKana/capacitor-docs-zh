---
title: Android 问题排查
sidebar_label: 问题排查
description: Android 问题排查
contributors:
  - mlynch
  - jcesarmobile
slug: /android/troubleshooting
---

# Android 问题排查

创建一个 100% 完美的原生管理工具几乎是不可能的，迟早您会遇到 Android 工作流中的各种问题。

本指南旨在记录常见的 Android 问题并提供可能的解决方案。

## Android 工具箱

每位 Android 开发者都会掌握一些调试 Android 问题的常用技巧，您也应该将它们纳入您的工作流程：

### Google、Google、再 Google

每当您遇到 Android、Gradle 或模拟器相关的问题时，第一步应该是将错误信息复制并粘贴到 Google 中搜索。

Capacitor 使用标准的 Android 工具集，因此如果您遇到问题，很可能许多 Android 开发者也遇到过，并且已有解决方案。

这可能简单到只需更新依赖项、运行 Gradle 同步或清除缓存。

### Gradle 同步

如果您从 npm 安装了新插件，但在 Android 构建中无法使用或看到这些插件，请尝试点击 Android Studio 右上角的 "Sync Project with Gradle Files" 按钮（图标看起来像一头大象）。这将重新同步您的原生 Android 代码以包含新的插件代码，从而使您能够使用新插件。更多信息请参阅 [GitHub 上的这个问题](https://github.com/ionic-team/capacitor/issues/4012)。

此操作也有助于解决许多其他看似随机的问题，因此在遇到大多数 Android 构建问题时，运行 "Sync Project with Gradle Files" 始终是一个良好的第一步。

### 清理/重新构建

清理和重新构建可以修复许多构建问题：

![Android 清理和构建](../../../../static/img/v3/docs/android/clean-rebuild.png)

### 清除缓存/重启

如果您确信已经修复了某个问题，但 Android Studio 或 Gradle 仍然报错，通常的解决方案是让 Android Studio 清除其缓存并重启程序。

这可以通过 File 菜单轻松完成：

![Android 清除缓存](../../../../static/img/v3/docs/android/invalidate-caches.png)

## 错误："package android.support.\* does not exist"

当某些 Cordova 或 Capacitor 插件仍使用旧的 Android Support 依赖项而不是新的 AndroidX 等效项时，会出现此错误。

您应该在插件仓库中报告该问题，以便维护者更新插件以使用 AndroidX 依赖项。

作为临时解决方案，您也可以使用 jetifier 来修补插件：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误："Please select Android SDK"

此错误通常是由于需要同步 Gradle 引起的，在更新依赖项和更改项目设置后，您需要定期执行此操作。

要手动同步 Gradle，请从主菜单栏中打开 File -> Sync Project with Gradle Files：

![同步 Gradle](../../../../static/img/v3/docs/android/sync-gradle.png)

## 错误："APK Can't be installed"

APK 无法安装到模拟器或设备上，通常是由于已存在具有相同包名的应用。在尝试运行应用时，您可能会看到类似以下的错误：

![Android APK 失败](../../../../static/img/v3/docs/android/apk-failed.png)

解决方案是删除任何旧应用，并确保您的包名在 `AndroidManifest.xml` 中是最新的，并且不与您正在开发的其他应用冲突。

最后，重新执行清理和构建以防万一。

## 重建项目

Capacitor 允许您管理自己的 Android 项目。与任何 IDE 支持的项目一样，有时情况会变得非常混乱，唯一的解决方案就是重建项目。

请按照以下步骤操作：

1. 将您创建的任何源代码（如 `app/android/src` 中的 Java 文件、清单文件或资源文件）复制到 `app/android` 之外的安全位置。
2. 接下来，确保您运行的是更新版本的 Capacitor CLI：`npm install @capacitor/cli@latest`
3. 删除 android 目录：`rm -rf android/`
4. 从 Capacitor 重新创建 Android 应用：`npx cap add android`
5. 将您保存的源文件复制回项目中

## 插件未实现

在 Android 上，如果 Capacitor 找不到插件或无法将其代码注入到 WebView 中，可能会发生此问题。

首先，确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync android`。

最后，使用 Android Studio 右上角的 "Sync Project with Gradle Files" 按钮（图标看起来像一头大象）。这将重新同步您的原生 Android 代码以包含新的插件代码，从而使您能够使用新插件。

另外，如果您正在从 Capacitor 1 或 2 迁移，请确保已启用 [自动插件加载](https://capacitorjs.com/docs/v3/updating/3-0#switch-to-automatic-android-plugin-loading)。

如果仍然出现 "Plugin not implemented" 错误，请确保您没有使用 Service Worker，因为这会阻止 Capacitor 和插件代码的注入。或者如果您想使用它们，可以使用 [这个解决方案](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390) 来实现注入。

## 使用 ProGuard

ProGuard 是一种用于缩减、混淆和减小应用大小的工具。通过在 `build.gradle` 中将 `minifyEnabled` 选项设置为 `true` 来启用它。此过程有时会导致 Capacitor 出现问题，尤其是在使用依赖运行时代码可读性的插件或自定义原生代码时（例如代码反射）。ProGuard 会扫描代码以尝试优化和缩减应用大小，有时此过程可能会删除对插件功能至关重要的类或方法。

从 Capacitor v3.2.3 开始，Capacitor 中包含的 ProGuard 规则涵盖了 Capacitor 插件、权限和 Activity 结果的核心功能。如果您使用的 Capacitor 版本低于 v3.2.3，请将 [以下规则](https://github.com/ionic-team/capacitor/blob/3.x/android/capacitor/proguard-rules.pro) 添加到您的 Android 项目的 `proguard-rules.pro` 文件中。这些规则应该能解决所有核心 Capacitor 功能和核心插件的问题。

如果您在添加这些规则后仍然遇到任何问题，请尝试确定源插件或原生代码，并添加一条规则来覆盖特定的插件代码，例如：

```
-keep class com.mythirdpartyplugin.** { *; }
```

如果您确定某个 Capacitor 插件导致了 ProGuard 问题，以下 ProGuard 规则将覆盖所有插件类代码（如果您不介意所有插件都免于 ProGuard 处理的话）：

```
-keep public class * extends com.getcapacitor.Plugin
```
