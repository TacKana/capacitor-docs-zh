---
title: 环境特定配置
description: 创建环境特定的配置
contributors:
  - eric-horodyski
slug: /guides/environment-specific-configurations
---

# 创建环境特定配置

**平台：** iOS, Android

许多软件开发团队在软件开发生命周期中会使用不同的环境。不同环境之间的配置可能有所不同，例如 bundle ID、深度链接 scheme，或图标和启动画面。

Capacitor 配置文件处理 Capacitor 工具链和插件配置的高级选项。iOS scheme 和 Android product flavor 允许开发者为不同环境提供不同的应用值。通过将两者结合，开发者可以使用 Capacitor CLI 为不同环境构建应用。

本指南将引导您设置一个 QA 环境配置，以及开箱即用的默认环境配置。为展示每个环境之间的差异，应用名称和 bundle ID 在两个环境中会有所不同。

## 准备一个 Capacitor 应用

您需要一个已添加 iOS 和 Android 平台的 Capacitor 应用。如果您已有已添加两个平台的 Capacitor 应用，请跳过此部分。

根据您的偏好，您可以[将 Capacitor 添加到现有 Web 应用](/main/getting-started/installation.md)或[使用 Ionic Framework 创建一个新的 Capacitor 应用](/main/getting-started/with-ionic.md)。

Capacitor 应用必须使用 TypeScript 进行配置。本指南使用 `capacitor.config.ts` 来动态导出不同的配置。

在向项目添加任何原生平台之前，您必须至少构建一次 Capacitor 应用。

```bash
npm run build
```

构建完成后，您可以添加平台。

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

## 设置一个新的 iOS scheme

### 创建一个新的 Xcode target

首先在 Xcode 中打开原生 iOS 项目：`npx cap open ios`。

1. 在 Project Navigator 面板中进入项目设置。在 _Targets_ 部分，右键单击 "App" target，选择 **Duplicate** 来复制现有的 target。
2. 单击新的 "App copy" target，按 `Enter` 键重命名。将 target 名称设置为 "App QA"。

此过程创建了一个额外的 "App copy" scheme，并添加了一个名为 `App copy-Info.plist` 的新文件。

您可以[在此链接](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/WorkingwithTargets.html)找到关于 iOS targets 的更多信息。

### 重命名新的 scheme 和 Plist 文件

1. 从 Scheme 菜单中选择 **Manage Schemes...**。
2. 找到 "App copy" scheme，按 `Enter` 键重命名。将名称设置为 "App QA" 并关闭对话框。
3. 在 Project Navigator 面板中找到 "App copy-Info" 文件，按 `Enter` 键重命名。将文件名设置为 "App QA-Info.plist"。
4. 返回项目设置。确保选中 "App QA" target，打开 _Build Settings_ 部分。滚动到 Packaging，将 **Info.plist File** 条目改为 "App QA-Info.plist"。

iOS 项目现在有两个可运行的 scheme："App" 和 "App QA"。Capacitor 的配置文件允许您在 `run` 命令期间指定要构建哪个 scheme。

您可以[在此链接](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/ManagingSchemes.html)找到关于 iOS schemes 的更多信息。

### 设置环境特定值

返回项目设置的 _General_ 部分。确保选中 "App QA" target，然后更改 **Display Name** 和 **Bundle Identifier**。

确保这些值与默认 "App" target 的值不同。特定于 target 的值存储在 target 关联的 `Info.plist` 文件中。按照本指南，该文件是 `App QA-Info.plist`。

### 更新 Podfile 并同步应用

退出 Xcode；您可以继续使用您喜欢的 IDE。

打开 `/ios/App/Podfile`，复制 "App" target 的代码块，将副本中的 "App" 替换为 "App QA"，如下所示：

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

运行 `npx cap sync` 将插件同步到 "App QA" target。

### 添加 iOS 特定的 Capacitor 配置

创建好 QA 环境的 target 和 scheme 后，需要更新 Capacitor 配置以使用它们。

将以下属性添加到 `capacitor.config.ts` 的配置对象中：

```typescript
ios: {
  scheme: 'App QA',
}
```

`scheme` 属性告诉 Capacitor 在 `run` 命令中使用哪个 iOS scheme。测试一下：运行 `npx cap run ios`，您会看到应用名称不同了。

## 设置 Android product flavor

### 修改应用的 Gradle 文件

Android 项目包含多个 `build.gradle` 文件；用于设置 product flavor 需要修改的文件位于 `/android/app` 文件夹中。

打开 `/android/app/build.gradle`，在 `android` 块中添加以下代码：

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

这段代码需要一些说明：

1. Android 不提供"默认"flavor。在本指南中，非 QA 的环境被称为 "dev"。
2. `applicationIdSuffix` 会将 `.qa` 追加到 bundle ID 的末尾。
3. `manifestPlaceholders` 是可在 `AndroidManifest.xml` 中使用的值。

> **注意：** 您可以根据喜好自由修改 bundle ID 和 display name 的值。

您可以[在此链接](https://developer.android.com/studio/build/build-variants)找到关于 Android product flavors 的更多信息。

### 更新 Android 清单

在上一部分中，您创建了一个占位符 `displayName`。打开 `AndroidManifest.xml`，将 `application` 和 `activity` 节点中的 `android:label` 值改为 `${displayName}`。

```xml
<application
  ...snip...
  android:label="${displayName}">

  <activity
    ...snip...
    android:label="${displayName}">
```

### 添加 Android 特定的 Capacitor 配置

与 iOS 类似，您必须更新 Capacitor 配置以使用 QA product flavor。

将以下属性添加到 `capacitor.config.ts` 的配置对象中：

```typescript
android: {
   flavor: "qa",
 },
```

测试一下：运行 `npx cap run android`，您会看到应用名称不同了。

## 为不同环境动态构建

### 导出环境特定的 Capacitor 配置

所有部分已就绪，现在可以编写 `capacitor.config.ts`，使其根据特定值导出不同的配置对象。

打开 `capacitor.config.ts` 并按如下方式修改代码：

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

当 `NODE_ENV` 等于 `qa` 时，Capacitor 将使用指向 "App QA" scheme 和 "qa" product flavor 的配置。否则，Capacitor 使用指向 "App" scheme 和 "dev" product flavor 的配置。

### 为不同环境运行应用

您可以通过在 `npx cap copy` 和 `npx cap run` 命令前加上 `NODE_ENV=qa`，来使用 QA 环境特定配置运行构建。

```bash
NODE_ENV=qa npx cap copy
NODE_ENV=qa npx cap run ios
NODE_ENV=qa npx cap run android
```

要使用"默认"环境特定配置运行构建，请像平常一样使用 Capacitor 命令。

```bash
npx cap copy
npx cap run ios
npx cap run android
```

来测试一下吧！如果您正确地遵循了本指南，您将能够为两种环境运行构建，并看到应用名称根据所使用的环境特定配置而有所不同。

## 更多环境和配置选项

将本指南提供的信息作为构建基础。Capacitor CLI 对可以使用多少个 scheme 或 product flavor 没有限制，并且您可以按照 iOS 和 Android 允许的深度对每个进行配置。您还可以为 Capacitor 插件提供不同的环境特定配置值！无限可能。
