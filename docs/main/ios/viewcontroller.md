---
title: Subclassing CAPBridgeViewController
sidebar_label: 自定义视图控制器
description: 如何继承 CAPBridgeViewController
contributors:
  - ikeith
slug: /ios/viewcontroller
---

# 自定义视图控制器

从 Capacitor 3.0 开始，您可以在应用程序中继承 `CAPBridgeViewController`。大多数应用不需要此功能，但它为某些使用场景提供了官方支持方案。

## 何时需要创建子类

以下情况可能需要创建子类：
- 运行时覆盖 Capacitor 的配置值
- 修改 [`WKWebViewConfiguration`](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration) 属性
- 替换 Capacitor 使用的自定义 [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview) 子类
- 集成需要将代码添加到 [`viewDidLoad()`](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621495-viewdidload) 的第三方 SDK
- 在原生视图显示前进行操控
- [注册自定义插件](../ios/custom-code.md)

如需创建自定义子类，请按照以下步骤操作。

### 创建 `MyViewController.swift`

首先[打开 Xcode](/main/ios/index.md#opening-the-ios-project)，右键点击 **App** 组（位于 **App** target 下），从上下文菜单中选择 **New File...**，在窗口中选择 **Cocoa Touch Class**，在后续界面中将 **Subclass of:** 设为 `UIViewController`，然后保存文件。

![在 Xcode 中新建 ViewController](../../../static/img/v6/docs/ios/xcode-create-viewcontroller.png)
![在 Xcode 中命名 ViewController](../../../static/img/v6/docs/ios/xcode-name-viewcontroller.png)

### 编辑 `Main.storyboard`

接着在项目导航器中选择 `Main.storyboard` 文件，选择 **Bridge View Controller Scene** 中的 **Bridge View Controller**，在右侧选择 **Identity Inspector**，将自定义类名改为 `MyViewController`。

![在 Xcode 中编辑 Storyboard](../../../static/img/v6/docs/ios/xcode-edit-storyboard.png)

### 编辑 `MyViewController.swift`

最后在项目导航器中选择 `MyViewController.swift` 文件，编辑它以导入 Capacitor 并更改父类：

```swift
import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {
    // 自定义代码
}
```

完成！

### 后续步骤

Xcode 生成文件时应该已经自动创建了 `viewDidLoad()` 方法，请查阅 [`CAPBridgeViewController`](https://github.com/ionic-team/capacitor/blob/main/ios/Capacitor/Capacitor/CAPBridgeViewController.swift) 的内联文档，找到可能需要重写的 Capacitor 特定方法。任何标记为 `open` 的方法都明确允许子类进行覆盖。