# iOS 端实现

选择先实现 iOS 而非 Android 完全是随意的——老实说，你也可以先写 Android 实现，然后是 iOS，再到 Web，或者任意组合顺序。本教程只是恰好选择先实现 iOS。

你可能会想先实现 Web 端，因为它更接近插件的 API 定义。如果需要对 API 进行调整，在 Web 层工作时更容易发现这些问题。

## 向 Capacitor 注册插件

> **前提条件:** 继续之前请先熟悉 <a href="https://capacitorjs.com/docs/ios/custom-code" target="_blank">Capacitor 自定义原生 iOS 代码文档</a>。

通过运行 `npx cap open ios` 在 Xcode 中打开 Capacitor 应用的 iOS 项目。右键点击 **App** 组（位于 **App** 目标下），从上下文菜单中选择 **New Group**。将这个新组命名为 **plugins**。在 **plugins** 下再新建一个组，命名为 **ScreenOrientation**。

完成后，你将得到路径 `/App/App/plugins/ScreenOrientation/`。右键点击 **ScreenOrientation** 组，从上下文菜单中选择 **New File…**，添加以下文件：

`ScreenOrientation.swift`
`ScreenOrientationPlugin.swift`
`ScreenOrientationPlugin.m`

如果 Xcode 提示创建桥接头文件，请点击 **Create Bridging Header**。

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

这些 Objective-C 宏将插件注册到 Capacitor，使 `ScreenOrientationPlugin` 及其方法对 JavaScript 可用。

将以下代码复制到 `ScreenOrientationPlugin.swift`：

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

注意 `@objc` 装饰器的使用；这些是确保 Capacitor 在运行时能够看到类及其方法的必要条件。

## 获取当前屏幕方向

首先处理获取当前屏幕方向的任务。打开 `ScreenOrientation.swift` 来设置类并编写获取当前方向的方法：

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

接下来，在 `ScreenOrientationPlugin.swift` 中连接 `orientation` 方法以调用实现类的方法：

```swift
@objc(ScreenOrientationPlugin)
public class ScreenOrientationPlugin: CAPPlugin {

  private let implementation = ScreenOrientation()

  @objc public func orientation(_ call: CAPPluginCall) {
    let orientationType = implementation.getCurrentOrientationType();
    call.resolve(["type": orientationType])
  }

  /* 其余代码为简洁起见省略 */
}
```

现在从 Xcode 运行应用，可以在真机或 iOS 模拟器上运行。加载完成后，你应该会在控制台看到以下日志：

```bash
⚡️  To Native ->  ScreenOrientation orientation 115962915
⚡️  TO JS {"type":"portrait-primary"}
```

> **注意：** 日志的确切值会有所不同。在此示例中，`115962915` 是从插件发出的方法调用分配的任意 ID。

你已成功将原生 iOS 代码桥接到 Web 应用！🎉

## 监听屏幕方向变化

iOS 通过 <a href="https://developer.apple.com/documentation/foundation/notificationcenter" target="_blank">通知中心（NotificationCenter）</a> 在 UIDevice 触发 `orientationDidChangeNotification` 事件时通知我们用户旋转了设备。

`load()` 方法是注册此事件观察者的合适位置。同样，`deinit()` 方法是移除观察者的合适位置。

在观察者注册中，我们需要提供一个方法，将改变的方向返回给监听插件 API 中定义的 `screenOrientationChange` 事件的监听器。我们可以重用 `getCurrentOrientationType()` 方法来获取改变的屏幕方向。

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
  // 如果方向未知、朝上或朝下，则忽略方向变化
  if(UIDevice.current.orientation.isValidInterfaceOrientation) {
    let orientation = implementation.getCurrentOrientationType()
    notifyListeners("screenOrientationChange", data: ["type": orientation])
  }
}
```

iOS 会检测三个维度的方向变化。如代码注释所述，当方向变化不涉及横屏或竖屏方向时，我们将忽略通知监听器。

## 锁定和解锁屏幕方向

iOS 并没有提供真正的"锁定"或"解锁"屏幕方向的机制，而是允许你以编程方式设置允许的方向。

为了实现这一点，我们需要在 `AppDelegate.swift` 的 `AppDelegate` 类中添加一个方法：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
    return ScreenOrientationPlugin.supportedOrientations
  }
```

注意函数返回 `ScreenOrientationPlugin.supportedOrientations`。这个属性还不存在，所以让我们在 `ScreenOrientationPlugin` 类中添加它作为一个私有静态类成员：

```swift
public static var supportedOrientations = UIInterfaceOrientationMask.all
```

通过以上设置，我们告诉 iOS 只支持由 `ScreenOrientationPlugin.supportedOrientations` 值定义的方向。如你所想，`UIInterfaceOrientationMask.all` 枚举值支持所有方向。在编写锁定屏幕方向的代码时，我们将选择更具限制性的枚举值。

我们需要一个将 OrientationType 映射到相应 UIInterfaceOrientationMask 枚举值的函数。向 `ScreenOrientation` 类添加以下方法：

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
    // 默认情况：竖屏主方向
    return UIInterfaceOrientationMask.portrait
  }
}
```

展望未来，我们还需要一个将 OrientationType 映射到 `Int` 的方法，所以现在也将其添加到 `ScreenOrientation` 类中：

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
    // 默认情况：竖屏主方向
    return UIInterfaceOrientation.portrait.rawValue
  }
}
```

现在所有设置都已完成，我们可以实现 `lock()` 方法了。向 `ScreenOrientation` 类添加以下方法：

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

这是一个复杂的方法，让我们分解其中的关键部分：

1. `completion: @escaping (UIInterfaceOrientationMask) -> Void` 告诉此方法的调用者必须提供一个函数，该方法执行完成时将调用此函数，并通过 `completion(mask)` 传递一个 `UIInterfaceOrientationMask` 值
2. `UIDevice.current.setValue(orientation, forKey: "orientation")` 为设备设置屏幕方向，但不会旋转屏幕到该方向
3. `UINavigationController.attemptRotationToDeviceOrientation()` 会尝试将应用旋转到上一行代码设置的屏幕方向
4. 我们将代码包装在 `DispatchQueue.main.async` 中以防止阻塞 UI 线程

这个方法需要在 `ScreenOrientationPlugin` 类中被调用，然后更新 `ScreenOrientationPlugin.supportedOrientations`，让 iOS 知道此时我们只支持一个特定的屏幕方向：

```swift
@objc public func lock(_ call: CAPPluginCall) {
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

`lock()` 方法还引入了一个 guard 语句，防止任何人在没有提供 `orientation` 输入参数的情况下调用它。拒绝任何缺少必需输入参数的插件方法调用是最佳实践。

要解锁屏幕方向，我们需要撤销锁定时所采取的步骤。向 `ScreenOrientation` 类添加以下方法：

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

通过将当前方向值设置为 `UIInterfaceOrientation.unknown`，iOS 会尝试自动校正方向。在 `ScreenOrientationPlugin` 类中，我们将 `supportedOrientations` 恢复为 `UIInterfaceOrientationMask.all`：

```swift
@objc public func unlock(_ call: CAPPluginCall) {
  implementation.unlock {
    ScreenOrientationPlugin.supportedOrientations = UIInterfaceOrientationMask.all
    call.resolve()
  }
}
```

## 测试一下！

在 Xcode 中，在设备或模拟器上运行应用。插件功能按预期工作！按下"Rotate My Device"按钮将屏幕方向旋转到横屏模式，如果进一步旋转，你会看到屏幕方向被锁定。按下"Confirm Signature"将解锁屏幕方向。

本教程的倒数第二步是：Android 实现。