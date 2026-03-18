---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - iOS 实现
contributors:
  - eric-horodyski
sidebar_label: iOS 实现
slug: /plugins/tutorial/ios-implementation
---

# iOS 实现

选择先实现 iOS 再实现 Android 是随意的——说实话，你也可以先写 Android 实现，然后是 iOS，最后是 Web。或者三种平台的任意组合。本教程恰好是先实现 iOS。

你可能想先实现 Web 层，因为它更接近插件的 API 定义。如果需要对 API 进行调整，在 Web 层工作时更容易发现这些需求。

## 向 Capacitor 注册插件

> **前提条件：** 在继续之前，请熟悉 <a href="https://capacitorjs.com/docs/ios/custom-code" target="_blank">Capacitor 自定义原生 iOS 代码文档</a>。

通过运行 `npx cap open ios` 在 Xcode 中打开 Capacitor 应用的 iOS 项目。右键单击 **App** 组（在 **App** target 下），从上下文菜单中选择 **New Group**。将这个新组命名为 **plugins**。在 **plugins** 下再添加一个新组，命名为 **ScreenOrientation**。

完成后，你将拥有路径 `/App/App/plugins/ScreenOrientation/`。右键单击 **ScreenOrientation** 组，从上下文菜单中选择 **New File…** 来添加以下文件：

`ScreenOrientation.swift`
`ScreenOrientationPlugin.swift`

将以下代码复制到 `ScreenOrientationPlugin.swift`：

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

注意 `@objc` 装饰器的使用；这些是确保 Capacitor 在运行时能够看到该类及其方法所必需的。

## 获取当前屏幕方向

首先解决获取当前屏幕方向的任务。打开 `ScreenOrientation.swift` 来设置类并编写获取当前方向的方法：

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
      // 默认情况：竖屏
      return "portrait-primary"
    }
  }

}
```

接下来，在 `ScreenOrientationPlugin.swift` 中连接 `orientation` 方法，使其调用实现类的方法：

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

  /* 为简洁起见，省略其余代码 */
}
```

最后，按照 <a href="https://capacitorjs.com/docs/ios/custom-code#register-the-plugin" _target="blank">这些说明</a>：

- 创建一个自定义 View Controller。
- 注册插件实例。

现在从 Xcode 运行应用，可以在真实设备或 iOS 模拟器上运行。加载完成后，你应该会在控制台看到以下日志：

```bash
⚡️  To Native ->  ScreenOrientation orientation 115962915
⚡️  TO JS {"type":"portrait-primary"}
```

> **注意：** 日志的确切值会有所不同。在这个例子中，`115962915` 是从插件发起的方法调用分配的任意 ID。

你已成功将原生 iOS 代码桥接到 Web 应用！🎉

## 监听屏幕方向变化

当 UIDevice 触发 `orientationDidChangeNotification` 事件时，iOS 会通过 <a href="https://developer.apple.com/documentation/foundation/notificationcenter" target="_blank">NotificationCenter</a> 通知我们用户旋转了设备。

`load()` 方法是注册此事件观察者的合适位置。同样，`deinit()` 方法是移除观察者的合适位置。

在观察者注册中，我们需要提供一个方法，将改变的方向返回给我们插件的监听器，这些监听器正在监听我们作为插件 API 一部分定义的 `screenOrientationChange` 事件。我们可以重用 `getCurrentOrientationType()` 方法来获取改变的屏幕方向。

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
  // 如果方向未知、朝上或朝下，则忽略方向变化
  if UIDevice.current.orientation.isValidInterfaceOrientation {
    let orientation = implementation.getCurrentOrientationType()
    notifyListeners("screenOrientationChange", data: ["type": orientation])
  }
}
```

iOS 会在三个维度上检测方向变化。如代码注释所述，当方向变化不涉及横屏或竖屏方向时，我们将忽略通知监听器。## 屏幕方向锁定与解锁

锁定屏幕方向时，我们将把 View Controller 的 `supportedOrientations` 限制为请求的方向。解锁屏幕方向时，需要恢复最初设置的 `supportedOrientations`。修改代码以保存当前的 View Controller 及其当前的 `supportedOrientations`。在 `ScreenOrientation` 类中添加以下代码：

```swift
    private var supportedOrientations: [Int] = []
    private var capViewController: CAPBridgeViewController?

    public func setCapacitorViewController(_ viewController: CAPBridgeViewController) {
        self.capViewController = viewController
        self.supportedOrientations =  viewController.supportedOrientations
    }
