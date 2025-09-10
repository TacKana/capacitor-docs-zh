---
title: Swift Package Manager
description: SPM 基础指南
contributors:
  - giralte-ionic
slug: /ios/spm
---

# Swift 包管理器

Swift Packages 是苹果官方推出的新型软件依赖管理工具。虽然 Capacitor 传统上使用 CocoaPods 来管理内部依赖和插件，但现在正是转向官方支持方案的最佳时机。

在 Capacitor 6 中，您可以选择使用 CocoaPods 或 Swift Package Manager (SPM)。目前几乎所有由 capacitor-team 官方维护的插件都已支持 SPM，特别是 <a href="https://github.com/ionic-team/capacitor-plugins">capacitor-plugins</a> 仓库中的插件。

我们已尽力确保您无需大幅改变工作流程即可使用 SPM，但仍有一些要点需要了解。

### 工作原理

当 Capacitor 项目使用 SPM 时，我们会创建一个"基础 SPM"包作为所有项目依赖的引用中心：

![基础 SPM 示意图](/img/v6/docs/ios/spm/base-spm.png)

Capacitor CLI 会在同步新插件时修改 CapAPP-SPM 包。请注意不要手动修改此处内容，因为 CLI 会动态调整这些配置。

### 在新项目中启用 SPM

首先通过常规命令创建项目：
`npm init @capacitor/app`

![演示步骤1](/img/v6/docs/ios/spm/demo-step1.png)

添加 iOS 平台支持：
`npm install @capacitor/ios`

构建 web 项目：
`npm run build`

添加 iOS 项目时需指定包管理器参数：
`npx cap add ios --packagemanager SPM`

现在可以使用 `npx cap open ios` 打开 iOS 项目并运行应用。

---

### 添加并使用 SPM 插件

让我们为项目添加一个插件并实际应用它。

首先安装 App 插件：
`npm install @capacitor/app`

同步 web 应用（会自动将插件添加到 iOS 项目）：
`npx cap sync`

现在即可正常使用 App 插件功能。

<em>更多细节即将推出</em>

### 将现有插件转换为 SPM

详情即将公布，可先参考此仓库：
https://github.com/ionic-team/capacitor-plugin-converter

### 故障排查

添加插件后，建议在 Xcode 中执行"重置包缓存"操作：

![演示步骤1](/img/v6/docs/ios/spm/reset-package.png)