---
title: Subclassing CAPBridgeViewController
sidebar_label: 自定义 ViewController
description: 如何子类化 CAPBridgeViewController
contributors:
  - ikeith
slug: /ios/viewcontroller
---

# 自定义 ViewController

自 Capacitor 3.0 起，您可以在应用程序中对 `CAPBridgeViewController` 进行子类化。大多数应用程序并不需要此功能，但它为处理某些特定需求提供了一种受支持的机制。

## 何时需要创建子类

以下是一些需要创建子类的情况示例：在运行时覆盖 Capacitor 的配置值、修改 [`WKWebViewConfiguration`](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration) 的属性、为 Capacitor 替换使用自定义的 [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview) 子类、集成建议在 [`viewDidLoad()`](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621495-viewdidload) 中添加代码的第三方 SDK、在原生视图显示到屏幕前对其进行操作，或[注册自定义插件](../ios/custom-code.md#register-the-plugin)。

如果您确实需要创建自定义子类，可以按照以下步骤开始。

### 创建 `MyViewController.swift` 文件

首先，通过[打开 Xcode](/main/ios/index.md#opening-the-ios-project)，在 **App** 组（位于 **App** 目标下）上右键单击，从上下文菜单中选择 **New File...**，在窗口中选择 **Cocoa Touch Class**，在下一个屏幕中将 **Subclass of:** 设置为 `UIViewController`，然后保存文件来创建 `MyViewController.swift` 文件。

![在 Xcode 中新建 ViewController](../../../static/img/v6/docs/ios/xcode-create-viewcontroller.png)
![在 Xcode 中命名 ViewController](../../../static/img/v6/docs/ios/xcode-name-viewcontroller.png)

### 编辑 `Main.storyboard`

接下来，在项目导航器中选择 `Main.storyboard` 文件，在 **Bridge View Controller Scene** 中选择 **Bridge View Controller**，在右侧选择 **Identity Inspector**，并将自定义类的名称更改为 `MyViewController`。

![在 Xcode 中编辑 Storyboard](../../../static/img/v6/docs/ios/xcode-edit-storyboard.png)

### 编辑 `MyViewController.swift`

最后，在项目导航器中选择 `MyViewController.swift` 文件，并编辑它以导入 Capacitor 并更改父类：

```swift
import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {
    // 可在此处添加额外代码
}
```

这样就完成了！

### 后续步骤

Xcode 在生成文件时应该已经为您创建了 `viewDidLoad()` 方法，但请查阅 [`CAPBridgeViewController`](https://github.com/ionic-team/capacitor/blob/main/ios/Capacitor/Capacitor/CAPBridgeViewController.swift) 的内联文档，以找到您可能需要使用的 Capacitor 特定方法。任何标记为 `open` 的方法都是明确暴露给子类进行重写的。