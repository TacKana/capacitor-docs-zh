---  
title: 构建 Capacitor 插件  
description: 构建 Capacitor 插件 - Android 端实现  
contributors:  
  - eric-horodyski  
sidebar_label: Android 端实现  
slug: /plugins/tutorial/android-implementation  
---  

# Android 端实现  

插件开发已接近尾声，现在只需完成 Android 平台的实现！  

## 向 Capacitor 注册插件  

> **前提条件**：继续之前，请先熟悉 <a href="https://capacitorjs.com/docs/android/custom-code" target="_blank">Capacitor 自定义原生 Android 代码文档</a>。  

通过运行 `npx cap open android` 在 Android Studio 中打开 Capacitor 应用的 Android 项目。展开 **app** 模块和 **java** 文件夹，右键点击应用的 Java 包（即 `io.ionic.cap.plugin` 包）。  
从上下文菜单中选择 **新建 -> 包**，创建一个名为 **plugins** 的子包。再次右键点击 **plugins** 包，重复上述过程创建 **ScreenOrientation** 子包。  

接着，右键点击 **ScreenOrientation** 包，选择 **新建 -> Java 文件**，创建名为 `ScreenOrientationPlugin.java` 的文件。重复此过程创建另一个文件 `ScreenOrientation.java`。  

将以下代码复制到 `ScreenOrientationPlugin.java`：  

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

在项目的 MainActivity 中注册插件类，以实现 Java 与 JavaScript 的桥接。打开 `MainActivity.java`，添加 `onCreate()` 方法用于注册插件：  

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

与 iOS 端类似，我们先处理获取当前屏幕方向的功能。打开 `ScreenOrientation.java`，设置类结构并编写获取当前方向的方法：  

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

接下来，在 `ScreenOrientationPlugin.java` 中关联 `orientation` 方法以调用实现类的功能：  

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

`load()` 方法是初始化 `ScreenOrientation` 类实例并与 Capacitor 桥接对象关联的理想位置。  

在 Android Studio 中运行应用（可使用真机或模拟器）。打开 **Logcat**，应能看到如下调用日志：  

```bash  
V/Capacitor/Plugin: 原生调用 (Capacitor 插件): callbackId: 89582874, pluginId: ScreenOrientation, methodName: orientation  
```  

> **注意**：日志中的具体值会有所不同。示例中的 `89582874` 是插件方法调用时分配的随机 ID。  

## 监听屏幕方向变化  

Android 将设备旋转视为运行时配置变更，因此我们需要让插件能够 <a href="https://developer.android.com/guide/topics/resources/runtime-changes" target="_blank">处理配置变更</a>。  

Capacitor 提供了可重写的方法 `handleOnConfigurationChanged()`，用于响应运行时配置变更。  

首先在 `ScreenOrientationPlugin` 类中添加导入：  

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

当 Android 通知应用配置变更时，它会返回完整的新配置对象，这带来两个挑战：  

1. 如何确保仅在方向变化时通知监听器？  
2. 如何确认配置变更是由方向变化引起的？  

为解决这些问题，插件需要记录之前的 `newConfig.orientation` 值，以便与后续变更进行比较。  

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

现在，插件仅在运行时配置变更确实涉及方向变化时才会通知监听器。  

## 锁定与解锁屏幕方向  

与 iOS 实现类似，我们需要一个辅助方法将 JavaScript 的 OrientationType 映射为对应的原生枚举值。在 Android 中，我们将 OrientationType 映射为 ActivityInfo 的枚举值。在 `ScreenOrientation` 类中添加以下方法：  

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

确保在 `ScreenOrientation.java` 中导入 `android.content.pm.ActivityInfo`。  

接着，在 `ScreenOrientation` 类中添加 `lock()` 方法：  

```java  
public void lock(String orientationType) {  
   int orientationEnum = fromOrientationTypeToEnum(orientationType);  
   activity.setRequestedOrientation(orientationEnum);  
}  
```  

此方法需要在 `ScreenOrientationPlugin` 类中调用：  

```java  
@PluginMethod()  
public void lock(PluginCall call) {  
   String orientationType = call.getString("orientation");  
   if(orientationType == null) {  
       call.reject("必须提供 'orientation' 参数");  
       return;  
   }  
   implementation.lock(orientationType);  
   call.resolve();  
}  
```  

注意，我们防止了未提供 `orientation` 参数时对 `lock()` 方法的调用。  

要解锁屏幕方向，将 activity 的方向类型设置为未指定的枚举值。在 `ScreenOrientation` 类中添加以下方法：  

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

## 测试功能！  

在 Android Studio 中使用设备或模拟器运行应用。点击“旋转设备”按钮将使屏幕方向锁定为横屏模式，继续旋转会看到方向已被锁定。点击“确认签名”将解锁屏幕方向。  

> **注意**：测试前请确保设备设置中的 **自动旋转** 已开启，否则功能将无法生效。  

恭喜！你已经构建了一个支持 Web、iOS 和 Android 的 Capacitor 插件！ 👏 👏 👏  

目前，`ScreenOrientation` 插件是本地插件，仅供当前应用使用。这完全没问题！很多时候你只需要在特定应用中使用插件。不过，如果想在多个应用中复用插件，我们将在最后一步：插件打包中介绍如何实现。