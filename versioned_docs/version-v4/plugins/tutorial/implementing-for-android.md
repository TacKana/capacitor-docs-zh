---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - Android 实现
contributors:
  - eric-horodyski
sidebar_label: Android 实现
slug: /plugins/tutorial/android-implementation
---

# Android 实现

插件的开发已接近完成，只剩下 Android 平台的实现了！

## 向 Capacitor 注册插件

> **前提条件：** 继续之前，请先熟悉 <a href="https://capacitorjs.com/docs/android/custom-code" target="_blank">Capacitor 自定义原生 Android 代码文档</a>。

通过运行 `npx cap open android` 在 Android Studio 中打开 Capacitor 应用的 Android 项目。展开 **app** 模块和 **java** 文件夹，右键单击你的应用的 Java 包。从上下文菜单中选择 **New -> Package**，创建一个名为 **plugins** 的子包。右键单击 **plugins** 包并重复上述过程，创建一个名为 **ScreenOrientation** 的子包。

接下来，右键单击 **ScreenOrientation** 包，通过从上下文菜单中选择 **New -> Java File** 来添加一个新的 Java 文件。将此文件命名为 `ScreenOrientationPlugin.java`。重复该过程以创建另一个名为 `ScreenOrientation.java` 的新文件。

将以下代码复制到 `ScreenOrientationPlugin.java` 中：

```java
package io.ionic.cap.plugin.plugins.ScreenOrientation;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "ScreenOrientation")
public class ScreenOrientationPlugin extends Plugin {

   @PluginMethod()
   public void orientation(PluginCall call) {
       call.resolve();
   }

   @PluginMethod()
   public void lock(PluginCall call) {
       call.resolve();
   }

   @PluginMethod()
   public void unlock(PluginCall call) {
       call.resolve();
   }
}
```

在项目的 MainActivity 中注册插件类，以便在 Java 和 JavaScript 之间建立桥接。打开 `MainActivity.java` 并添加 `onCreate()` 方法，在其中注册插件：

```java
package io.ionic.cap.plugin;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import io.ionic.cap.plugin.plugins.ScreenOrientation.ScreenOrientationPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(ScreenOrientationPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
```

## 获取当前屏幕方向

与 iOS 类似，我们首先处理获取当前屏幕方向的功能。打开 `ScreenOrientation.java` 来设置类并编写获取当前方向的方法：

```java
package io.ionic.cap.plugin.plugins.ScreenOrientation;

import android.view.Surface;
import androidx.appcompat.app.AppCompatActivity;

public class ScreenOrientation {
   private AppCompatActivity activity;

   public ScreenOrientation(AppCompatActivity activity) {
       this.activity = activity;
   }

   public String getCurrentOrientationType() {
       int rotation = activity.getWindowManager().getDefaultDisplay().getRotation();
       return fromRotationToOrientationType(rotation);
   }

   private String fromRotationToOrientationType(int rotation) {
       switch (rotation) {
           case Surface.ROTATION_90:
               return "landscape-primary";
           case Surface.ROTATION_180:
               return "portrait-secondary";
           case Surface.ROTATION_270:
               return "landscape-secondary";
           default:
               return "portrait-primary";
       }
   }
}
```

接下来，将 `ScreenOrientationPlugin.java` 中的 `orientation` 方法关联到实现类的方法：

```java
package io.ionic.cap.plugins.ScreenOrientation;

import com.getcapacitor.JSObject;
/* 其余导入已省略以保持简洁 */

@CapacitorPlugin(name = "ScreenOrientation")
public class ScreenOrientationPlugin extends Plugin {

   private ScreenOrientation implementation;

   @Override
   public void load() {
       implementation = new ScreenOrientation(getActivity());
   }

   @PluginMethod()
   public void orientation(PluginCall call) {
       JSObject ret = new JSObject();
       String type = implementation.getCurrentOrientationType();
       ret.put("type", type);
       call.resolve(ret);
   }

   /* 其余代码已省略以保持简洁 */
}
```

`load()` 方法是使用 Capacitor 桥接对象初始化 `ScreenOrientation` 类实例的合适位置。

在 Android Studio 中运行应用，可以在真实设备或 Android 模拟器上运行。打开 **Logcat**，你应该能看到调用日志：

```bash
V/Capacitor/Plugin: To native (Capacitor plugin): callbackId: 89582874, pluginId: ScreenOrientation, methodName: orientation
```

> **注意：** 日志中的具体值可能会有所不同。在本示例中，`89582874` 是插件方法调用分配的一个任意 ID。

## 监听屏幕方向变化

Android 将设备旋转视为运行时配置更改，因此我们的插件需要一种方式来 <a href="https://developer.android.com/guide/topics/resources/runtime-changes" target="_blank">处理配置更改</a>。

