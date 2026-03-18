---
title: Subclassing CAPBridgeViewController
sidebar_label: 自定义 ViewController
description: 如何子类化 CAPBridgeViewController
contributors:
  - ikeith
slug: /ios/viewcontroller
---

# 自定义 ViewController

自 Capacitor 3.0 起，您可以在应用中子类化 `CAPBridgeViewController`。大部分应用不需要此功能，但它为解决某些特定用例提供了官方支持的方式。

## 何时需要创建子类

需要创建子类的情况包括：在运行时覆盖 Capacitor 的配置值、修改 [`WKWebViewConfiguration`](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration) 的属性、替换 Capacitor 使用的自定义 [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview) 子类、集成建议将代码添加到 [`viewDidLoad()`](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621495-viewdidload) 的第三方 SDK、在原生视图显示前对其进行操作，或[注册自定义插件](../ios/custom-code.md)。

如果您确实需要创建自定义子类，请按以下步骤开始。

### 创建 `MyViewController.swift`

首先，通过[打开 Xcode](/main/ios/index.md#opening-the-ios-project) 创建 `MyViewController.swift` 文件：在 Xcode 中，右键点击 **App** 分组（位于 **App** Target 下），从上下文菜单中选择 **New File...**，在弹出的窗口中选择 **Cocoa Touch Class**，在下一个界面中设置 **Subclass of:** 为 `UIViewController`，然后保存文件。

![在 Xcode 中新建 ViewController](/img/v6/docs/ios/xcode-create-viewcontroller.png)
![在 Xcode 中命名 ViewController](/img/v6/docs/ios/xcode-name-viewcontroller.png)

### 编辑 `Main.storyboard`

接下来，在项目导航器中选择 `Main.storyboard` 文件，在 **Bridge View Controller Scene** 中选择 **Bridge View Controller**，在右侧选择 **Identity Inspector**，并将自定义类的名称更改为 `MyViewController`。

![在 Xcode 中编辑 Storyboard](/img/v6/docs/ios/xcode-edit-storyboard.png)

### 编辑 `MyViewController.swift`

最后，在项目导航器中选择 `MyViewController.swift` 文件，编辑它以导入 Capacitor 并更改父类：

```swift
import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {
    // 在这里添加自定义代码
}
```

完成！

### 后续步骤

Xcode 在生成文件时应该已经为您创建了 `viewDidLoad()` 方法，但请查阅 [`CAPBridgeViewController`](https://github.com/ionic-team/capacitor/blob/main/ios/Capacitor/Capacitor/CAPBridgeViewController.swift) 中的内联文档，以找到您可能需要使用的 Capacitor 特定方法。任何标记为 `open` 的方法都明确暴露给子类进行重写。