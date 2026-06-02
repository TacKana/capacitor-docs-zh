---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 为 iOS 实现
contributors:
  - eric-horodyski
sidebar_label: 为 iOS 实现
slug: /plugins/tutorial/ios-implementation
---

# 为 iOS 实现

决定先实现 iOS 还是 Android 是随意的——老实说，你可以先编写 Android 实现，然后是 iOS，最后是 Web。或者三者任意组合。本教程恰好是先实现 iOS 再实现 Android。

你可能想先实现 Web，因为它更接近插件的 API 定义。如果需要对 API 进行任何调整，在 Web 层工作时发现它们要容易得多。

## 向 Capacitor 注册插件

> **先决条件：** 在继续之前，请先熟悉 <a href="https://capacitorjs.com/docs/ios/custom-code" target="_blank">Capacitor 自定义原生 iOS 代码文档</a>。

通过运行 `npx cap open ios` 在 Xcode 中打开 Capacitor 应用的 iOS 项目。右键单击 **App** 组（在 **App** target 下），然后从上下文菜单中选择 **New Group**。将此新组命名为 **plugins**。在 **plugins** 中添加一个新组并将其命名为 **ScreenOrientation**。

完成后，你将拥有路径 `/App/App/plugins/ScreenOrientation/`。通过右键单击 **ScreenOrientation** 组并从上下文菜单中选择 **New File…** 来添加以下文件：

`ScreenOrientation.swift`
`ScreenOrientationPlugin.swift`

将以下代码复制到 `ScreenOrientationPlugin.swift` 中：

```swift
import Foundation
import Capacitor

@objc(ScreenOrientationPlugin)
public class ScreenOrientationPlugin: CAPPlugin, CAPBridgedPlugin {
  public let identifier = "ScreenOrientationPlugin"
  public let jsName = "ScreenOrientation"
  public let pluginMethods: [CAPPluginMethod] = [
      CAPPluginMethod(name: "orientation", returnType: CAPPluginReturnPromise),
      CAPPluginMethod(name: "lock", returnType: CAPPluginReturnPromise),
      CAPPluginMethod(name: "unlock", returnType: CAPPluginReturnPromise)
  ]

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

注意 `@objc` 装饰器的使用；这些是确保 Capacitor 在运行时能够看到类及其方法所必需的。

## 获取当前屏幕方向

我们先来处理获取当前屏幕方向的任务。打开 `ScreenOrientation.swift` 来设置类并编写一个获取当前方向的方法：

```swift
import Foundation
import UIKit
import Capacitor

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
      // 情况：竖屏
      return "portrait-primary"
    }
  }

}
```

接下来，将 `ScreenOrientationPlugin.swift` 中的 `orientation` 方法连接到实现类的方法：

```Swift
@objc(ScreenOrientationPlugin)
public class ScreenOrientationPlugin: CAPPlugin, CAPBridgedPlugin {
  public let identifier = "ScreenOrientationPlugin"
  public let jsName = "ScreenOrientation"
  public let pluginMethods: [CAPPluginMethod] = [
      CAPPluginMethod(name: "orientation", returnType: CAPPluginReturnPromise),
      CAPPluginMethod(name: "lock", returnType: CAPPluginReturnPromise),
      CAPPluginMethod(name: "unlock", returnType: CAPPluginReturnPromise)
  ]

  private let implementation = ScreenOrientation()

  @objc public func orientation(_ call: CAPPluginCall) {
    let orientationType = implementation.getCurrentOrientationType()
    call.resolve(["type": orientationType])
  }

