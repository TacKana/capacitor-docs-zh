---
title: 解决 Android 问题
sidebar_label: 故障排除
description: Android 问题故障排除指南
contributors:
  - mlynch
  - jcesarmobile
slug: /android/troubleshooting
---

# Android 问题故障排除

打造一个 100% 完美的原生管理工具几乎是不可能的，你迟早会在 Android 工作流的某些环节遇到各种问题。

本指南旨在记录常见的 Android 问题及其可能的解决方案。

## Android 工具箱

每位 Android 开发者都会学习一些调试 Android 问题的常用技巧，你应该将这些方法融入自己的工作流中：

### 善用搜索引擎

每当遇到 Android、Gradle 或模拟器相关的问题时，你的第一步应该是将错误信息复制并粘贴到搜索引擎中进行搜索。

Capacitor 使用标准的 Android 工具包，因此如果你遇到了某个问题，很可能其他 Android 开发者也曾遇到过，并且网络上已经存在解决方案。

解决方案可能很简单，比如更新依赖、运行 Gradle 同步或清理缓存。

### Gradle 同步

如果你从 npm 安装了一个新插件，但在 Android 构建中无法使用或看到该插件，可以尝试点击 Android Studio 右上角的 "Sync Project with Gradle Files" 按钮（图标看起来像一头大象）。这将重新同步你的原生 Android 代码以包含新的插件代码，应该能够让你使用新插件。更多信息，请参阅 [GitHub 上的这个 issue](https://github.com/ionic-team/capacitor/issues/4012)。

这个方法也能帮助解决许多其他看似随机的问题，因此在遇到大多数 Android 构建问题时，"Sync Project with Gradle Files" 总是一个很好的第一步。

### 清理/重新构建

清理和重新构建可以解决许多构建问题：

![Android 清理和构建](../../../../static/img/v4/docs/android/clean-rebuild.png)

### 清理缓存/重启

如果你确信已经修复了某个问题，但 Android Studio 或 Gradle 仍然报错，通常的解决方案是让 Android Studio 清理其缓存并重启程序。

这可以通过文件菜单轻松完成：

![Android 清理缓存](../../../../static/img/v4/docs/android/invalidate-caches.png)

## 错误："package android.support.* does not exist"

这个错误发生在某些 Cordova 或 Capacitor 插件使用了旧的 Android 支持库依赖，而没有使用新的 AndroidX 等效库时。
你应该在插件仓库中报告这个问题，以便维护者可以更新插件以使用 AndroidX 依赖。

作为临时解决方案，你也可以使用 jetifier 来修补插件：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误："Please select Android SDK"

这个错误通常是由于需要同步 Gradle 引起的，在更新依赖和更改项目设置后，你需要定期执行此操作。

要手动同步 Gradle，请从主菜单栏打开 File -> Sync Project with Gradle Files：

![同步 Gradle](../../../../static/img/v4/docs/android/sync-gradle.png)

## 错误："APK 无法安装"

APK 无法安装到模拟器或设备上，通常是由于存在具有相同包名的现有应用。尝试运行应用时，你可能会看到如下错误：

![Android APK 安装失败](../../../../static/img/v4/docs/android/apk-failed.png)

解决方案是移除任何旧的应用，并确保你的包名在 `AndroidManifest.xml` 中是最新的，且不与你正在开发的其他应用冲突。

最后，以防万一，执行一次清理和重新构建操作。

## 错误："Unable to locate a Java Runtime"

在使用 `run` 命令时，如果 `JAVA_HOME` 环境变量未设置，可能会出现此错误。

要解决此问题，请使用在 Android Studio 中 Preferences > Build, Execution, Deployment, Build Tools > Gradle > Gradle JDK 下找到的路径，将 `JAVA_HOME` 设置为环境变量或系统变量。

![Android Studio 中的 JDK 路径](../../../../static/img/v4/docs/android/jdk-path.png)

在 Mac 上，可以在 `.zshrc` 或 `.bashrc` 文件中更新，或在环境中导出：

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/Contents/Home"
```

在 Windows 上，你可以在环境变量设置中将 `JAVA_HOME` 设置为系统变量。

## 重新创建项目

Capacitor 允许你管理自己的 Android 项目。就像任何 IDE 支持的项目一样，有时项目会变得如此不同步，以至于唯一的解决方案就是重新构建项目。

为此，请按照以下步骤操作：

1. 将你创建的任何源代码（例如 `app/android/src` 中的 Java 文件、清单文件或资源文件）复制到 `app/android` 之外的安全位置。
2. 接下来，确保你运行的是最新版本的 Capacitor CLI：`npm install @capacitor/cli@latest`
3. 移除 android 目录：`rm -rf android/`
4. 从 Capacitor 重新创建 Android 应用：`npx cap add android`
5. 将你保存的源文件复制回项目

## 插件未实现

在 Android 上，如果 Capacitor 找不到插件或无法将其代码注入到 WebView 中，可能会发生这种情况。

首先，请确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync android`。

最后，使用 Android Studio 右上角的 "Sync Project with Gradle Files" 按钮（图标看起来像一头大象）。这将重新同步你的原生 Android 代码以包含新的插件代码，应该能够让你使用新插件。

另外，如果你是从 Capacitor 1 或 2 迁移过来的，请确保你已启用 [自动插件加载](https://capacitorjs.com/docs/updating/3-0#switch-to-automatic-android-plugin-loading)。

如果仍然收到 "Plugin not implemented" 错误，请确保你没有使用 service workers，因为这可能会阻止 Capacitor 和插件代码的注入。或者，如果你想使用它们，可以使用 [这个临时解决方案](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390) 来使注入工作。

## 使用 Proguard

ProGuard 是一个用于缩小、混淆和减少应用大小的工具。通过将 `build.gradle` 中的 `minifyEnabled` 选项设置为 `true` 来启用它。这个过程有时在使用依赖其代码在运行时可读（如代码反射）的插件或某些自定义原生代码时，可能会导致 Capacitor 出现问题。ProGuard 会扫描代码以尝试优化和缩小应用大小，有时这个过程会移除对插件功能很重要的类或方法。

从 Capacitor v3.2.3 开始，Capacitor 包含了涵盖 Capacitor 插件核心功能、权限和活动结果的 ProGuard 规则。如果你使用的是早于 v3.2.3 的 Capacitor 版本，请将 [以下规则](https://github.com/ionic-team/capacitor/blob/4.x/android/capacitor/proguard-rules.pro) 添加到你的 Android 项目的 `proguard-rules.pro` 文件中。这些规则应该能解决任何核心 Capacitor 功能和核心插件的问题。

如果在添加这些规则后仍然遇到问题，请尝试识别源插件或原生代码，并添加一个规则来覆盖特定的插件代码，例如：

```
-keep class com.mythirdpartyplugin.** { *; }
```

如果你确定是某个 Capacitor 插件导致了 ProGuard 问题，并且不介意所有插件都免于 ProGuard 处理，那么以下 ProGuard 规则将覆盖任何插件类代码：

```
-keep public class * extends com.getcapacitor.Plugin
```