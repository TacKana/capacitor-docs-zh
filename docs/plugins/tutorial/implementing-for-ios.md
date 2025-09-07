---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - iOS 实现指南
contributors:
  - eric-horodyski
sidebar_label: iOS 实现
slug: /plugins/tutorial/ios-implementation
---

# iOS 实现

选择先实现 iOS 而非 Android 是随意的——实际上你也可以先写 Android 实现，然后是 iOS 和网页端。或者三者任意组合。本教程恰好选择了先实现 iOS。

你可能会想先实现网页端，因为它更接近插件的 API 定义。如果在 API 上需要调整，在网页层工作时会更早发现这些问题。

## 向 Capacitor 注册插件

> **先决条件:** 继续之前请先熟悉 <a href="https://capacitorjs.com/docs/ios/custom-code" target="_blank">Capacitor 自定义原生 iOS 代码文档</a>。

通过运行 `npx cap open ios` 在 Xcode 中打开 Capacitor 应用的 iOS 项目。右键点击 **App** 分组（位于 **App** 目标下），从上下文菜单中选择 **New Group**。将这个新分组命名为 **plugins**。然后在 **plugins** 下再创建一个名为 **ScreenOrientation** 的分组。

完成后，你将拥有路径 `/App/App/plugins/ScreenOrientation/`。右键点击 **ScreenOrientation** 分组，选择 **New File…** 添加以下文件：

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

注意 `@objc` 装饰器的使用，这些是确保 Capacitor 在运行时能够识别类和其方法的必要标记。

## 获取当前屏幕方向

我们先处理获取当前屏幕方向的任务。打开 `ScreenOrientation.swift` 来设置类并编写获取当前方向的方法：

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
      // Case: portrait
      return "portrait-primary"
    }
  }

}
```

接下来，在 `ScreenOrientationPlugin.swift` 中连接 `orientation` 方法以调用实现类的方法：

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

  /* 其余代码为简洁起见省略 */
}
```

最后，按照 <a href="https://capacitorjs.com/docs/ios/custom-code#register-the-plugin" _target="blank">这些说明</a>：

- 创建自定义视图控制器
- 注册插件实例

从 Xcode 运行应用，可以是实际设备或 iOS 模拟器。加载完成后，你将在控制台看到以下日志：

```bash
⚡️  To Native ->  ScreenOrientation orientation 115962915
⚡️  TO JS {"type":"portrait-primary"}
```

> **注意:** 日志的确切值会有所不同。在此示例中，`115962915` 是从插件发出的方法调用分配的任意 ID。

你已成功将原生 iOS 代码桥接到网页应用！🎉

## 监听屏幕方向变化

iOS 通过 <a href="https://developer.apple.com/documentation/foundation/notificationcenter" target="_blank">NotificationCenter</a> 在 UIDevice 触发 `orientationDidChangeNotification` 事件时通知我们用户旋转设备的情况。

`load()` 方法是注册此事件观察者的适当位置。同样，`deinit()` 方法是移除观察者的适当位置。

在观察者注册中，我们需要提供一个方法，将变化的方向返回给我们插件监听 `screenOrientationChange` 事件的监听器，这是我们插件 API 的一部分。我们可以重用 `getCurrentOrientationType()` 方法来获取变化的屏幕方向。

向 `ScreenOrientationPlugin` 类添加以下方法：

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
  // 忽略未知、面朝上或面朝下的方向变化
  if UIDevice.current.orientation.isValidInterfaceOrientation {
    let orientation = implementation.getCurrentOrientationType()
    notifyListeners("screenOrientationChange", data: ["type": orientation])
  }
}
```

iOS 会检测三个维度的方向变化。如代码注释所述，当方向变化不涉及横向或纵向方向时，我们将忽略通知监听器。

## 锁定和解锁屏幕方向

锁定屏幕方向时，我们将视图控制器的 `supportedOrientations` 限制为请求的方向。解锁时，需要恢复最初设置的 `supportOrientations`。修改代码以保存当前视图控制器及其当前的 `supportedOrientations`。向 `ScreenOrientation` 类添加以下代码。

```swift
    private var supportedOrientations: [Int] = []
    private var capViewController: CAPBridgeViewController?

    public func setCapacitorViewController(_ viewController: CAPBridgeViewController) {
        self.capViewController = viewController
        self.supportedOrientations =  viewController.supportedOrientations
    }
```

更新我们刚刚添加到 `ScreenOrientationPlugin` 类的 `load()` 函数以调用 `setCapacitorViewController()`。

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

锁定屏幕方向仅适用于 Capacitor 视图控制器，而不适用于其他呈现的视图控制器（如 Browser 插件呈现的）。为了也锁定呈现的视图控制器，可以将此代码添加到应用的 `AppDelegate.swift` 文件中：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
  return UIInterfaceOrientationMask(rawValue: (self.window!.rootViewController as! CAPBridgeViewController).supportedInterfaceOrientations.rawValue)
}
```

通过设置上述代码，我们告诉 iOS 只希望支持视图控制器定义的方向。

我们需要一个函数将 OrientationType 映射到其对应的 UIInterfaceOrientationMask 枚举值。向 `ScreenOrientation` 类添加以下方法：

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

展望未来，我们还需要一个将 OrientationType 映射到 `Int` 的方法，所以我们现在将其添加到 `ScreenOrientation` 类中：

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

当我们实现 `lock()` 和 `unlock()` 方法时，可能会遇到无法获取窗口场景的情况。在 `ScreenOrientation` 类中创建一个错误枚举来表示这种情况。

```swift
    enum ScreenOrientationError: Error {
        case noWindowScene
    }
```

现在所有设置都已就绪，我们可以实现 `lock()` 方法。向 `ScreenOrientation` 类添加以下方法：

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

这是一个复杂的方法，让我们看看其关键部分：

1. `completion: @escaping (Error?) -> Void` 告诉此方法的调用者必须提供一个函数，该方法执行完成后将调用该函数，如果锁定失败我们将传递一个错误。
2. 在 iOS 16 及更高版本上，首先尝试通过 `UIApplication.shared.connectedScenes.first` 获取窗口场景。然后在根视图控制器上调用 `setNeedsUpdateOfSupportedInterfaceOrientations`。最后为所需方向调用 `requestGeometryUpdate`。
3. 在 iOS 15 及更早版本上，`UIDevice.current.setValue(orientation, forKey: "orientation")` 为设备设置屏幕方向，但不旋转屏幕到该方向。然后 `UINavigationController.attemptRotationToDeviceOrientation()` 将尝试将应用程序旋转到前一行代码中设置的屏幕方向。
4. 我们将代码包装在 `DispatchQueue.main.async` 中以防止阻塞 UI 线程。

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

`lock()` 方法还引入了一个 guard，以防止任何人在没有 `orientation` 输入参数的情况下调用它。最佳实践是拒绝任何缺少必需输入参数的插件方法调用。

要解锁屏幕方向，我们回溯锁定时的步骤。向 `ScreenOrientation` 类添加以下方法：

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

在 `ScreenOrientationPlugin` 类中，我们将调用实现的 `unlock` 方法并根据情况解决或拒绝：

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

## 跑起来看看！

在 Xcode 中，在设备或模拟器上运行应用。插件功能如预期！按下“旋转我的设备”按钮将屏幕方向旋转到横向模式，如果进一步旋转，你会看到屏幕方向被锁定。按下“确认签名”将解锁屏幕方向。

本教程的倒数第二步是：Android 实现。
