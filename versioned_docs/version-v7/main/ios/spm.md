---
title: Swift Package Manager
description: SPM 基础
contributors:
  - giralte-ionic
  - markemer
slug: /ios/spm
---

# Swift Package Manager

Swift 包是 Apple 推出的用于管理软件依赖关系的新一代官方工具。传统上，Capacitor 使用 CocoaPods 来管理内部依赖和插件，但现在是我们转向受官方支持的解决方案的时候了。

自 Capacitor 6 起，您可以选择使用 CocoaPods 或 Swift Package Manager (SPM)。几乎所有当前由 capacitor-team 支持的插件都支持 SPM，特别是 <a href="https://github.com/ionic-team/capacitor-plugins">capacitor-plugins</a> 仓库中的插件。

我们已尽力确保您在使用 SPM 时无需过多改变与 Capacitor 协作的方式，但仍有一些事项需要了解。

## 工作原理

当 Capacitor 项目使用 SPM 时，我们会使用一个“基础 SPM”包，它将作为引用您项目所有依赖项的地方：

![基础 SPM 示意图](/img/v6/docs/ios/spm/base-spm.png)

当您同步新插件时，Capacitor CLI 会修改 CapApp-SPM 包。请务必不要手动更改此处的任何内容，因为 CLI 能够且将会进行修改。

## 在新的 Capacitor 项目中使用 SPM

首先，我们从常规的 `npm init @capacitor/app@latest` 开始：

![演示步骤 1](/img/v6/docs/ios/spm/demo-step1.png)

现在，我们将 iOS 平台添加到项目中：

`npm install @capacitor/ios`

接下来，构建 Web 项目：

`npm run build`

完成后，我们可以添加 iOS 项目。我们需要在正常的 add 命令中添加 `--packagemanager SPM` 选项：

`npx cap add ios --packagemanager SPM`

现在，您可以使用 `npx cap open ios` 打开 iOS 项目并从那里运行您的应用。

---

### 添加并使用支持 SPM 的 Capacitor 插件

现在，让我们向这个项目添加一个插件，并用它做点什么。

首先安装 Capacitor App 插件：

`npm install @capacitor/app`

然后同步 Web 应用。这会将 App 插件的 SPM 添加到 iOS 项目中：

`npx cap sync`

现在您可以正常使用 App 插件了。

## 在现有的 Capacitor 项目中使用 SPM

首先，请确保您已备份项目的当前状态，无论是通过源代码管理还是其他方式。

### 删除您的 iOS 目录

如果您**完全没有手动更改过 Xcode 项目**，一种迁移方法是删除 `ios` 目录，然后运行 `npx cap add ios --packagemanager SPM`。这将移除 CocoaPods 模板项目，并用 SPM 模板项目替换它。

### 使用我们的迁移工具

Capacitor CLI 提供了一个命令来帮助从 CocoaPods 迁移到 Swift Package Manager。但是，仍然需要两个手动步骤。需要注意以下几点：包含 Cordova 插件的项目应该可以工作，但有些插件可能无法正常工作，因为我们必须为它们生成 `Package.swift` 文件。此外，如果项目使用的 Capacitor 插件没有可用的 SPM 版本，将无法正常工作，并在迁移期间以及运行 `npx cap sync` 时显示有关不兼容插件的警告。

首先，在项目的根目录下运行 `npx cap spm-migration-assistant`。

此工具将执行以下操作：

- 运行 `pod deintegrate`，移除 CocoaPods。
- 删除 `Podfile`、`App.xcworkspace` 和 `Podfile.lock`。
- 创建包含所需文件的 `CapApp-SPM` 目录。
- 从您的插件生成 `Package.swift`，并警告您哪些插件无法包含。
- 在您的 ios 项目目录中添加 `debug.xcconfig`。

然后运行 `npx cap open ios`，您应该会看到类似以下内容：

![迁移步骤 1](/img/spm/xcode-step-1.png)

高亮显示 App，选择 Package Dependencies 标签页，在此页面点击 + 符号以添加依赖项：

![迁移步骤 2](/img/spm/xcode-step-2.png)

您应该会看到类似以下的对话框——从对话框中选择 Add Local...：

![迁移步骤 3](/img/spm/xcode-step-3.png)

在此对话框中选择 CapApp-SPM 并点击 Add Package：

![迁移步骤 4](/img/spm/xcode-step-4.png)

当出现此屏幕时，再次点击 Add Package：

![迁移步骤 5](/img/spm/xcode-step-5.png)

完成后，您应该会看到类似这样的屏幕。现在，请继续阅读下一节关于添加 `debug.xconfig` 的内容。

![迁移步骤 6](/img/spm/xcode-step-6.png)

#### 将 debug.xcconfig 添加到项目

在应用信息标签页中，选择 Add Configuration file...：

![XCConfig 步骤 1](/img/spm/xcconfig-step1.png)

然后选择名为 `debug.xcconfig` 的文件：

![XCConfig 步骤 2](/img/spm/xcconfig-step2.png)

最后选择 xcconfig 作为您的选择：

![XCConfig 步骤 3](/img/spm/xcconfig-step3.png)

至此，您已完成所有步骤，可以正常构建和使用了。

### 将现有插件转换为 SPM {#converting-existing-plugins-to-spm}

如果您的插件除了必需的 `[Name]Plugin.m` 和 `[Name]Plugin.h` 之外只包含 Swift 代码，您可以使用 [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter)。

此工具将进行以下更改：

- 在您的主要 Swift 插件文件 `[Name]Plugin.swift` 中添加以下必需内容：
  - 为您的类添加对 `CAPBridgedPlugin` 协议的遵循。
  - 为您的类添加三个变量：`identifier`、`jsName` 和 `pluginMethods`：
    - `identifier` 将对应 `CAP_PLUGIN` 宏的第一个参数。
    - `jsName` 将对应 `CAP_PLUGIN` 宏的第二个参数。
    - `pluginMethods` 将是传递给 `CAP_PLUGIN` 宏的方法数组。
- 将在插件文件夹的根目录创建一个 `Package.swift` 文件。
- 以下文件将被删除，因为它们不再需要：
  - `Plugin.xcodeproj`
  - `Plugin.xcworkspace`
  - `Plugin/Info.plist`
  - `PluginTests/Info.plist`
  - `Podfile`
- 为了符合 SPM 最佳实践，项目文件将被移动到 `Sources` 和 `Tests` 目录。
- 插件的 `package.json` 将进行以下更改：
  - files 数组将添加这些文件或目录：
    - `ios/Sources`
    - `ios/Tests`
    - `Package.swift`
  - `verify:ios` 将被更改为 `xcodebuild -scheme YourPluginName -destination generic/platform=iOS`，使其继续按预期工作。
- 您的插件 podspec 将被更改，使 `s.source_files` 现在指向 `Sources` 目录而不是 `Plugin` 目录。

更多信息请参阅 [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter) 仓库中的文档。

### 故障排除

添加插件后，尝试在 Xcode 中“重置包缓存”：

![演示步骤 1](/img/v6/docs/ios/spm/reset-package.png)