---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - iOS 平台实现
contributors:
  - eric-horodyski
sidebar_label: iOS 平台实现
slug: /plugins/tutorial/ios-implementation
---

# iOS 平台实现

选择先实现 iOS 再实现 Android 是随意的——说实话，你也可以先写 Android 实现，然后 iOS，最后网页端。或者三者的任意组合。本教程只是恰巧先实现了 iOS。

你可能希望先实现网页端，因为它更接近插件的 API 定义。如果需要对 API 进行任何调整，在网页层工作时更容易发现它们。

## 向 Capacitor 注册插件

> **前提条件：** 继续之前，请先熟悉 <a href="https://capacitorjs.com/docs/ios/custom-code" target="_blank">Capacitor 自定义原生 iOS 代码文档</a>。

通过运行 `npx cap open ios` 在 Xcode 中打开 Capacitor 应用的 iOS 项目。右键单击 **App** 组（在 **App** 目标下），然后从上下文菜单中选择 **新建组**。将此新组命名为 **plugins**。在 **plugins** 下添加一个新组，命名为 **ScreenOrientation**。

完成后，你将得到路径 `/App/App/plugins/ScreenOrientation/`。右键单击 **ScreenOrientation** 组并从上下文菜单中选择 **新建文件…**，添加以下文件：

`ScreenOrientation.swift`
`ScreenOrientationPlugin.swift`
`ScreenOrientationPlugin.m`

如果 Xcode 提示创建桥接头文件，请点击 **创建桥接头文件**。

将以下代码复制到 `ScreenOrientationPlugin.m` 中：

```objc
#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(ScreenOrientationPlugin, "ScreenOrientation",
  CAP_PLUGIN_METHOD(orientation, CAPPluginReturnPromise);
  CAP_PLUGIN_METHOD(lock, CAPPluginReturnPromise);
  CAP_PLUGIN_METHOD(unlock, CAPPluginReturnPromise);
)
```

这些 Objective-C 宏将插件注册到 Capacitor，使 `ScreenOrientationPlugin` 及其方法对 JavaScript 可用。

将以下代码复制到 `ScreenOrientationPlugin.swift` 中：

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

注意 `@objc` 装饰器的使用；这些装饰器用于确保 Capacitor 在运行时能够看到该类及其方法。

## 获取当前屏幕方向

我们先来处理获取当前屏幕方向的任务。打开 `ScreenOrientation.swift` 来设置类并编写获取当前方向的方法：

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
      // 默认情况：竖屏正向
      return "portrait-primary"
    }
  }

}
```

接下来，在 `ScreenOrientationPlugin.swift` 中连接 `orientation` 方法，以调用实现类的方法：

```Swift
@objc(ScreenOrientationPlugin)
public class ScreenOrientationPlugin: CAPPlugin {

  private let implementation = ScreenOrientation()

  @objc public func orientation(_ call: CAPPluginCall) {
    let orientationType = implementation.getCurrentOrientationType();
    call.resolve(["type": orientationType])
  }

  /* 为简洁起见，省略其余代码 */
}
```

从 Xcode 运行应用，可以在真实设备或 iOS 模拟器上运行。加载完成后，你应该会在控制台中看到以下日志：

```bash
⚡️  To Native ->  ScreenOrientation orientation 115962915
⚡️  TO JS {"type":"portrait-primary"}
```

> **注意：** 日志的确切值会有所不同。在本例中，`115962915` 是插件方法调用分配的任意 ID。

你已成功将原生 iOS 代码桥接到网页应用！🎉

## 监听屏幕方向变化

当 UIDevice 触发 `orientationDidChangeNotification` 事件时，iOS 会通过 <a href="https://developer.apple.com/documentation/foundation/notificationcenter" target="_blank">NotificationCenter</a> 通知我们用户旋转了设备。

`load()` 方法是注册此事件观察者的合适位置。同样，`deinit()` 方法是移除观察者的合适位置。

在观察者注册中，我们需要提供一个方法，将变化后的方向返回给我们插件中监听 `screenOrientationChange` 事件的监听器（这是我们插件 API 的一部分）。我们可以重用 `getCurrentOrientationType()` 方法来获取变化后的屏幕方向。

将以下方法添加到 `ScreenOrientationPlugin` 类中：

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
  // 如果方向未知、朝上或朝下，则忽略方向变化
  if(UIDevice.current.orientation.isValidInterfaceOrientation) {
    let orientation = implementation.getCurrentOrientationType()
    notifyListeners("screenOrientationChange", data: ["type": orientation])
  }
}
```

