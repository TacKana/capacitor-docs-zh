---
title: Android 问题故障排除
sidebar_label: 故障排除
description: Android 问题故障排除
contributors:
  - mlynch
  - jcesarmobile
slug: /android/troubleshooting
---

# Android 问题故障排除

创建一个 100% 完美的原生管理工具几乎是不可能的，迟早您会遇到 Android 工作流中的各种问题。

本指南尝试记录常见的 Android 问题及其可能的解决方案。

## Android 工具箱

每位 Android 开发者都会学到一些调试 Android 问题的常用技巧，您应该将这些技巧融入到您的工作流中：

### 谷歌，谷歌，再谷歌

每当您在 Android、Gradle 或模拟器方面遇到问题时，第一步应该是将错误信息复制粘贴到 Google 搜索中。

Capacitor 使用标准的 Android 工具包，因此如果您遇到问题，很可能很多 Android 开发者也遇到过，并且已经有了解决方案。

可能就像更新依赖项、运行 Gradle 同步或清除缓存一样简单。

### Gradle 同步

如果您从 npm 安装了一个新插件，但无法在 Android 构建中使用或看到该插件，请尝试使用 Android Studio 右上角的"Sync Project with Gradle Files"按钮（图标看起来像一头大象）。这将重新同步您的原生 Android 代码以包含新的插件代码，从而允许您使用新插件。更多信息请参见 [GitHub 上的这个问题](https://github.com/ionic-team/capacitor/issues/4012)。

它还可以帮助解决许多其他看似随机的问题，因此在遇到大多数 Android 构建问题时，运行"Sync Project with Gradle Files"始终是一个良好的第一步。

### 清理/重建

清理和重建可以修复许多构建问题：

![Android 清理和重建](../../../../static/img/v5/docs/android/clean-rebuild.png)

### 清除缓存/重启

如果您确信已经修复了问题，但 Android Studio 或 Gradle 不认账，通常的解决方案是让 Android Studio 清除其缓存并重启程序。

这可以通过 File 菜单轻松完成：

![Android 清除缓存](../../../../static/img/v5/docs/android/invalidate-caches.png)

## 错误："package android.support.\* does not exist"

当某些 Cordova 或 Capacitor 插件使用旧的 android support 依赖项而不是新的 AndroidX 等效项时，会出现此错误。您应该在插件仓库中报告问题，以便维护者更新插件以使用 AndroidX 依赖项。

作为临时解决方案，您也可以使用 jetifier 修补插件：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误："Please select Android SDK"

此错误通常是由于 Gradle 需要同步引起的，在更新依赖项和更改项目设置后，您需要定期执行此操作。

要手动同步 Gradle，请从主菜单栏打开 File -> Sync Project with Gradle Files：

![同步 Gradle](../../../../static/img/v5/docs/android/sync-gradle.png)

## 错误："APK Can't be installed"

APK 无法安装到模拟器或设备上，通常是由于已存在具有相同包名的应用。尝试运行应用时，您可能会看到类似以下的错误：

![Android APK 失败](../../../../static/img/v5/docs/android/apk-failed.png)

解决方案是删除任何旧应用，并确保您的包名在 `AndroidManifest.xml` 中是最新的，并且不与您正在开发的其他应用冲突。

最后，为以防万一，请执行清理和重建。

## 错误："Unable to locate a Java Runtime"

如果在使用 `run` 命令时未设置 `JAVA_HOME` 环境变量，可能会出现此错误。

要解决此问题，请使用在 Android Studio 的 Preferences > Build, Execution, Deployment, Build Tools > Gradle > Gradle JDK 中找到的路径，将 `JAVA_HOME` 设置为环境变量或系统变量。

![Android Studio 中的 JDK 路径](../../../../static/img/v5/docs/android/jdk-path.png)

在 Mac 上，可以在 `.zshrc` 或 `.bashrc` 文件中更新，或在环境中导出。

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/Contents/Home"
```

在 Windows 上，可以在环境变量设置中将 `JAVA_HOME` 设置为系统变量。

## 重建项目

Capacitor 允许您管理自己的 Android 项目。与任何 IDE 支持的项目一样，有时事情会变得严重不同步，以至于唯一的解决方案是重建项目。

为此，请按照以下步骤操作：

1. 将您创建的任何源代码（如 `app/android/src` 中的 Java 文件、清单文件或资源文件）复制到 `app/android` 之外的安全位置。
2. 然后，确保您正在运行更新版本的 Capacitor CLI：`npm install @capacitor/cli@latest`
3. 删除 android 目录：`rm -rf android/`
4. 从 Capacitor 重新创建 Android 应用：`npx cap add android`
5. 将保存的源文件复制回项目中

## 插件未实现

在 Android 上，如果 Capacitor 找不到插件或无法将其代码注入 WebView，可能会发生此情况。

首先，确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync android`。

最后，使用 Android Studio 右上角的"Sync Project with Gradle Files"按钮（图标看起来像一头大象）。这将重新同步您的原生 Android 代码以包含新的插件代码，从而允许您使用新插件。

此外，如果您正在从 Capacitor 1 或 2 迁移，请确保已启用[自动插件加载](https://capacitorjs.com/docs/updating/3-0#switch-to-automatic-android-plugin-loading)。

如果仍然出现"Plugin not implemented"错误，请确保您没有使用 service worker，这会阻止 Capacitor 和插件代码的注入。或者，如果您想使用它们，可以使用[这个变通方法](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390)来实现注入。

## 使用 ProGuard

ProGuard 是一种用于缩减、混淆和减小应用大小的工具。通过在 `build.gradle` 中将 `minifyEnabled` 选项设置为 `true` 来启用它。此过程有时会导致 Capacitor 在使用依赖代码在运行时可读性的插件或自定义原生代码时出现问题，例如代码反射。ProGuard 扫描代码以尝试优化和减小应用大小，有时此过程可能会删除对插件功能重要的类或方法。

从 Capacitor v3.2.3 开始，Capacitor 中包含的 ProGuard 规则涵盖了 Capacitor 插件、权限和 activity 结果的核心功能。如果您使用的 Capacitor 版本低于 v3.2.3，请将[以下规则](https://github.com/ionic-team/capacitor/blob/5.x/android/capacitor/proguard-rules.pro)添加到您的 Android 项目的 `proguard-rules.pro` 文件中。这些规则应该能解决任何核心 Capacitor 功能和核心插件的问题。

如果在添加这些规则后仍然遇到任何问题，请尝试识别源插件或原生代码，并添加一条规则来覆盖特定的插件代码，例如：

```
-keep class com.mythirdpartyplugin.** { *; }
```

如果您确定是 Capacitor 插件导致了 ProGuard 问题，以下 ProGuard 规则将覆盖任何插件类代码（如果您不介意所有插件都免于 ProGuard 处理）：

```
-keep public class * extends com.getcapacitor.Plugin
```
