---
title: Subclassing CAPBridgeViewController
sidebar_label: 自定义 ViewController
description: 如何子类化 CAPBridgeViewController
contributors:
  - ikeith
slug: /ios/viewcontroller
---

# 自定义 ViewController

从 Capacitor 3.0 开始，您可以在应用程序中创建 `CAPBridgeViewController` 的子类。虽然大多数应用程序不需要此功能，但它为处理一些特殊用例提供了官方支持。

## 何时需要创建子类

以下是一些需要创建子类的情况示例：在运行时覆盖 Capacitor 的配置值、更改 [`WKWebViewConfiguration`](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration) 的属性、为 Capacitor 替换使用自定义的 [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview) 子类、集成建议将代码添加到 [`viewDidLoad()`](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621495-viewdidload) 的第三方 SDK，或者在原生视图显示到屏幕之前对其进行操作。

如果您确实需要创建自定义子类，可以按照以下步骤开始。

### 创建 `MyViewController.swift`

首先，通过[打开 Xcode](/main/ios/index.md#opening-the-ios-project) 创建一个 `MyViewController.swift` 文件。在项目导航器中右键单击 **App** 组（位于 **App** 目标下），从上下文菜单中选择 **New File...**，在弹出窗口中选择 **Cocoa Touch Class**，在下一个屏幕中将 **Subclass of:** 设置为 `UIViewController`，然后保存文件。

![在 Xcode 中新建 ViewController](../../../../static/img/v5/docs/ios/xcode-create-viewcontroller.png)
![在 Xcode 中命名 ViewController](../../../../static/img/v5/docs/ios/xcode-name-viewcontroller.png)

### 编辑 `Main.storyboard`

接下来，在项目导航器中选择 `Main.storyboard` 文件，在 **Bridge View Controller Scene** 中选择 **Bridge View Controller**，然后在右侧选择 **Identity Inspector**，并将自定义类的名称更改为 `MyViewController`。

![在 Xcode 中编辑 Storyboard](../../../../static/img/v5/docs/ios/xcode-edit-storyboard.png)

### 编辑 `MyViewController.swift`

最后，在项目导航器中选择 `MyViewController.swift` 文件，将其编辑为导入 Capacitor 并更改父类：

```swift
import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {
    // 在此处添加您的代码
}
```

这样就完成了！

### 后续步骤

Xcode 在生成文件时应该已经为您创建了 `viewDidLoad()` 方法，但请查看 [`CAPBridgeViewController`](https://github.com/ionic-team/capacitor/blob/5.x/ios/Capacitor/Capacitor/CAPBridgeViewController.swift) 中的内联文档，以找到您可能需要使用的 Capacitor 特定方法。任何标记为 `open` 的方法都明确允许子类进行覆盖。