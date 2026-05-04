---
title: 环境特定配置
description: 创建环境特定的配置
contributors:
  - eric-horodyski
slug: /guides/environment-specific-configurations
---

# 创建环境特定配置

**平台:** iOS, Android

许多软件开发团队在软件开发生命周期中会使用不同的环境。不同环境之间的配置可能会有所不同，例如包标识符、深度链接方案、图标和启动画面等。

Capacitor 配置文件处理 Capacitor 工具和插件配置的高层选项。iOS 方案和 Android 产品变体允许开发者为不同环境提供不同的应用值。通过结合两者，开发者可以使用 Capacitor CLI 为不同环境构建应用。

本指南将引导你设置一个 QA 环境配置，与开箱即用的默认环境配置并存。为了展示每个环境之间的差异，应用名称和包标识符将在两个环境中保持不同。

## 准备一个 Capacitor 应用

你需要一个已添加 iOS 和 Android 平台的 Capacitor 应用。如果你已经有一个同时包含这两个平台的现有 Capacitor 应用，请跳过此部分。

根据你的偏好，你可以选择[将 Capacitor 添加到现有的 Web 应用程序](/main/getting-started/installation.md)或[使用 Ionic Framework 创建一个新的 Capacitor 应用程序](/main/getting-started/with-ionic.md)。

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

## 设置新的 iOS 方案

### 创建新的 Xcode 目标

首先在 Xcode 中打开原生 iOS 项目：`npx cap open ios`。

1. 在项目导航面板中转到项目的设置。在 _Targets_ 部分，右键单击 “App” 目标，然后选择 **Duplicate** 来复制现有目标。
2. 单击新的 “App copy” 目标并按 `Enter` 键重命名。将目标名称设置为 “App QA”。

此过程创建了一个额外的 “App copy” 方案，并添加了一个名为 `App copy-Info.plist` 的新文件。

你可以在[此链接](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/WorkingwithTargets.html)上找到有关 iOS 目标的更多信息。

### 重命名新方案和 Plist 文件

1. 从 Scheme 菜单中选择 **Manage Schemes...**。
2. 找到 “App copy” 方案并按 `Enter` 键重命名。将名称设置为 “App QA” 并关闭对话框。
3. 在项目导航面板中找到 “App copy-Info” 文件并按 `Enter` 键重命名。将文件名设置为 “App QA-Info.plist”。
4. 返回项目设置。确保选中 “App QA” 目标，打开 _Build Settings_ 部分。向下滚动到 Packaging 并将 **Info.plist File** 条目更改为 “App QA-Info.plist”。

现在 iOS 项目有两个可运行的方案：“App” 和 “App QA”。Capacitor 配置文件允许你在 `run` 命令期间指定要构建的方案。

你可以在[此链接](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/ManagingSchemes.html)上找到有关 iOS 方案的更多信息。

### 设置环境特定值

返回项目设置的 _General_ 部分。确保你选中了 “App QA” 目标，并更改 **Display Name** 和 **Bundle Identifier**。

确保这些值与默认 “App” 目标的值不同。目标特定的值存储在与目标关联的 `Info.plist` 文件中。按照本指南，该文件是 `App QA-Info.plist`。

### 更新 Podfile 并同步应用

退出 Xcode；之后你可以使用你喜欢的 IDE。

打开 `/ios/App/Podfile` 并复制 “App” 目标的代码块，将重复条目中的 “App” 替换为 “App QA”，如下所示：

```ruby
...snip...
target 'App' do
  capacitor_pods
  # 在此添加你的 Pods
end

target 'App QA' do
  capacitor_pods
  # 在此添加你的 Pods
end
```

运行 `npx cap sync` 以将插件与 “App QA” 目标同步。

### 添加 iOS 特定的 Capacitor 配置

创建了 QA 环境的目标和方案后，需要更新 Capacitor 配置以使用它们。

将以下属性添加到 `capacitor.config.ts` 中的配置对象：

```typescript
ios: {
  scheme: 'App QA',
}
```

`scheme` 属性告诉 Capacitor 在 `run` 命令中使用哪个 iOS 方案。测试一下：运行 `npx cap run ios`，你会看到应用名称不同了。

## 设置 Android 产品变体

### 修改应用的 Gradle 文件

Android 项目包含多个 `build.gradle` 文件；要修改以设置产品变体的文件位于 `/android/app` 文件夹中。

打开 `/android/app/build.gradle` 并在 `android` 块内添加以下代码：

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

1. Android 不提供 “默认” 变体。在本指南中，非 QA 环境称为 “dev”。
2. `applicationIdSuffix` 将在包标识符的末尾附加 `.qa`。
3. `manifestPlaceholders` 是在 `AndroidManifest.xml` 中可用的值。

> **注意：** 你可以随意修改包标识符和显示名称的值。

你可以在[此链接](https://developer.android.com/studio/build/build-variants)上找到有关 Android 产品变体的更多信息。

### 更新 Android 清单

在上一节中，你创建了一个占位符 `displayName`。打开 `AndroidManifest.xml`，将 `application` 和 `activity` 节点内的 `android:label` 值更改为 `${displayName}`。

```xml
<application
  ...snip...
  android:label="${displayName}">

  <activity
    ...snip...
    android:label="${displayName}">
```

### 添加 Android 特定的 Capacitor 配置

与 iOS 类似，你必须更新 Capacitor 配置以使用 QA 产品变体。

将以下属性添加到 `capacitor.config.ts` 中的配置对象：

```typescript
android: {
   flavor: "qa",
 },
```

测试一下：运行 `npx cap run android`，你会看到应用名称不同了。

## 为不同环境动态构建

### 导出环境特定的 Capacitor 配置

所有准备工作已经就绪，现在可以编写 `capacitor.config.ts` 文件，使其能够根据特定值导出不同的配置对象。

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

当 `NODE_ENV` 等于 `qa` 时，Capacitor 将使用指向 "App QA" 方案（scheme）和 "qa" 产品风味（product flavor）的配置。否则，Capacitor 会使用指向 "App" 方案和 "dev" 产品风味的配置。

### 为不同环境运行应用

你可以通过在 `npx cap copy` 和 `npx cap run` 命令前加上 `NODE_ENV=qa` 来使用 QA 环境特定配置运行构建。

```bash
NODE_ENV=qa npx cap copy
NODE_ENV=qa npx cap run ios 	#NODE_ENV=qa npx cap run android
```

要使用“默认”环境特定配置运行构建，请按常规方式使用 Capacitor 命令。

```bash
npx cap copy
npx cap run ios 	#npx cap run android
```

现在就去试试吧！如果你正确地遵循了本指南，你将能够为两个环境运行构建，并看到应用名称会根据所使用的环境特定配置而有所不同。

## 更多环境和配置选项

请将本指南提供的信息作为基础进行扩展。Capacitor CLI 对可以使用的方案或产品风味数量没有限制，你可以根据 iOS 和 Android 允许的深度来配置每一个。你还可以为 Capacitor 插件提供不同的环境特定配置值！可能性是无限的。