iOS 会检测三个维度的方向变化。如代码注释所述，当方向变化不涉及横屏或竖屏方向时，我们将忽略通知监听器。

## 锁定与解锁屏幕方向

iOS 并没有提供一个直接的"锁定"或"解锁"屏幕方向的机制。相反，它允许您以编程方式设置允许的方向。

为了实现这一功能，我们需要在 `AppDelegate.swift` 的 `AppDelegate` 类中添加一个方法：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
    return ScreenOrientationPlugin.supportedOrientations
  }
```

请注意，该函数返回 `ScreenOrientationPlugin.supportedOrientations`。这个属性目前还不存在，所以我们需要将其作为私有静态类成员添加到 `ScreenOrientationPlugin` 类中：

```swift
public static var supportedOrientations = UIInterfaceOrientationMask.all
```

通过上述代码的设置，我们告诉 iOS 只希望支持由 `ScreenOrientationPlugin.supportedOrientations` 的值定义的方向。正如您可能想到的，`UIInterfaceOrientationMask.all` 枚举值支持所有方向。当我们编写锁定屏幕方向的代码时，会选择更具限制性的枚举值。

我们需要一个将 OrientationType 映射到其对应的 UIInterfaceOrientationMask 枚举值的函数。将以下方法添加到 `ScreenOrientation` 类中：

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
    // Case: portrait-primary
    return UIInterfaceOrientationMask.portrait
  }
}
```

考虑到未来的需求，我们还需要一个将 OrientationType 映射到 `Int` 的方法，现在也将其添加到 `ScreenOrientation` 类中：

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
    // Case: portrait-primary
    return UIInterfaceOrientation.portrait.rawValue
  }
}
```

现在所有准备工作都已就绪，我们可以实现 `lock()` 方法了。将以下方法添加到 `ScreenOrientation` 类中：

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

这是一个比较复杂的方法，我们来逐一分析其中的关键部分：

1. `completion: @escaping (UIInterfaceOrientationMask) -> Void` 告诉此方法的调用者，他们必须提供一个函数，当方法执行完成时会被调用，并且我们会通过 `completion(mask)` 传递一个 `UIInterfaceOrientationMask` 值
2. `UIDevice.current.setValue(orientation, forKey: "orientation")` 为设备设置屏幕方向，但不会将屏幕旋转到该方向
3. `UINavigationController.attemptRotationToDeviceOrientation()` 会尝试将应用程序旋转到上一行代码中设置的屏幕方向
4. 我们将代码包装在 `DispatchQueue.main.async` 中，以防止阻塞 UI 线程

这个方法需要从 `ScreenOrientationPlugin` 类中调用，之后更新 `ScreenOrientationPlugin.supportedOrientations`，以便 iOS 知道此时我们只希望支持一个特定的屏幕方向：

```swift
​​@objc public func lock(_ call: CAPPluginCall) {
  guard let lockToOrientation = call.getString("orientation") else {
    call.reject("必须提供输入参数 'orientation'。")
    return
  }
  implementation.lock(lockToOrientation, completion: { (mask) -> Void in
    ScreenOrientationPlugin.supportedOrientations = mask;
    call.resolve()
  })
}
```

`lock()` 方法还引入了一个 guard 语句，以防止任何人在没有 `orientation` 输入参数的情况下调用它。拒绝任何缺少必需输入参数的插件方法调用是最佳实践。

要解锁屏幕方向，我们需要回溯锁定屏幕时采取的步骤。将以下方法添加到 `ScreenOrientation` 类中：

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

通过将当前方向值设置为 `UIInterfaceOrientation.unknown`，iOS 会尝试自动校正其方向。在 `ScreenOrientationPlugin` 类中，我们将把 `supportedOrientations` 恢复为 `UIInterfaceOrientationMask.all`：

```swift
@objc public func unlock(_ call: CAPPluginCall) {
  implementation.unlock {
    ScreenOrientationPlugin.supportedOrientations = UIInterfaceOrientationMask.all
    call.resolve()
  }
}
```

## 亲自测试一下吧！

在 Xcode 中，在设备或模拟器上运行应用程序。插件按预期工作！按下"旋转我的设备"按钮会将屏幕方向旋转到横屏模式，如果进一步旋转，您会看到屏幕方向已被锁定。按下"确认签名"将解锁屏幕方向。

本教程的倒数第二步是：Android 实现。