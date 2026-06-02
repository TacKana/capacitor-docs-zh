---
title: Swift Package Manager
description: SPM 基础
contributors:
  - giralte-ionic
  - markemer
slug: /ios/spm
---

# Swift Package Manager

Swift Packages 是 Apple 用于软件依赖管理的全新第一方工具。传统上，Capacitor 使用 CocoaPods 进行内部依赖管理和插件管理，但现在正是转向受支持解决方案的时候了。

自 Capacitor 6 起，您可以选择使用 CocoaPods 或 Swift Package Manager (SPM)。几乎所有当前 capacitor-team 支持的插件都支持 SPM，即 <a href="https://github.com/ionic-team/capacitor-plugins">capacitor-plugins</a> 中的插件。

我们已尽力确保您在使用 SPM 时无需过多改变使用 Capacitor 的方式，但仍有一些事项需要了解。

## 工作原理

当 Capacitor 项目使用 SPM 时，我们使用一个"基础 SPM"包，作为引用项目所有依赖的场所：

![Base SPM 配图](../../../static/img/v6/docs/ios/spm/base-spm.png)

当您同步新插件时，Capacitor CLI 会修改 CapApp-SPM 包。请务必不要修改其中的内容，因为 CLI 可以且将会更改这些内容。

## 在新的 Capacitor 项目中使用 SPM

首先，从正常的 `npm init @capacitor/app@latest` 开始：

![演示步骤 1](../../../static/img/v6/docs/ios/spm/demo-step1.png)

现在，我们想要为项目添加 iOS 平台：

`npm install @capacitor/ios`

接下来，构建 web 项目：

`npm run build`

完成后，我们可以添加 iOS 项目。我们需要在正常的 add 命令中添加选项 `--packagemanager SPM`：

`npx cap add ios --packagemanager SPM`

现在，您可以使用 `npx cap open ios` 打开 iOS 项目并从中运行您的应用。

---

### 使用 SPM 添加和使用 Capacitor 插件

那么，让我们为这个项目添加一个插件并使用它。

首先安装 Capacitor App 插件：

`npm install @capacitor/app`

然后同步 web 应用。这会将 App 插件的 SPM 添加到 iOS 项目中：

`npx cap sync`

您现在可以正常使用 App 插件了。

## 在现有的 Capacitor 项目中使用 SPM

首先，请确保您已备份项目的当前状态，无论是在版本控制中还是其他位置。

### 删除 iOS 目录

如果您**完全没有手动更改过 Xcode 项目**，一种迁移方式是删除 `ios` 目录，然后运行 `npx cap add ios --packagemanager SPM`。这将移除 CocoaPods 模板项目，并用 SPM 模板项目替换它。

### 使用我们的迁移工具

Capacitor CLI 有一个命令可以帮助从 CocoaPods 迁移到 Swift Package Manager。但仍需要两个手动步骤。需要注意的事项：包含 Cordova 插件的项目应该可以工作，但某些插件可能无法正常工作，因为我们需要为它们生成 `Package.swift` 文件。此外，使用没有 SPM 版本的 capacitor 插件的项目将无法正常工作，并且在迁移期间以及运行 `npx cap sync` 时会显示不兼容插件的警告。

首先，在项目根目录运行 `npx cap spm-migration-assistant`。

该工具将执行以下操作：
  - 运行 `pod deintegrate` 移除 CocoaPods
  - 删除 `Podfile`、`App.xcworkspace` 和 `Podfile.lock`
  - 创建一个包含所需文件的 `CapApp-SPM` 目录
  - 根据您的插件生成 `Package.swift`，并警告您是否有任何插件无法包含
  - 在您的 ios 项目目录中添加一个 `debug.xcconfig` 文件

然后运行 `npx cap open ios`，您应该会看到类似这样的界面：

![迁移步骤 1](../../../static/img/spm/xcode-step-1.png)

选中 App，然后选择 Package Dependencies 标签页，在此页面上按 + 符号添加依赖：

![迁移步骤 2](../../../static/img/spm/xcode-step-2.png)

您应该会看到类似下方的界面 - 从对话框中选择 Add Local...：

![迁移步骤 3](../../../static/img/spm/xcode-step-3.png)

在此对话框中选择 CapApp-SPM，然后点击 Add Package：

![迁移步骤 4](../../../static/img/spm/xcode-step-4.png)

当此屏幕出现时，再次点击 Add Package：

![迁移步骤 5](../../../static/img/spm/xcode-step-5.png)

完成后，您应该会看到这样的界面。现在，进入下一节关于添加 `debug.xconfig` 的内容。

![迁移步骤 6](../../../static/img/spm/xcode-step-6.png)

#### 将 debug.xcconfig 添加到项目

从应用信息标签页中，选择 Add Configuration file...

![XCConfig 步骤 1](../../../static/img/spm/xcconfig-step1.png)

然后选择名为 `debug.xcconfig` 的文件

![XCConfig 步骤 2](../../../static/img/spm/xcconfig-step2.png)

最后选择 xcconfig 作为您的选择

![XCConfig 步骤 3](../../../static/img/spm/xcconfig-step3.png)

至此，您已完成操作，可以像往常一样进行构建和工作。

### 将现有插件转换为 SPM

如果您的插件只包含 Swift 代码（除了必需的 `[Name]Plugin.m` 和 `[Name]Plugin.h` 文件外），您可以使用 [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter)。

该工具将执行以下更改：

- 在您的插件主 Swift 文件 `[Name]Plugin.swift` 中添加以下必需内容：
  - 为您的类添加对 `CAPBridgedPlugin` 协议的遵循。
  - 为您的类添加 3 个变量：`identifier`、`jsName` 和 `pluginMethods`：
    - `identifier` 将对应于 `CAP_PLUGIN` 宏的第一个参数。
    - `jsName` 将对应于 `CAP_PLUGIN` 宏的第二个参数。
    - `pluginMethods` 将是传递给 `CAP_PLUGIN` 宏的方法数组。
- 将在插件文件夹的根目录创建 `Package.swift` 文件。
- 以下文件将被删除，因为它们不再需要：
  - `Plugin.xcodeproj`
  - `Plugin.xcworkspace`
  - `Plugin/Info.plist`
  - `PluginTests/Info.plist`
  - `Podfile`
- 为符合 SPM 最佳实践，项目文件将被移动到 `Sources` 和 `Tests` 目录。
- 插件的 `package.json` 将进行以下更改：
  - files 数组将添加这些文件或目录：
    - `ios/Sources`
    - `ios/Tests`
    - `Package.swift`
  - `verify:ios` 将更改为 `xcodebuild -scheme YourPluginName -destination generic/platform=iOS`，以使其继续按预期工作。
- 您的插件 podspec 将被修改，`s.source_files` 现在指向 `Sources` 目录而非 `Plugin` 目录。

更多信息请参阅 [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter) 仓库中的文档。

### 故障排除

添加插件后，尝试在 Xcode 中 'reset package caches'（重置包缓存）：

![演示步骤 1](../../../static/img/v6/docs/ios/spm/reset-package.png)
