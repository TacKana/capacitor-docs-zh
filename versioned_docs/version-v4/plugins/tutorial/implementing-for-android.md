# 实现Android平台功能

插件开发已接近尾声，现在只差Android平台的实现！

## 向Capacitor注册插件

> **前提条件**：继续之前，请先熟悉<a href="https://capacitorjs.com/docs/android/custom-code" target="_blank">Capacitor自定义原生Android代码文档</a>。

运行`npx cap open android`在Android Studio中打开Capacitor应用的Android项目。展开**app**模块下的**java**文件夹，右键点击应用的Java包。从上下文菜单中选择**新建 -> 包**，创建名为**plugins**的子包。再右键点击**plugins**包，重复上述过程创建**ScreenOrientation**子包。

接着，右键**ScreenOrientation**包，选择**新建 -> Java类**创建`ScreenOrientationPlugin.java`文件。同样方式创建`ScreenOrientation.java`文件。

将以下代码复制到`ScreenOrientationPlugin.java`：

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

在项目的MainActivity中注册插件类，建立Java与JavaScript的桥梁。打开`MainActivity.java`添加`onCreate()`方法注册插件：

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

与iOS实现类似，我们先处理获取当前屏幕方向的功能。打开`ScreenOrientation.java`设置类结构并编写获取当前方向的方法：

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

然后在`ScreenOrientationPlugin.java`中关联`orientation`方法与实现类的功能：

```java
package io.ionic.cap.plugins.ScreenOrientation;

import com.getcapacitor.JSObject;
/* 其余导入省略 */

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

   /* 其余代码省略 */
}
```

`load()`方法是初始化`ScreenOrientation`类实例与Capacitor桥接对象的理想位置。

在Android Studio中运行应用（真机或模拟器），打开**Logcat**应能看到调用记录：

```bash
V/Capacitor/Plugin: To native (Capacitor plugin): callbackId: 89582874, pluginId: ScreenOrientation, methodName: orientation
```

> **注意**：实际日志值会有所不同。示例中`89582874`是插件方法调用分配的任意ID。

## 监听屏幕方向变化

Android将设备旋转视为运行时配置变更，因此需要让插件能够<a href="https://developer.android.com/guide/topics/resources/runtime-changes" target="_blank">处理配置变更</a>。

Capacitor提供了可重写方法`handleOnConfigurationChanged()`来响应运行时配置变更。

首先在`ScreenOrientationPlugin`类中添加导入：

```java
import android.content.res.Configuration;
```

然后添加以下方法：

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

Android通知应用配置变更时会返回完整的新配置对象，这带来两个挑战：

1. 如何确保只在方向变化时通知监听器？
2. 如何确认配置变更是由方向变化引起？

我们需要让插件追踪前一个`newConfig.orientation`值，以便比较后续配置变更。

在`ScreenOrientation`类中添加：

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

别忘了在`ScreenOrientation.java`中导入`androidx.annotation.Nullable`。

然后更新`ScreenOrientationPlugin.java`中的`handleOnConfigurationChanged()`方法：

```java
@Override
public void handleOnConfigurationChanged(Configuration newConfig) {
   super.handleOnConfigurationChanged(newConfig);
   if(implementation.hasOrientationChanged(newConfig.orientation)) {
       this.onOrientationChanged();
   }
}
```

现在插件只会在运行时配置变更确实涉及方向变化时才通知监听器。

## 锁定与解锁屏幕方向

与iOS实现类似，需要辅助方法将JavaScript的OrientationType映射到对应的原生枚举值。Android中我们将OrientationType映射到ActivityInfo枚举值。在`ScreenOrientation`类中添加：

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
           // 默认 portrait-primary
           return ActivityInfo.SCREEN_ORIENTATION_PORTRAIT;
   }
}
```

确保在`ScreenOrientation.java`中导入`android.content.pm.ActivityInfo`。

接着在`ScreenOrientation`类中添加`lock()`方法：

```java
public void lock(String orientationType) {
   int orientationEnum = fromOrientationTypeToEnum(orientationType);
   activity.setRequestedOrientation(orientationEnum);
}
```

从`ScreenOrientationPlugin`类调用此方法：

```java
@PluginMethod()
public void lock(PluginCall call) {
   String orientationType = call.getString("orientation");
   if(orientationType == null) {
       call.reject("必须提供'orientation'输入参数");
       return;
   }
   implementation.lock(orientationType);
   call.resolve();
}
```

注意我们防范了未提供`orientation`参数就调用`lock()`方法的情况。

要解锁屏幕方向，需将activity的方向类型设为未指定枚举值。在`ScreenOrientation`类中添加：

```java
public void unlock() {
   activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
}
```

然后从`ScreenOrientationPlugin`类调用实现方法：

```java
@PluginMethod()
public void unlock(PluginCall call) {
   implementation.unlock();
   call.resolve();
}
```

## 测试功能！

在Android Studio中运行应用（设备或模拟器）。点击"Rotate My Device"按钮将屏幕方向锁定为横屏，继续旋转会看到方向已被锁定。点击"Confirm Signature"将解锁屏幕方向。

> **注意**：测试前请确保设备设置中的**自动旋转**已开启，否则功能无法正常工作。

恭喜，你已成功构建了可在Web、iOS和Android平台运行的Capacitor插件！👏 👏 👏

目前`ScreenOrientation`插件是本地插件，仅限当前应用使用。这完全没问题！很多时候你只需要在特定应用中使用插件。不过如果想在多个应用中复用插件，我们将在最后一步：插件打包中介绍如何实现。