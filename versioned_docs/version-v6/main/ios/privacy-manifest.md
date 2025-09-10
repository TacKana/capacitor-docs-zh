---
title: 隐私清单文件
description: 为iOS应用添加隐私清单文件
slug: /ios/privacy-manifest
---

苹果在WWDC23上推出了新的[第三方SDK隐私协议](https://developer.apple.com/news/?id=3d8a9yyh)，要求SDK开发者在其SDK中声明使用API的合规理由，以提高透明度和用户隐私保护。

自2024年3月13日起，当开发者上传缺少API使用合规声明的新应用或更新时，App Store Connect将发出通知。

**2024年5月1日起，所有提交至App Store Connect的新应用或更新都必须包含API使用合规声明。**

## 合规操作指南

并非所有应用都会触发提示，但使用某些插件（如`@capacitor/filesystem`和`@capacitor/preferences`）可能需要添加隐私清单文件。若您已收到相关通知：

1. 升级Capacitor至：
a. `>= 6.0.0`（Capacitor 6）
b. `>= 5.7.4`（Capacitor 5）
c. `>= 4.8.2`（Capacitor 4）
d. Capacitor 3及以下版本不受支持
2. 可选择使用VS Code扩展自动生成隐私清单文件，或手动创建

### 使用VS Code扩展

确保已安装[Ionic VS Code扩展](https://ionic.link/vscode)并打开项目。

在推荐操作中，若检测到应用使用了需要声明的API插件，将显示*添加隐私清单*选项。

![无清单文件](/img/v6/docs/ios/no-manifest.png)

选择"是"可创建基础隐私清单文件。

扩展随后会列出所有需要补充的隐私声明项，标记为*缺失隐私清单类别*。例如：

![隐私变更](/img/v6/docs/ios/privacy-change.png)

需为每个插件选择一个合规理由代码。若不确定如何选择，可点击*文档*查看苹果对各理由代码的官方说明。

请注意，VS Code扩展内置了常见插件的合规规则。若仍因隐私清单问题被苹果拒绝，可能是使用了扩展未识别的插件，可在[扩展问题追踪器](https://github.com/ionic-team/vscode-ionic/issues)提交问题。

### 手动创建步骤

如需手动创建隐私清单文件，请在Xcode中：

选择*文件 > 新建文件*

滚动至*资源*区域，选择*App隐私文件*类型

点击*下一步*

在*目标*列表勾选您的应用

点击*创建*

将生成`PrivacyInfo.xcprivacy`文件。由于Xcode界面编辑较复杂，建议右键选择*用外部编辑器打开*进行手动编辑。

以下是通过`@capacitor/preferences`插件使用UserDefaults API的示例文件：

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

可使用[此脚本](https://github.com/Wooder/ios_17_required_reason_api_scanner)扫描可能需声明的插件，运行命令：`sh required_reason_api_text_scanner.sh node_modules`

选择正确的理由代码（如上例中的`CA92.1`）需参考[苹果官方文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api)。

## 应用商店提交前

提交至App Store前，可能还需声明用户追踪、追踪域名或其他应用特有的数据收集行为。详见[苹果官方文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)。