  /* 其余代码已省略以保持简洁 */
}
```

最后，按照 <a href="https://capacitorjs.com/docs/ios/custom-code#register-the-plugin" _target="blank">这些说明</a> 执行以下操作：

- 创建一个自定义 View Controller。
- 注册插件实例。

继续在 Xcode 中运行应用，无论是在真机还是 iOS 模拟器上。加载完成后，你应该会在控制台中看到以下日志输出：

```bash
⚡️  To Native ->  ScreenOrientation orientation 115962915
⚡️  TO JS {"type":"portrait-primary"}
```

> **注意：** 日志的具体值对你来说会有所不同。在此示例中，`115962915` 是分配给插件方法调用的任意 ID。

你已经成功将原生 iOS 代码桥接到了 Web 应用程序！🎉

## 监听屏幕方向变化

iOS 会通过 <a href="https://developer.apple.com/documentation/foundation/notificationcenter" target="_blank">NotificationCenter</a> 在 UIDevice 触发 `orientationDidChangeNotification` 事件时通知我们用户旋转了设备。

`load()` 方法是注册此事件观察者的合适位置。同样，`deinit()` 方法是移除观察者的合适位置。

在注册观察者时，我们需要提供一个方法，将更改后的方向返回给监听我们插件 API 中定义的 `screenOrientationChange` 事件的监听器。我们可以复用 `getCurrentOrientationType()` 方法来获取更改后的屏幕方向。

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
  // 如果方向变化为未知、屏幕朝上或屏幕朝下，则忽略
  if UIDevice.current.orientation.isValidInterfaceOrientation {
    let orientation = implementation.getCurrentOrientationType()
    notifyListeners("screenOrientationChange", data: ["type": orientation])
  }
}
```

iOS 会在三个维度上检测方向变化。正如代码注释所述，当方向变化不涉及横屏或竖屏方向时，我们将忽略通知监听器。

## 锁定和解锁屏幕方向

锁定屏幕方向时，我们将 View Controller 的 `supportedOrientations` 限制为请求的方向。解锁屏幕方向时，我们需要恢复最初设置的 `supportedOrientations`。修改代码以保存当前的 View Controller 及其当前的 `supportedOrientations`。将以下代码添加到 `ScreenOrientation` 类中。

```swift
    private var supportedOrientations: [Int] = []
    private var capViewController: CAPBridgeViewController?

    public func setCapacitorViewController(_ viewController: CAPBridgeViewController) {
        self.capViewController = viewController
        self.supportedOrientations =  viewController.supportedOrientations
    }
```

更新我们刚刚添加到 `ScreenOrientationPlugin` 类中的 `load()` 函数，以调用 `setCapacitorViewController()`。

```swift
override public func load() {
  NotificationCenter.default.addObserver(
    self,
    selector: #selector(self.orientationDidChange),
    name: UIDevice.orientationDidChangeNotification,
    object: nil)
  if let viewController = (self.bridge?.viewController as? CAPBridgeViewController) {
    implementation.setCapacitorViewController(viewController)
  }
}
```

锁定屏幕方向仅适用于 Capacitor View Controller，但不适用于其他正在呈现的 View Controller（例如 Browser 插件呈现的 View Controller）。
要同时锁定呈现的 View Controller，可以将以下代码添加到应用的 `AppDelegate.swift` 文件中：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
  return UIInterfaceOrientationMask(rawValue: (self.window!.rootViewController as! CAPBridgeViewController).supportedInterfaceOrientations.rawValue)
}
```

通过设置上述代码，我们告诉 iOS 我们只想支持由 View Controller 定义的方向。

我们需要一个将 OrientationType 映射到对应的 UIInterfaceOrientationMask 枚举值的函数。将以下方法添加到 `ScreenOrientation` 类中：

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

在实现 `lock()` 和 `unlock()` 方法时，我们可能会遇到无法获取 window scene 的情况。在 `ScreenOrientation` 类中创建一个错误枚举来表示这种情况。

```swift
    enum ScreenOrientationError: Error {
        case noWindowScene
    }