Capacitor 提供了一个可重写的方法 `handleOnConfigurationChanged()`，可用于响应运行时配置更改。

首先在 `ScreenOrientationPlugin` 类中添加以下导入：

```java
import android.content.res.Configuration;
```

然后在 `ScreenOrientationPlugin` 类中添加以下方法：

```java
@Override
public void handleOnConfigurationChanged(Configuration newConfig) {
   super.handleOnConfigurationChanged(newConfig);
   this.onOrientationChanged();
}

private void onOrientationChanged() {
   JSObject ret = new JSObject();
   String type = implementation.getCurrentOrientationType();
   ret.put("type", type);
   notifyListeners("screenOrientationChange", ret);
}
```

当 Android 通知应用配置更改时，它会返回整个新的配置对象，这带来了两个挑战：

1. 如何确保只在方向变化时通知监听器？
2. 如何知道配置更改是由于方向变化引起的？

我们需要插件跟踪先前的 `newConfig.orientation` 值，以便与后续的配置更改进行比较，从而解决这些挑战。

在 `ScreenOrientation` 类中添加以下内容：

```java
@Nullable private int configOrientation;

public boolean hasOrientationChanged(int orientation) {
    if (orientation == configOrientation) {
        return false;
    } else {
        this.configOrientation = orientation;
        return true;
    }
}
```

别忘了在 `ScreenOrientation.java` 中导入 `androidx.annotation.Nullable`。

然后更新 `ScreenOrientationPlugin.java` 中的 `handleOnConfigurationChanged()` 方法：

```java
@Override
public void handleOnConfigurationChanged(Configuration newConfig) {
   super.handleOnConfigurationChanged(newConfig);
   if(implementation.hasOrientationChanged(newConfig.orientation)) {
       this.onOrientationChanged();
   }
}
```

现在，插件只会在运行时配置更改与方向变化相关时通知监听器。

## 锁定与解锁屏幕方向

正如我们在 iOS 实现中所见，我们需要一个辅助方法将 JavaScript 的 OrientationType 映射到对应的原生枚举值。对于 Android，我们将把 OrientationType 映射为 ActivityInfo 枚举值。在 `ScreenOrientation` 类中添加以下方法：

```java
private int fromOrientationTypeToEnum(String orientationType) {
   switch (orientationType) {
       case "landscape-primary":
           return ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE;
       case "landscape-secondary":
           return ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE;
       case "portrait-secondary":
           return ActivityInfo.SCREEN_ORIENTATION_REVERSE_PORTRAIT;
       default:
           // 默认情况：portrait-primary
           return ActivityInfo.SCREEN_ORIENTATION_PORTRAIT;
   }
}
```

请确保将 `android.content.pm.ActivityInfo` 导入到 `ScreenOrientation.java` 文件中。

接下来，在 `ScreenOrientation` 类中添加 `lock()` 方法：

```java
public void lock(String orientationType) {
   int orientationEnum = fromOrientationTypeToEnum(orientationType);
   activity.setRequestedOrientation(orientationEnum);
}
```

这个方法需要在 `ScreenOrientationPlugin` 类中被调用：

```java
@PluginMethod()
public void lock(PluginCall call) {
   String orientationType = call.getString("orientation");
   if(orientationType == null) {
       call.reject("必须提供输入参数 'orientation'。");
       return;
   }
   implementation.lock(orientationType);
   call.resolve();
}
```

注意，我们防止了未提供 `orientation` 输入参数就调用 `lock()` 方法的情况。

要解锁屏幕方向，我们将 activity 的方向类型设置为未指定的枚举值。在 `ScreenOrientation` 类中添加以下方法：

```java
public void unlock() {
   activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
}
```

然后在 `ScreenOrientationPlugin` 类中调用实现方法：

```java
@PluginMethod()
public void unlock(PluginCall call) {
   implementation.unlock();
   call.resolve();
}
```

## 亲自测试一下吧！

在 Android Studio 中，在设备或模拟器上运行应用。按下“旋转我的设备”按钮将使屏幕方向旋转为横屏模式，如果继续旋转，你会发现屏幕方向已被锁定。按下“确认签名”将解锁屏幕方向。

> **注意：** 在测试插件之前，请确保设备的 **自动旋转** 设置已开启，否则插件将无法正常工作。

恭喜你，你已经构建了一个可在 Web、iOS 和 Android 上运行的 Capacitor 插件！👏 👏 👏

目前，`ScreenOrientation` 插件是一个本地插件，只有这个应用程序可以使用它。这完全可以！很多时候，你可能只希望某个插件在特定应用中使用。但如果你希望在多个应用中复用插件，我们将在最后一步中介绍如何实现：打包插件。