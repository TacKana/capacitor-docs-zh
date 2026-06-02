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

创建一个 100% 完美的原生管理工具几乎是不可能的，迟早你会遇到 Android 工作流程中某些部分的各种问题。

本指南试图记录常见的 Android 问题及其可能的解决方案。

## Android 工具箱

每位 Android 开发者都会学到一些调试 Android 问题的常用技巧，你应该将它们融入你的工作流程中：

### Google、Google、再 Google

每当你在 Android、Gradle 或模拟器上遇到问题时，你的第一步应该是将错误信息复制并粘贴到 Google 中搜索。

Capacitor 使用标准的 Android 工具包，因此如果你遇到问题，很可能许多其他 Android 开发者也遇到过，并且已经有现成的解决方案。

解决方案可能简单到更新依赖项、运行 Gradle 同步或清除缓存。

### Gradle 同步

如果你从 npm 安装了一个新插件，但在 Android 构建中无法使用或看到该插件，请尝试点击 Android Studio 右上角的"使用 Gradle 文件同步项目"按钮（图标看起来像一头大象）。这将重新同步你的原生 Android 代码以包含新插件代码，从而允许你使用新插件。更多信息，请参阅 [GitHub 上的这个问题](https://github.com/ionic-team/capacitor/issues/4012)。

它也可以帮助解决许多其他看似随机的问题，因此在遇到大多数 Android 构建问题时，运行"使用 Gradle 文件同步项目"始终是一个好的第一步。

### 清理/重新构建

清理和重新构建可以修复许多构建问题：

![Android 清理和构建](../../../static/img/v6/docs/android/clean-rebuild.png)

### 清除缓存/重启

如果你确信已经修复了问题，但 Android Studio 或 Gradle 不认同，通常的解决方案是让 Android Studio 清除其缓存并重启程序。

这可以通过"文件"菜单轻松完成：

![Android 清除缓存](../../../static/img/v6/docs/android/invalidate-caches.png)

## 错误："package android.support.\* does not exist"

当某些 Cordova 或 Capacitor 插件使用了旧的 Android 支持依赖项而不是新的 AndroidX 等价项时，会出现此错误。你应该在插件仓库中报告此问题，以便维护者更新插件以使用 AndroidX 依赖项。

作为临时解决方案，你也可以使用 jetifier 修补插件：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误："Please select Android SDK"

此错误通常是由于需要同步 Gradle 所致，在更新依赖项和更改项目设置后，你需要定期执行此操作。

要手动同步 Gradle，请从主菜单栏打开"文件 -> 使用 Gradle 文件同步项目"：

![同步 Gradle](../../../static/img/v6/docs/android/sync-gradle.png)

## 错误："APK Can't be installed"

APK 无法安装到模拟器或设备上，通常是由于已存在具有相同包名的应用。尝试运行应用时，你可能会看到类似这样的错误：

![Android APK 失败](../../../static/img/v6/docs/android/apk-failed.png)

解决方案是删除任何旧应用，并确保你的包名在 `AndroidManifest.xml` 中是最新的，且不与正在开发的其他应用冲突。

最后，以防万一，执行一次清理和重新构建。

## 错误："Unable to locate a Java Runtime"

如果未设置 `JAVA_HOME` 环境变量，在使用 `run` 命令时可能会发生此错误。

要解决此问题，请使用在 Android Studio 的"偏好设置 > 构建、执行、部署 > 构建工具 > Gradle > Gradle JDK"中找到的路径，将 `JAVA_HOME` 设置为环境变量或系统变量。

![Android Studio 中的 JDK 路径](../../../static/img/v6/docs/android/jdk-path.png)

在 Mac 上，可以在你的 `.zshrc` 或 `.bashrc` 文件中更新此设置，或在环境中导出。

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

在 Windows 上，你可以在"环境变量"设置中将 `JAVA_HOME` 设置为系统变量。

## 重建你的项目

Capacitor 允许你管理自己的 Android 项目。就像任何基于 IDE 的项目一样，有时事情会变得非常不同步，唯一的解决方案就是重建项目。

为此，请按照以下步骤操作：

1. 将你创建的任何源代码（例如 `app/android/src` 中的 Java 文件、清单文件或资源文件）复制到 `app/android` 之外的安全位置。
2. 接下来，确保你运行的是更新版本的 Capacitor CLI：`npm install @capacitor/cli@latest`
3. 删除 android 目录：`rm -rf android/`
4. 从 Capacitor 重新创建 Android 应用：`npx cap add android`
5. 将你保存的源文件复制回项目中

## 插件未实现

在 Android 上，如果 Capacitor 找不到插件或无法将其代码注入 WebView，可能会发生此问题。

首先，确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync android`。

最后，使用 Android Studio 右上角的"使用 Gradle 文件同步项目"按钮（图标看起来像一头大象）。这将重新同步你的原生 Android 代码以包含新插件代码，从而允许你使用新插件。

此外，如果你正在从 Capacitor 1 或 2 迁移，请确保已启用[自动插件加载](https://capacitorjs.com/docs/updating/3-0#switch-to-automatic-android-plugin-loading)。

如果仍然出现"Plugin not implemented"错误，请确保你没有使用 service worker，这会阻止 Capacitor 和插件代码的注入。或者，如果你想使用它们，你可以使用[这个临时解决方案](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390)来使注入生效。

## 使用 ProGuard

ProGuard 是一种用于缩减、混淆和减小应用大小的工具。通过在 `build.gradle` 中将 `minifyEnabled` 选项设置为 `true` 来启用它。此过程有时可能会导致 Capacitor 出现问题，当使用依赖于代码在运行时保持可读性的插件或自定义原生代码时，例如代码反射。ProGuard 会扫描代码以尝试优化和缩小应用大小，有时此过程可能会删除对插件功能重要的类或方法。

从 Capacitor v3.2.3 开始，Capacitor 中包含了涵盖 Capacitor 插件、权限和 Activity 结果核心功能的 ProGuard 规则。如果你使用的 Capacitor 版本早于 v3.2.3，请将[以下规则](https://github.com/ionic-team/capacitor/blob/main/android/capacitor/proguard-rules.pro)添加到你的 Android 项目的 `proguard-rules.pro` 文件中。这些规则应能解决任何核心 Capacitor 功能和核心插件的问题。

如果在添加这些规则后仍然遇到任何问题，请尝试找出问题来源的插件或原生代码，并添加一条规则来覆盖特定的插件代码，例如：

```
-keep class com.mythirdpartyplugin.** { *; }
```

如果你确定某个 Capacitor 插件导致了 ProGuard 问题，并且你不介意所有插件都免除 ProGuard 处理，则以下 ProGuard 规则将覆盖任何插件类代码：

```
-keep public class * extends com.getcapacitor.Plugin
```
