---
title: 隐私清单
description: 为您的 iOS 应用添加隐私清单
slug: /ios/privacy-manifest
---

Apple 最近在 WWDC23 上引入了新的[第三方 SDK 隐私协议](https://developer.apple.com/news/?id=3d8a9yyh)，要求 SDK 作者在其 SDK 中声明使用 API 的已批准原因，以增强透明度和用户隐私。

从 2024 年 3 月 13 日起，当上传新的或更新的应用而没有访问某些 API 的已批准原因时，App Store Connect 将通知用户。

**自 2024 年 5 月 1 日起，在向 App Store Connect 提交新的或更新的应用时，您必须包含已批准的原因。**

## 满足要求的步骤

并非所有应用都会被标记，但某些插件如 `@capacitor/filesystem` 和 `@capacitor/preferences` 可能需要隐私清单文件。如果您收到了通知：

1. 更新 Capacitor 到：
   a. Capacitor 6 的 `>= 6.0.0`
   b. Capacitor 5 的 `>= 5.7.4`
   c. Capacitor 4 的 `>= 4.8.2`
   d. Capacitor <= 3 不受支持
2. 使用 VS Code 扩展为您的应用创建隐私清单文件，或手动创建。

### VS Code 扩展

确保您已安装 [Ionic VS Code 扩展](https://ionic.link/vscode) 并打开您的项目。

如果您的应用使用了使用某些 API 的插件，在推荐下您将看到 *Add Privacy Manifest*。

![无清单](/img/v6/docs/ios/no-manifest.png)

选择"是"以创建最低要求的隐私清单文件。

然后，扩展将列出所有需要的更改，作为标题为 *Missing Privacy Manifest Category* 的推荐。例如：

![隐私更改](/img/v6/docs/ios/privacy-change.png)

您必须选择一个原因代码来解释您如何使用该插件。如果您不确定，请点击 *Docs* 查看 Apple 关于每个原因代码解释的文档。

请注意，VS Code 扩展有一套针对已知插件的规则来帮助您。如果您仍然因缺少隐私清单原因而被 Apple 拒绝，可能是因为您使用的插件是扩展所不知道的。您可以在 [VS Code 扩展问题跟踪器](https://github.com/ionic-team/vscode-ionic/issues) 上提交问题。

### 手动步骤

如果您更喜欢手动创建隐私清单文件，请打开 Xcode 然后：

选择 *File > New File*。

向下滚动到 *Resource* 部分，选择 *App Privacy File* 类型。

点击 *Next*。

在 *Targets* 列表中勾选您的应用。

点击 *Create*。

一个名为 `PrivacyInfo.xcprivacy` 的文件将被创建。在 Xcode UI 中交互式创建此文件具有挑战性，因此通过右键单击它并选择 *Open with External Editor* 来手动编辑可能更容易。

作为示例文件，以下是一个使用 UserDefaults API（通过使用 `@capacitor/preferences` 插件）的 `PrivacyInfo.xcprivacy` 文件。

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

要查找可能需要隐私清单更改的代码和插件，您可以使用像[这个脚本](https://github.com/Wooder/ios_17_required_reason_api_scanner)这样的工具，运行 `sh required_reason_api_text_scanner.sh node_modules`。

要选择正确的原因代码（如上述示例中的 `CA92.1`），您需要阅读 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api)。

## 提交商店前

在提交 App Store 之前，您可能需要披露用户跟踪、跟踪域或您的应用特有的其他数据类型集合。有关更多信息，请参阅 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)。
