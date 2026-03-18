---
title: Android 问题排查
sidebar_label: 问题排查
description: Android 问题排查指南
contributors:
  - mlynch
  - jcesarmobile
slug: /android/troubleshooting
---

# Android 问题排查

要创建一个100%完美的原生管理工具几乎是不可能的，你迟早会在Android工作流程的某个环节遇到各种问题。

本指南尝试记录常见的Android问题及其可能的解决方案。

## Android 工具箱

每位Android开发者都会学习一些调试Android问题的常用技巧，你应该将这些技巧纳入你的工作流程中：

### 谷歌搜索

当你遇到任何Android、Gradle或模拟器相关的问题时，第一步应该是将错误信息复制粘贴到谷歌搜索中。

Capacitor使用的是标准的Android工具链，所以如果你遇到了问题，很可能许多Android开发者也曾遇到过，并且网上已经有解决方案了。

解决方案可能很简单，比如更新依赖、运行Gradle同步，或者清除缓存。

### Gradle 同步

如果你从npm安装了一个新的插件，但在Android构建中无法使用或看到该插件，请尝试使用Android Studio右上角的"Sync Project with Gradle Files"按钮（图标看起来像一头大象）。这将重新同步你的原生Android代码以包含新插件代码，应该就能使用新插件了。更多信息请参阅 [Github上的这个issue](https://github.com/ionic-team/capacitor/issues/4012)。

这个方法也能帮助解决许多其他看似随机的问题，因此当遇到大多数Android构建问题时，运行"Sync Project with Gradle Files"总是一个很好的第一步。

### 清理/重建

清理和重建可以解决许多构建问题：

![Android Clean and Build](../../../static/img/v6/docs/android/clean-rebuild.png)

### 清除缓存/重启

如果你确信已经修复了问题，但Android Studio或Gradle仍然报错，通常的解决方案是让Android Studio清除缓存并重启程序。

这可以通过文件菜单轻松完成：

![Android Invalidate Caches](../../../static/img/v6/docs/android/invalidate-caches.png)

## 错误："package android.support.* does not exist"

这个错误发生在某些Cordova或Capacitor插件使用了旧的android support依赖，而不是使用新的AndroidX等效库时。
你应该在插件仓库中报告这个问题，以便维护者可以更新插件以使用AndroidX依赖。

作为临时解决方案，你也可以使用jetifier来修补插件：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误："Please select Android SDK"

这个错误通常是因为Gradle需要同步，当更新依赖和更改项目设置后，你需要定期执行这个操作。

要手动同步Gradle，从主菜单栏打开File -> Sync Project with Gradle Files：

![Sync Gradle](../../../static/img/v6/docs/android/sync-gradle.png)

## 错误："APK Can't be installed"

APK无法安装到模拟器或设备上，通常是因为已经存在一个具有相同包名的应用。当你尝试运行应用时可能会看到这样的错误：

![Android APK Failed](../../../static/img/v6/docs/android/apk-failed.png)

解决方案是删除任何旧版应用，并确保你的包名在`AndroidManifest.xml`中是最新的，并且不与你正在开发的其他应用冲突。

最后，为了保险起见，执行一次清理和重建。

## 错误："Unable to locate a Java Runtime"

使用`run`命令时，如果`JAVA_HOME`环境变量没有设置，可能会发生这个错误。

要解决这个问题，请将`JAVA_HOME`设置为环境变量或系统变量，使用的路径可以在Android Studio的Preferences > Build, Execution, Deployment, Build Tools > Gradle > Gradle JDK中找到。

![JDK Path in Android Studio](../../../static/img/v6/docs/android/jdk-path.png)

在Mac上，可以在`.zshrc`或`.bashrc`文件中更新，或者在环境中导出：

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

在Windows上，你可以在环境变量设置中将`JAVA_HOME`设置为系统变量。

## 重建你的项目

Capacitor允许你管理自己的Android项目。就像任何IDE支持的项目一样，有时候事情会变得如此不同步，以至于唯一的解决方案就是重建项目。

要这样做，请按照以下步骤：

1. 将你创建的任何源代码（例如`app/android/src`中的Java文件、清单文件或资源文件）复制到`app/android`之外的安全位置。
2. 接下来，确保你正在运行最新版本的Capacitor CLI：`npm install @capacitor/cli@latest`
3. 删除android目录：`rm -rf android/`
4. 从Capacitor重新创建Android应用：`npx cap add android`
5. 将保存的源文件复制回项目

## 插件未实现

在Android上，如果Capacitor找不到插件或无法将代码注入WebView，可能会发生这种情况。

首先，确保插件已安装并出现在`package.json`中。

然后，运行`npx cap sync android`。

最后，使用Android Studio右上角的"Sync Project with Gradle Files"按钮（图标看起来像一头大象）。这将重新同步你的原生Android代码以包含新插件代码，应该就能使用新插件了。

另外，如果你是从Capacitor 1或2迁移过来的，请确保你已经启用了[自动插件加载](https://capacitorjs.com/docs/updating/3-0#switch-to-automatic-android-plugin-loading)。

如果仍然收到"Plugin not implemented"错误，请确保你没有使用service workers，这会阻止Capacitor和插件代码的注入。或者，如果你想使用它们，可以使用[这个临时解决方案](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390)来使注入工作。

## 使用 Proguard

ProGuard是一个用于压缩、混淆和减小应用大小的工具。通过在`build.gradle`中将`minifyEnabled`选项设置为`true`来启用它。这个处理过程有时在使用插件或某些依赖其代码在运行时可读的自定义原生代码（如代码反射）时，在Capacitor中会导致问题。ProGuard会扫描代码以尝试优化和缩小应用大小，有时这个过程会删除对插件功能很重要的类或方法。

从Capacitor v3.2.3开始，Capacitor包含了覆盖Capacitor插件、权限和活动结果核心功能的ProGuard规则。如果你使用的是早于v3.2.3的Capacitor版本，请将[以下规则](https://github.com/ionic-team/capacitor/blob/main/android/capacitor/proguard-rules.pro)添加到Android项目的`proguard-rules.pro`文件中。这些规则应该能解决任何核心Capacitor功能和核心插件的问题。

如果添加这些规则后仍然遇到问题，尝试找出源插件或原生代码，并添加规则来覆盖特定的插件代码，例如：

```
-keep class com.mythirdpartyplugin.** { *; }
```

如果你确定是Capacitor插件导致了ProGuard问题，以下ProGuard规则将覆盖所有插件类代码，如果你不介意所有插件都免于ProGuard处理的话：

```
-keep public class * extends com.getcapacitor.Plugin
```