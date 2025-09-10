---
title: 环境专属配置
description: 创建针对不同环境的配置方案
contributors:
  - eric-horodyski
slug: /guides/environment-specific-configurations
---

# 创建多环境配置方案

**支持平台:** iOS, Android

在软件开发周期中，团队通常需要为不同环境（如开发、测试、生产）配置差异化参数，包括应用包名、深度链接方案、图标和启动屏等。

Capacitor 配置文件用于管理工具链和插件的高级配置。结合 iOS 的 Schemes 和 Android 的 Product Flavors 机制，开发者可以通过 Capacitor CLI 为不同环境构建应用。

本指南将演示如何建立 QA 测试环境配置（与默认环境配置并存），并通过修改应用名称和包名来展示环境差异。

## 准备 Capacitor 项目

确保项目已添加 iOS 和 Android 平台。如已有现成项目可跳过本节。

可选择两种方式初始化：
- [为现有网页应用添加 Capacitor](/main/getting-started/installation.md)
- [使用 Ionic 框架新建 Capacitor 应用](/main/getting-started/with-ionic.md)

注意：本指南使用 TypeScript 配置文件 `capacitor.config.ts` 实现动态配置导出。

添加原生平台前，必须先执行构建：

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

### 创建 Xcode 新 Target

使用 `npx cap open ios` 打开 Xcode 项目：

1. 在项目导航面板中右键点击 "App" Target，选择 **Duplicate** 复制
2. 将新 Target 重命名为 "App QA"

此操作会同时创建 "App copy" Scheme 和 `App copy-Info.plist` 文件。

更多 iOS Target 知识可参考[苹果官方文档](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/WorkingwithTargets.html)。

### 重命名 Scheme 和 Plist 文件

1. 在 Scheme 菜单中选择 **Manage Schemes...**
2. 将 "App copy" Scheme 重命名为 "App QA"
3. 将 "App copy-Info.plist" 文件重命名为 "App QA-Info.plist"
4. 在 "App QA" Target 的 Build Settings 中，将 **Info.plist File** 路径更新为 "App QA-Info.plist"

现在项目包含两个可运行方案："App" 和 "App QA"。后续将通过 Capacitor 配置文件指定构建方案。

Scheme 相关细节参考[苹果开发者文档](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/ManagingSchemes.html)。

### 设置环境专属参数

在 "App QA" Target 的 General 设置中：
- 修改 **Display Name**（应用显示名称）
- 修改 **Bundle Identifier**（包标识符）

确保这些值与默认 "App" Target 不同，这些配置会存储在 `App QA-Info.plist` 中。

### 更新 Podfile 并同步

退出 Xcode，编辑 `/ios/App/Podfile` 文件，为 QA 环境添加对应配置块：

```ruby
...snip...
target 'App' do
  capacitor_pods
  # 在此添加你的Pods
end

target 'App QA' do
  capacitor_pods
  # 在此添加你的Pods
end
```

执行 `npx cap sync` 同步插件到 QA Target。

### 配置 Capacitor iOS 参数

在 `capacitor.config.ts` 中添加：

```typescript
ios: {
  scheme: 'App QA',
}
```

`scheme` 属性指定了 `run` 命令使用的方案。测试效果：运行 `npx cap run ios` 可见应用名称已变化。

## 配置 Android 多渠道构建

### 修改 Gradle 配置

编辑 `/android/app/build.gradle` 文件，在 `android` 块内添加：

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

关键参数说明：
1. Android 没有默认渠道，此处将基础环境命名为 "dev"
2. `applicationIdSuffix` 会在包名后追加 ".qa"
3. `manifestPlaceholders` 定义的变量可在清单文件中使用

> **注意：** 可自由调整包名和应用名称值

更多 Android 多渠道知识参考[官方文档](https://developer.android.com/studio/build/build-variants)。

### 更新 Android 清单文件

将 `AndroidManifest.xml` 中 `application` 和 `activity` 节点的 `android:label` 值改为 `${displayName}`：

```xml
<application
  ...snip...
  android:label="${displayName}">

  <activity
    ...snip...
    android:label="${displayName}">
```

### 配置 Capacitor Android 参数

在 `capacitor.config.ts` 中添加：

```typescript
android: {
   flavor: "qa",
 },
```

测试效果：运行 `npx cap run android` 可见应用名称变化。

## 动态环境构建方案

### 实现动态配置导出

修改 `capacitor.config.ts` 实现根据环境变量导出不同配置：

```typescript
import { CapacitorConfig } from '@capacitor/cli';

let config: CapacitorConfig;

const baseConfig: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'My App',
  webDir: 'build',
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

### 运行不同环境构建

构建 QA 环境应用：

```bash
NODE_ENV=qa npx cap copy
NODE_ENV=qa npx cap run ios 	#NODE_ENV=qa npx cap run android
```

构建默认环境应用：

```bash
npx cap copy
npx cap run ios 	#npx cap run android
```

测试效果：运行不同命令将生成显示名称不同的应用版本。

## 扩展能力

本方案可自由扩展：
- 支持任意数量的 iOS Scheme 或 Android Product Flavor
- 各环境可深度定制原生配置
- Capacitor 插件也支持环境差异化配置
- 灵活满足各类定制化需求