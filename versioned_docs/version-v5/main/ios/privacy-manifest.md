---
title: Privacy Manifest
description: 为 iOS 应用添加隐私清单文件
slug: /ios/privacy-manifest
---

Apple 在 WWDC23 上推出了新的[第三方 SDK 隐私协议](https://developer.apple.com/news/?id=3d8a9yyh)，要求 SDK 作者在其 SDK 内声明 API 使用的批准理由，以增强透明度和用户隐私保护。

自 2024 年 3 月 13 日起，当上传缺少 API 访问批准理由的新应用或更新时，App Store Connect 将向用户发出通知。

**自 2024 年 5 月 1 日起，向 App Store Connect 提交新应用或更新时，必须包含 API 使用的批准理由。**

## 满足要求的步骤

并非所有应用都会收到提示，但某些插件（如 `@capacitor/filesystem` 和 `@capacitor/preferences`）可能需要隐私清单文件。如果您已收到通知：

1. 将 Capacitor 更新至：
   a. `>= 6.0.0`（适用于 Capacitor 6）
   b. `>= 5.7.4`（适用于 Capacitor 5）
   c. `>= 4.8.2`（适用于 Capacitor 4）
   d. Capacitor <= 3 不受支持
2. 使用 VS Code 扩展为您的应用创建隐私清单文件，或手动创建。

### VS Code 扩展

确保已安装 [Ionic VS Code 扩展](https://ionic.link/vscode)并打开您的项目。

在推荐项下，如果您的应用使用了某些 API 的插件，您将看到*添加隐私清单*的提示。

![无清单](/img/v5/docs/ios/no-manifest.png)

选择“是”以创建最基本的隐私清单文件。

扩展随后会将所有需要更改的内容列为推荐项，标题为*缺少隐私清单类别*。例如：

![隐私更改](/img/v5/docs/ios/privacy-change.png)

您必须选择一个原因代码来解释您如何使用该插件。如果不确定，请点击*文档*查看 Apple 关于每个原因代码解释的文档。

请注意，VS Code 扩展为已知插件提供了一套规则以帮助您。如果 Apple 仍因缺少隐私清单原因而拒绝您的应用，可能是因为您使用的插件不在扩展的已知范围内。您可以在 [VS Code 扩展问题跟踪器](https://github.com/ionic-team/vscode-ionic/issues)上提交问题。

### 手动步骤

如果您希望手动创建隐私清单文件，请打开 Xcode，然后：

选择*文件 > 新建文件*。

向下滚动到*资源*部分，选择*应用隐私文件*类型。

点击*下一步*。

在*目标*列表中勾选您的应用。

点击*创建*。

将创建一个名为 `PrivacyInfo.xcprivacy` 的文件。由于在 Xcode UI 中交互式创建此文件较为困难，您可以通过右键单击该文件并选择*使用外部编辑器打开*来手动编辑。

以下是一个示例 `PrivacyInfo.xcprivacy` 文件，该文件通过使用 `@capacitor/preferences` 插件来使用 UserDefaults API。

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

要查找可能需要隐私清单更改的代码和插件，您可以运行类似[此脚本](https://github.com/Wooder/ios_17_required_reason_api_scanner)的命令，例如 `sh required_reason_api_text_scanner.sh node_modules`。

要选择正确的原因代码（如上述示例中的 `CA92.1`），您需要阅读 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api)。

## 提交到应用商店前

在提交到 App Store 之前，您可能需要披露用户追踪、追踪域名或收集的其他数据类型，这些内容因您的应用而异。更多信息请参阅 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)。