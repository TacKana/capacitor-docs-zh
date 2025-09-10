---
title: Android 问题排查指南
sidebar_label: 故障排查
description: Android 常见问题解决方案
contributors:
  - mlynch
  - jcesarmobile
slug: /android/troubleshooting
---

# Android 问题排查指南

要打造一个完美无缺的原生管理工具几乎是不可能的，在 Android 工作流中迟早会遇到各种问题。

本指南旨在记录常见的 Android 问题及其解决方案。

## Android 开发者工具箱

每位 Android 开发者都应掌握以下基础调试技巧，并将其融入工作流程：

### 善用搜索引擎

遇到任何与 Android、Gradle 或模拟器相关的问题时，第一步应该是将错误信息复制粘贴到搜索引擎中查询。

由于 Capacitor 使用标准的 Android 工具链，因此您遇到的问题很可能其他 Android 开发者也曾遇到过，网上往往已有现成解决方案。

可能只需简单操作如：更新依赖项、执行 Gradle 同步或清除缓存即可解决。

### Gradle 同步

如果从 npm 安装了新插件但在 Android 构建中无法使用或看到该插件，请点击 Android Studio 右上角的 "Sync Project with Gradle Files" 按钮（图标是大象形状）。这将重新同步原生 Android 代码以包含新插件的代码。更多细节可参考 [Github 上的这个 issue](https://github.com/ionic-team/capacitor/issues/4012)。

该方法也适用于解决许多看似随机的问题，因此遇到大多数 Android 构建问题时，"Sync Project with Gradle Files" 都是首选排查步骤。

### 清理与重建

清理并重建项目可解决多种构建问题：

![Android 清理与重建](../../../../static/img/v5/docs/android/clean-rebuild.png)

### 缓存失效与重启

如果您确信已修复问题但 Android Studio 或 Gradle 仍未生效，通常的解决方法是让 Android Studio 使缓存失效并重启程序。

通过文件菜单可轻松完成此操作：

![Android 缓存失效](../../../../static/img/v5/docs/android/invalidate-caches.png)

## 错误："package android.support.* 不存在"

当某些 Cordova 或 Capacitor 插件使用了旧的 android support 依赖而非新版 AndroidX 等效库时会出现此错误。您应该向插件仓库提交 issue 以便维护者更新插件至使用 AndroidX 依赖。

临时解决方案是使用 jetifier 修补插件：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误："请选择 Android SDK"

此错误通常是由于 Gradle 需要同步所致，在更新依赖项和更改项目设置后需要定期执行此操作。

手动同步 Gradle 的方法：从主菜单栏选择 File -> Sync Project with Gradle Files：

![Gradle 同步](../../../../static/img/v5/docs/android/sync-gradle.png)

## 错误："无法安装 APK"

APK 无法安装到模拟器或设备通常是由于存在相同包名的旧应用。尝试运行应用时可能会看到如下错误：

![Android APK 安装失败](../../../../static/img/v5/docs/android/apk-failed.png)

解决方案是移除所有旧应用，并确保 `AndroidManifest.xml` 中的包名是最新的且不与其他开发中的应用冲突。

最后，建议执行一次清理和重建以防万一。

## 错误："无法定位 Java 运行时环境"

使用 `run` 命令时若未设置 `JAVA_HOME` 环境变量可能出现此错误。

解决方法：在 Android Studio 的 Preferences > Build, Execution, Deployment, Build Tools > Gradle > Gradle JDK 下找到路径，将其设置为环境变量或系统变量。

![Android Studio 中的 JDK 路径](../../../../static/img/v5/docs/android/jdk-path.png)

在 Mac 上，可通过更新 `.zshrc` 或 `.bashrc` 文件或在环境中导出：

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/Contents/Home"
```

在 Windows 上，可通过环境变量设置将 `JAVA_HOME` 添加为系统变量。

## 重建项目

Capacitor 允许您自主管理 Android 项目。但如同任何 IDE 支持的项目，有时问题难以同步解决，此时唯一方案是重建项目。

操作步骤如下：

1. 将您创建的所有源代码（如 `app/android/src` 中的 Java 文件、清单文件或资源文件）备份到 `app/android` 之外的目录
2. 确保使用最新版 Capacitor CLI：`npm install @capacitor/cli@latest`
3. 删除 android 目录：`rm -rf android/`
4. 通过 Capacitor 重新创建 Android 应用：`npx cap add android`
5. 将备份的源文件复制回项目

## 插件未实现错误

在 Android 上，当 Capacitor 无法找到插件或无法将代码注入 WebView 时会出现此问题。

首先确认插件已安装并出现在 `package.json` 中。

然后运行 `npx cap sync android`。

最后使用 Android Studio 右上角的 "Sync Project with Gradle Files" 按钮（大象图标）重新同步原生 Android 代码以包含新插件。

如果您是从 Capacitor 1 或 2 迁移而来，请确保启用了 [自动插件加载功能](https://capacitorjs.com/docs/updating/3-0#switch-to-automatic-android-plugin-loading)。

如果仍出现 "Plugin not implemented" 错误，请检查是否使用了 Service Worker，这会阻止 Capacitor 和插件代码注入。如需使用 Service Worker，可参考 [此临时解决方案](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390) 实现代码注入。

## 使用 ProGuard

ProGuard 是用于压缩、混淆和减小应用体积的工具，通过在 `build.gradle` 中将 `minifyEnabled` 设为 `true` 启用。在使用依赖运行时代码可读性（如代码反射）的插件或自定义原生代码时，此过程可能导致 Capacitor 出现问题。ProGuard 会扫描代码以优化和缩减应用体积，有时会删除对插件功能至关重要的类或方法。

从 Capacitor v3.2.3 开始，已内置涵盖 Capacitor 插件核心功能、权限和活动结果的 ProGuard 规则。如果您使用的是 v3.2.3 之前的版本，请将 [这些规则](https://github.com/ionic-team/capacitor/blob/5.x/android/capacitor/proguard-rules.pro) 添加到 Android 项目的 `proguard-rules.pro` 文件中。这些规则应能解决 Capacitor 核心功能和核心插件相关问题。

如果添加规则后问题依旧，请尝试识别问题源插件或原生代码并添加相应规则，例如：

```
-keep class com.mythirdpartyplugin.** { *; }
```

如果确定是 Capacitor 插件导致的 ProGuard 问题，以下规则将涵盖所有插件类代码（如果不介意所有插件都豁免 ProGuard 处理）：

```
-keep public class * extends com.getcapacitor.Plugin
```