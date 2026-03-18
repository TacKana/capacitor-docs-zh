---
title: 隐私清单
description: 为你的 iOS 应用添加隐私清单
slug: /ios/privacy-manifest
---

在 WWDC23 大会上，苹果公司最近针对第三方 SDK 推出了新的[隐私协议](https://developer.apple.com/news/?id=3d8a9yyh)，要求 SDK 开发者在他们的 SDK 中声明使用 API 的批准理由，以提高透明度和用户隐私保护。

自 **2024 年 3 月 13 日起**，当你在 App Store Connect 上传新应用或更新应用时，如果没有提交访问某些 API 的批准理由，系统将会通知用户。

**自 2024 年 5 月 1 日起**，当你向 App Store Connect 提交新应用或应用更新时，**必须**包含批准理由。

## 满足要求的步骤

并非所有应用都会收到标记，但某些插件，例如 `@capacitor/filesystem` 和 `@capacitor/preferences`，可能需要隐私清单文件。如果你收到了通知：

1. 将 Capacitor 更新至：
   a. `>= 6.0.0` (适用于 Capacitor 6)
   b. `>= 5.7.4` (适用于 Capacitor 5)
   c. `>= 4.8.2` (适用于 Capacitor 4)
   d. Capacitor <= 3 版本不受支持
2. 使用 VS Code 扩展为你的应用创建隐私清单文件，或者手动创建。

### 使用 VS Code 扩展

请确保已安装 [Ionic VS Code 扩展](https://ionic.link/vscode) 并打开你的项目。

在“建议”部分，如果你的应用使用了带有特定 API 的插件，你会看到 *添加隐私清单* 的提示。

![无清单](/img/v4/docs/ios/no-manifest.png)

选择“是”以创建最基本的隐私清单文件。

然后，扩展程序会将所有需要的更改以“缺少隐私清单类别”为标题列出建议。例如：

![隐私变更](/img/v4/docs/ios/privacy-change.png)

你必须选择一个理由代码来解释你如何使用该插件。如果不确定，请点击 *文档* 查看苹果关于每个理由代码解释的官方文档。

请注意，VS Code 扩展针对已知插件有一套规则来帮助你。如果你仍然因为缺少隐私清单理由而被苹果拒绝，可能是因为你使用的插件是扩展程序未知的。你可以在 [VS Code 扩展问题跟踪器](https://github.com/ionic-team/vscode-ionic/issues) 上提交问题。

### 手动操作步骤

如果你更倾向于手动创建隐私清单文件，请打开 Xcode，然后：

选择 *文件 > 新建文件*。

向下滚动到 *资源* 部分，选择 *App Privacy File* 类型。

点击 *下一步*。

在 *目标* 列表中勾选你的应用。

点击 *创建*。

将会创建一个名为 `PrivacyInfo.xcprivacy` 的文件。在 Xcode UI 中交互式地创建此文件比较困难，因此手动编辑可能更容易：右键点击该文件并选择 *使用外部编辑器打开*。

作为一个示例文件，这里是一个 `PrivacyInfo.xcprivacy` 文件，它通过使用 `@capacitor/preferences` 插件来访问 UserDefaults API。

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

要查找可能需要修改隐私清单的代码和插件，你可以使用类似 [这个脚本](https://github.com/Wooder/ios_17_required_reason_api_scanner) 的工具，运行命令 `sh required_reason_api_text_scanner.sh node_modules`。

要选择正确的理由代码（如上例中的 `CA92.1`），你需要阅读 [苹果官方文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api)。

## 提交到应用商店之前

在提交到 App Store 之前，你可能需要披露用户追踪信息、追踪域名或你的应用特有的其他数据类型收集情况。更多信息请参阅 [苹果官方文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)。