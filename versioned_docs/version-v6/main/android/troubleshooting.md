---
title: 排查 Android 问题
sidebar_label: 问题排查
description: Android 问题排查指南
contributors:
  - mlynch
  - jcesarmobile
slug: /android/troubleshooting
---

# 排查 Android 问题

要创建一个 100% 完美的原生管理工具几乎是不可能的，迟早你会遇到 Android 工作流程中的各种问题。

本指南尝试记录常见的 Android 问题及其可能的解决方案。

## Android 工具箱

每位 Android 开发者都会学习一些调试 Android 问题的常用技巧，你应该将这些技巧融入到你的工作流程中：

### 善用搜索

任何时候遇到 Android、Gradle 或模拟器的问题，你的第一步都应该是将错误信息复制粘贴到搜索引擎中搜索。

Capacitor 使用标准的 Android 工具集，因此很可能你遇到的问题，许多 Android 开发者也曾遇到过，并且已经存在解决方案。

问题可能很简单，比如更新依赖、运行 Gradle 同步或清除缓存。

### Gradle 同步

如果你从 npm 安装了新的插件，但在 Android 构建中无法使用或看到该插件，请尝试使用 Android Studio 右上角的 "Sync Project with Gradle Files" 按钮（图标看起来像一头大象）。这将重新同步你的原生 Android 代码以包含新的插件代码，并应该允许你使用新插件。更多信息，请参阅 [Github 上的此问题](https://github.com/ionic-team/capacitor/issues/4012)。

它也可以帮助解决许多其他看似随机的问题，因此遇到大多数 Android 构建问题时，运行 "Sync Project with Gradle Files" 总是一个好的第一步。

### 清理/重建

清理和重建可以解决许多构建问题：

![Android 清理和构建](/img/v6/docs/android/clean-rebuild.png)

### 清除缓存/重启

如果你确信已经修复了问题，但 Android Studio 或 Gradle 仍然报错，通常的解决方案是让 Android Studio 清除其缓存并重启程序。

这可以很容易地从文件菜单中完成：

![Android 清除缓存](/img/v6/docs/android/invalidate-caches.png)

## 错误："package android.support.* does not exist"

当某些 Cordova 或 Capacitor 插件使用了旧的 Android 支持库依赖，而不是使用新的 AndroidX 等效库时，会发生此错误。
你应该在插件仓库中报告此问题，以便维护者可以更新插件以使用 AndroidX 依赖。

作为一种变通方法，你也可以使用 jetifier 来修补插件：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误："Please select Android SDK"

此错误通常是由于需要同步 Gradle，在更新依赖和更改项目设置后，你需要定期执行此操作。

要手动同步 Gradle，请从主菜单栏中打开 File -> Sync Project with Gradle Files：

![同步 Gradle](/img/v6/docs/android/sync-gradle.png)

## 错误："APK Can't be installed"

APK 无法安装到模拟器或设备通常是由于存在具有相同包名的现有应用。尝试运行应用时，你可能会看到类似这样的错误：

![Android APK 失败](/img/v6/docs/android/apk-failed.png)

解决方案是删除任何旧应用，并确保你的包名在 `AndroidManifest.xml` 中是最新的，并且不与你正在开发的其他应用冲突。

最后，最好执行一次清理和重建以防万一。

## 错误："Unable to locate a Java Runtime"

如果未设置 `JAVA_HOME` 环境变量，在使用 `run` 命令时可能会出现此错误。

要解决此问题，请使用在 Android Studio 中 Preferences > Build, Execution, Deployment, Build Tools > Gradle > Gradle JDK 下找到的路径，将 `JAVA_HOME` 设置为环境变量或系统变量。

![Android Studio 中的 JDK 路径](/img/v6/docs/android/jdk-path.png)

在 Mac 上，可以在你的 `.zshrc` 或 `.bashrc` 文件中更新，或在环境中导出。

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

在 Windows 上，你可以在环境变量设置下将 `JAVA_HOME` 设置为系统变量。

## 重新创建项目

Capacitor 允许你管理自己的 Android 项目。就像任何 IDE 支持的项目一样，有时事情会变得如此不同步，以至于唯一的解决方案是重新构建项目。

要执行此操作，请按照以下步骤进行：

1. 将你创建的任何源代码（例如 `app/android/src` 中的 Java 文件、清单文件或资源文件）复制到 `app/android` 之外的安全位置。
2. 接下来，确保你运行的是最新版本的 Capacitor CLI：`npm install @capacitor/cli@latest`
3. 删除 android 目录：`rm -rf android/`
4. 从 Capacitor 重新创建 Android 应用：`npx cap add android`
5. 将你保存的源文件复制回项目

## 插件未实现

在 Android 上，如果 Capacitor 找不到插件或无法将其代码注入到 WebView 中，可能会发生这种情况。

首先，请确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync android`。

最后，使用 Android Studio 右上角的 "Sync Project with Gradle Files" 按钮（图标看起来像一头大象）。这将重新同步你的原生 Android 代码以包含新的插件代码，并应该允许你使用新插件。

此外，如果你正在从 Capacitor 1 或 2 迁移，请确保你已启用 [自动插件加载](https://capacitorjs.com/docs/updating/3-0#switch-to-automatic-android-plugin-loading)。

如果仍然收到 "Plugin not implemented" 错误，请确保你没有使用 Service Worker，这会阻止 Capacitor 和插件代码的注入。或者，如果你想使用它们，可以使用 [此变通方法](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390) 使注入工作。

## 使用 Proguard

ProGuard 是一个用于压缩、混淆和减小应用大小的工具。通过将 `build.gradle` 中的 `minifyEnabled` 选项设置为 `true` 来启用它。这个过程有时在使用插件或某些依赖其代码在运行时可读的自定义原生代码（例如代码反射）时，在 Capacitor 中可能导致问题。ProGuard 扫描代码以尝试优化和缩小应用的大小，有时这个过程可能会删除对插件功能重要的类或方法。

从 Capacitor v3.2.3 开始，Capacitor 包含了涵盖 Capacitor 插件、权限和活动结果的核心功能的 ProGuard 规则。如果你使用的 Capacitor 版本早于 v3.2.3，请将 [以下规则](https://github.com/ionic-team/capacitor/blob/6.x/android/capacitor/proguard-rules.pro) 添加到你的 Android 项目的 `proguard-rules.pro` 文件中。这些规则应该可以解决任何核心 Capacitor 功能和核心插件的问题。

如果在添加这些规则后仍然遇到任何问题，请尝试识别源插件或原生代码，并添加规则以覆盖特定的插件代码，例如：

```
-keep class com.mythirdpartyplugin.** { *; }
```

如果你确定是某个 Capacitor 插件导致了 ProGuard 问题，以下 ProGuard 规则将涵盖任何插件类代码，如果你不介意所有插件都免于 ProGuard 处理的话：

```
-keep public class * extends com.getcapacitor.Plugin
```