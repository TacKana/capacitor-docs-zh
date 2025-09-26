---
title: 隐私清单文件
description: 为iOS应用添加隐私清单文件
slug: /ios/privacy-manifest
---

在WWDC23大会上，苹果公司推出了针对第三方SDK的[全新隐私协议](https://developer.apple.com/news/?id=3d8a9yyh)，要求SDK开发者必须在其代码中声明使用特定API的核准理由，以提高透明度和用户隐私保护。

自2024年3月13日起，当开发者向App Store Connect提交未声明API使用理由的新应用或更新时，系统会向用户发出通知。

**从2024年5月1日起，向App Store Connect提交新应用或更新时必须包含API使用核准理由。**

## 合规操作指南

并非所有应用都会触发要求，但使用某些插件（如`@capacitor/filesystem`和`@capacitor/preferences`）可能需要添加隐私清单文件。若您已收到相关通知：

1. 请将Capacitor升级至：
a. Capacitor 7需`>= 7.0.0`
b. Capacitor 6需`>= 6.0.0`
c. Capacitor 5需`>= 5.7.4`
d. Capacitor 4需`>= 4.8.2`
e. Capacitor 3及以下版本不受支持
2. 可选择使用VS Code扩展自动创建隐私清单文件，或手动创建

### 使用VS Code扩展

确保已安装[Ionic VS Code扩展](https://ionic.link/vscode)并打开项目。

在推荐操作区域，如果应用使用了涉及特定API的插件，您会看到*添加隐私清单*的提示。

![无清单文件](/img/v6/docs/ios/no-manifest.png)

选择"是"创建基础版隐私清单文件。

扩展随后会列出所有需要补充的隐私分类条目，标记为*缺失隐私清单分类*。例如：

![隐私变更](/img/v6/docs/ios/privacy-change.png)

您需要选择合适的原因代码来说明插件的使用场景。如果不确定，可点击*文档*查看苹果官方对每个原因代码的详细解释。

请注意，VS Code扩展内置了常见插件的规则建议。若仍因隐私清单问题被苹果拒绝，可能是使用了扩展无法识别的插件。此时可在[VS Code扩展问题追踪器](https://github.com/ionic-team/vscode-ionic/issues)提交问题。

### 手动创建步骤

如需手动创建隐私清单文件，请按以下步骤操作：

1. 在Xcode中选择*文件 > 新建文件*
2. 滚动至*资源*部分，选择*App隐私文件*类型
3. 点击*下一步*
4. 在*目标*列表中勾选您的应用
5. 点击*创建*

系统将生成名为`PrivacyInfo.xcprivacy`的文件。由于Xcode界面操作较复杂，建议右键该文件选择*用外部编辑器打开*进行编辑。

以下是使用`@capacitor/preferences`插件（涉及UserDefaults API）的示例文件：

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

如需检测项目中可能涉及隐私清单变更的代码和插件，可运行[此脚本](https://github.com/Wooder/ios_17_required_reason_api_scanner)，命令为`sh required_reason_api_text_scanner.sh node_modules`。

选择正确的原因代码（如示例中的`CA92.1`）时，请参考[苹果官方文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api)。

## 应用商店提交前准备

提交至App Store前，您可能需要根据应用实际情况声明用户追踪、追踪域名或其他数据类型收集情况。详见[苹果官方文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)。