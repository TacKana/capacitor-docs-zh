---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 实现 iOS 平台
contributors:
  - eric-horodyski
sidebar_label: 实现 iOS 平台
slug: /plugins/tutorial/ios-implementation
---

# 实现 iOS 平台

先实现 iOS 再实现 Android 的决定是任意的——老实说，您可以先编写 Android 实现，然后是 iOS，最后是 Web。或者三者任意组合。本教程恰好是先实现 iOS 再实现 Android。

您可能想先实现 Web，因为它更接近插件的 API 定义。如果需要对 API 进行调整，在 Web 层工作时发现它们要容易得多。

## 向 Capacitor 注册插件

> **先决条件：** 在继续之前，请熟悉 <a href="https://capacitorjs.com/docs/ios/custom-code" target="_blank">Capacitor 自定义原生 iOS 代码文档</a>。

通过运行 `npx cap open ios` 在 Xcode 中打开 Capacitor 应用的 iOS 项目。右键单击 **App** 组（在 **App** target 下），从上下文菜单中选择 **New Group**。将这个新组命名为 **plugins**。向 **plugins** 添加一个新组，命名为 **ScreenOrientation**。

完成后，您将拥有路径 `/App/App/plugins/ScreenOrientation/`。通过右键单击 **ScreenOrientation** 组并从上下文菜单中选择 **New File…** 来添加以下文件：

`ScreenOrientation.swift`
`ScreenOrientationPlugin.swift`
`ScreenOrientationPlugin.m`

如果 Xcode 提示创建 Bridging Header，请单击 **Create Bridging Header**。

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

这些 Objective-C 宏向 Capacitor 注册了插件，使 `ScreenOrientationPlugin` 及其方法对 JavaScript 可用。

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

注意 `@objc` 装饰器的使用；这些是确保 Capacitor 在运行时可以看到类及其方法所必需的。

## 获取当前屏幕方向

让我们先处理获取当前屏幕方向的任务。打开 `ScreenOrientation.swift` 来设置类并编写一个获取当前方向的方法：

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
      // 情况：portrait
      return "portrait-primary"
    }
  }

}
```

接下来，将 `ScreenOrientationPlugin.swift` 中的 `orientation` 方法连接起来，以调用实现类的方法：

```Swift
@objc(ScreenOrientationPlugin)
public class ScreenOrientationPlugin: CAPPlugin {

  private let implementation = ScreenOrientation()

  @objc public func orientation(_ call: CAPPluginCall) {
    let orientationType = implementation.getCurrentOrientationType();
    call.resolve(["type": orientationType])
  }

  /* 为简洁起见省略了剩余的代码 */
}
```

继续从 Xcode 运行应用，无论是在真实设备上还是在 iOS 模拟器上。加载完成后，您应该会在控制台中看到以下日志：

```bash
⚡️  To Native ->  ScreenOrientation orientation 115962915
⚡️  TO JS {"type":"portrait-primary"}
```

> **注意：** 日志的具体值对您来说会有所不同。在此示例中，`115962915` 是分配给插件方法调用的任意 ID。

您已成功将原生 iOS 代码桥接到了 Web 应用！🎉

## 监听屏幕方向变化

当 UIDevice 触发 `orientationDidChangeNotification` 事件时，iOS 会通过 <a href="https://developer.apple.com/documentation/foundation/notificationcenter" target="_blank">NotificationCenter</a> 通知我们用户旋转了设备。

`load()` 方法是为该事件注册观察者的正确位置。同样，`deinit()` 方法是移除观察者的适当位置。

在观察者注册中，我们需要提供一个方法，用于将更改后的方向返回给我们的插件监听器，这些监听器正在监听我们作为插件 API 一部分定义的 `screenOrientationChange` 事件。我们可以重用 `getCurrentOrientationType()` 方法来获取更改后的屏幕方向。

将以下方法添加到 `ScreenOrientationPlugin` 类：

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
  // 如果方向未知、面朝上或面朝下，则忽略方向变化
  if(UIDevice.current.orientation.isValidInterfaceOrientation) {
    let orientation = implementation.getCurrentOrientationType()
    notifyListeners("screenOrientationChange", data: ["type": orientation])
  }
}
```

