---
title: 隐私清单
description: 为 iOS 应用添加隐私清单
slug: /ios/privacy-manifest
---

Apple 最近在 WWDC23 上为第三方 SDK 引入了新的[隐私协议](https://developer.apple.com/news/?id=3d8a9yyh)，要求 SDK 作者声明其 SDK 中 API 使用的批准理由，以增强透明度和用户隐私。

自 2024 年 3 月 13 日起，当上传新的或更新的应用且未提供访问某些 API 的批准理由时，App Store Connect 将通知用户。

**自 2024 年 5 月 1 日起，在向 App Store Connect 提交新的或更新的应用时，你必须包含批准理由。**

## 满足要求的步骤

并非所有应用都会被标记，但某些插件（如 `@capacitor/filesystem` 和 `@capacitor/preferences`）可能需要隐私清单文件。如果你收到了通知：

1. 将 Capacitor 更新到：
   a. `>= 7.0.0`（针对 Capacitor 7）
   b. `>= 6.0.0`（针对 Capacitor 6）
   c. `>= 5.7.4`（针对 Capacitor 5）
   d. `>= 4.8.2`（针对 Capacitor 4）
   e. Capacitor <= 3 不受支持
2. 使用 VS Code 扩展为你的应用创建隐私清单文件，或手动创建。

### VS Code 扩展

确保已安装 [Ionic VS Code 扩展](https://ionic.link/vscode) 并打开你的项目。

如果你的应用使用了使用某些 API 的插件，你将在推荐项下看到*添加隐私清单*。

![无清单](/img/v6/docs/ios/no-manifest.png)

选择"是"以创建最简隐私清单文件。

然后扩展将以*缺失隐私清单类别*为标题列出所有需要的更改作为推荐项。例如：

![隐私更改](/img/v6/docs/ios/privacy-change.png)

你必须选择一个原因代码来解释你如何使用该插件。如果不确定，请点击*文档*以查看 Apple 关于每个原因代码解释的文档。

请注意，VS Code 扩展拥有一套针对已知插件的规则来帮助你。如果你仍然因为缺少隐私清单原因而被 Apple 拒绝，可能是因为你使用的插件扩展程序不认识。你可以在 [VS Code 扩展问题跟踪器](https://github.com/ionic-team/vscode-ionic/issues) 上提交 issue。

### 手动步骤

如果你更愿意手动执行创建隐私清单文件的步骤，请打开 Xcode，然后：

选择 *File > New File*。

向下滚动到 *Resource* 部分，选择 *App Privacy File* 类型。

点击 *Next*。

在 *Targets* 列表中勾选你的应用。

点击 *Create*。

将创建一个名为 `PrivacyInfo.xcprivacy` 的文件。在 Xcode UI 中以交互方式创建此文件比较困难，因此右键单击并选择*使用外部编辑器打开*来手动编辑可能会更容易。

以下是一个示例 `PrivacyInfo.xcprivacy` 文件，它通过使用 `@capacitor/preferences` 插件使用了 UserDefaults API。

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

要查找可能需要隐私清单更改的代码和插件，你可以使用类似[这个](https://github.com/Wooder/ios_17_required_reason_api_scanner)的脚本，运行 `sh required_reason_api_text_scanner.sh node_modules`。

要选择正确的原因代码（如上述示例中的 `CA92.1`），你需要阅读 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api)。

## 提交商店前

在提交 App Store 之前，你可能需要披露用户跟踪、跟踪域或对你的应用而言独有的其他数据类型的收集。有关更多信息，请参阅 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)。
