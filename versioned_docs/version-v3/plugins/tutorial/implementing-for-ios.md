---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - iOS 实现方案
contributors:
  - eric-horodyski
sidebar_label: iOS 实现
slug: /plugins/tutorial/ios-implementation
---

# iOS 实现方案

本教程选择先实现 iOS 再实现 Android 完全是随机的——实际上你可以先写 Android 实现，再写 iOS 和 web 端，或者任意组合顺序。这里只是碰巧先展示了 iOS 实现。

一般来说，先实现 web 端可能更合理，因为它更接近插件的 API 定义。如果在 API 设计上需要调整，在 web 层工作时更容易发现这些问题。

## 向 Capacitor 注册插件

> **必备知识：** 继续之前请先熟悉 <a href="https://capacitorjs.com/docs/v3/ios/custom-code" target="_blank">Capacitor 自定义 iOS 原生代码文档</a>。

通过运行 `npx cap open ios` 在 Xcode 中打开应用的 iOS 项目。右键点击 **App** 分组（位于 **App** 目标下），选择 **New Group**。命名新分组为 **plugins**，然后在其中再创建 **ScreenOrientation** 子分组。

完成后路径应为 `/App/App/plugins/ScreenOrientation/`。右键点击 **ScreenOrientation** 分组选择 **New File…** 添加以下文件：

`ScreenOrientation.swift`
`ScreenOrientationPlugin.swift`
`ScreenOrientationPlugin.m`

如果 Xcode 提示创建桥接头文件，点击 **Create Bridging Header**。

将以下代码复制到 `ScreenOrientationPlugin.m`：

```objc
#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(ScreenOrientationPlugin, "ScreenOrientation",
  CAP_PLUGIN_METHOD(orientation, CAPPluginReturnPromise);
  CAP_PLUGIN_METHOD(lock, CAPPluginReturnPromise);
  CAP_PLUGIN_METHOD(unlock, CAPPluginReturnPromise);
)
```

这些 Objective-C 宏将插件注册到 Capacitor，使 JavaScript 可以调用 `ScreenOrientationPlugin` 及其方法。

复制以下代码到 `ScreenOrientationPlugin.swift`：

```swift
import Foundation
import Capacitor

@objc(ScreenOrientationPlugin)
public class ScreenOrientationPlugin: CAPPlugin {

  @objc public func orientation(_ call: CAPPluginCall) {
    call.resolve()
  }

  @objc public func lock(_ call: CAPPluginCall) {
    call.resolve()
  }

  @objc public func unlock(_ call: CAPPluginCall) {
    call.resolve();
  }
}
```

注意 `@objc` 装饰器的使用，它们确保 Capacitor 能在运行时识别这个类及其方法。

## 获取当前屏幕方向

首先处理获取当前屏幕方向的功能。在 `ScreenOrientation.swift` 中创建类并添加获取方向的方法：

```swift
import Foundation
import UIKit

public class ScreenOrientation: NSObject {

  public func getCurrentOrientationType() -> String {
    let currentOrientation: UIDeviceOrientation = UIDevice.current.orientation
    return fromDeviceOrientationToOrientationType(currentOrientation)
  }

  private func fromDeviceOrientationToOrientationType(_ orientation: UIDeviceOrientation) -> String {
    switch orientation {
    case .landscapeLeft:
      return "landscape-primary"
    case .landscapeRight:
      return "landscape-secondary"
    case .portraitUpsideDown:
 return "portrait-secondary"
    default:
      // 默认情况：竖屏
      return "portrait-primary"
    }
  }

}
```

然后在 `ScreenOrientationPlugin.swift` 中连接 `orientation` 方法：

```Swift
@objc(ScreenOrientationPlugin)
public class ScreenOrientationPlugin: CAPPlugin {

  private let implementation = ScreenOrientation()

  @objc public func orientation(_ call: CAPPluginCall) {
    let orientationType = implementation.getCurrentOrientationType();
    call.resolve(["type": orientationType])
  }

  /* 其余代码已省略 */
}
```

在 Xcode 中运行应用（真机或模拟器），加载完成后控制台会输出类似日志：

```bash
⚡️  To Native ->  ScreenOrientation orientation 115962915
⚡️  TO JS {"type":"portrait-primary"}
```

> **注意：** 日志中的具体数值会不同，这里的 `115962915` 只是插件方法调用的随机 ID。

你已成功将 iOS 原生代码桥接到 web 应用！🎉

## 监听屏幕方向变化

iOS 通过 <a href="https://developer.apple.com/documentation/foundation/notificationcenter" target="_blank">NotificationCenter</a> 在设备旋转时发送 `orientationDidChangeNotification` 事件。

