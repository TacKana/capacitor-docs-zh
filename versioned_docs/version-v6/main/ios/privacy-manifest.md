---
title: Privacy Manifest
description: 为 iOS 应用添加隐私清单（Privacy Manifest）
slug: /ios/privacy-manifest
---

在 WWDC23 上，Apple 为第三方 SDK 引入了新的[隐私协议](https://developer.apple.com/news/?id=3d8a9yyh)，要求 SDK 作者在其 SDK 中声明 API 使用的原因，以增强透明度和用户隐私。

从 2024 年 3 月 13 日开始，当上传新的或更新的应用程序到 App Store Connect 时，如果未提供访问特定 API 的批准理由，系统将通知用户。

**从 2024 年 5 月 1 日开始，向 App Store Connect 提交新的或更新的应用程序时，必须包含批准的理由。**

## 满足要求的步骤

并非所有应用都会被标记，但某些插件（例如 `@capacitor/filesystem` 和 `@capacitor/preferences`）可能需要隐私清单文件。如果您已收到通知：

1. 更新 Capacitor 至：
   a. `>= 6.0.0`（适用于 Capacitor 6）
   b. `>= 5.7.4`（适用于 Capacitor 5）
   c. `>= 4.8.2`（适用于 Capacitor 4）
   d. 不支持 Capacitor <= 3
2. 使用 VS Code 扩展为您的应用创建隐私清单文件，或者手动创建。

### VS Code 扩展

确保您已安装 [Ionic VS Code 扩展](https://ionic.link/vscode) 并打开您的项目。

在推荐列表中，如果您的应用使用了某些 API 的插件，您将看到 *添加隐私清单* 的提示。

![无清单](/img/v6/docs/ios/no-manifest.png)

选择“是”以创建最基本的隐私清单文件。

随后，扩展将列出所有需要更改的内容，并以 *缺少隐私清单类别* 为标题显示为推荐项。例如：

![隐私变更](/img/v6/docs/ios/privacy-change.png)

您必须选择一个原因代码来解释您如何使用该插件。如果不确定，请点击 *文档* 查看 Apple 关于每个原因代码解释的文档。

请注意，VS Code 扩展针对已知插件有一套规则来帮助您。如果您仍然因缺少隐私清单原因而被 Apple 拒绝，可能是因为您使用的插件不在扩展的已知范围内。您可以在 [VS Code 扩展问题跟踪器](https://github.com/ionic-team/vscode-ionic/issues) 上提出问题。

### 手动步骤

如果您希望手动创建隐私清单文件，请打开 Xcode，然后：

选择 *文件 > 新建文件*。

滚动到 *资源* 部分并选择 *App Privacy File* 类型。

点击 *下一步*。

在 *目标* 列表中勾选您的应用。

点击 *创建*。

将创建一个名为 `PrivacyInfo.xcprivacy` 的文件。此文件在 Xcode UI 中交互式创建较为困难，因此手动编辑可能更简单：右键单击该文件并选择 *使用外部编辑器打开*。

以下是一个示例文件，展示了通过使用 `@capacitor/preferences` 插件而访问 UserDefaults API 的 `PrivacyInfo.xcprivacy` 文件。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyTracking</key>
    <false/>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <dict>
        <key>NSPrivacyAccessedAPIType</key>
        <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
        <key>NSPrivacyAccessedAPITypeReasons</key>
        <array>
          <string>CA92.1</string>
        </array>
      </dict>
    </array>
    <key>NSPrivacyTrackingDomains</key>
    <array/>
  </dict>
</plist>
```

要查找可能需要更改隐私清单的代码和插件，您可以运行类似 [此脚本](https://github.com/Wooder/ios_17_required_reason_api_scanner) 的脚本，例如运行 `sh required_reason_api_text_scanner.sh node_modules`。

要选择正确的原因代码（如上例中的 `CA92.1`），您需要阅读 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api)。

## 提交到商店前

在提交到 App Store 之前，您可能需要披露用户跟踪、跟踪域或收集其他对您的应用唯一的数据类型。更多信息请参阅 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)。