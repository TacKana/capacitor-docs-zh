---
title: 环境特定配置
description: 创建环境特定配置
contributors:
  - eric-horodyski
slug: /guides/environment-specific-configurations
---

# 创建环境特定配置

**支持平台：** iOS、Android

许多软件开发团队在软件开发生命周期中会使用不同的环境。不同环境之间的配置可能有所不同，例如 Bundle ID、深度链接方案、图标和启动屏幕等。

Capacitor 配置文件处理 Capacitor 工具和插件配置的高级选项。iOS 方案（schemes）和 Android 产品变体（product flavors）允许开发者为不同环境提供不同的应用值。通过结合这两者，开发者可以使用 Capacitor CLI 为不同环境构建应用。

本指南将引导你设置一个 QA 环境配置，同时保留开箱即用的默认环境配置。为了演示每个环境之间的差异，两个环境的应用程序名称和 Bundle ID 将有所不同。

## 准备 Capacitor 应用

你需要一个已添加 iOS 和 Android 平台的 Capacitor 应用。如果你已有现成的包含这两个平台的 Capacitor 应用，请跳过本节。

根据你的偏好，你可以[将 Capacitor 添加到现有 Web 应用程序](/main/getting-started/installation.md)或[使用 Ionic Framework 创建新的 Capacitor 应用](/main/getting-started/with-ionic.md)。

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

1. 在项目导航器面板中进入项目设置。在_目标_部分，右键单击“App”目标并选择**复制**以复制现有目标。
2. 单击新的“App copy”目标并按 `Enter` 键重命名。将目标名称设置为“App QA”。

此过程创建了额外的“App copy”方案，并添加了一个名为 `App copy-Info.plist` 的新文件。

你可以在[此链接](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/WorkingwithTargets.html)找到关于 iOS 目标的更多信息。

### 重命名新方案和 Plist 文件

1. 从方案菜单中选择**管理方案...**。
2. 找到“App copy”方案并按 `Enter` 键重命名。将名称设置为“App QA”并关闭对话框。
3. 在项目导航器面板中找到“App copy-Info”文件并按 `Enter` 键重命名。将文件名设置为“App QA-Info.plist”。
4. 返回项目设置。确保选中“App QA”目标，打开_构建设置_部分。向下滚动到打包部分，将 **Info.plist 文件**条目更改为“App QA-Info.plist”。

iOS 项目现在有两个可运行方案：“App”和“App QA”。Capacitor 配置文件允许你在 `run` 命令期间指定要构建的方案。

你可以在[此链接](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/ManagingSchemes.html)找到关于 iOS 方案的更多信息。

### 设置环境特定值

返回项目设置的_常规_部分。确保选中“App QA”目标，并更改**显示名称**和**Bundle 标识符**。

确保这些值与默认“App”目标中存在的值不同。目标特定值存储在目标关联的 `Info.plist` 文件中。按照本指南，该文件是 `App QA-Info.plist`。

### 更新 Podfile 并同步应用

退出 Xcode；你可以在后续步骤中使用你喜欢的 IDE。

打开 `/ios/App/Podfile` 并复制“App”目标的代码块，将重复条目中的“App”替换为“App QA”，如下所示：

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

运行 `npx cap sync` 以同步“App QA”目标的插件。

### 添加 iOS 特定的 Capacitor 配置

创建了 QA 环境的目标和方案后，需要更新 Capacitor 配置以使用它们。

将以下属性添加到 `capacitor.config.ts` 中的配置对象：

```typescript
ios: {
  scheme: 'App QA',
}
```

`scheme` 属性告诉 Capacitor 在 `run` 命令中使用哪个 iOS 方案。测试一下：运行 `npx cap run ios`，你会看到应用程序名称不同了。

## 设置 Android 产品变体

### 修改应用的 Gradle 文件

Android 项目包含多个 `build.gradle` 文件；需要修改以设置产品变体的文件位于 `/android/app` 文件夹中。

打开 `/android/app/build.gradle` 并在 `android` 块内添加以下代码：

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

这段代码需要一些解释：

1. Android 不提供“默认”变体。在本指南中，非 QA 环境称为“dev”。
2. `applicationIdSuffix` 将在 Bundle ID 末尾追加 `.qa`。
3. `manifestPlaceholders` 是在 `AndroidManifest.xml` 中可用的值。

> **注意：** 你可以自由修改 Bundle ID 和显示名称值。

你可以在[此链接](https://developer.android.com/studio/build/build-variants)找到关于 Android 产品变体的更多信息。

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

测试一下：运行 `npx cap run android`，你会看到应用程序名称不同了。

## 为不同环境动态构建### 导出特定环境的 Capacitor 配置

所有准备工作都已就绪，现在可以编写 `capacitor.config.ts` 文件，使其根据特定值导出不同的配置对象。

打开 `capacitor.config.ts` 并修改代码如下：

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

当 `NODE_ENV` 等于 `qa` 时，Capacitor 将使用指向 "App QA" 方案（scheme）和 "qa" 产品风味（product flavor）的配置。否则，Capacitor 会使用指向 "App" 方案和 "dev" 产品风味的配置。

### 为不同环境运行应用

通过在 `npx cap copy` 和 `npx cap run` 命令前添加 `NODE_ENV=qa`，你可以使用 QA 环境特定的配置来运行构建。

```bash
NODE_ENV=qa npx cap copy
NODE_ENV=qa npx cap run ios 	#NODE_ENV=qa npx cap run android
```

要使用“默认”环境特定配置运行构建，请像平常一样使用 Capacitor 命令。

```bash
npx cap copy
npx cap run ios 	#npx cap run android
```

现在就去试试吧！如果你正确遵循了本指南，你将能够为两个环境运行构建，并看到应用名称会根据所使用的环境特定配置而有所不同。

## 更多环境与配置选项

你可以将本指南提供的信息作为基础进行扩展。Capacitor CLI 对可以使用的方案或产品风味数量没有限制，并且你可以按照 iOS 和 Android 允许的深度来配置每一项。你还可以为 Capacitor 插件提供不同的环境特定配置值！一切皆有可能。