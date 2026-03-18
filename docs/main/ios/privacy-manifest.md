---
title: Privacy Manifest
description: 为您的 iOS 应用添加隐私清单
slug: /ios/privacy-manifest
---

在 WWDC23 上，苹果最近推出了针对第三方 SDK 的[新隐私协议](https://developer.apple.com/news/?id=3d8a9yyh)，要求 SDK 作者在其 SDK 内声明 API 使用的批准原因，以增强透明度和用户隐私。

自 2024 年 3 月 13 日起，当上传的新应用或更新应用在访问某些 API 时未提供批准原因，App Store Connect 将通知用户。

**自 2024 年 5 月 1 日起，在向 App Store Connect 提交新应用或更新应用时，您将需要包含批准原因。**

## 满足要求的步骤

并非所有应用都会被标记，但某些插件（如 `@capacitor/filesystem` 和 `@capacitor/preferences`）可能需要隐私清单文件。如果您收到了通知：

1. 更新 Capacitor 到以下版本：
a. `>= 7.0.0`（适用于 Capacitor 7）
b. `>= 6.0.0`（适用于 Capacitor 6）
c. `>= 5.7.4`（适用于 Capacitor 5）
d. `>= 4.8.2`（适用于 Capacitor 4）
e. Capacitor <= 3 不受支持
2. 使用 VS Code 扩展为您的应用创建隐私清单文件，或手动创建。

### VS Code 扩展

确保已安装 [Ionic VS Code 扩展](https://ionic.link/vscode) 并打开您的项目。

在推荐项下，如果您的应用使用了某些 API 的插件，您会看到 *添加隐私清单*。

![无隐私清单](/img/v6/docs/ios/no-manifest.png)

选择“是”以创建最基本的隐私清单文件。

随后，扩展将列出所有需要更改的推荐项，标题为 *缺少隐私清单类别*。例如：

![隐私变更](/img/v6/docs/ios/privacy-change.png)

您必须选择一个原因代码来解释您如何使用该插件。如果不确定，请点击 *文档* 查看苹果关于每个原因代码解释的文档。

请注意，VS Code 扩展针对已知插件有一套规则来帮助您。如果您仍然因缺少隐私清单原因而被苹果拒绝，可能是因为您使用的插件扩展程序未知。您可以在 [VS Code 扩展问题跟踪器](https://github.com/ionic-team/vscode-ionic/issues) 上提交问题。

### 手动步骤

如果您更倾向于手动创建隐私清单文件，请打开 Xcode，然后：

选择 *文件 > 新建文件*。

滚动到 *资源* 部分，选择 *应用隐私文件* 类型。

点击 *下一步*。

在 *目标* 列表中勾选您的应用。

点击 *创建*。

将创建一个名为 `PrivacyInfo.xcprivacy` 的文件。由于在 Xcode 界面中交互式创建此文件可能比较困难，您可以通过右键单击它并选择 *使用外部编辑器打开* 来手动编辑。

以下是一个示例 `PrivacyInfo.xcprivacy` 文件，它通过使用 `@capacitor/preferences` 插件来访问 UserDefaults API。

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

要查找可能需要更新隐私清单的代码和插件，您可以运行类似 [这个脚本](https://github.com/Wooder/ios_17_required_reason_api_scanner) 的脚本，例如执行 `sh required_reason_api_text_scanner.sh node_modules`。

要选择正确的原因代码（例如上面示例中的 `CA92.1`），您需要阅读 [苹果的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api)。

## 提交到应用商店之前

在提交到 App Store 之前，您可能需要披露用户追踪、追踪域或您的应用独有的其他数据类型收集情况。更多信息，请参阅 [苹果的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)。