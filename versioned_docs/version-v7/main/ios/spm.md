---
title: Swift Package Manager
description: SPM 基础
contributors:
  - giralte-ionic
  - markemer
slug: /ios/spm
---

# Swift Package Manager

Swift 包是 Apple 官方推出的新一代软件依赖管理工具。传统上，Capacitor 一直使用 CocoaPods 来管理内部及插件的依赖关系，但现在正是转向官方支持的解决方案的时候。

自 Capacitor 6 起，您可以选择使用 CocoaPods 或 Swift Package Manager (SPM)。目前几乎所有由 capacitor 团队支持的插件都已支持 SPM，具体来说就是 <a href="https://github.com/ionic-team/capacitor-plugins">capacitor-plugins</a> 中的插件。

我们已尽力确保您在使用 SPM 时无需对 Capacitor 的工作方式做太多调整，但仍有一些要点需要理解。

## 工作原理

当 Capacitor 项目使用 SPM 时，我们会使用一个“基础 SPM”包，作为引用您项目中所有依赖项的地方：

![基础 SPM 示意图](/img/v6/docs/ios/spm/base-spm.png)

当您同步新插件时，Capacitor CLI 会修改 CapApp-SPM 包。请务必不要手动改动此处的内容，因为 CLI 可能会（并且将会）进行更改。

## 在新 Capacitor 项目中使用 SPM

首先，我们像往常一样执行 `npm init @capacitor/app@latest`：

![演示步骤 1](/img/v6/docs/ios/spm/demo-step1.png)

接下来，我们将 iOS 平台添加到项目中：

`npm install @capacitor/ios`

然后构建 web 项目：

`npm run build`

完成后，我们可以添加 iOS 项目。我们需要在常规的 add 命令中添加 `--packagemanager SPM` 选项：

`npx cap add ios --packagemanager SPM`

现在，您可以使用 `npx cap open ios` 打开 iOS 项目，并从那里运行您的应用。

---

### 使用 SPM 添加并使用 Capacitor 插件

接下来，让我们向此项目添加一个插件并加以使用。

首先安装 Capacitor App 插件：

`npm install @capacitor/app`

然后同步 web 应用。这会将 App 插件的 SPM 添加到 iOS 项目中：

`npx cap sync`

现在您就可以正常使用 App 插件了。

## 在现有 Capacitor 项目中使用 SPM

首先，请确保您已备份项目的当前状态，无论是在源代码管理中还是其他地方。

### 删除 iOS 目录

如果您**完全没有手动修改过 Xcode 项目**，一种迁移方法是删除 `ios` 目录，然后运行 `npx cap add ios --packagemanager SPM`。这将移除 CocoaPods 模板项目，并用 SPM 模板项目替代。

### 使用我们的迁移工具

Capacitor CLI 提供了一个命令来帮助从 CocoaPods 迁移到 Swift Package Manager。但请注意，仍有两个手动步骤需要完成。需要了解的是：包含 Cordova 插件的项目应该可以工作，但有些插件可能无法正常运行，因为我们需要为它们生成 `Package.swift` 文件。此外，如果项目使用了没有 SPM 版本的 capacitor 插件，这些插件将无法正常工作，并在迁移过程中以及运行 `npx cap sync` 时显示关于不兼容插件的警告。

首先，在项目根目录下运行 `npx cap spm-migration-assistant`。

此工具将执行以下操作：

- 运行 `pod deintegrate` 以移除 CocoaPods
- 删除 `Podfile`、`App.xcworkspace` 和 `Podfile.lock`
- 创建一个包含所需文件的 `CapApp-SPM` 目录
- 根据您的插件生成 `Package.swift`，并警告您哪些插件无法包含
- 在您的 ios 项目目录中添加一个 `debug.xcconfig` 文件

然后运行 `npx cap open ios`，您应该会看到类似以下内容：

![迁移步骤 1](/img/spm/xcode-step-1.png)

选中 App，选择 Package Dependencies 选项卡，在此页面上按 + 符号添加依赖项：

![迁移步骤 2](/img/spm/xcode-step-2.png)

您应该会看到类似以下的对话框 - 选择 Add Local...：

![迁移步骤 3](/img/spm/xcode-step-3.png)

在此对话框中选择 CapApp-SPM，然后单击 Add Package：

![迁移步骤 4](/img/spm/xcode-step-4.png)

当出现此屏幕时，再次单击 Add Package：

![迁移步骤 5](/img/spm/xcode-step-5.png)

完成后，您应该会看到类似这样的屏幕。现在，请继续下一节关于添加 `debug.xconfig` 的内容。

![迁移步骤 6](/img/spm/xcode-step-6.png)

#### 将 debug.xcconfig 添加到项目

在应用信息选项卡中，选择 Add Configuration file...：

![XCConfig 步骤 1](/img/spm/xcconfig-step1.png)

然后选择名为 `debug.xcconfig` 的文件：

![XCConfig 步骤 2](/img/spm/xcconfig-step2.png)

最后选择 xcconfig 作为您的选择：

![XCConfig 步骤 3](/img/spm/xcconfig-step3.png)

至此，您已完成设置，可以正常构建和工作了。

### 将现有插件转换为SPM

如果您的插件除了必需的 `[Name]Plugin.m` 和 `[Name]Plugin.h` 之外仅包含 Swift 代码，您可以使用 [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter)。

此工具将进行以下更改：

- 在您的主 swift 插件文件 `[Name]Plugin.swift` 中添加以下必需内容：
  - 为您的类添加对 `CAPBridgedPlugin` 协议的遵循。
  - 向您的类添加 3 个变量：`identifier`、`jsName` 和 `pluginMethods`：
    - `identifer` 对应于 `CAP_PLUGIN` 宏的第一个参数。
    - `jsName` 对应于 `CAP_PLUGIN` 宏的第二个参数。
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
  - `verify:ios` 将被更改为 `xcodebuild -scheme YourPluginName -destination generic/platform=iOS`，以使其继续按预期工作。
- 您的插件 podspec 将被更改，以使 `s.source_files` 现在指向 `Sources` 目录而不是 `Plugin` 目录。

有关更多信息，请参阅 [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter) 仓库中的文档。

### 故障排除

添加插件后，尝试在 Xcode 中“重置包缓存”：

![演示步骤 1](/img/v6/docs/ios/spm/reset-package.png)
