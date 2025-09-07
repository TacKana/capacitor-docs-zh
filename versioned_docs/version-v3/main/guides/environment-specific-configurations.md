---
title: 环境特定配置
description: 创建环境特定的配置方案
contributors:
  - eric-horodyski
slug: /guides/environment-specific-configurations
---

# 创建环境特定配置方案

**支持平台:** iOS, Android

在软件开发生命周期中，许多团队会使用不同的环境配置。不同环境可能需要不同的应用设置，例如包标识符（Bundle ID）、深度链接方案（deep-link scheme）或图标与启动屏等。

Capacitor 配置文件主要用于处理工具链和插件配置的高级选项。通过 iOS 的 schemes 和 Android 的 product flavors 机制，开发者可以为不同环境提供差异化的应用配置。结合这两者，开发者可以使用 Capacitor CLI 为不同环境构建应用。

本指南将演示如何基于默认配置，额外设置一套 QA 环境的配置方案。为展示环境差异，我们将使两个环境的应用名称和包标识符有所不同。

## 准备 Capacitor 应用

首先需要一个已添加 iOS 和 Android 平台的 Capacitor 应用。如已有现成项目，可跳过本节。

您可以选择：
- [为现有网页应用添加 Capacitor](/main/getting-started/installation.md)
- [使用 Ionic 框架新建 Capacitor 应用](/main/getting-started/with-ionic.md)

注意：配置需使用 TypeScript 文件。本指南将使用 `capacitor.config.ts` 来动态导出不同配置。

添加原生平台前，必须先构建一次网页应用：

```bash
npm run build
```

构建完成后添加平台：

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

## 配置 iOS 多环境方案

### 创建新 Xcode 目标

打开 iOS 工程：`npx cap open ios`

1. 在项目导航面板中进入项目设置
2. 在 Targets 区域右键点击 "App" 目标，选择 **Duplicate** 复制目标
3. 将新目标重命名为 "App QA"

此操作会同时创建 "App copy" scheme 和 `App copy-Info.plist` 文件。

关于 iOS 目标的更多信息，可参考[苹果官方文档](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/WorkingwithTargets.html)。

### 重命名 scheme 和 Plist 文件

1. 从 Scheme 菜单选择 **Manage Schemes...**
2. 将 "App copy" scheme 重命名为 "App QA"
3. 将 "App copy-Info.plist" 文件重命名为 "App QA-Info.plist" 
4. 在项目设置的 Build Settings 中，确保选中 "App QA" 目标，将 **Info.plist File** 指向 "App QA-Info.plist"

现在工程包含两个可运行方案："App" 和 "App QA"。后续可通过 Capacitor 配置文件指定构建方案。

关于 iOS schemes 的更多信息，可参考[苹果官方文档](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/ManagingSchemes.html)。

### 设置环境特定值

在项目设置的 General 标签页中：
1. 确保选中 "App QA" 目标
2. 修改 Display Name 和 Bundle Identifier
3. 确保这些值与默认 "App" 目标不同

这些值会保存在对应的 `Info.plist` 文件（本案例中为 `App QA-Info.plist`）中。

### 更新 Podfile 并同步

退出 Xcode，打开 `/ios/App/Podfile` 文件，复制 "App" 目标的代码块并修改为：

```ruby
...snip...
target 'App' do
  capacitor_pods
  # 在此添加您的 Pods
end

target 'App QA' do
  capacitor_pods
  # 在此添加您的 Pods
end
```

运行 `npx cap sync` 同步插件到 "App QA" 目标。

### 添加 iOS 特定配置

在 `capacitor.config.ts` 中添加：

```typescript
ios: {
  scheme: 'App QA',
}
```

`scheme` 属性指定了 `run` 命令使用的方案。测试运行 `npx cap run ios`，可见应用名称已变更。

## 配置 Android 多环境方案

### 修改 Gradle 文件

打开 `/android/app/build.gradle`，在 `android` 块内添加：

```groovy
flavorDimensions "environment"
productFlavors {
  dev {
      dimension "environment"
      manifestPlaceholders = [displayName:"My App"]
  }
  qa {
      dimension "environment"
      applicationIdSuffix ".qa"
      manifestPlaceholders = [displayName:"My App - QA"]
  }
}
```

配置说明：
1. Android 没有"默认"flavor，非 QA 环境命名为 "dev"
2. `applicationIdSuffix` 会在包 ID 后追加 `.qa`
3. `manifestPlaceholders` 可在清单文件中使用

> **注意：** 可自由调整包 ID 和显示名称

关于 Android product flavors 的更多信息，可参考[官方文档](https://developer.android.com/studio/build/build-variants)。

### 更新清单文件

将 `AndroidManifest.xml` 中 `application` 和 `activity` 节点的 `android:label` 改为：

```xml
<application
  ...snip...
  android:label="${displayName}">

  <activity
    ...snip...
    android:label="${displayName}">
```

### 添加 Android 特定配置

在 `capacitor.config.ts` 中添加：

```typescript
android: {
   flavor: "qa",
 },
```

测试运行 `npx cap run android`，可见应用名称变化。

## 动态构建不同环境

### 导出环境特定配置

修改 `capacitor.config.ts`：

```typescript
import { CapacitorConfig } from '@capacitor/cli';

let config: CapacitorConfig;

const baseConfig: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'My App',
  webDir: 'build',
  bundledWebRuntime: false,
};

switch (process.env.NODE_ENV) {
  case 'qa':
    config = {
      ...baseConfig,
      ios: {
        scheme: 'App QA',
      },
      android: {
        flavor: 'qa',
      },
    };
    break;
  default:
    config = {
      ...baseConfig,
      ios: {
        scheme: 'App',
      },
      android: {
        flavor: 'dev',
      },
    };
    break;
}

export default config;
```

当 `NODE_ENV=qa` 时，会使用 QA 环境的特定配置。

### 运行不同环境构建

QA 环境构建命令：

```bash
NODE_ENV=qa npx cap copy
NODE_ENV=qa npx cap run ios 	#NODE_ENV=qa npx cap run android
```

默认环境构建命令：

```bash
npx cap copy
npx cap run ios 	#npx cap run android
```

测试运行后，可见不同环境的应用名称差异。

## 扩展配置方案

本指南提供的基础方案可进一步扩展。Capacitor CLI 对 schemes 和 product flavors 数量没有限制，您可以根据 iOS 和 Android 的机制进行深度配置，甚至为不同环境配置不同的插件参数。可能性是无限的。