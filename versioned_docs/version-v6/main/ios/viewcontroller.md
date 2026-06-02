---
title: 子类化 CAPBridgeViewController
sidebar_label: 自定义 ViewController
description: 如何子类化 CAPBridgeViewController
contributors:
  - ikeith
slug: /ios/viewcontroller
---

# 自定义 ViewController

自 Capacitor 3.0 起，您可以在应用中子类化 `CAPBridgeViewController`。大多数应用不需要此功能，但它为解决某些用例提供了受支持的机制。

## 何时创建子类

需要子类化的一些示例包括：在运行时覆盖 Capacitor 的配置值、更改 [`WKWebViewConfiguration`](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration) 的属性、为 Capacitor 提供自定义的 [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview) 子类、集成建议在 [`viewDidLoad()`](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621495-viewdidload) 中添加代码的第三方 SDK、在原生视图显示在屏幕上之前操作它们，或[注册自定义插件](../ios/custom-code.md#register-the-plugin)。

如果您确实需要创建自定义子类，有几个步骤可以开始。

### 创建 `MyViewController.swift`

首先，通过[打开 Xcode](/main/ios/index.md#opening-the-ios-project)，右键点击 **App** 组（在 **App** target 下），从上下文菜单中选择 **New File...**，在窗口中选择 **Cocoa Touch Class**，在下一个屏幕中将 **Subclass of:** 设置为 `UIViewController`，并保存文件，来创建一个 `MyViewController.swift` 文件。

![在 Xcode 中新建 ViewController](/img/v6/docs/ios/xcode-create-viewcontroller.png)
![在 Xcode 中命名 ViewController](/img/v6/docs/ios/xcode-name-viewcontroller.png)

### 编辑 `Main.storyboard`

接下来，在 Project Navigator 中选择 `Main.storyboard` 文件，在 **Bridge View Controller Scene** 中选择 **Bridge View Controller**，在右侧选择 **Identity Inspector**，并将自定义类的名称更改为 `MyViewController`。

![在 Xcode 中编辑 Storyboard](/img/v6/docs/ios/xcode-edit-storyboard.png)

### 编辑 `MyViewController.swift`

最后，在 Project Navigator 中选择 `MyViewController.swift` 文件并编辑它以导入 Capacitor 并更改父类：

```swift
import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {
    // 额外代码
}
```

完成！

### 下一步

Xcode 应该在生成文件时已经为您创建了 `viewDidLoad()` 方法，但请查看 [`CAPBridgeViewController`](https://github.com/ionic-team/capacitor/blob/6.x/ios/Capacitor/Capacitor/CAPBridgeViewController.swift) 中的内联文档，以找到您可能需要的 Capacitor 特定方法。任何标记为 `open` 的方法都明确暴露给子类重写。
