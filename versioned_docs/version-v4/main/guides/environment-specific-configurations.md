---
title: 环境特定配置
description: 创建环境特定配置
contributors:
  - eric-horodyski
slug: /guides/environment-specific-configurations
---

# 创建环境特定配置

**平台：** iOS、Android

许多软件开发团队在软件开发生命周期中使用不同的环境。不同环境之间的配置可能不同，例如 bundle ID、深度链接方案或图标和启动屏。

Capacitor 配置文件处理 Capacitor 工具和插件配置的高级选项。iOS schemes 和 Android product flavors 允许开发者为不同环境提供不同的应用值。通过结合使用两者，开发者可以使用 Capacitor CLI 为不同环境构建应用。

本指南将引导你创建 QA 环境配置，以及开箱即用的默认环境配置。为了演示每个环境之间的差异，应用名称和 bundle ID 将在两者之间有所不同。

## 准备 Capacitor 应用

你需要一个同时添加了 iOS 和 Android 平台的 Capacitor 应用。如果你有一个已添加了这两个平台的现有 Capacitor 应用，请跳过此部分。

根据你的偏好，你可以[将 Capacitor 添加到现有的 Web 应用](/main/getting-started/installation.md)或[使用 Ionic Framework 创建新的 Capacitor 应用](/main/getting-started/with-ionic.md)。

Capacitor 应用必须使用 TypeScript 进行配置。本指南使用 `capacitor.config.ts` 来动态导出不同的配置。

在向项目添加任何原生平台之前，你必须至少构建一次 Capacitor 应用。

```bash
npm run build
```

构建完成后，你可以添加平台。

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

## 设置新的 iOS scheme

### 创建新的 Xcode target

首先在 Xcode 中打开原生 iOS 项目：`npx cap open ios`。

1. 在项目导航面板中转到项目设置。在 _Targets_ 部分下，右键点击"App"target，选择 **Duplicate** 以复制现有 target。
2. 点击新的"App copy"target，按 `Enter` 键重命名。将 target 名称设置为"App QA"。

此过程创建了一个额外的"App copy"scheme，并添加了一个名为 `App copy-Info.plist` 的新文件。

你可以在[此链接](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/WorkingwithTargets.html)找到关于 iOS target 的更多信息。

### 重命名新的 scheme 和 Plist 文件

1. 从 Scheme 菜单中选择 **Manage Schemes...**。
2. 找到"App copy"scheme，按 `Enter` 键重命名。将名称设置为"App QA"并关闭对话框。
3. 在项目导航面板中找到"App copy-Info"文件，按 `Enter` 键重命名。将文件名设置为"App QA-Info.plist"。
4. 返回到项目设置。确保选择了"App QA"target，打开 _Build Settings_ 部分。滚动到 Packaging，将 **Info.plist File** 条目更改为"App QA-Info.plist"。

iOS 项目现在有两个可运行的 scheme："App"和"App QA"。Capacitor 的配置文件允许你在 `run` 命令期间指定要构建的 scheme。

你可以在[此链接](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/ManagingSchemes.html)找到关于 iOS schemes 的更多信息。

### 设置环境特定值

返回到项目设置的 _General_ 部分。确保你选择了"App QA"target，并更改 **Display Name** 和 **Bundle Identifier**。

确保这些值与默认的"App"target 的值不同。特定于 target 的值存储在与 target 关联的 `Info.plist` 文件中。按照本指南，该文件是 `App QA-Info.plist`。

### 更新 Podfile 并同步应用

退出 Xcode；你可以继续使用你偏好的 IDE。

打开 `/ios/App/Podfile`，复制"App"target 的代码块，将复制条目中的"App"替换为"App QA"，如下所示：

```ruby
...snip...
target 'App' do
  capacitor_pods
  # 在此处添加你的 Pods
end

target 'App QA' do
  capacitor_pods
  # 在此处添加你的 Pods
end
```

运行 `npx cap sync` 以将插件与"App QA"target 同步。

### 添加 iOS 特定的 Capacitor 配置

创建了 QA 环境的 target 和 scheme 后，需要更新 Capacitor 配置以使用它们。

在 `capacitor.config.ts` 的配置对象中添加以下属性：

```typescript
ios: {
  scheme: 'App QA',
}
```

`scheme` 属性告诉 Capacitor `run` 命令使用哪个 iOS scheme。测试一下；运行 `npx cap run ios`，你会看到应用名称不同了。

## 设置 Android product flavors

### 修改应用的 Gradle 文件

Android 项目包含多个 `build.gradle` 文件；要设置 product flavors，需要修改的文件位于 `/android/app` 文件夹中。

打开 `/android/app/build.gradle`，在 `android` 块中添加以下代码：

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

这段代码需要一些解释：

1. Android 不提供"默认"flavor。在本指南中，非 QA 环境称为"dev"。
2. `applicationIdSuffix` 将在 bundle ID 的末尾附加 `.qa`。
3. `manifestPlaceholders` 是在 `AndroidManifest.xml` 中可用的值。

> **注意：** 你可以根据自己的喜好自由修改 bundle ID 和显示名称的值。

你可以在[此链接](https://developer.android.com/studio/build/build-variants)找到关于 Android product flavors 的更多信息。

### 更新 Android manifest

在上一部分中，你创建了一个占位符 `displayName`。打开 `AndroidManifest.xml`，将 `application` 和 `activity` 节点中的 `android:label` 值更改为 `${displayName}`。

```xml
<application
  ...snip...
  android:label="${displayName}">

  <activity
    ...snip...
    android:label="${displayName}">
```

### 添加 Android 特定的 Capacitor 配置

与 iOS 一样，你必须更新 Capacitor 配置以使用 QA product flavor。

在 `capacitor.config.ts` 的配置对象中添加以下属性：

```typescript
android: {
   flavor: "qa",
 },
```

测试一下；运行 `npx cap run android`，你会看到应用名称不同了。

## 为不同环境动态构建

### 导出环境特定的 Capacitor 配置

所有部分都就位后，现在可以编写 `capacitor.config.ts`，使其根据特定值导出不同的配置对象。

打开 `capacitor.config.ts` 并按如下方式修改代码：

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

当 `NODE_ENV` 等于 `qa` 时，Capacitor 将使用指向"App QA"scheme 和"qa"product flavor 的配置。否则，Capacitor 使用指向"App"scheme 和"dev"product flavor 的配置。

### 为不同环境运行应用

你可以通过在 `npx cap copy` 和 `npx cap run` 命令前加上 `NODE_ENV=qa` 来使用 QA 环境特定配置运行构建。

```bash
NODE_ENV=qa npx cap copy
NODE_ENV=qa npx cap run ios
NODE_ENV=qa npx cap run android
```

要使用"默认"环境特定配置运行构建，请像往常一样使用 Capacitor 命令。

```bash
npx cap copy
npx cap run ios
npx cap run android
```

快来试试吧！如果你正确遵循了本指南，你将能够为两个环境运行构建，并看到应用名称根据所使用的环境特定配置而不同。

## 其他环境和配置选项

使用本指南提供的信息作为基础进行扩展。Capacitor CLI 对可以使用的 scheme 或 product flavors 数量没有限制，你可以根据 iOS 和 Android 允许的程度深入配置每一个。你还可以为 Capacitor 插件提供不同的环境特定配置值！无限可能。
