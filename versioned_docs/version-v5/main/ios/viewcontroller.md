---
title: CAPBridgeViewController 子类化
sidebar_label: 自定义视图控制器
description: 如何子类化 CAPBridgeViewController
contributors:
  - ikeith
slug: /ios/viewcontroller
---

# 自定义视图控制器

从 Capacitor 3.0 开始，您可以在应用中创建 `CAPBridgeViewController` 的子类。虽然大多数应用不需要此功能，但它为一些特殊用例提供了官方支持方案。

## 何时需要创建子类

以下场景可能需要创建子类：
- 在运行时覆盖 Capacitor 的配置值
- 修改 [`WKWebViewConfiguration`](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration) 的属性
- 替换 Capacitor 使用的自定义 [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview) 子类
- 集成需要向 [`viewDidLoad()`](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621495-viewdidload) 添加代码的第三方 SDK
- 在原生视图显示前进行额外操作

如需创建自定义子类，请按以下步骤操作：

### 创建 `MyViewController.swift`

首先 [在 Xcode 中打开项目](/main/ios/index.md#opening-the-ios-project)，右键点击 **App** 分组（位于 **App** 目标下），从上下文菜单中选择 **New File...**，在弹出的窗口中选择 **Cocoa Touch Class**，在后续界面中将 **Subclass of:** 设置为 `UIViewController`，最后保存文件。

![在 Xcode 中新建视图控制器](../../../../static/img/v5/docs/ios/xcode-create-viewcontroller.png)
![在 Xcode 中命名视图控制器](../../../../static/img/v5/docs/ios/xcode-name-viewcontroller.png)

### 编辑 `Main.storyboard`

接着在项目导航栏中选择 `Main.storyboard` 文件，选中 **Bridge View Controller Scene** 中的 **Bridge View Controller**，在右侧选择 **Identity Inspector**，将自定义类名修改为 `MyViewController`。

![在 Xcode 中编辑 Storyboard](../../../../static/img/v5/docs/ios/xcode-edit-storyboard.png)

### 编辑 `MyViewController.swift`

最后选择项目导航栏中的 `MyViewController.swift` 文件，编辑内容以导入 Capacitor 并修改父类：

```swift
import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {
    // 自定义代码
}
```

至此已完成基本配置！

### 后续步骤

Xcode 在生成文件时应该已自动创建了 `viewDidLoad()` 方法。您可以通过查看 [`CAPBridgeViewController`](https://github.com/ionic-team/capacitor/blob/5.x/ios/Capacitor/Capacitor/CAPBridgeViewController.swift) 的内联文档来了解可能需要覆盖的 Capacitor 特定方法。所有标记为 `open` 的方法都明确开放给子类覆盖使用。