iOS 会在三维空间中检测方向变化。正如代码注释所提到的，当方向变化不涉及横屏或竖屏方向时，我们将忽略通知监听器。

## 锁定和解锁屏幕方向

iOS 并没有确切提供"锁定"或"解锁"屏幕方向的机制。相反，它允许您以编程方式设置允许哪些方向。

为了实现这一点，我们需要在 `AppDelegate.swift` 的 `AppDelegate` 类中添加一个方法：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
    return ScreenOrientationPlugin.supportedOrientations
  }
```

注意该函数返回了 `ScreenOrientationPlugin.supportedOrientations`。这个属性还不存在，所以让我们将其作为私有的静态类成员添加到 `ScreenOrientationPlugin` 类中：

```swift
public static var supportedOrientations = UIInterfaceOrientationMask.all
```

通过设置上述代码，我们告诉 iOS 我们只想支持由 `ScreenOrientationPlugin.supportedOrientations` 值定义的方向。可以想象，`UIInterfaceOrientationMask.all` 枚举值支持所有方向。当我们编写锁定屏幕方向的代码时，我们将选择一个更严格的枚举值。

我们需要一个将 OrientationType 映射到相应 UIInterfaceOrientationMask 枚举值的函数。将以下方法添加到 `ScreenOrientation` 类：

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
    // 情况：portrait-primary
    return UIInterfaceOrientationMask.portrait
  }
}
```

展望未来，我们还需要一个将 OrientationType 映射到 `Int` 的方法，所以我们现在就将其添加到 `ScreenOrientation` 类中：

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
    // 情况：portrait-primary
    return UIInterfaceOrientation.portrait.rawValue
  }
}
```

现在所有设置都已完成，我们可以实现 `lock()` 方法了。将以下方法添加到 `ScreenOrientation` 类：

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

这是一个复杂的方法；让我们逐步了解其关键部分：

1. `completion: @escaping (UIInterfaceOrientationMask) -> Void` 告诉此方法的调用者，他们必须提供一个在方法执行完成时将被调用的函数，我们将通过 `completion(mask)` 向该函数传递一个 `UIInterfaceOrientationMask` 值。
2. `UIDevice.current.setValue(orientation, forKey: "orientation")` 为设备设置一个屏幕方向，但不会将屏幕旋转到该方向。
3. `UINavigationController.attemptRotationToDeviceOrientation()` 将尝试将应用旋转到上一行代码中设置的屏幕方向。
4. 我们将代码包装在 `DispatchQueue.main.async` 中以防止阻塞 UI 线程。

这个方法需要从 `ScreenOrientationPlugin` 类中调用，然后更新 `ScreenOrientationPlugin.supportedOrientations`，以便 iOS 知道我们此时只想支持一个特定的屏幕方向：

```swift
​​@objc public func lock(_ call: CAPPluginCall) {
  guard let lockToOrientation = call.getString("orientation") else {
    call.reject("必须提供输入选项 'orientation'。")
    return
  }
  implementation.lock(lockToOrientation, completion: { (mask) -> Void in
    ScreenOrientationPlugin.supportedOrientations = mask;
    call.resolve()
  })
}
```

`lock()` 方法还引入了一个 guard 来防止任何人在没有 `orientation` 输入参数的情况下调用它。最佳实践是拒绝任何缺少必需输入参数的插件方法调用。

要解锁屏幕方向，我们回退锁定时的步骤。将以下方法添加到 `ScreenOrientation` 类：

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

通过将当前方向值设置为 `UIInterfaceOrientation.unknown`，iOS 会尝试自动纠正其方向。在 `ScreenOrientationPlugin` 类中，我们将 `supportedOrientations` 恢复为 `UIInterfaceOrientationMask.all`：

```swift
@objc public func unlock(_ call: CAPPluginCall) {
  implementation.unlock {
    ScreenOrientationPlugin.supportedOrientations = UIInterfaceOrientationMask.all
    call.resolve()
  }
}
```

## 测试一下！

在 Xcode 中，在设备或模拟器上运行应用。插件按预期工作！按下"Rotate My Device"按钮将屏幕方向旋转为横屏模式，如果您进一步旋转，您会看到屏幕方向已锁定。按下"Confirm Signature"将解锁屏幕方向。

本教程的倒数第二步是：Android 实现。