```

更新我们刚刚添加到 `ScreenOrientationPlugin` 类的 `load()` 函数，调用 `setCapacitorViewController()`：

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

锁定屏幕方向仅对 Capacitor View Controller 有效，但不会影响其他呈现的 View Controller（例如 Browser 插件呈现的那个）。要同时锁定已呈现的 View Controller，可以将以下代码添加到应用的 `AppDelegate.swift` 文件中：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
  return UIInterfaceOrientationMask(rawValue: (self.window!.rootViewController as! CAPBridgeViewController).supportedInterfaceOrientations.rawValue)
}
```

通过设置上述代码，我们告诉 iOS 只希望支持由 View Controller 定义的方向。

我们需要一个函数将 OrientationType 映射到其对应的 UIInterfaceOrientationMask 枚举值。在 `ScreenOrientation` 类中添加以下方法：

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

考虑到未来需求，我们还需要一个将 OrientationType 映射到 `Int` 的方法，现在将其添加到 `ScreenOrientation` 类中：

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

实现 `lock()` 和 `unlock()` 方法时，可能会遇到无法获取窗口场景的情况。在 `ScreenOrientation` 类中创建一个错误枚举来表示这种情况：

```swift
    enum ScreenOrientationError: Error {
        case noWindowScene
    }
```

现在所有设置都已完成，我们可以实现 `lock()` 方法了。在 `ScreenOrientation` 类中添加以下方法：

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

这个方法比较复杂，我们来分析其关键部分：

1. `completion: @escaping (Error?) -> Void` 告诉此方法的调用者，他们必须提供一个函数，该方法执行完成时会被调用。如果锁定失败，我们会传回一个错误。
2. 在 iOS 16 及更高版本上，首先尝试通过 `UIApplication.shared.connectedScenes.first` 获取窗口场景。然后在根视图控制器上调用 `setNeedsUpdateOfSupportedInterfaceOrientations`。最后为所需方向调用 `requestGeometryUpdate`。
3. 在 iOS 15 及更早版本上，`UIDevice.current.setValue(orientation, forKey: "orientation")` 为设备设置屏幕方向，但不会将屏幕旋转到该方向。然后 `UINavigationController.attemptRotationToDeviceOrientation()` 将尝试将应用旋转到前一行代码中设置的屏幕方向。
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

`lock()` 方法还引入了 guard 语句，防止任何人在没有 `orientation` 输入参数的情况下调用它。拒绝调用缺少任何必需输入参数的插件方法是最佳实践。

要解锁屏幕方向，我们逆向执行锁定时的步骤。在 `ScreenOrientation` 类中添加以下方法：

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

在 `ScreenOrientationPlugin` 类中，我们将调用实现的 `unlock` 方法，如果解锁成功则 resolve，如果出现问题则 reject：

```swift
@objc public func unlock(_ call: CAPPluginCall) {
  implementation.unlock { error in
    if let error = error {
      call.reject(error.localizedDescription)
    }
    call.resolve()
  }
}
```## 来试试吧！

在 Xcode 中，在设备或模拟器上运行应用。插件按预期工作！按下 "Rotate My Device" 按钮，屏幕方向将切换为横屏模式。如果你继续旋转设备，会发现屏幕方向已被锁定。按下 "Confirm Signature" 将解锁屏幕方向。

本教程的倒数第二步是：Android 平台实现。