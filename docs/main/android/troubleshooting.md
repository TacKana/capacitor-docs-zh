---
title: Android问题排查指南
sidebar_label: 问题排查
description: Android常见问题解决方案
contributors:
  - mlynch
  - jcesarmobile
slug: /android/troubleshooting
---

# Android问题排查指南

开发一个完美无缺的原生管理工具几乎是不可能的，在使用Android工作流时难免会遇到各种问题。

本文档旨在记录Android常见问题及其解决方案。

## Android开发者工具箱

每位Android开发者都应掌握以下基础调试技巧：

### 善用搜索引擎

遇到任何Android、Gradle或模拟器相关问题时，第一步请将错误信息复制到Google搜索。由于Capacitor使用标准Android开发工具链，大多数问题都有现成解决方案，可能只需更新依赖、同步Gradle或清除缓存即可解决。

### Gradle同步

当通过npm安装新插件后无法在Android构建中使用时，请点击Android Studio右上角的"Sync Project with Gradle Files"按钮（图标为大象造型）。这将重新同步原生代码以包含新插件，更多细节可参考[GitHub上的这个issue](https://github.com/ionic-team/capacitor/issues/4012)。

Gradle同步也是解决其他随机构建问题的首选方案。

### 清理与重构

清理重建能解决多种构建问题：

![Android清理重建](../../../static/img/v6/docs/android/clean-rebuild.png)

### 清除缓存重启

当确定问题已修复但Android Studio或Gradle仍未生效时，通常需要清除IDE缓存：

![清除Android缓存](../../../static/img/v6/docs/android/invalidate-caches.png)

## "package android.support.*不存在"错误

该错误通常由插件使用旧版Android支持库而非AndroidX引起。建议向插件仓库提交issue，同时可临时使用jetifier转换：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## "请选择Android SDK"错误

此错误通常需要手动同步Gradle，操作路径：File -> Sync Project with Gradle Files：

![同步Gradle](../../../static/img/v6/docs/android/sync-gradle.png)

## "APK无法安装"错误

安装失败通常是因为设备已存在相同包名的应用。解决方案：
1. 卸载旧版应用
2. 检查`AndroidManifest.xml`中的包名唯一性
3. 执行清理重建

## "找不到Java运行时"错误

执行`run`命令时若未设置`JAVA_HOME`环境变量会出现此错误。设置路径参考：Android Studio > Preferences > Build, Execution, Deployment > Gradle > Gradle JDK。

Mac用户可在`.zshrc`中添加：
```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

Windows用户需在系统环境变量中设置。

## 项目重构指南

当Android项目严重不同步时，可按以下步骤重建：
1. 备份自定义代码（如`app/android/src`下的Java文件）
2. 更新CLI：`npm install @capacitor/cli@latest`
3. 删除android目录：`rm -rf android/`
4. 重建项目：`npx cap add android`
5. 还原备份代码

## "插件未实现"错误解决方案

可能原因及解决步骤：
1. 确认插件已安装且存在于`package.json`
2. 执行`npx cap sync android`
3. 点击Android Studio的Gradle同步按钮
4. 从Capacitor 1/2迁移需确保启用了[自动插件加载](https://capacitorjs.com/docs/updating/3-0#switch-to-automatic-android-plugin-loading)
5. 禁用Service Worker或使用[此方案](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390)解决注入问题

## ProGuard使用指南

启用代码混淆（`minifyEnabled true`）可能导致插件功能异常。自Capacitor v3.2.3起已内置核心规则，旧版本需手动添加[规则文件](https://github.com/ionic-team/capacitor/blob/main/android/capacitor/proguard-rules.pro)。

第三方插件可添加例外规则：
```
-keep class com.mythirdpartyplugin.** { *; }
```

如需豁免所有Capacitor插件：
```
-keep public class * extends com.getcapacitor.Plugin
```