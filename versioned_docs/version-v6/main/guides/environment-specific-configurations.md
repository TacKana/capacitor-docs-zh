---
title: 环境特定配置
description: 创建环境特定的配置方案
contributors:
  - eric-horodyski
slug: /guides/environment-specific-configurations
---

# 创建环境特定的配置方案

**支持平台:** iOS, Android

在软件开发周期中，许多团队会使用不同的环境。不同环境下的配置可能存在差异，例如包名（bundle ID）、深度链接方案、应用图标和启动画面等。

Capacitor 配置文件负责处理工具链和插件配置的高层选项。通过 iOS 的 schemes 和 Android 的产品变体（product flavors），开发者可以为不同环境提供差异化的应用配置。结合 Capacitor CLI，开发者能够为不同环境构建应用。

本指南将带您配置一个 QA 测试环境，与默认环境配置共存。为展示环境差异，我们将使两个环境的应用名称和包名各不相同。

## 准备 Capacitor 应用

首先需要已添加 iOS 和 Android 平台的 Capacitor 应用。若已有现成项目，可跳过本节。

您可以选择：
- [为现有网页应用添加 Capacitor](/main/getting-started/installation.md)
- [使用 Ionic 框架新建 Capacitor 应用](/main/getting-started/with-ionic.md)

配置需使用 TypeScript，本指南将使用 `capacitor.config.ts` 动态导出不同配置。

添加原生平台前，必须先构建项目：

```bash
npm run build
```

构建完成后添加平台：

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

## 配置 iOS 环境方案

### 创建 Xcode 新目标

用 Xcode 打开项目：`npx cap open ios`

1. 在项目导航面板中进入项目设置
2. 右键点击"App"目标选择**复制**
3. 重命名新目标为"App QA"

此操作会创建"App copy"方案和 `App copy-Info.plist` 文件。

[详细了解 iOS 目标](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/WorkingwithTargets.html)

### 重命名方案和 Plist 文件

1. 在 Scheme 菜单中选择**管理方案...**
2. 将"App copy"重命名为"App QA"
3. 将 `App copy-Info.plist` 重命名为 `App QA-Info.plist`
4. 在"App QA"目标的构建设置中，更新 Info.plist 文件路径

现在项目包含两个可运行方案："App"和"App QA"。Capacitor 配置文件可指定构建方案。

[详细了解 iOS 方案](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/ManagingSchemes.html)

### 设置环境特定值

在"App QA"目标的通用设置中，修改**显示名称**和**包标识符**，确保与默认目标不同。这些值会保存在对应的 `Info.plist` 中。

### 更新 Podfile 并同步

编辑 `/ios/App/Podfile`，复制"App"目标配置块并修改为：

```ruby
target 'App QA' do
  capacitor_pods
  # 在此添加依赖
end
```

运行 `npx cap sync` 同步插件。

### 添加 iOS 专属配置

在 `capacitor.config.ts` 中添加：

```typescript
ios: {
  scheme: 'App QA',
}
```

测试运行：`npx cap run ios`，可见应用名称已变化。

## 配置 Android 产品变体

### 修改 Gradle 文件

编辑 `/android/app/build.gradle`，在 `android` 块中添加：

```groovy
flavorDimensions = ["environment"]
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

说明：
1. "dev"代表非 QA 环境
2. `applicationIdSuffix` 会在包名后追加 `.qa`
3. `manifestPlaceholders` 可在清单文件中使用

[详细了解产品变体](https://developer.android.com/studio/build/build-variants)

### 更新 Android 清单文件

将 `AndroidManifest.xml` 中的 `android:label` 值改为 `${displayName}`。

### 添加 Android 专属配置

在 `capacitor.config.ts` 中添加：

```typescript
android: {
   flavor: "qa",
 },
```

测试运行：`npx cap run android`，观察应用名称变化。

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

### 运行不同环境构建

构建 QA 环境：

```bash
NODE_ENV=qa npx cap copy
NODE_ENV=qa npx cap run ios 	#NODE_ENV=qa npx cap run android
```

构建默认环境：

```bash
npx cap copy
npx cap run ios 	#npx cap run android
```

测试运行后，可见不同环境的应用名称差异。

## 扩展方案

本指南提供的基础方案可无限扩展。Capacitor CLI 对 schemes 和 product flavors 数量没有限制，您可以根据 iOS 和 Android 的能力进行深度配置，甚至为不同环境的插件提供差异化配置，可能性无限广阔。