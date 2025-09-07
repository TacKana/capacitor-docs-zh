---
title: Android问题排查指南
sidebar_label: 问题排查
description: Android常见问题解决方案
contributors:
  - mlynch
  - jcesarmobile
slug: /android/troubleshooting
---

# Android常见问题排查

要打造一个完美无缺的原生管理工具几乎是不可能的，在Android开发流程中你迟早会遇到各种问题。

本指南旨在记录常见的Android问题及其解决方案。

## Android调试工具箱

每位Android开发者都需要掌握以下基本调试技巧，建议将其纳入日常工作流程：

### 善用谷歌搜索

当遇到Android、Gradle或模拟器相关问题时，第一步应该是将错误信息复制到谷歌搜索栏中查找。

由于Capacitor使用标准的Android开发工具链，你遇到的问题很可能已有大量开发者遇到过，网上可能已有现成的解决方案。

解决方案可能很简单，比如更新依赖项、执行Gradle同步或清除缓存。

### Gradle同步

如果你通过npm安装了新插件，但在Android构建中无法使用或看到该插件，请尝试点击Android Studio右上角的"Sync Project with Gradle Files"按钮（图标是大象形状）。这将重新同步原生Android代码以包含新插件。

更多信息可参考[Github上的这个issue](https://github.com/ionic-team/capacitor/issues/4012)。

该操作还能解决许多看似随机的问题，因此遇到Android构建问题时，"Sync Project with Gradle Files"总是个不错的尝试。

### 清理与重建项目

清理和重建能解决多种构建问题：

![Android清理与重建](/img/v6/docs/android/clean-rebuild.png)

### 清除缓存并重启

当你确认已修复问题但Android Studio或Gradle仍报错时，通常的解决方案是让Android Studio清除缓存并重启程序。

可通过文件菜单轻松完成：

![Android清除缓存](/img/v6/docs/android/invalidate-caches.png)

## 错误："package android.support.*不存在"

此错误通常由某些Cordova或Capacitor插件使用了旧的android支持库而非AndroidX引起。建议向插件仓库提交issue，让维护者更新为AndroidX依赖。

临时解决方案是使用jetifier工具转换：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误："请选择Android SDK"

此错误通常因Gradle需要同步所致，在更新依赖项或修改项目设置后需要定期执行。

手动同步方法：点击菜单栏File -> Sync Project with Gradle Files：

![Gradle同步](/img/v6/docs/android/sync-gradle.png)

## 错误："无法安装APK"

APK无法安装到模拟器或设备通常是因为存在相同包名的应用。尝试运行应用时可能出现如下错误：

![APK安装失败](/img/v6/docs/android/apk-failed.png)

解决方案是移除所有旧版应用，并确保`AndroidManifest.xml`中的包名是最新的且不与其他开发中的应用冲突。

最后，建议执行一次清理和重建操作。

## 错误："找不到Java运行时环境"

使用`run`命令时若未设置`JAVA_HOME`环境变量可能导致此错误。

解决方法：在Android Studio的Preferences > Build, Execution, Deployment > Build Tools > Gradle > Gradle JDK中找到路径，设为环境变量。

![Android Studio中的JDK路径](/img/v6/docs/android/jdk-path.png)

在Mac上，可更新`.zshrc`或`.bashrc`文件：

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

Windows用户可在环境变量设置中添加系统变量`JAVA_HOME`。

## 重建项目

Capacitor允许你自主管理Android项目。但就像任何IDE项目一样，有时问题严重到只能重建项目。

重建步骤：
1. 备份自定义代码（如`app/android/src`中的Java文件、清单文件或资源文件）
2. 确保使用最新CLI：`npm install @capacitor/cli@latest`
3. 删除android目录：`rm -rf android/`
4. 重建Android应用：`npx cap add android`
5. 将备份文件复制回项目

## "插件未实现"错误

在Android上，这可能是因为Capacitor找不到插件或无法向WebView注入代码。

首先确认插件已安装并出现在`package.json`中。

然后执行`npx cap sync android`。

最后使用Android Studio右上角的"Sync Project with Gradle Files"按钮（大象图标）重新同步。

若从Capacitor 1或2迁移而来，请确保已启用[自动插件加载](https://capacitorjs.com/docs/updating/3-0#switch-to-automatic-android-plugin-loading)。

若仍报错，请确认未使用Service Worker（这会阻止代码注入）。如需使用，可参考[此解决方案](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390)。

## 使用Proguard

ProGuard是用于代码压缩和混淆的工具，通过在`build.gradle`中设置`minifyEnabled`为`true`来启用。但可能影响某些依赖反射的插件功能。

Capacitor v3.2.3+已内置核心插件相关的ProGuard规则。旧版本需手动将[这些规则](https://github.com/ionic-team/capacitor/blob/6.x/android/capacitor/proguard-rules.pro)添加到`proguard-rules.pro`文件中。

若仍有问题，可为特定插件添加规则，例如：

```
-keep class com.mythirdpartyplugin.** { *; }
```

若不确定具体插件，可使用以下规则豁免所有插件类：

```
-keep public class * extends com.getcapacitor.Plugin
```