```

现在所有准备工作已经就绪，我们可以实现 `lock()` 方法了。将以下方法添加到 `ScreenOrientation` 类中：

```swift
public func lock(_ orientationType: String, completion: @escaping (Error?) -> Void) {
  DispatchQueue.main.async {
    let orientation = self.fromOrientationTypeToInt(orientationType)
    self.capViewController?.supportedOrientations = [orientation]
    let mask = self.fromOrientationTypeToMask(orientationType)
    if #available(iOS 16.0, *) {
      if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
        windowScene.keyWindow?.rootViewController?.setNeedsUpdateOfSupportedInterfaceOrientations()
        windowScene.requestGeometryUpdate(.iOS(interfaceOrientations: mask)) { error in
          completion(error)
        }
      } else {
        completion(ScreenOrientationError.noWindowScene)
      }
    } else {
      UIDevice.current.setValue(orientation, forKey: "orientation")
      UINavigationController.attemptRotationToDeviceOrientation()
    }
    completion(nil)
  }
}
```

这是一个复杂的方法；让我们逐步讲解其关键部分：

1. `completion: @escaping (Error?) -> Void` 告诉该方法的调用者，他们必须提供一个在方法执行完成时被调用的函数，如果锁定失败，我们将回传一个错误。
2. 在 iOS 16 及更新版本上，首先我们尝试通过 `UIApplication.shared.connectedScenes.first` 获取 window scene。然后在根视图控制器上调用 `setNeedsUpdateOfSupportedInterfaceOrientations`。最后调用 `requestGeometryUpdate` 来请求所需的方向。
3. 在 iOS 15 及更早版本上，`UIDevice.current.setValue(orientation, forKey: "orientation")` 为设备设置一个屏幕方向，但不会将屏幕旋转到该方向。然后 `UINavigationController.attemptRotationToDeviceOrientation()` 会尝试将应用程序旋转到上一行代码中设置的屏幕方向。
4. 我们将代码包装在 `DispatchQueue.main.async` 中，以防止阻塞 UI 线程。

这个方法需要从 `ScreenOrientationPlugin` 类中调用：

```swift
@objc public func lock(_ call: CAPPluginCall) {
  guard let lockToOrientation = call.getString("orientation") else {
    call.reject("必须提供输入选项 'orientation'。")
    return
  }
  implementation.lock(lockToOrientation) { error in
    if let error = error {
      call.reject(error.localizedDescription)
    }
    call.resolve()
  }
}
```

`lock()` 方法还引入了一个保护条件，防止任何人未提供 `orientation` 输入参数就调用它。最佳实践是拒绝任何缺少必需输入参数的插件方法调用。

要解锁屏幕方向，我们回退锁定时的步骤。将以下方法添加到 `ScreenOrientation` 类中：

```swift
public func unlock(completion: @escaping (Error?) -> Void) {
  DispatchQueue.main.async {
    self.capViewController?.supportedOrientations = self.supportedOrientations
    if #available(iOS 16.0, *) {
      if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
        windowScene.keyWindow?.rootViewController?.setNeedsUpdateOfSupportedInterfaceOrientations()
        windowScene.requestGeometryUpdate(.iOS(interfaceOrientations: .all)) { error in
          completion(error)
        }
      } else {
        completion(ScreenOrientationError.noWindowScene)
      }
    } else {
      UINavigationController.attemptRotationToDeviceOrientation()
    }
    completion(nil)
  }
}
```

在 `ScreenOrientationPlugin` 类中，我们将调用实现的 `unlock` 方法，并在解锁成功时 resolve，或在出现问题时 reject：

```swift
@objc public func unlock(_ call: CAPPluginCall) {
  implementation.unlock { error in
    if let error = error {
      call.reject(error.localizedDescription)
    }
    call.resolve()
  }
}
```

## 测试一下！

在 Xcode 中，在真机或模拟器上运行应用。插件按预期工作！按下"Rotate My Device"按钮会将屏幕方向旋转为横屏模式，如果你继续旋转，将看到屏幕方向被锁定。按下"Confirm Signature"将解锁屏幕方向。

本教程的倒数第二步是：Android 实现。
