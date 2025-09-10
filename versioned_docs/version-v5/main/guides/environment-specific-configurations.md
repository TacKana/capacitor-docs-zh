---  
title: 环境特定配置  
description: 创建针对不同环境的配置  
contributors:  
  - eric-horodyski  
slug: /guides/environment-specific-configurations  
---  

# 创建环境特定配置  

**支持平台:** iOS, Android  

在软件开发周期中，许多团队会使用不同的环境。不同环境的配置可能存在差异，例如应用包名（Bundle ID）、深度链接方案、应用图标和启动屏等。  

Capacitor 配置文件负责处理工具链和插件配置的高层选项。通过 iOS 的 schemes 和 Android 的 product flavors，开发者可以为不同环境提供差异化的应用配置。结合这两者，开发者可以使用 Capacitor CLI 为不同环境构建应用。  

本指南将带您配置一个 QA 测试环境，与默认的生产环境配置并存。为体现环境差异，我们将使两个环境的应用程序名和包名有所不同。  

## 准备 Capacitor 应用  

您需要创建一个已添加 iOS 和 Android 平台的 Capacitor 应用。如果已有现成项目，可跳过此部分。  

您可以选择[将 Capacitor 添加到现有 Web 应用](/main/getting-started/installation.md)，或[基于 Ionic 框架新建 Capacitor 应用](/main/getting-started/with-ionic.md)。  

注意：应用必须使用 TypeScript 配置文件。本指南将使用 `capacitor.config.ts` 动态导出不同配置。  

在添加原生平台前，必须先构建一次 Web 应用：  

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

### 创建新 Xcode 目标  

首先在 Xcode 中打开 iOS 项目：`npx cap open ios`  

1. 在项目导航面板中进入项目设置，右键点击 "App" 目标选择 **Duplicate** 复制目标  
2. 将新目标重命名为 "App QA"  

此操作会创建 "App copy" 方案并生成 `App copy-Info.plist` 文件。  

更多 iOS 目标信息请参考[苹果官方文档](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/WorkingwithTargets.html)。  

### 重命名方案与 Plist 文件  

1. 在 Scheme 菜单中选择 **Manage Schemes...**  
2. 将 "App copy" 方案重命名为 "App QA"  
3. 将 "App copy-Info.plist" 文件重命名为 "App QA-Info.plist"  
4. 返回项目设置，确保选中 "App QA" 目标，在 Build Settings 的 Packaging 部分更新 Info.plist File 路径  

现在项目包含两个可运行方案："App" 和 "App QA"。Capacitor 配置文件可以指定构建时使用的方案。  

关于 iOS 方案的更多信息详见[苹果文档](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/ManagingSchemes.html)。  

### 设置环境特定值  

在 "App QA" 目标的 General 设置中，修改 Display Name 和 Bundle Identifier，确保与默认 "App" 目标不同。这些值会存储在对应的 `App QA-Info.plist` 文件中。  

### 更新 Podfile 并同步  

退出 Xcode，打开 `/ios/App/Podfile` 文件，复制 "App" 目标的配置块并修改为 "App QA"：  

```ruby  
target 'App' do  
  capacitor_pods  
  # 在此添加您的 Pods  
end  

target 'App QA' do  
  capacitor_pods  
  # 在此添加您的 Pods  
end  
```  

运行 `npx cap sync` 同步插件到新目标。  

### 添加 iOS 专属配置  

在 `capacitor.config.ts` 中添加：  

```typescript  
ios: {  
  scheme: 'App QA',  
}  
```  

`scheme` 属性指定了 `run` 命令使用的方案。测试运行 `npx cap run ios` 即可看到应用名称变化。  

## 配置 Android 产品风味  

### 修改 Gradle 配置  

打开 `/android/app/build.gradle` 文件，在 `android` 块内添加：  

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

关键说明：  
1. Android 不提供默认风味，本指南将基础环境命名为 "dev"  
2. `applicationIdSuffix` 会在包名后附加 ".qa"  
3. `manifestPlaceholders` 可在 Manifest 文件中使用  

了解更多请参考[Android 官方文档](https://developer.android.com/studio/build/build-variants)。  

### 更新 Manifest 文件  

将 `AndroidManifest.xml` 中 `application` 和 `activity` 节点的 `android:label` 值改为 `${displayName}`。  

### 添加 Android 专属配置  

在 `capacitor.config.ts` 中添加：  

```typescript  
android: {  
   flavor: "qa",  
 },  
```  

运行 `npx cap run android` 测试应用名称变化。  

## 动态构建多环境应用  

### 导出环境特定配置  

修改 `capacitor.config.ts` 实现根据环境变量导出不同配置：  

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

### 运行不同环境构建  

使用以下命令构建 QA 环境：  

```bash  
NODE_ENV=qa npx cap copy  
NODE_ENV=qa npx cap run ios 	# 或 android  
```  

常规命令则使用默认环境：  

```bash  
npx cap copy  
npx cap run ios 	# 或 android  
```  

测试运行后，您将看到不同环境下的应用名称差异。  

## 扩展多环境支持  

本指南提供的基础方案可自由扩展。Capacitor CLI 对 schemes 和 product flavors 数量没有限制，您可以基于 iOS 和 Android 的原生能力进行深度定制，甚至为不同环境的插件提供差异化配置，可能性是无限的。