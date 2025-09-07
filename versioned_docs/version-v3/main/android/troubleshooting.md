---
title: Android 问题排查指南
sidebar_label: 排查指南
description: Android 常见问题解决方案
contributors:
  - mlynch
  - jcesarmobile
slug: /android/troubleshooting
---

# Android 问题排查指南

打造完美无缺的原生管理工具几乎是不可能的任务，在 Android 开发流程中难免会遇到各种问题。

本文档旨在记录 Android 常见问题及其解决方案。

## Android 调试工具箱

每位 Android 开发者都应掌握以下基础调试技巧：

### 善用搜索引擎

遇到任何 Android、Gradle 或模拟器相关问题时，第一步请将错误信息复制到 Google 搜索。

Capacitor 使用的是标准 Android 工具链，因此您遇到的问题很可能已有现成解决方案，可能是简单的依赖更新、Gradle 同步或缓存清理。

### Gradle 同步

当通过 npm 安装新插件后无法在 Android 项目中识别时，请点击 Android Studio 右上角的 "Sync Project with Gradle Files" 按钮（图标是大象形状）。这将重新同步原生代码以包含新插件。详情参见 [GitHub 相关讨论](https://github.com/ionic-team/capacitor/issues/4012)。

Gradle 同步也是解决许多随机性问题的首选方案。

### 清理与重建项目

清理重建能解决多种构建问题：

![Android 清理与重建](../../../../static/img/v3/docs/android/clean-rebuild.png)

### 缓存清理重启

当确定问题已修复但 Android Studio 仍报错时，通常需要清理缓存并重启：

![Android 清理缓存](../../../../static/img/v3/docs/android/invalidate-caches.png)

## 错误："package android.support.* 不存在"

此错误源于某些 Cordova 或 Capacitor 插件仍在使用旧版 Android Support 库而非 AndroidX。应向插件仓库提交 issue 督促维护者更新。

临时解决方案是使用 jetifier 转换：
```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误："请选择 Android SDK"

该问题通常需要手动同步 Gradle：
![Gradle 同步](../../../../static/img/v3/docs/android/sync-gradle.png)

## 错误："APK 无法安装"

APK 安装失败通常由包名冲突导致：
![APK 安装失败](../../../../static/img/v3/docs/android/apk-failed.png)

解决方案包括：
1. 卸载旧版应用
2. 检查 `AndroidManifest.xml` 中的包名唯一性
3. 执行清理重建

## 项目重建指南

当项目严重不同步时，可按照以下步骤重建：
1. 备份自定义代码（如 `app/android/src` 下的 Java 文件）
2. 更新 CLI：`npm install @capacitor/cli@latest`
3. 删除 android 目录：`rm -rf android/`
4. 重建项目：`npx cap add android`
5. 恢复备份代码

## "插件未实现"错误

可能原因及解决方案：
1. 确认插件已安装并存在于 `package.json`
2. 执行 `npx cap sync android`
3. 点击 Android Studio 的大象图标同步 Gradle
4. 禁用 Service Worker（会阻碍插件注入），或参考 [此解决方案](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390)

## ProGuard 使用注意事项

ProGuard 通过 `minifyEnabled true` 启用，可能导致依赖反射的插件异常。Capacitor v3.2.3+ 已内置核心插件规则，早期版本需手动添加 [规则文件](https://github.com/ionic-team/capacitor/blob/3.x/android/capacitor/proguard-rules.pro)。

特定插件保护规则示例：
```
-keep class com.mythirdpartyplugin.** { *; }
```

全局插件保护规则：
```
-keep public class * extends com.getcapacitor.Plugin
```