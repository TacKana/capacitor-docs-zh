---
title: 隐私清单
description: 为您的 iOS 应用添加隐私清单
slug: /ios/privacy-manifest
---

# 隐私清单

Apple 最近在 WWDC23 上引入了新的[第三方 SDK 隐私协议](https://developer.apple.com/news/?id=3d8a9yyh)，要求 SDK 作者在其 SDK 中声明 API 使用的批准原因，以增强透明度和用户隐私。

从 2024 年 3 月 13 日开始，当新应用或更新应用在未获得批准原因的情况下上传以访问某些 API 时，App Store Connect 将通知用户。

**从 2024 年 5 月 1 日开始，在向 App Store Connect 提交新应用或更新应用时，您需要包含批准的原因。**

## 满足要求的步骤

并非所有应用都会被标记，但某些插件如 `@capacitor/filesystem` 和 `@capacitor/preferences` 可能需要隐私清单文件。如果您收到了通知：

1. 将 Capacitor 更新到：
   a. `>= 6.0.0`（Capacitor 6）
   b. `>= 5.7.4`（Capacitor 5）
   c. `>= 4.8.2`（Capacitor 4）
   d. Capacitor <= 3 不受支持
2. 使用 VS Code 扩展为您的应用创建隐私清单文件，或手动创建。

### VS Code 扩展

确保您已安装 [Ionic VS Code 扩展](https://ionic.link/vscode)并打开您的项目。

如果您的应用使用了使用某些 API 的插件，您将在推荐项中看到*添加隐私清单*。

![无清单](/img/v5/docs/ios/no-manifest.png)

选择"是"以创建最低限度的隐私清单文件。

然后，扩展将列出所有需要的更改，作为标题为*缺少隐私清单类别*的建议。例如：

![隐私更改](/img/v5/docs/ios/privacy-change.png)

您必须选择其中一个原因代码来解释您如何使用该插件。如果您不确定，请点击*文档*查看 Apple 关于每个原因代码的说明文档。

请注意，VS Code 扩展包含一组针对已知插件的规则以帮助您。如果 Apple 仍然因缺少隐私清单原因而拒绝您的应用，可能是因为您使用的插件是扩展所不知道的。您可以在 [VS Code 扩展问题跟踪器](https://github.com/ionic-team/vscode-ionic/issues)上提出问题。

### 手动步骤

如果您更愿意手动执行创建隐私清单文件的步骤，请打开 Xcode 然后：

选择 *File > New File*。

向下滚动到 *Resource* 部分，选择 *App Privacy File* 类型。

点击 *Next*。

在 *Targets* 列表中勾选您的应用。

点击 *Create*。

将创建一个名为 `PrivacyInfo.xcprivacy` 的文件。在 Xcode UI 中交互式创建此文件具有挑战性，因此通过右键点击并选择 *Open with External Editor* 来手动编辑可能更容易。

以下是一个示例 `PrivacyInfo.xcprivacy` 文件，它通过使用 `@capacitor/preferences` 插件来使用 UserDefaults API。

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

要查找可能需要隐私清单更改的代码和插件，您可以使用像[这个](https://github.com/Wooder/ios_17_required_reason_api_scanner)这样的脚本，运行 `sh required_reason_api_text_scanner.sh node_modules`。

要选择正确的原因代码（如上面示例中的 `CA92.1`），您需要阅读 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api)。

## 提交商店前

在提交 App Store 之前，您可能需要披露用户跟踪、跟踪域或您的应用特有的其他数据类型收集。有关更多信息，请参阅 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)。
