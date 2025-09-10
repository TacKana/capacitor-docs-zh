---
title: Android 问题排查指南
sidebar_label: 问题排查
description: Android 开发常见问题解决方案
contributors:
  - mlynch
  - jcesarmobile
slug: /android/troubleshooting
---

# Android 常见问题排查

要打造一个完美无缺的原生开发工具几乎是不可能的，在 Android 开发流程中总会遇到各种问题。

本文档记录了常见的 Android 问题及其解决方案。

## Android 调试工具箱

每位 Android 开发者都应掌握以下基本调试技巧：

### 善用搜索引擎

遇到任何 Android、Gradle 或模拟器相关问题时，第一步都应该将错误信息复制到 Google 进行搜索。

由于 Capacitor 使用的是标准 Android 工具链，因此大多数问题都能在开发者社区找到解决方案——可能只需更新依赖、同步 Gradle 或清除缓存即可解决。

### Gradle 同步

当通过 npm 安装新插件后无法在 Android 项目中使用时，可以点击 Android Studio 右上角的 "Sync Project with Gradle Files" 按钮（图标是大象形状）。这将重新同步原生代码以包含新插件。更多细节可参考 [Github 上的这个 issue](https://github.com/ionic-team/capacitor/issues/4012)。

Gradle 同步也能解决许多看似随机的问题，因此遇到构建问题时都应优先尝试此操作。

### 清理/重建项目

清理并重新构建能解决多种构建问题：

![Android 清理与重建](../../../../static/img/v4/docs/android/clean-rebuild.png)

### 清除缓存并重启

当你确认已修复问题但 Android Studio 或 Gradle 仍报错时，通常需要清除 IDE 缓存：

![清除 Android Studio 缓存](../../../../static/img/v4/docs/android/invalidate-caches.png)

## 错误："package android.support.* 不存在"

此错误通常由某些 Cordova 或 Capacitor 插件仍在使用旧的 Android 支持库（而非 AndroidX）导致。建议向插件仓库提交 issue 促使维护者更新依赖。

临时解决方案是使用 jetifier 工具转换依赖：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误："请选择 Android SDK"

该问题通常源于 Gradle 需要同步，在更新依赖或修改项目设置后常会出现。

手动同步方法：点击菜单栏 File -> Sync Project with Gradle Files：

![同步 Gradle](../../../../static/img/v4/docs/android/sync-gradle.png)

## 错误："无法安装 APK"

APK 无法安装到模拟器或设备通常是因为存在相同包名的应用。运行时可能看到如下错误：

![APK 安装失败](../../../../static/img/v4/docs/android/apk-failed.png)

解决方案是删除旧应用，并确保 `AndroidManifest.xml` 中的包名唯一且不与其他开发中的应用冲突。最后执行一次清理和重建。

## 错误："找不到 Java 运行时环境"

执行 `run` 命令时若未设置 `JAVA_HOME` 环境变量会出现此错误。

解决方法：在 Android Studio 的 Preferences > Build, Execution, Deployment, Build Tools > Gradle > Gradle JDK 中查看 JDK 路径并设置为环境变量：

![Android Studio 中的 JDK 路径](../../../../static/img/v4/docs/android/jdk-path.png)

Mac 用户可在 `.zshrc` 或 `.bashrc` 中添加：
```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/Contents/Home"
```

Windows 用户需在系统环境变量中设置 `JAVA_HOME`。

## 项目重建指南

当 Android 项目严重不同步时，可能需要完全重建：

1. 备份自定义代码（如 `app/android/src` 中的 Java 文件、清单文件和资源文件）
2. 确保使用最新 Capacitor CLI：`npm install @capacitor/cli@latest`
3. 删除 android 目录：`rm -rf android/`
4. 重新生成项目：`npx cap add android`
5. 将备份的代码复制回项目

## 插件未实现错误

在 Android 上出现此错误通常是因为 Capacitor 无法找到插件或注入 WebView 代码失败。

排查步骤：
1. 确认插件已安装并出现在 `package.json`
2. 执行 `npx cap sync android`
3. 点击 Android Studio 右上角的 Gradle 同步按钮（大象图标）

如果是 Capacitor 1/2 迁移项目，确保已启用 [自动插件加载](https://capacitorjs.com/docs/updating/3-0#switch-to-automatic-android-plugin-loading)。

若仍报错，请检查是否使用了 Service Worker（会阻止代码注入），可参考 [此临时解决方案](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390)。

## ProGuard 使用注意事项

ProGuard 是用于代码压缩和混淆的工具，通过在 `build.gradle` 中设置 `minifyEnabled true` 启用。但可能会影响依赖反射等运行时特性的插件。

从 Capacitor v3.2.3 开始已内置 ProGuard 规则覆盖核心功能。旧版本需手动将 [这些规则](https://github.com/ionic-team/capacitor/blob/4.x/android/capacitor/proguard-rules.pro) 添加到项目的 `proguard-rules.pro` 文件中。

若仍有问题，可为特定插件添加保留规则：
```
-keep class com.mythirdpartyplugin.** { *; }
```

或为所有 Capacitor 插件添加通用规则：
```
-keep public class * extends com.getcapacitor.Plugin
```