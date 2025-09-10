---
title: Swift Package Manager
description: SPM基础指南
contributors:
  - giralte-ionic
  - markemer
slug: /ios/spm
---

# Swift Package Manager

Swift Packages 是苹果官方推出的新型软件依赖管理工具。传统上 Capacitor 使用 CocoaPods 管理内部依赖和插件，但现在我们推荐迁移至这个官方支持的解决方案。

自 Capacitor 6 起，开发者可以在 CocoaPods 和 Swift Package Manager (SPM) 之间选择。目前几乎所有由 capacitor-team 维护的插件（主要位于 <a href="https://github.com/ionic-team/capacitor-plugins">capacitor-plugins</a> 仓库）都已支持 SPM。

我们已尽力确保使用 SPM 时无需大幅改动现有工作流程，但仍有一些要点需要了解。

## 工作原理

当 Capacitor 项目使用 SPM 时，我们会创建一个"基础 SPM"包作为所有项目依赖的引用中心：

![基础SPM示意图](../../../static/img/v6/docs/ios/spm/base-spm.png)

Capacitor CLI 会在同步新插件时修改 CapApp-SPM 包。请勿手动修改此处内容，因为 CLI 会持续维护这些文件。

## 在新项目中使用SPM

首先通过常规命令初始化项目：
`npm init @capacitor/app@latest`

![演示步骤1](../../../static/img/v6/docs/ios/spm/demo-step1.png)

添加iOS平台支持：
`npm install @capacitor/ios`

构建web项目：
`npm run build`

添加iOS项目时需指定包管理器：
`npx cap add ios --packagemanager SPM`

最后通过 `npx cap open ios` 打开Xcode项目运行应用。

---

### 添加并使用支持SPM的Capacitor插件

以App插件为例：
`npm install @capacitor/app`

同步项目以添加iOS依赖：
`npx cap sync`

之后即可正常使用App插件功能。

## 现有项目迁移至SPM

**重要**：迁移前请确保项目已备份。

### 方案一：重建iOS目录

若**从未手动修改过Xcode项目**，可删除 `ios` 目录后执行：
`npx cap add ios --packagemanager SPM`
这将用SPM模板替换原有CocoaPods项目。

### 方案二：使用迁移工具

Capacitor CLI 提供迁移辅助命令，但需手动完成两个步骤。注意事项：
- 含Cordova插件的项目可能需额外处理
- 不兼容SPM的插件会在迁移时显示警告

执行迁移命令：
`npx cap spm-migration-assistant`

工具将自动完成：
1. 移除CocoaPods相关文件
2. 创建 `CapApp-SPM` 目录
3. 生成 `Package.swift` 并标记不兼容插件
4. 添加 `debug.xcconfig` 配置文件

打开Xcode后需手动添加本地依赖：
1. 在Package Dependencies标签页点击+
2. 选择"Add Local..."
3. 指定CapApp-SPM目录
4. 完成添加

![迁移步骤1-6图示](../../../static/img/spm/xcode-step-1.png)

#### 添加debug.xcconfig配置

在项目配置中添加现有文件：
1. 选择Add Configuration file...
2. 指定debug.xcconfig文件
3. 选择xcconfig类型

![xcconfig配置步骤](../../../static/img/spm/xcconfig-step1.png)

### 插件转换指南

纯Swift插件（除必要的`.m`/`.h`文件外）可使用 [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter) 工具转换，该工具会：
- 在Swift类中添加`CAPBridgedPlugin`协议实现
- 创建`Package.swift`文件
- 清理冗余的Xcode项目文件
- 调整目录结构符合SPM规范
- 更新package.json配置

详见工具库文档：[capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter)

### 常见问题解决

添加插件后若遇问题，可尝试在Xcode中"Reset Package Caches"：

![重置包缓存](../../../static/img/v6/docs/ios/spm/reset-package.png)