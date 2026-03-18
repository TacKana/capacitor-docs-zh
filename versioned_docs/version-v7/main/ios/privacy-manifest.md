---
title: Privacy Manifest
description: 为 iOS 应用添加隐私清单
slug: /ios/privacy-manifest
---

Apple 在 WWDC23 上推出了针对第三方 SDK 的新[隐私协议](https://developer.apple.com/news/?id=3d8a9yyh)，要求 SDK 开发者在其 SDK 内声明 API 使用的批准原因，以增强透明度和用户隐私保护。

自 2024 年 3 月 13 日起，当上传新的或更新的应用时，如果缺少访问特定 API 的批准原因，App Store Connect 将会向用户发出通知。

**自 2024 年 5 月 1 日起，向 App Store Connect 提交新的或更新的应用时，必须包含批准原因。**

## 满足要求的步骤

并非所有应用都会被标记，但某些插件（例如 `@capacitor/filesystem` 和 `@capacitor/preferences`）可能需要隐私清单文件。如果您已收到通知：

1.  将 Capacitor 更新至：
    a. `>= 7.0.0`（适用于 Capacitor 7）
    b. `>= 6.0.0`（适用于 Capacitor 6）
    c. `>= 5.7.4`（适用于 Capacitor 5）
    d. `>= 4.8.2`（适用于 Capacitor 4）
    e. Capacitor <= 3 不受支持
2.  使用 VS Code 扩展为您的应用创建隐私清单文件，或手动创建。

### VS Code 扩展

确保您已安装 [Ionic VS Code 扩展](https://ionic.link/vscode)并打开您的项目。

在推荐列表下，如果您的应用使用了某些调用特定 API 的插件，您会看到 *添加隐私清单* 的提示。

![无清单](/img/v6/docs/ios/no-manifest.png)

选择“是”以创建最基本的隐私清单文件。

然后，扩展程序将以 *缺失隐私清单类别* 为标题，列出所有需要进行的更改。例如：

![隐私变更](/img/v6/docs/ios/privacy-change.png)

您必须选择其中一个原因代码来解释您如何使用该插件。如果不确定，可以点击 *文档* 查看 Apple 关于每个原因代码解释的文档。

请注意，VS Code 扩展为已知插件提供了一套规则来帮助您。如果您仍然因为缺少隐私清单原因而被 Apple 拒绝，可能是因为您使用的插件不在扩展的已知列表中。您可以在 [VS Code 扩展问题跟踪器](https://github.com/ionic-team/vscode-ionic/issues) 上提出 issue。

### 手动步骤

如果您更倾向于手动创建隐私清单文件，请打开 Xcode，然后：

选择 *File > New File*。

滚动到 *Resource* 部分，选择 *App Privacy File* 类型。

点击 *Next*。

在 *Targets* 列表中勾选您的应用。

点击 *Create*。

一个名为 `PrivacyInfo.xcprivacy` 的文件将被创建。在 Xcode 界面中交互式地编辑此文件可能比较困难，因此手动编辑可能更容易：右键单击该文件并选择 *Open with External Editor*。

以下是一个示例 `PrivacyInfo.xcprivacy` 文件，该文件通过使用 `@capacitor/preferences` 插件而使用了 UserDefaults API。

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

要查找可能需要修改隐私清单的代码和插件，您可以运行类似 [此脚本](https://github.com/Wooder/ios_17_required_reason_api_scanner) 的工具，例如执行 `sh required_reason_api_text_scanner.sh node_modules`。

要选择正确的原因代码（如上面示例中的 `CA92.1`），您需要查阅 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api)。

## 提交到应用商店前

在提交到 App Store 之前，您可能需要披露用户跟踪、跟踪域或您的应用特有的其他数据类型的收集情况。有关更多信息，请参阅 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)。