---
title: 子类化 CAPBridgeViewController
sidebar_label: 自定义 ViewController
description: 如何子类化 CAPBridgeViewController
contributors:
  - ikeith
slug: /ios/viewcontroller
---

# 自定义 ViewController

自 Capacitor 3.0 起，您可以在应用中子类化 `CAPBridgeViewController`。大多数应用不需要此功能，但它为处理某些特定用例提供了支持的机制。

## 何时创建子类

需要子类化的一些例子包括：在运行时覆盖 Capacitor 的配置值、更改 [`WKWebViewConfiguration`](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration) 的属性、替换 Capacitor 使用的 [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview) 为自定义子类、集成建议在 [`viewDidLoad()`](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621495-viewdidload) 中添加代码的第三方 SDK、在原生视图显示到屏幕之前操作它们，或[注册自定义插件](../ios/custom-code.md#注册插件)。

如果您确实需要创建自定义子类，请按照以下步骤操作。

### 创建 `MyViewController.swift`

首先，通过[打开 Xcode](/main/ios/index.md#打开-ios-项目) 创建 `MyViewController.swift` 文件，右键点击 **App** 组（在 **App** target 下），从上下文菜单中选择 **New File...**，在窗口中选择 **Cocoa Touch Class**，在下一个屏幕中将 **Subclass of:** 设置为 `UIViewController`，然后保存文件。

![在 Xcode 中新建 ViewController](../../../static/img/v6/docs/ios/xcode-create-viewcontroller.png)
![在 Xcode 中命名 ViewController](../../../static/img/v6/docs/ios/xcode-name-viewcontroller.png)

### 编辑 `Main.storyboard`

接下来，在 Project Navigator 中选择 `Main.storyboard` 文件，选择 **Bridge View Controller Scene** 中的 **Bridge View Controller**，在右侧选择 **Identity Inspector**，并将自定义类的名称更改为 `MyViewController`。

![在 Xcode 中编辑 Storyboard](../../../static/img/v6/docs/ios/xcode-edit-storyboard.png)

### 编辑 `MyViewController.swift`

最后，在 Project Navigator 中选择 `MyViewController.swift` 文件并进行编辑，导入 Capacitor 并更改父类：

```swift
import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {
    // 额外代码
}
```

大功告成！

### 后续步骤

Xcode 在生成文件时应该已经为您创建了一个 `viewDidLoad()` 方法，但请查阅 [`CAPBridgeViewController`](https://github.com/ionic-team/capacitor/blob/main/ios/Capacitor/Capacitor/CAPBridgeViewController.swift) 中的内联文档，以了解您可能需要用到的 Capacitor 特定方法。任何标记为 `open` 的内容都明确暴露给子类进行重写。
