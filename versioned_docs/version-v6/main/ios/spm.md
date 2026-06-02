---
title: Swift Package Manager
description: SPM 基础
contributors:
  - giralte-ionic
slug: /ios/spm
---

# Swift Package Manager

Swift Packages 是 Apple 用于软件依赖的新第一方工具。传统上，Capacitor 使用 CocoaPods 来管理内部依赖和插件，但现在到了转向受支持解决方案的时候了。

在 Capacitor 6 中，您现在可以选择使用 CocoaPods 或 Swift Package Manager（SPM）。几乎所有当前 capacitor-team 支持的插件都支持 SPM，即 <a href="https://github.com/ionic-team/capacitor-plugins">capacitor-plugins</a> 中的插件。

我们已尽力确保您在使用 SPM 时不需要太多改变与 Capacitor 的工作方式，但有一些事项需要了解。

### 工作原理

当 Capacitor 项目使用 SPM 时，我们使用一个"基础 SPM"包，它将作为引用您所有项目依赖的地方：

![基础 SPM 图片](/img/v6/docs/ios/spm/base-spm.png)

当您同步新插件时，Capacitor CLI 将修改 CapAPP-SPM 包。重要的是不要触碰这里的内容，因为 CLI 可以并且将会进行更改。

### 在新的 Capacitor 项目中使用 SPM

首先，我们从正常的 `npm init @capacitor/app` 开始：

![演示步骤 1](/img/v6/docs/ios/spm/demo-step1.png)

现在，我们想为项目添加 iOS 平台：

`npm install @capacitor/ios`

接下来，让我们构建 Web 项目：

`npm run build`

完成后，我们可以添加 iOS 项目。我们需要在正常的 add 命令中添加选项 `--packagemanager SPM`：

`npx cap add ios --packagemanager SPM`

现在您可以使用 `npx cap open ios` 来打开 iOS 项目并从中运行您的应用。

---

### 使用 SPM 添加和使用 Capacitor 插件

那么，让我们为这个项目添加一个插件并用该插件做一些事情。

首先安装 Capacitor App 插件：

`npm install @capacitor/app`

然后让我们同步 Web 应用。这会将 App 插件 SPM 添加到 iOS 项目：

`npx cap sync`

您现在可以正常使用 App 插件。

<em>更多详情即将推出</em>

### 将现有插件转换为 SPM

更多详情即将推出，但请查看此仓库：https://github.com/ionic-team/capacitor-plugin-converter

### 故障排除

添加插件后，尝试在 Xcode 中"重置包缓存"：

![演示步骤 1](/img/v6/docs/ios/spm/reset-package.png)
