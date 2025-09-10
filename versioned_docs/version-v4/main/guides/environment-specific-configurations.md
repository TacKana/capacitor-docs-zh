---
title: 环境特定配置
description: 创建针对不同环境的配置方案
contributors:
  - eric-horodyski
slug: /guides/environment-specific-configurations
---

# 创建环境特定配置方案

**支持平台:** iOS, Android

在软件开发周期中，许多团队会使用不同的环境配置。不同环境可能需要不同的应用标识符（bundle ID）、深度链接方案（deep-link schemes）或图标与启动屏等资源。

Capacitor 配置文件可以管理工具链和插件的高级配置选项。通过 iOS 的 schemes 和 Android 的 product flavors 机制，开发者能为不同环境提供差异化的应用配置。结合 Capacitor CLI，我们可以轻松构建不同环境的应用版本。

本指南将演示如何为默认环境之外，额外建立 QA 环境的配置方案。为突出环境差异，我们将让两个环境使用不同的应用名称和包标识符。

## 准备 Capacitor 应用

需要确保项目已添加 iOS 和 Android 平台支持。若已有完整项目可跳过本节。

您可以选择两种方式初始化：
- [为现有网页应用添加 Capacitor 支持](/main/getting-started/installation.md)
- [用 Ionic 框架创建新 Capacitor 应用](/main/getting-started/with-ionic.md)

注意项目必须使用 TypeScript 配置文件（本指南使用 `capacitor.config.ts` 动态导出不同配置）。

添加原生平台前，必须先执行至少一次构建：

```bash
npm run build
```

然后添加平台支持：

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

## 配置 iOS 多环境方案

### 创建 Xcode 新 target

使用 Xcode 打开项目：`npx cap open ios`

1. 在项目导航面板中，右键点击 "App" target 选择 **Duplicate** 复制
2. 将新生成的 "App copy" target 重命名为 "App QA"

此操作会同时创建 "App copy" scheme 和 `App copy-Info.plist` 文件。

更多 iOS target 知识可参考[苹果官方文档](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/WorkingwithTargets.html)。

### 重命名 scheme 和 Plist 文件

1. 点击顶部 Scheme 菜单选择 **Manage Schemes...**
2. 将 "App copy" scheme 重命名为 "App QA"
3. 将 `App copy-Info.plist` 文件重命名为 `App QA-Info.plist`
4. 在项目设置的 Build Settings 中，确保选中 "App QA" target，将 **Info.plist File** 路径更新为 "App QA-Info.plist"

现在项目包含两个可运行方案："App" 和 "App QA"。后续将通过 Capacitor 配置文件指定构建方案。

iOS schemes 的更多信息参见[苹果文档](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/ManagingSchemes.html)。

### 设置环境特定参数

在项目设置的 General 标签页中（确保选中 "App QA" target）：
- 修改 **Display Name**（应用显示名称）
- 修改 **Bundle Identifier**（包标识符）

这些值应与默认 "App" target 有所区别，配置会保存在对应的 `App QA-Info.plist` 文件中。

### 更新 Podfile 并同步

退出 Xcode，打开 `/ios/App/Podfile` 文件，复制 "App" target 的配置块并修改为：

```ruby
...snip...
target 'App' do
  capacitor_pods
  # 在此添加您的依赖
end

target 'App QA' do
  capacitor_pods
  # 在此添加您的依赖
end
```

执行 `npx cap sync` 同步插件到新 target。

### 添加 iOS 专属配置

在 `capacitor.config.ts` 中添加：

```typescript
ios: {
  scheme: 'App QA',
}
```

`scheme` 属性指定了 `run` 命令使用的 iOS 方案。现在执行 `npx cap run ios` 即可看到应用名称变化。

## 配置 Android 产品风味

### 修改 Gradle 配置

打开 `/android/app/build.gradle` 文件，在 `android` 块内添加：

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
1. Android 没有默认风味，本指南将基础环境命名为 "dev"
2. `applicationIdSuffix` 会在包名后追加 ".qa"
3. `manifestPlaceholders` 中的值可在清单文件中使用

> **注意：** 您可以根据需要自由修改包名和显示名称

更多产品风味知识参考[Android官方文档](https://developer.android.com/studio/build/build-variants)。

### 更新 Android 清单文件

将 `AndroidManifest.xml` 中 `application` 和 `activity` 节点的 `android:label` 改为：

```xml
<application
  ...snip...
  android:label="${displayName}">

  <activity
    ...snip...
    android:label="${displayName}">
```

### 添加 Android 专属配置

在 `capacitor.config.ts` 中添加：

```typescript
android: {
   flavor: "qa",
 },
```

执行 `npx cap run android` 即可看到应用名称变化。

## 动态构建不同环境

### 导出环境敏感配置

修改 `capacitor.config.ts` 实现动态配置导出：

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

当 `NODE_ENV=qa` 时使用 QA 环境配置，否则使用默认配置。

### 运行环境特定构建

使用以下命令构建 QA 环境：

```bash
NODE_ENV=qa npx cap copy
NODE_ENV=qa npx cap run ios 	#NODE_ENV=qa npx cap run android
```

常规构建则直接使用：

```bash
npx cap copy
npx cap run ios 	#npx cap run android
```

测试运行后，您将看到不同环境呈现不同的应用名称。

## 扩展更多环境配置

本指南提供的基础方案可自由扩展。Capacitor CLI 对 schemes 和 product flavors 数量没有限制，您可以根据 iOS/Android 的规范深度定制各环境配置，甚至为不同环境配置不同的插件参数。发挥您的想象力，构建更强大的多环境工作流！