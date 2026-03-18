---
title: Swift Package Manager
description: SPM 基础
contributors:
  - giralte-ionic
slug: /ios/spm
---

# Swift Package Manager

Swift Package Manager (SPM) 是苹果官方的软件包依赖管理工具。传统上，Capacitor 使用 CocoaPods 来管理内部依赖和插件依赖，但现在我们正转向这个官方支持的解决方案。

在 Capacitor 6 中，你可以选择使用 CocoaPods 或 Swift Package Manager (SPM)。目前几乎所有的 Capacitor 官方团队支持的插件都已支持 SPM，即 <a href="https://github.com/ionic-team/capacitor-plugins">capacitor-plugins</a> 仓库中的插件。

我们已尽力确保在使用 SPM 时，你无需大幅改变现有的 Capacitor 工作流程，但仍有一些要点需要了解。

### 工作原理

当一个 Capacitor 项目使用 SPM 时，我们会使用一个「基础 SPM」包，它将成为引用你项目所有依赖的地方：

![基础 SPM 示意图](/img/v6/docs/ios/spm/base-spm.png)

当你同步新插件时，Capacitor CLI 会修改 CapAPP-SPM 包。请勿手动修改此包的内容，因为 CLI 会（并有权）更改其中的内容。

### 在新 Capacitor 项目中使用 SPM

首先，我们像往常一样使用 `npm init @capacitor/app` 创建项目：

![演示步骤 1](/img/v6/docs/ios/spm/demo-step1.png)

现在，我们将 iOS 平台添加到项目中：

`npm install @capacitor/ios`

接下来构建 Web 项目：

`npm run build`

完成后，我们就可以添加 iOS 项目了。需要在正常的 add 命令后添加 `--packagemanager SPM` 选项：

`npx cap add ios --packagemanager SPM`

现在，你可以使用 `npx cap open ios` 打开 iOS 项目，并从那里运行你的应用。

---

### 添加并使用支持 SPM 的 Capacitor 插件

让我们为这个项目添加一个插件，并用它做些事情。

首先安装 Capacitor App 插件：

`npm install @capacitor/app`

然后同步 Web 应用。这将把 App 插件的 SPM 添加到 iOS 项目中：

`npx cap sync`

现在你就可以正常使用 App 插件了。

<em>更多细节即将推出</em>

### 将现有插件转换为支持 SPM

更多细节即将推出，但你可以先查看这个仓库：https://github.com/ionic-team/capacitor-plugin-converter

### 故障排除

添加插件后，可以尝试在 Xcode 中「重置包缓存」：

![演示步骤 1](/img/v6/docs/ios/spm/reset-package.png)