---
title: Swift Package Manager
description: SPM 基础知识
contributors:
  - giralte-ionic
  - markemer
slug: /ios/spm
---

# Swift Package Manager

Swift Packages 是 Apple 用于软件依赖的新第一方工具。传统上，Capacitor 一直使用 CocoaPods 来管理内部依赖和插件，但现在是时候转向受支持的解决方案了。

自 Capacitor 6 起，你可以选择使用 CocoaPods 或 Swift Package Manager（SPM）。几乎所有当前 capacitor 团队支持的插件都支持 SPM，即 <a href="https://github.com/ionic-team/capacitor-plugins">capacitor-plugins</a> 中的插件。

我们已尽最大努力确保你使用 SPM 时无需对 Capacitor 的工作方式进行太多更改，但仍有一些事项需要了解。

## 工作原理

当 Capacitor 项目使用 SPM 时，我们使用一个"基础 SPM"包作为引用所有项目依赖的位置：

![基础 SPM 图片](/img/v6/docs/ios/spm/base-spm.png)

当你同步新插件时，Capacitor CLI 会修改 CapApp-SPM 包。请不要修改此处的文件，因为 CLI 可以且将会更改它们。

## 在新的 Capacitor 项目中使用 SPM

首先，从正常的 `npm init @capacitor/app@latest` 开始：

![演示步骤 1](/img/v6/docs/ios/spm/demo-step1.png)

现在，将 iOS 平台添加到项目中：

```bash
npm install @capacitor/ios
```

接下来构建 Web 项目：

```bash
npm run build
```

完成后，我们可以添加 iOS 项目。我们需要在正常的 add 命令中添加 `--packagemanager SPM` 选项：

```bash
npx cap add ios --packagemanager SPM
```

现在，你可以使用 `npx cap open ios` 打开 iOS 项目并从那里运行你的应用。

---

### 使用 SPM 添加和使用 Capacitor 插件

让我们为这个项目添加一个插件，并进行一些操作。

首先安装 Capacitor App 插件：

```bash
npm install @capacitor/app
```

然后同步 Web 应用。这会将 App 插件 SPM 添加到 iOS 项目中：

```bash
npx cap sync
```

现在你可以正常使用 App 插件了。

## 在现有的 Capacitor 项目中使用 SPM

首先，确保你已备份当前项目状态，无论是通过源代码管理还是其他方式。

### 删除 iOS 目录

如果你**根本没有手动更改过 Xcode 项目**，一种迁移方法是删除 `ios` 目录，然后运行 `npx cap add ios --packagemanager SPM`。这将删除 CocoaPods 模板项目，并用 SPM 模板项目替换它。

### 使用我们的迁移工具

Capacitor CLI 有一个命令可以帮助从 CocoaPods 迁移到 Swift Package Manager。但是，仍然需要两个手动步骤。需要注意的一些事项：使用 Cordova 插件的项目应该可以工作，但某些插件可能无法正常工作，因为我们需要为它们生成一个 `Package.swift` 文件。此外，使用没有 SPM 版本的 Capacitor 插件的项目将无法正常工作，并且在迁移期间和运行 `npx cap sync` 时会显示关于不兼容插件的警告。

首先，在项目根目录下运行 `npx cap spm-migration-assistant`。

该工具将：

- 运行 `pod deintegrate` 删除 CocoaPods
- 删除 `Podfile`、`App.xcworkspace` 和 `Podfile.lock`
- 创建一个 `CapApp-SPM` 目录，包含所需的文件
- 从你的插件生成一个 `Package.swift`，并警告你如果某些插件无法包含
- 向你的 iOS 项目目录添加一个 `debug.xcconfig`

然后运行 `npx cap open ios`，你应该会看到类似这样的内容：

![迁移步骤 1](/img/spm/xcode-step-1.png)

选中 App，然后选择 Package Dependencies 选项卡，在此页面上按 + 符号添加一个依赖：

![迁移步骤 2](/img/spm/xcode-step-2.png)

你应该会看到类似下面的内容 - 从对话框中选择 Add Local...：

![迁移步骤 3](/img/spm/xcode-step-3.png)

在此对话框中选择 CapApp-SPM，然后点击 Add Package：

![迁移步骤 4](/img/spm/xcode-step-4.png)

出现此屏幕时，再次点击 Add Package：

![迁移步骤 5](/img/spm/xcode-step-5.png)

完成时，你应该会看到类似这样的屏幕。现在，继续下一节关于添加 `debug.xcconfig` 的内容。

![迁移步骤 6](/img/spm/xcode-step-6.png)

#### 将 debug.xcconfig 添加到项目

从应用信息选项卡中，选择 Add Configuration file...

![XCConfig 步骤 1](/img/spm/xcconfig-step1.png)

然后选择名为 `debug.xcconfig` 的文件

![XCConfig 步骤 2](/img/spm/xcconfig-step2.png)

最后选择 xcconfig 作为你的选择

![XCConfig 步骤 3](/img/spm/xcconfig-step3.png)

至此，你就完成了，可以像往常一样构建和开发。

### 将现有插件转换为 SPM

如果你的插件除了必需的 `[Name]Plugin.m` 和 `[Name]Plugin.h` 之外只包含 Swift 代码，你可以使用 [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter)。

该工具将进行以下更改：

- 在你的主 Swift 插件文件 `[Name]Plugin.swift` 中添加以下必需内容：
  - 为你的类添加对 `CAPBridgedPlugin` 协议的遵循。
  - 为你的类添加 3 个变量：`identifier`、`jsName` 和 `pluginMethods`：
    - `identifier` 将对应 `CAP_PLUGIN` 宏的第一个参数。
    - `jsName` 将对应 `CAP_PLUGIN` 宏的第二个参数。
    - `pluginMethods` 将是传递给 `CAP_PLUGIN` 宏的方法数组。
- 在插件文件夹的根目录创建一个 `Package.swift` 文件。
- 以下文件将被删除，因为它们不再需要：
  - `Plugin.xcodeproj`
  - `Plugin.xcworkspace`
  - `Plugin/Info.plist`
  - `PluginTests/Info.plist`
  - `Podfile`
- 为遵循 SPM 最佳实践，项目文件将移动到 `Sources` 和 `Tests` 目录。
- 插件的 `package.json` 将有以下更改：
  - files 数组将添加以下文件或目录：
    - `ios/Sources`
    - `ios/Tests`
    - `Package.swift`
  - `verify:ios` 将更改为 `xcodebuild -scheme YourPluginName -destination generic/platform=iOS` 以使其继续按预期工作。
- 你的插件 podspec 将被修改，使 `s.source_files` 现在指向 `Sources` 目录而不是 `Plugin` 目录。

更多信息请参阅 [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter) 仓库中的文档。

### 故障排除

添加插件后，尝试在 Xcode 中"重置包缓存"：

![重置包缓存](/img/v6/docs/ios/spm/reset-package.png)
