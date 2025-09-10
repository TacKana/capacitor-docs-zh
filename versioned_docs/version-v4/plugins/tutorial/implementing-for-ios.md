# iOS 平台实现

选择先实现 iOS 还是 Android 其实很随意——坦白说，你可以先写 Android 实现，然后 iOS，再然后是 Web 端。或者任意组合顺序。本教程恰好选择先实现 iOS 部分。

你可能想先实现 Web 端，因为它更接近插件的 API 定义。如果在 Web 层开发时发现需要对 API 进行调整，会更容易发现和修改。

## 向 Capacitor 注册插件

> **前置条件:** 继续之前，请先熟悉 <a href="https://capacitorjs.com/docs/ios/custom-code" target="_blank">Capacitor 自定义原生 iOS 代码文档</a>。

通过运行 `npx cap open ios` 在 Xcode 中打开 Capacitor 应用的 iOS 项目。右键点击 **App** 分组（位于 **App** 目标下），从上下文菜单中选择 **New Group**。将新分组命名为 **plugins**。然后在 **plugins** 下再新建一个分组，命名为 **ScreenOrientation**。

完成后，你将拥有路径 `/App/App/plugins/ScreenOrientation/`。右键点击 **ScreenOrientation** 分组，选择 **New File…** 添加以下文件：

`ScreenOrientation.swift`
`ScreenOrientationPlugin.swift`
`ScreenOrientationPlugin.m`

如果 Xcode 提示创建桥接头文件，点击 **Create Bridging Header**。

将以下代码复制到 `ScreenOrientationPlugin.m`:

```objc
#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(ScreenOrientationPlugin, "ScreenOrientation",
  CAP_PLUGIN_METHOD(orientation, CAPPluginReturnPromise);
  CAP_PLUGIN_METHOD(lock, CAPPluginReturnPromise);
  CAP_PLUGIN_METHOD(unlock, CAPPluginReturnPromise);
)
```

这些 Objective-C 宏会将插件注册到 Capacitor，使 `ScreenOrientationPlugin` 及其方法对 JavaScript 可用。

将以下代码复制到 `ScreenOrientationPlugin.swift`:

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

注意 `@objc` 装饰器的使用，这是确保 Capacitor 在运行时能找到类和方法的必要标记。

## 获取当前屏幕方向

首先解决获取当前屏幕方向的问题。打开 `ScreenOrientation.swift` 创建类并编写获取当前方向的方法：

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

接下来，在 `ScreenOrientationPlugin.swift` 中连接 `orientation` 方法调用实现类的功能：

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

在 Xcode 中运行应用（可以使用真机或模拟器）。加载完成后，你会在控制台看到如下日志：

```bash
⚡️  To Native ->  ScreenOrientation orientation 115962915
⚡️  TO JS {"type":"portrait-primary"}
```

> **注意:** 日志中的具体值会有所不同。示例中的 `115962915` 是插件方法调用分配的随机 ID。

你已成功将原生 iOS 代码桥接到 Web 应用！🎉

## 监听屏幕方向变化

iOS 会在用户旋转设备时通过 <a href="https://developer.apple.com/documentation/foundation/notificationcenter" target="_blank">NotificationCenter</a> 通知我们，当 UIDevice 触发 `orientationDidChangeNotification` 事件时。

`load()` 方法是注册此事件观察者的合适位置。同样，`deinit()` 方法是移除观察者的正确位置。

在观察者注册中，我们需要提供方法来将改变的方向返回给监听插件 API 中定义的 `screenOrientationChange` 事件的监听器。我们可以重用 `getCurrentOrientationType()` 方法获取变更后的屏幕方向。

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

iOS 会检测三个维度的方向变化。如代码注释所述，当方向变化不涉及横屏或竖屏时，我们将忽略通知监听器。

## 锁定和解锁屏幕方向

iOS 并没有真正提供"锁定"或"解锁"屏幕方向的机制，而是允许你以编程方式设置允许的方向。

为此，我们需要在 `AppDelegate.swift` 的 `AppDelegate` 类中添加方法：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
    return ScreenOrientationPlugin.supportedOrientations
  }
```

注意函数返回 `ScreenOrientationPlugin.supportedOrientations`。这个属性尚不存在，所以让我们在 `ScreenOrientationPlugin` 类中添加为私有静态类成员：

```swift
public static var supportedOrientations = UIInterfaceOrientationMask.all
```

通过以上设置，我们告诉 iOS 只支持 `ScreenOrientationPlugin.supportedOrientations` 定义的方向。如你所料，`UIInterfaceOrientationMask.all` 枚举值支持所有方向。在编写锁定屏幕方向的代码时，我们将选择更具限制性的枚举值。

我们需要一个将 OrientationType 映射到相应 UIInterfaceOrientationMask 枚举值的函数。在 `ScreenOrientation` 类中添加以下方法：

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
    // 默认情况：竖屏
    return UIInterfaceOrientationMask.portrait
  }
}
```

前瞻性地，我们还需要一个将 OrientationType 映射到 `Int` 的方法，现在将其添加到 `ScreenOrientation` 类中：

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
    // 默认情况：竖屏
    return UIInterfaceOrientation.portrait.rawValue
  }
}
```

完成所有设置后，我们可以实现 `lock()` 方法。在 `ScreenOrientation` 类中添加以下方法：

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

这是个复杂的方法，让我们分解关键部分：

1. `completion: @escaping (UIInterfaceOrientationMask) -> Void` 告诉调用者必须提供一个函数，方法执行完成时会通过 `completion(mask)` 传递 `UIInterfaceOrientationMask` 值
2. `UIDevice.current.setValue(orientation, forKey: "orientation")` 为设备设置屏幕方向，但不会旋转屏幕
3. `UINavigationController.attemptRotationToDeviceOrientation()` 尝试将应用旋转到上一步设置的方向
4. 我们将代码包装在 `DispatchQueue.main.async` 中以防止阻塞 UI 线程

这个方法需要从 `ScreenOrientationPlugin` 类调用，之后更新 `ScreenOrientationPlugin.supportedOrientations` 让 iOS 知道当前只支持一个特定方向：

```swift
​​@objc public func lock(_ call: CAPPluginCall) {
  guard let lockToOrientation = call.getString("orientation") else {
    call.reject("必须提供'orientation'输入参数")
    return
  }
  implementation.lock(lockToOrientation, completion: { (mask) -> Void in
    ScreenOrientationPlugin.supportedOrientations = mask;
    call.resolve()
  })
}
```

`lock()` 方法还引入了 guard 语句，防止调用时缺少 `orientation` 输入参数。最佳实践是拒绝任何缺少必需参数的插件方法调用。

要解锁屏幕方向，我们只需撤销锁定时的操作。在 `ScreenOrientation` 类中添加以下方法：

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

## 测试功能！

在 Xcode 中使用设备或模拟器运行应用。插件功能如预期工作！点击"Rotate My Device"按钮会将屏幕方向旋转为横屏模式，继续旋转会发现方向已被锁定。点击"Confirm Signature"会解锁屏幕方向。

本教程的倒数第二步是：Android 平台的实现。