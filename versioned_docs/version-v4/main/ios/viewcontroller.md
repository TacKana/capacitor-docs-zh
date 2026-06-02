---
title: 继承 CAPBridgeViewController
sidebar_label: 自定义 ViewController
description: 如何继承 CAPBridgeViewController
contributors:
  - ikeith
slug: /ios/viewcontroller
---

# 自定义 ViewController

从 Capacitor 3.0 开始，你可以在应用程序中继承 `CAPBridgeViewController`。大多数应用程序不需要此功能，但它为解决一些不常见的用例提供了受支持的机制。

## 何时创建子类

需要创建子类的一些示例包括：在运行时覆盖 Capacitor 的配置值、更改 [`WKWebViewConfiguration`](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration) 的属性、为 Capacitor 提供自定义的 [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview) 子类、集成建议在 [`viewDidLoad()`](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621495-viewdidload) 中添加代码的第三方 SDK，或者在原生视图显示在屏幕上之前操作它们。

如果你确实需要创建自定义子类，有几个步骤可以开始。

### 创建 `MyViewController.swift`

首先，通过[打开 Xcode](/main/ios/index.md#opening-the-ios-project)，右键点击 **App** 组（在 **App** 目标下），从上下文菜单中选择 **New File...**，在窗口中选择 **Cocoa Touch Class**，在下一个屏幕中将 **Subclass of:** 设置为 `UIViewController`，然后保存文件，来创建一个 `MyViewController.swift` 文件。

![在 Xcode 中新建 ViewController](../../../../static/img/v4/docs/ios/xcode-create-viewcontroller.png)
![在 Xcode 中命名 ViewController](../../../../static/img/v4/docs/ios/xcode-name-viewcontroller.png)

### 编辑 `Main.storyboard`

接下来，在项目导航器中选择 `Main.storyboard` 文件，在 **Bridge View Controller Scene** 中选择 **Bridge View Controller**，在右侧选择 **Identity Inspector**，然后将自定义类的名称更改为 `MyViewController`。

![在 Xcode 中编辑 Storyboard](../../../../static/img/v4/docs/ios/xcode-edit-storyboard.png)

### 编辑 `MyViewController.swift`

最后，在项目导航器中选择 `MyViewController.swift` 文件并编辑它，导入 Capacitor 并更改父类：

```swift
import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {
    // 附加代码
}
```

完成！

### 后续步骤

Xcode 在生成文件时应该已经为你创建了一个 `viewDidLoad()` 方法，但请查阅 [`CAPBridgeViewController`](https://github.com/ionic-team/capacitor/blob/4.x/ios/Capacitor/Capacitor/CAPBridgeViewController.swift) 中的内联文档，以找到你可能需要的 Capacitor 特定方法。任何标记为 `open` 的方法都明确暴露给子类进行重写。
