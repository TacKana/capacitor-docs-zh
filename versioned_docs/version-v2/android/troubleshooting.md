---
title: Android 问题排查指南
description: Android 常见问题解决方案
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/android/troubleshooting
---

# Android 问题排查指南

要打造一个完美无缺的原生开发管理工具几乎是不可能的，在 Android 工作流中遇到各种问题在所难免。

本文档旨在记录常见的 Android 问题及其解决方案。

## Android 调试工具箱

每位 Android 开发者都应掌握以下基础调试技巧：

### 善用搜索引擎

遇到 Android、Gradle 或模拟器相关问题时，第一步应该是将错误信息复制到 Google 进行搜索。

由于 Capacitor 使用标准的 Android 开发工具链，你遇到的问题很可能其他开发者也曾遇到过，网上通常已有解决方案。

可能只需要简单更新依赖、同步 Gradle 或清除缓存就能解决。

### 清理与重建项目

清理并重新构建项目可以解决许多编译问题：

![Android 清理与重建](../../../static/img/v3/docs/android/clean-rebuild.png)

### 清除缓存并重启

当你确认已修复问题但 Android Studio 或 Gradle 仍报错时，通常可以通过清除 Android Studio 缓存并重启来解决。

操作路径：文件菜单 → "Invalidate Caches / Restart"

![清除 Android 缓存](../../../static/img/v3/docs/android/invalidate-caches.png)

## 报错："package android.support.* 不存在"

该错误通常是由于某些 Cordova 或 Capacitor 插件仍在使用旧版 Android Support 库而非 AndroidX 替代方案。

解决方案：
1. 向插件仓库提交 issue 督促维护者更新
2. 临时解决方案：使用 jetifier 工具转换

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 报错："无法加载 native-bridge.js，Capacitor 将无法工作！"

此错误表明 Capacitor 的核心文件未正确复制到原生项目。

执行以下命令即可修复：
```bash
npx cap copy android
```

## 报错："请选择 Android SDK"

该错误通常需要同步 Gradle 配置，在以下情况后需执行此操作：
- 更新依赖后
- 修改项目设置后

手动同步路径：文件菜单 → "Sync Project with Gradle Files"

![同步 Gradle](../../../static/img/v3/docs/android/sync-gradle.png)

## 报错："APK 无法安装"

APK 无法安装到模拟器或设备的常见原因是存在相同包名的应用。运行应用时可能会看到类似错误：

![APK 安装失败](../../../static/img/v3/docs/android/apk-failed.png)

解决方案：
1. 卸载旧版本应用
2. 检查 `AndroidManifest.xml` 中的包名是否最新且不冲突
3. 执行清理和重建操作

## 项目重建指南

有时项目配置严重失调时，重建可能是最佳方案：

1. 备份自定义代码（如 `app/android/src` 中的 Java 文件、清单文件等）
2. 更新 Capacitor CLI：`npm install @capacitor/cli@2`
3. 删除 android 目录：`rm -rf android/`
4. 重新生成项目：`npx cap add android`
5. 恢复备份的自定义代码

## Proguard 使用须知

开启 Proguard（在 `build.gradle` 中设置 `minifyEnabled = true`）可能导致以下问题：
- 插件依赖的反射类被移除
- 原生代码功能异常

标准解决方案：
1. 在 `proguard-rules.pro` 中添加 [Capacitor 核心规则](https://github.com/ionic-team/capacitor/blob/2.x/android/capacitor/proguard-rules.pro)
2. 为特定插件添加保留规则（示例）：
```
-keep class com.mythirdpartyplugin.** { *; }
```
3. 如需豁免所有插件：
```
-keep public class * extends com.getcapacitor.Plugin
```