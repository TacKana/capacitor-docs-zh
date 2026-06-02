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

创建一个百分百完美的原生管理工具几乎是不可能的，迟早您会遇到 Android 工作流中的各种问题。

本指南旨在记录常见的 Android 问题及可能的解决方案。

## Android 工具箱

每位 Android 开发者都会学到一些调试 Android 问题的常用技巧，您应该将这些技巧融入到您的工作流中：

### Google、Google、再 Google

每当您遇到 Android、Gradle 或模拟器的问题时，第一步应该是将错误信息复制并粘贴到 Google 中搜索。

Capacitor 使用标准的 Android 工具包，因此如果您遇到某个问题，很可能许多 Android 开发者也遇到过，并且存在相应的解决方案。

解决方案可能简单如更新依赖、运行 Gradle 同步或清除缓存。

### Gradle 同步

如果您从 npm 安装了新插件，但在 Android 构建中无法使用或看到这些插件，请尝试点击 Android Studio 右上角的"使用 Gradle 文件同步项目"按钮（图标看起来像一头大象）。这将重新同步您的原生 Android 代码以包含新的插件代码，从而允许您使用新插件。更多信息，请参阅 [GitHub 上的这个问题](https://github.com/ionic-team/capacitor/issues/4012)。

这对于解决许多其他看似随机的问题也有帮助，因此在遇到大多数 Android 构建问题时，运行"使用 Gradle 文件同步项目"总是一个好的第一步。

### 清理/重建

清理和重建可以解决许多构建问题：

![Android 清理和构建](/img/v6/docs/android/clean-rebuild.png)

### 清除缓存/重启

如果您确信已修复了某个问题，但 Android Studio 或 Gradle 不认可，通常的解决方案是让 Android Studio 清除其缓存并重启程序。

这可以通过"文件"菜单轻松完成：

![Android 清除缓存](/img/v6/docs/android/invalidate-caches.png)

## 错误："package android.support.\* does not exist"

当某些 Cordova 或 Capacitor 插件使用旧的 android support 依赖而不是新的 AndroidX 等效依赖时，会出现此错误。您应该在插件仓库中报告此问题，以便维护者更新插件以使用 AndroidX 依赖。

作为临时解决方案，您也可以使用 jetifier 修补插件：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误："Please select Android SDK"

此错误通常是由于需要同步 Gradle 造成的，在更新依赖和更改项目设置后，您需要定期执行此操作。

要手动同步 Gradle，请从主菜单栏中打开"文件"->"使用 Gradle 文件同步项目"：

![同步 Gradle](/img/v6/docs/android/sync-gradle.png)

## 错误："APK Can't be installed"

APK 无法安装到模拟器或设备上，通常是由于已存在具有相同包名的应用。尝试运行应用时，您可能会看到类似这样的错误：

![Android APK 失败](/img/v6/docs/android/apk-failed.png)

解决方案是删除任何旧应用，并确保 `AndroidManifest.xml` 中的包名是最新的，并且不与您正在开发的其他应用冲突。

最后，为了保险起见，请进行清理和重建。

## 错误："Unable to locate a Java Runtime"

如果在使用 `run` 命令时 `JAVA_HOME` 环境变量未设置，可能会发生此错误。

要解决此问题，请使用在 Android Studio 的"首选项">"构建、执行、部署">"构建工具">"Gradle">"Gradle JDK"中找到的路径，将 `JAVA_HOME` 设置为环境变量或系统变量。

![Android Studio 中的 JDK 路径](/img/v6/docs/android/jdk-path.png)

在 Mac 上，可以在 `.zshrc` 或 `.bashrc` 文件中更新此变量，或在环境中导出。

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

在 Windows 上，可以在"环境变量"设置中将 `JAVA_HOME` 设置为系统变量。

## 重建项目

Capacitor 让您可以管理自己的 Android 项目。与任何 IDE 支持的项目一样，有时事情会变得如此不同步，以至于唯一的解决方案是重建项目。

为此，请按照以下步骤操作：

1. 将您创建的任何源代码（如 `app/android/src` 中的 Java 文件、清单文件或资源文件）复制到 `app/android` 之外的安全位置。
2. 接下来，确保您运行的是更新版本的 Capacitor CLI：`npm install @capacitor/cli@latest`
3. 删除 android 目录：`rm -rf android/`
4. 从 Capacitor 重新创建 Android 应用：`npx cap add android`
5. 将保存的源文件复制回项目中

## 插件未实现

在 Android 上，如果 Capacitor 找不到插件或无法将其代码注入 WebView，可能会发生此问题。

首先，确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync android`。

最后，使用 Android Studio 右上角的"使用 Gradle 文件同步项目"按钮（图标看起来像一头大象）。这将重新同步您的原生 Android 代码以包含新的插件代码，从而允许您使用新插件。

另外，如果您正在从 Capacitor 1 或 2 迁移，请确保您已启用[自动插件加载](https://capacitorjs.com/docs/updating/3-0#switch-to-automatic-android-plugin-loading)。

如果仍然出现"插件未实现"错误，请确保您没有使用 service worker，因为这会阻止 Capacitor 和插件代码的注入。或者，如果您想使用 service worker，可以使用[这个临时解决方案](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390)来实现注入。

## 使用 ProGuard

ProGuard 是一种用于缩减、混淆和减小应用大小的工具。通过将 `build.gradle` 中的 `minifyEnabled` 选项设置为 `true` 来启用它。此过程有时可能会导致 Capacitor 出现问题，当使用插件或某些依赖于代码在运行时可读的自定义原生代码时（例如代码反射），ProGuard 会扫描代码以尝试优化和缩小应用大小，有时此过程可能会删除对插件功能重要的类或方法。

从 Capacitor v3.2.3 开始，Capacitor 包含了涵盖 Capacitor 插件、权限和 Activity 结果核心功能的 ProGuard 规则。如果您使用早于 v3.2.3 的 Capacitor 版本，请将[以下规则](https://github.com/ionic-team/capacitor/blob/6.x/android/capacitor/proguard-rules.pro)添加到您的 Android 项目的 `proguard-rules.pro` 文件中。这些规则应能解决任何核心 Capacitor 功能和核心插件的问题。

如果在添加这些规则后仍然遇到任何问题，请尝试确定源插件或原生代码，并添加一条规则来覆盖特定的插件代码，例如：

```
-keep class com.mythirdpartyplugin.** { *; }
```

如果您确定某个 Capacitor 插件导致了 ProGuard 问题，并且不介意所有插件都不经过 ProGuard 处理，可以使用以下 ProGuard 规则覆盖所有插件类代码：

```
-keep public class * extends com.getcapacitor.Plugin
```
