---
title: Subclassing CAPBridgeViewController
sidebar_label: 自定义视图控制器
description: 如何子类化 CAPBridgeViewController
contributors:
  - ikeith
slug: /ios/viewcontroller
---

# 自定义视图控制器

从 Capacitor 3.0 开始，您可以在应用中创建 `CAPBridgeViewController` 的子类。虽然大多数应用不需要此功能，但它为处理某些特殊用例提供了官方支持方案。

## 何时需要创建子类

以下情况可能需要创建子类：
- 运行时覆盖 Capacitor 的配置值
- 修改 [`WKWebViewConfiguration`](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration) 的属性
- 替换 Capacitor 默认使用的 [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview) 为自定义子类
- 集成需要将代码添加到 [`viewDidLoad()`](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621495-viewdidload) 的第三方 SDK
- 在原生视图显示前进行操控

如需创建自定义子类，请按以下步骤操作：

### 创建 `MyViewController.swift`

首先[打开 Xcode](/main/ios/index.md#opening-the-ios-project)，右键点击 **App** 分组（位于 **App** 目标下），从上下文菜单中选择 **New File...**，在弹出的窗口中选择 **Cocoa Touch Class**，在后续界面中将 **Subclass of:** 设为 `UIViewController`，然后保存文件。

![在Xcode中新建ViewController](../../../../static/img/v4/docs/ios/xcode-create-viewcontroller.png)
![在Xcode中命名ViewController](../../../../static/img/v4/docs/ios/xcode-name-viewcontroller.png)

### 编辑 `Main.storyboard`

接着在项目导航器中选择 `Main.storyboard` 文件，在 **Bridge View Controller Scene** 中选择 **Bridge View Controller**，然后点击右侧的 **Identity Inspector**，将自定义类名修改为 `MyViewController`。

![在Xcode中编辑Storyboard](../../../../static/img/v4/docs/ios/xcode-edit-storyboard.png)

### 编辑 `MyViewController.swift`

最后选择项目导航器中的 `MyViewController.swift` 文件，修改代码以导入 Capacitor 并更改父类：

```swift
import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {
    // 自定义代码
}
```

至此已完成设置！

### 后续步骤

Xcode 在生成文件时通常会自动创建 `viewDidLoad()` 方法。您可以查阅 [`CAPBridgeViewController`](https://github.com/ionic-team/capacitor/blob/4.x/ios/Capacitor/Capacitor/CAPBridgeViewController.swift) 的内联文档，了解可能需要覆盖的 Capacitor 特定方法。任何标记为 `open` 的方法都明确允许子类进行覆盖。