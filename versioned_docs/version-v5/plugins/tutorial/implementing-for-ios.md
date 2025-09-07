# 实现 iOS 版插件

先实现 iOS 还是 Android 其实并无硬性规定——老实说，你也可以先写 Android 实现，再写 iOS，最后写 web 端。或者任意组合顺序。本教程只是恰巧选择先实现 iOS 版本。

你可能会倾向于先实现 web 端，因为它更接近插件的 API 定义。如果在 API 层面需要调整，在 web 层工作时更容易发现问题。

## 向 Capacitor 注册插件

> **前提条件：** 继续之前请先熟悉 <a href="https://capacitorjs.com/docs/ios/custom-code" target="_blank">Capacitor 自定义 iOS 原生代码文档</a>。

通过运行 `npx cap open ios` 在 Xcode 中打开 Capacitor 应用的 iOS 项目。右键点击 **App** 分组（位于 **App** 目标下），从上下文菜单中选择 **New Group**。将新分组命名为 **plugins**。接着在 **plugins** 下创建 **ScreenOrientation** 子分组。

完成后，你将得到路径 `/App/App/plugins/ScreenOrientation/`。右键点击 **ScreenOrientation** 分组，选择 **New File…** 添加以下文件：

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

这些 Objective-C 宏将插件注册到 Capacitor，使 JavaScript 可以调用 `ScreenOrientationPlugin` 及其方法。

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

注意 `@objc` 装饰器的使用，它们确保 Capacitor 在运行时能识别类及其方法。

## 获取当前屏幕方向

首先处理获取当前屏幕方向的任务。打开 `ScreenOrientation.swift` 创建类并编写获取当前方向的方法：

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
      // 默认 portrait 情况
      return "portrait-primary"
    }
  }

}
```

接着在 `ScreenOrientationPlugin.swift` 中关联 `orientation` 方法：

```Swift
@objc(ScreenOrientationPlugin)
public class ScreenOrientationPlugin: CAPPlugin {

  private let implementation = ScreenOrientation()

  @objc public func orientation(_ call: CAPPluginCall) {
    let orientationType = implementation.getCurrentOrientationType();
    call.resolve(["type": orientationType])
  }

  /* 其余代码省略 */
}
```

在 Xcode 中运行应用（真机或模拟器）。加载完成后，控制台会显示类似日志：

```bash
⚡️  To Native ->  ScreenOrientation orientation 115962915
⚡️  TO JS {"type":"portrait-primary"}
```

> **注意：** 日志中的具体值会有所不同。示例中的 `115962915` 是插件方法调用分配的随机 ID。

你已成功将 iOS 原生代码桥接到 web 应用！🎉

## 监听屏幕方向变化

iOS 通过 <a href="https://developer.apple.com/documentation/foundation/notificationcenter" target="_blank">NotificationCenter</a> 在设备旋转时触发 `orientationDidChangeNotification` 事件。

`load()` 方法是注册观察者的理想位置，而 `deinit()` 方法适合移除观察者。

在观察者注册中，我们需要提供方法将方向变化返回给监听 `screenOrientationChange` 事件的插件监听器。可以复用 `getCurrentOrientationType()` 方法来获取变化后的方向。

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

iOS 会检测三维方向变化。如代码注释所述，当方向变化不涉及横屏或竖屏时，我们忽略通知监听器。

## 锁定与解锁屏幕方向

iOS 并未提供直接的"锁定"或"解锁"屏幕方向机制，而是允许通过编程设置允许的方向。

为此，我们需要在 `AppDelegate.swift` 的 `AppDelegate` 类中添加方法：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
    return ScreenOrientationPlugin.supportedOrientations
  }
```

该方法返回 `ScreenOrientationPlugin.supportedOrientations`，这个属性尚不存在，我们在 `ScreenOrientationPlugin` 类中添加为私有静态成员：

```swift
public static var supportedOrientations = UIInterfaceOrientationMask.all
```

通过以上代码，我们告诉 iOS 只支持 `ScreenOrientationPlugin.supportedOrientations` 定义的方向。`UIInterfaceOrientationMask.all` 枚举值支持所有方向，锁定屏幕方向时会选择更严格的枚举值。

我们需要将 OrientationType 映射到对应的 UIInterfaceOrientationMask 枚举值。在 `ScreenOrientation` 类中添加：

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
    // portrait-primary 情况
    return UIInterfaceOrientationMask.portrait
  }
}
```

考虑到后续需求，我们提前添加将 OrientationType 映射为 `Int` 的方法：

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
    // portrait-primary 情况
    return UIInterfaceOrientation.portrait.rawValue
  }
}
```

现在可以实现 `lock()` 方法了。在 `ScreenOrientation` 类中添加：

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

这个方法比较复杂，关键点解析：

1. `completion: @escaping (UIInterfaceOrientationMask) -> Void` 要求调用者提供完成回调函数
2. `UIDevice.current.setValue` 设置设备方向但不旋转屏幕
3. `UINavigationController.attemptRotationToDeviceOrientation()` 尝试旋转应用到设定方向
4. `DispatchQueue.main.async` 包装代码防止阻塞 UI 线程

在 `ScreenOrientationPlugin` 类中调用此方法，并更新 `supportedOrientations`：

```swift
​​@objc public func lock(_ call: CAPPluginCall) {
  guard let lockToOrientation = call.getString("orientation") else {
    call.reject("必须提供 'orientation' 参数")
    return
  }
  implementation.lock(lockToOrientation, completion: { (mask) -> Void in
    ScreenOrientationPlugin.supportedOrientations = mask;
    call.resolve()
  })
}
```

`lock()` 方法还添加了参数检查，防止缺少必要参数调用。这是插件方法的最佳实践。

要实现解锁功能，我们逆向操作锁定步骤。在 `ScreenOrientation` 类中添加：

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

将当前方向值设为 `UIInterfaceOrientation.unknown` 让 iOS 自动校正方向。在 `ScreenOrientationPlugin` 类中恢复 `supportedOrientations`：

```swift
@objc public func unlock(_ call: CAPPluginCall) {
  implementation.unlock {
    ScreenOrientationPlugin.supportedOrientations = UIInterfaceOrientationMask.all
    call.resolve()
  }
}
```

## 测试功能！

在 Xcode 中使用设备或模拟器运行应用。插件功能正常！点击"Rotate My Device"按钮会将屏幕旋转至横屏模式，继续旋转会发现方向已被锁定。点击"Confirm Signature"将解锁屏幕方向。

本教程的倒数第二步是：实现 Android 版本。