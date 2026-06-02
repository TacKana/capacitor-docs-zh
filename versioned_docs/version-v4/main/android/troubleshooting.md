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

创建一个 100% 完美的原生管理工具几乎是不可能的，迟早你会遇到 Android 工作流中的各种问题。

本指南旨在记录常见的 Android 问题及其可能的解决方案。

## Android 工具箱

每个 Android 开发者都会学到一些调试 Android 问题的常用技巧，你应该将它们融入到你的工作流中：

### Google、Google、再 Google

每当你遇到 Android、Gradle 或模拟器相关的问题时，第一步应该将错误信息复制粘贴到 Google 搜索中。

Capacitor 使用标准的 Android 工具包，因此如果你遇到问题，很可能很多 Android 开发者也遇到过，并且已经有了解决方案。

这可能简单到只需更新依赖、运行 Gradle 同步或清除缓存。

### Gradle 同步

如果你已经从 npm 安装了新插件，但在 Android 构建中无法使用或看到这些插件，请尝试点击 Android Studio 右上角的"使用 Gradle 文件同步项目"按钮（图标看起来像一头大象）。这将重新同步你的原生 Android 代码以包含新的插件代码，从而可以使用你的新插件。更多信息请参见 [GitHub 上的这个问题](https://github.com/ionic-team/capacitor/issues/4012)。

它还可以帮助解决许多其他看似随机的问题，因此在遇到大多数 Android 构建问题时，运行"使用 Gradle 文件同步项目"始终是一个良好的第一步。

### 清理/重建

清理和重建可以修复许多构建问题：

![Android 清理和重建](../../../../static/img/v4/docs/android/clean-rebuild.png)

### 清除缓存/重启

如果你确信已经修复了问题，但 Android Studio 或 Gradle 仍然不认可，通常的解决方案是让 Android Studio 清除其缓存并重启程序。

这可以通过文件菜单轻松完成：

![Android 清除缓存](../../../../static/img/v4/docs/android/invalidate-caches.png)

## 错误："package android.support.\* does not exist"

当某些 Cordova 或 Capacitor 插件使用了旧的 Android support 依赖而不是新的 AndroidX 等效依赖时，会出现此错误。

你应该在插件仓库中报告此问题，以便维护者更新插件以使用 AndroidX 依赖。

作为临时解决方案，你也可以使用 jetifier 修补插件：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误："Please select Android SDK"

此错误通常是由于需要同步 Gradle 所致，你在更新依赖和更改项目设置后需要定期执行此操作。

要手动同步 Gradle，请从主菜单栏打开 File -> Sync Project with Gradle Files：

![同步 Gradle](../../../../static/img/v4/docs/android/sync-gradle.png)

## 错误："APK Can't be installed"

APK 无法安装到模拟器或设备上，通常是因为已存在具有相同包名的应用。尝试运行应用时，你可能会看到类似这样的错误：

![Android APK 失败](../../../../static/img/v4/docs/android/apk-failed.png)

解决方案是删除任何旧的应用，并确保你的包名在 `AndroidManifest.xml` 中是最新的，并且不与其他正在开发的应用冲突。

最后，为保险起见，进行一次清理和重建。

## 错误："Unable to locate a Java Runtime"

如果未设置 `JAVA_HOME` 环境变量，使用 `run` 命令时可能会出现此错误。

要解决此问题，请将 `JAVA_HOME` 设置为环境变量或系统变量，路径可以在 Android Studio 的 Preferences > Build, Execution, Deployment, Build Tools > Gradle > Gradle JDK 中找到。

![Android Studio 中的 JDK 路径](../../../../static/img/v4/docs/android/jdk-path.png)

在 Mac 上，可以在 `.zshrc` 或 `.bashrc` 文件中更新，或在环境中导出。

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/Contents/Home"
```

在 Windows 上，可以在环境变量设置中将 `JAVA_HOME` 设置为系统变量。

## 重建项目

Capacitor 允许你管理自己的 Android 项目。与任何 IDE 支持的项目一样，有时事情会变得严重不同步，唯一的解决方案就是重建项目。

为此，请按照以下步骤操作：

1. 将你创建的任何源代码（例如 `app/android/src` 中的 Java 文件、清单文件或资源文件）复制到 `app/android` 之外的安全位置。
2. 确保你正在运行最新版本的 Capacitor CLI：`npm install @capacitor/cli@latest`
3. 删除 android 目录：`rm -rf android/`
4. 从 Capacitor 重新创建 Android 应用：`npx cap add android`
5. 将保存的源文件复制回项目中

## 插件未实现

在 Android 上，如果 Capacitor 找不到插件或无法将其代码注入到 WebView 中，可能会发生这种情况。

首先，请确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync android`。

最后，使用 Android Studio 右上角的"使用 Gradle 文件同步项目"按钮（图标看起来像一头大象）。这将重新同步你的原生 Android 代码以包含新的插件代码，从而可以使用你的新插件。

此外，如果你正在从 Capacitor 1 或 2 迁移，请确保已启用[自动插件加载](https://capacitorjs.com/docs/updating/3-0#switch-to-automatic-android-plugin-loading)。

如果仍然收到"插件未实现"错误，请确保你没有使用 Service Worker，因为这会阻止 Capacitor 和插件的代码注入。或者，如果你想使用它们，可以使用[这个解决方案](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390)来实现注入。

## 使用 ProGuard

ProGuard 是一个用于缩减、混淆和减小应用大小的工具。通过在 `build.gradle` 中将 `minifyEnabled` 选项设置为 `true` 来启用它。在使用插件或某些依赖代码在运行时可读性（如代码反射）的自定义原生代码时，此过程有时可能导致 Capacitor 出现问题。ProGuard 会扫描代码以尝试优化和缩减应用大小，有时此过程可能会移除对插件功能重要的类或方法。

从 Capacitor v3.2.3 开始，Capacitor 包含了覆盖 Capacitor 插件核心功能、权限和 Activity 结果的 ProGuard 规则。如果你使用的是 Capacitor v3.2.3 之前的版本，请将[以下规则](https://github.com/ionic-team/capacitor/blob/4.x/android/capacitor/proguard-rules.pro)添加到你的 Android 项目的 `proguard-rules.pro` 文件中。这些规则应能解决所有核心 Capacitor 功能和核心插件的问题。

如果在添加这些规则后仍然遇到问题，请尝试确定源插件或原生代码，并添加一条规则来覆盖特定的插件代码，例如：

```
-keep class com.mythirdpartyplugin.** { *; }
```

如果你确定某个 Capacitor 插件导致了 ProGuard 问题，并且不介意所有插件都免于 ProGuard 处理，以下 ProGuard 规则将覆盖所有插件类代码：

```
-keep public class * extends com.getcapacitor.Plugin
```