`load()` 方法是注册观察者的理想位置，而 `deinit()` 则是移除观察者的合适时机。在观察者回调中，我们需要将方向变化通过 `screenOrientationChange` 事件通知给监听者。

在 `ScreenOrientationPlugin` 类中添加以下方法：

```swift
override public func load() {
  NotificationCenter.default.addObserver(
    self,
    selector: #selector(self.orientationDidChange),
    name: UIDevice.orientationDidChangeNotification,
    object: nil)
}

deinit {
  NotificationCenter.default.removeObserver(self)
}

@objc private func orientationDidChange() {
  // 忽略未知、朝上或朝下的方向变化
  if(UIDevice.current.orientation.isValidInterfaceOrientation) {
    let orientation = implementation.getCurrentOrientationType()
    notifyListeners("screenOrientationChange", data: ["type": orientation])
  }
}
```

## 锁定与解锁屏幕方向

iOS 并不直接提供"锁定"或"解锁"屏幕方向的功能，而是允许程序控制允许的方向。

首先在 `AppDelegate.swift` 中添加方法：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
    return ScreenOrientationPlugin.supportedOrientations
  }
```

然后在 `ScreenOrientationPlugin` 类中添加静态属性：

```swift
public static var supportedOrientations = UIInterfaceOrientationMask.all
```

添加方向类型到 UIInterfaceOrientationMask 的转换方法：

```swift
private func fromOrientationTypeToMask(_ orientationType: String) -> UIInterfaceOrientationMask {
  switch orientationType {
  case "landscape-primary":
    return UIInterfaceOrientationMask.landscapeLeft
  case "landscape-secondary":
    return UIInterfaceOrientationMask.landscapeRight
  case "portrait-secondary":
    return UIInterfaceOrientationMask.portraitUpsideDown
  default:
    // 默认：竖屏
    return UIInterfaceOrientationMask.portrait
  }
}
```

同时添加方向类型到 Int 的转换方法：

```swift
private func fromOrientationTypeToInt(_ orientationType: String) -> Int {
  switch orientationType {
  case "landscape-primary":
    return UIInterfaceOrientation.landscapeLeft.rawValue
  case "landscape-secondary":
    return UIInterfaceOrientation.landscapeRight.rawValue
  case "portrait-secondary":
    return UIInterfaceOrientation.portraitUpsideDown.rawValue
  default:
    // 默认：竖屏
    return UIInterfaceOrientation.portrait.rawValue
  }
}
```

实现锁定方向的 `lock()` 方法：

```swift
public func lock(_ orientationType: String, completion: @escaping (UIInterfaceOrientationMask) -> Void) {
  DispatchQueue.main.async {
    let mask = self.fromOrientationTypeToMask(orientationType)
    let orientation = self.fromOrientationTypeToInt(orientationType)
    UIDevice.current.setValue(orientation, forKey: "orientation")
    UINavigationController.attemptRotationToDeviceOrientation()
    completion(mask)
  }
}
```

关键点说明：
1. 使用完成回调返回 UIInterfaceOrientationMask
2. 设置设备方向但不旋转屏幕
3. 尝试旋转到指定方向
4. 在 UI 线程异步执行

在插件类中调用并更新支持的方向：

```swift
​​@objc public func lock(_ call: CAPPluginCall) {
  guard let lockToOrientation = call.getString("orientation") else {
    call.reject("必须提供'orientation'参数")
    return
  }
  implementation.lock(lockToOrientation, completion: { (mask) -> Void in
    ScreenOrientationPlugin.supportedOrientations = mask;
    call.resolve()
  })
}
```

实现解锁方法：

```swift
public func unlock(completion: @escaping () -> Void) {
  DispatchQueue.main.async {
    let unknownOrientation = UIInterfaceOrientation.unknown.rawValue
    UIDevice.current.setValue(unknownOrientation, forKey: "orientation")
    UINavigationController.attemptRotationToDeviceOrientation()
    completion()
  }
}
```

在插件类中恢复支持所有方向：

```swift
@objc public func unlock(_ call: CAPPluginCall) {
  implementation.unlock {
    ScreenOrientationPlugin.supportedOrientations = UIInterfaceOrientationMask.all
    call.resolve()
  }
}
```

## 测试运行！

在 Xcode 中使用设备或模拟器运行应用。插件功能应该正常工作了：
- 点击"Rotate My Device"按钮会旋转到横屏模式
- 继续旋转设备会发现方向已锁定
- 点击"Confirm Signature"会解锁方向

本教程的最后一步将是：Android 实现。