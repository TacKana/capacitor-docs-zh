---
title: 环境特定配置
description: 创建环境特定的配置
contributors:
  - eric-horodyski
slug: /guides/environment-specific-configurations
---

# 创建环境特定配置

**支持的平台:** iOS, Android

在软件开发生命周期中，许多开发团队会使用不同的环境。不同环境间的配置可能有所不同，例如软件包标识符、深度链接方案、或者图标和启动画面等。

Capacitor 配置文件用于处理 Capacitor 工具和插件配置的高级选项。iOS 方案和 Android 产品变体允许开发者为不同环境提供不同的应用值。通过结合这两者，开发者可以使用 Capacitor CLI 为不同环境构建应用。

本指南将引导您设置一个 QA 环境配置，与开箱即用的默认环境配置并存。为了展示两个环境间的差异，我们将使应用名称和软件包标识符在两者间有所不同。

## 准备一个 Capacitor 应用

您需要准备一个已添加了 iOS 和 Android 平台的 Capacitor 应用。如果您已经有一个添加了这两个平台且已存在的 Capacitor 应用，可以跳过此节。

根据您的偏好，您可以[为现有的 Web 应用添加 Capacitor](/main/getting-started/installation.md) 或者[使用 Ionic 框架创建一个新的 Capacitor 应用](/main/getting-started/with-ionic.md)。

Capacitor 应用必须使用 TypeScript 进行配置。本指南使用 `capacitor.config.ts` 来动态导出不同的配置。

在项目中添加任何原生平台之前，您必须至少构建一次 Capacitor 应用。

```bash
npm run build
```

构建完成后，您就可以添加平台了。

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

## 设置新的 iOS 方案

### 创建新的 Xcode 目标

首先在 Xcode 中打开原生 iOS 项目：`npx cap open ios`。

1. 在项目导航器面板中转到项目设置。在*目标*部分，右键单击 "App" 目标并选择**复制**来复制现有目标。
2. 单击新的 "App copy" 目标并按 `Enter` 键重命名。将目标名称设置为 "App QA"。

此过程创建了一个额外的 "App copy" 方案，并添加了一个名为 `App copy-Info.plist` 的新文件。

您可以在[此链接](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/WorkingwithTargets.html)找到关于 iOS 目标的更多信息。

### 重命名新方案和 Plist 文件

1. 从方案菜单中选择**管理方案...**。
2. 找到 "App copy" 方案并按 `Enter` 键重命名。将名称设置为 "App QA"，然后关闭对话框。
3. 在项目导航器面板中找到 "App copy-Info" 文件并按 `Enter` 键重命名。将文件名称设置为 "App QA-Info.plist"。
4. 返回项目设置。确保选中 "App QA" 目标，打开*构建设置*部分。向下滚动到打包部分，将 **Info.plist 文件**条目更改为 "App QA-Info.plist"。

现在 iOS 项目有两个可运行的方案："App" 和 "App QA"。Capacitor 配置文件允许您在 `run` 命令期间指定要构建的方案。

您可以在[此链接](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/ManagingSchemes.html)找到关于 iOS 方案的更多信息。

### 设置环境特定的值

返回项目设置的*常规*部分。确保选中 "App QA" 目标，并更改**显示名称**和**软件包标识符**。

确保这些值与默认 "App" 目标中的值不同。目标特定的值存储在目标关联的 `Info.plist` 文件中。按照本指南，该文件是 `App QA-Info.plist`。

### 更新 Podfile 并同步应用

退出 Xcode；之后您可以使用您偏好的集成开发环境。

打开 `/ios/App/Podfile` 并复制 "App" 目标的代码块，将副本条目中的 "App" 替换为 "App QA"，如下所示：

```ruby
...snip...
target 'App' do
  capacitor_pods
  # 在此处添加您的 Pods
end

target 'App QA' do
  capacitor_pods
  # 在此处添加您的 Pods
end
```

运行 `npx cap sync` 来将插件与 "App QA" 目标同步。

### 添加 iOS 特定的 Capacitor 配置

创建了 QA 环境的目标和方案后，需要更新 Capacitor 配置以使用它们。

将以下属性添加到 `capacitor.config.ts` 中的配置对象：

```typescript
ios: {
  scheme: 'App QA',
}
```

`scheme` 属性告诉 Capacitor 在 `run` 命令中使用哪个 iOS 方案。测试一下：运行 `npx cap run ios`，您会看到应用名称有所不同。

## 设置 Android 产品变体

### 修改应用的 Gradle 文件

Android 项目包含多个 `build.gradle` 文件；要设置产品变体，需要修改位于 `/android/app` 文件夹中的那个。

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

1. Android 不提供 "默认" 变体。在本指南中，非 QA 环境称为 "dev"。
2. `applicationIdSuffix` 会在软件包标识符的末尾附加 `.qa`。
3. `manifestPlaceholders` 是可在 `AndroidManifest.xml` 中使用的值。

> **注意：** 您可以自由修改软件包标识符和显示名称的值。

您可以在[此链接](https://developer.android.com/studio/build/build-variants)找到关于 Android 产品变体的更多信息。

### 更新 Android 清单

在上一节中，您创建了一个占位符 `displayName`。打开 `AndroidManifest.xml`，将 `application` 和 `activity` 节点内的 `android:label` 值更改为 `${displayName}`。

```xml
<application
  ...snip...
  android:label="${displayName}">

  <activity
    ...snip...
    android:label="${displayName}">
```

### 添加 Android 特定的 Capacitor 配置

与 iOS 类似，您必须更新 Capacitor 配置以使用 QA 产品变体。

将以下属性添加到 `capacitor.config.ts` 中的配置对象：

```typescript
android: {
   flavor: "qa",
 },
```

测试一下：运行 `npx cap run android`，您会看到应用名称有所不同。

## 为不同环境动态构建

### 导出环境特定的 Capacitor 配置

所有准备工作已完成，现在可以编写 `capacitor.config.ts` 文件，使其根据特定值导出不同的配置对象。

打开 `capacitor.config.ts` 并修改代码如下：

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

当 `NODE_ENV` 等于 `qa` 时，Capacitor 将使用指向 "App QA" 方案和 "qa" 产品风味的配置。否则，Capacitor 将使用指向 "App" 方案和 "dev" 产品风味的配置。

### 为不同环境运行应用

你可以通过在 `npx cap copy` 和 `npx cap run` 命令前添加 `NODE_ENV=qa` 来使用 QA 环境特定配置运行构建。

```bash
NODE_ENV=qa npx cap copy
NODE_ENV=qa npx cap run ios 	#NODE_ENV=qa npx cap run android
```

要使用"默认"环境特定配置运行构建，可以正常使用 Capacitor 命令。

```bash
npx cap copy
npx cap run ios 	#npx cap run android
```

现在就去试试吧！如果你正确地遵循了本指南，你将能够为两个环境运行构建，并看到应用名称根据所使用的环境特定配置而有所不同。

## 其他环境和配置选项

请以本指南提供的信息为基础进行扩展。Capacitor CLI 对可以使用的方案或产品风味数量没有限制，你可以根据 iOS 和 Android 允许的范围对每个配置进行深度定制。你还可以为 Capacitor 插件提供不同的环境特定配置值！可能性是无限的。