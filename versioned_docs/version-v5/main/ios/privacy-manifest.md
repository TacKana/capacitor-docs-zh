---
title: 隐私清单
description: 为你的 iOS 应用添加隐私清单
slug: /ios/privacy-manifest
---

在 WWDC23 上，Apple 最近针对第三方 SDK 引入了新的[隐私协议](https://developer.apple.com/news/?id=3d8a9yyh)，要求 SDK 作者在其 SDK 中声明 API 使用的批准原因，以增强透明度和用户隐私。

自 2024 年 3 月 13 日起，当上传新的或更新的应用时，如果缺少访问某些 API 的批准原因，App Store Connect 将通知用户。

**自 2024 年 5 月 1 日起，向 App Store Connect 提交新的或更新的应用时，你将需要包含批准原因。**

## 满足要求的步骤

并非所有应用都会被标记，但某些插件（如 `@capacitor/filesystem` 和 `@capacitor/preferences`）可能需要隐私清单文件。如果你收到了通知：

1. 更新 Capacitor 至：
   a. `>= 6.0.0`（针对 Capacitor 6）
   b. `>= 5.7.4`（针对 Capacitor 5）
   c. `>= 4.8.2`（针对 Capacitor 4）
   d. Capacitor <= 3 不受支持
2. 使用 VS Code 扩展为你的应用创建隐私清单文件，或手动创建。

### VS Code 扩展

确保你已安装 [Ionic VS Code 扩展](https://ionic.link/vscode) 并打开项目。

在推荐项下，如果你的应用程序使用了某些需要特定 API 的插件，你会看到 *添加隐私清单*。

![无清单](/img/v5/docs/ios/no-manifest.png)

选择“是”以创建最基本的隐私清单文件。

然后，扩展将列出所有需要更改的推荐项，标题为 *缺失隐私清单类别*。例如：

![隐私更改](/img/v5/docs/ios/privacy-change.png)

你必须选择一个原因代码来解释你如何使用该插件。如果不确定，请点击 *文档* 查看 Apple 关于每个原因代码解释的文档。

请注意，VS Code 扩展为已知插件提供了一套规则来帮助你。如果 Apple 仍然因缺少隐私清单原因而拒绝你的应用，可能是因为你使用了扩展不认识的插件。你可以在 [VS Code 扩展问题追踪器](https://github.com/ionic-team/vscode-ionic/issues) 上提交问题。

### 手动步骤

如果你更喜欢手动创建隐私清单文件，请打开 Xcode，然后：

选择 *文件 > 新建文件*。

向下滚动到 *资源* 部分，选择 *应用隐私文件* 类型。

点击 *下一步*。

在 *Targets* 列表中勾选你的应用。

点击 *创建*。

将创建一个名为 `PrivacyInfo.xcprivacy` 的文件。在 Xcode UI 中交互式创建此文件比较困难，因此右键单击该文件并选择 *使用外部编辑器打开* 进行手动编辑可能更容易。

作为一个示例文件，这里是一个 `PrivacyInfo.xcprivacy` 文件，它通过使用 `@capacitor/preferences` 插件来使用 UserDefaults API。

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

要查找可能需要隐私清单更改的代码和插件，你可以使用像 [这个](https://github.com/Wooder/ios_17_required_reason_api_scanner) 的脚本，运行 `sh required_reason_api_text_scanner.sh node_modules`。

要选择正确的原因代码（如上例中的 `CA92.1`），你需要阅读 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api)。

## 提交应用商店前

在提交到 App Store 之前，你可能需要披露用户追踪、追踪域或针对你应用独特的数据类型收集。更多信息请参阅 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)。