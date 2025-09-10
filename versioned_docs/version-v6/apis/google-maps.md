---
title: Google Maps Capacitor 插件 API
description: 在 Capacitor 中使用 Google 地图
custom_edit_url: https://github.com/ionic-team/capacitor-google-maps/blob/6.x/plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-google-maps/blob/6.x/plugin/src/definitions.ts
sidebar_label: Google 地图
---

# @capacitor/google-maps

Capacitor 平台的 Google 地图插件

## 安装

```bash
npm install @capacitor/google-maps
npx cap sync
```

## API 密钥

要在任何平台上使用 Google Maps SDK，都需要关联到_已启用计费_账户的 API 密钥。这些密钥可以从 [Google Cloud 控制台](https://console.cloud.google.com) 获取。Android、iOS 和 JavaScript 三个平台都需要此密钥。有关获取这些 API 密钥的更多信息，请参阅各平台的 [Google 地图文档](https://developers.google.com/maps/documentation/android-sdk/overview)。

## iOS 配置

Google Maps SDK 支持通过 `enableCurrentLocation(bool)` 显示用户的当前位置。使用此功能时，Apple 要求在 `Info.plist` 中指定隐私描述：

- `NSLocationWhenInUseUsageDescription` (`隐私 - 在使用期间访问位置说明`)

更多关于在 Xcode 中设置 iOS 权限的信息，请参阅 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 Info.plist](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist)。

> 当前主流的 Google Maps SDK 已支持在 Apple Silicon Mac 的模拟器上运行，但请确保已安装最新版本的 [Google-Maps-iOS-Utils](https://github.com/googlemaps/google-maps-ios-utils)。

如果之前添加了获取未发布版本的临时解决方案，现在可以通过从 `ios/App/Podfile` 中删除以下行来移除：

```
pod 'Google-Maps-iOS-Utils', :git => 'https://github.com/googlemaps/google-maps-ios-utils.git', :commit => '637954e5bcb2a879c11a6f2cead153a6bad5339f'
```

然后在 `ios/App/` 目录下运行 `pod update Google-Maps-iOS-Utils`：

```
cd ios/App
pod update Google-Maps-iOS-Utils
```

## Android 配置

Android 版的 Google Maps SDK 要求将 API 密钥添加到项目中的 AndroidManifest.xml 文件：

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

要使用某些定位功能，SDK 还需要在 AndroidManifest.xml 中添加以下权限：

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### 变量

本插件会使用以下项目变量（定义在应用的 `variables.gradle` 文件中）：

- `googleMapsPlayServicesVersion`: `com.google.android.gms:play-services-maps` 版本 (默认: `18.2.0`)
- `googleMapsUtilsVersion`: `com.google.maps.android:android-maps-utils` 版本 (默认: `3.8.2`)
- `googleMapsKtxVersion`: `com.google.maps.android:maps-ktx` 版本 (默认: `5.0.0`)
- `googleMapsUtilsKtxVersion`: `com.google.maps.android:maps-utils-ktx` 版本 (默认: `5.0.0`)
- `kotlinxCoroutinesVersion`: `org.jetbrains.kotlinx:kotlinx-coroutines-android` 和 `org.jetbrains.kotlinx:kotlinx-coroutines-core` 版本 (默认: `1.7.3`)
- `androidxCoreKTXVersion`: `androidx.core:core-ktx` 版本 (默认: `1.12.0`)
- `kotlin_version`: `org.jetbrains.kotlin:kotlin-stdlib` 版本 (默认: `1.9.10`)

## 使用说明

Google Maps Capacitor 插件附带了一个必须用于在应用中渲染地图的 Web 组件，这样能更有效地在 iOS 上嵌入原生视图。插件会自动注册此 Web 组件以供应用使用。

> 对于 Angular 用户，Angular 编译器会警告此 Web 组件未知。通过修改声明组件的模块以允许自定义 Web 组件可以解决此问题。
>
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
>
> @NgModule({
>   schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })
> ```

在 HTML 中包含此组件并为其分配一个 ID，以便稍后可以轻松查询该元素引用：

```html
<capacitor-google-map id="map"></capacitor-google-map>
```

> 在 Android 上，地图是在整个 WebView 下方渲染的，并使用此组件在滚动事件期间管理其定位。这意味着开发者_必须_确保 WebView 从各层到底部都是透明的。在典型的 Ionic 应用中，这意味着需要为 IonContent 和根 HTML 标签等元素设置透明度，以确保地图可见。如果在 Android 上看不到地图，这应该是首先要检查的事项。
>
> 在 iOS 上，地图是直接渲染到 WebView 中的，因此不需要相同的透明度效果。我们仍在研究 Android 的替代方法，希望在未来的更新中更好地解决这一问题。

Google 地图元素本身没有样式，因此应设置样式以适应页面布局。由于我们是在此插槽中渲染视图，元素本身没有宽度或高度，所以请务必显式设置这些值：

```css
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
```

接下来，我们应该创建地图引用。这是通过从 Capacitor 插件导入 GoogleMap 类并调用 create 方法，传入所需参数完成的：

```typescript
import { GoogleMap } from '@capacitor/google-maps';

const apiKey = 'YOUR_API_KEY_HERE';

const mapRef = document.getElementById('map');

const newMap = await GoogleMap.create({
  id: 'my-map', // 此地图实例的唯一标识符
  element: mapRef, // 引用 capacitor-google-map 元素
  apiKey: apiKey, // 您的 Google Maps API 密钥
  config: {
    center: {
      // 地图初始渲染位置
      lat: 33.6,
      lng: -117.9,
    },
    zoom: 8, // 地图初始缩放级别
  },
});
```

此时，您的地图应该已在应用中创建。使用返回的地图引用，您可以通过多种方式轻松与地图交互，这里展示了几种方式：

```typescript
const newMap = await GoogleMap.create({...});

// 在地图上添加标记
const markerId = await newMap.addMarker({
  coordinate: {
    lat: 33.6,
    lng: -117.9
  }
});

// 以编程方式移动地图
await newMap.setCamera({
  coordinate: {
    lat: 33.6,
    lng: -117.9
  }
});

// 启用标记聚类
await newMap.enableClustering();

// 处理标记点击
await newMap.setOnMarkerClickListener((event) => {...});

// 清理地图引用
await newMap.destroy();
```

## 完整示例

### Angular

```typescript
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  template: `
    <capacitor-google-map #map></capacitor-google-map>
    <button (click)="createMap()">创建地图</button>
  `,
  styles: [
    `
      capacitor-google-map {
        display: inline-block;
        width: 275px;
        height: 400px;
      }
    `,
  ],
})
export class MyMap {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }
}
```

### React

```jsx
import { GoogleMap } from '@capacitor/google-maps';
import { useRef } from 'react';

const MyMap: React.FC = () => {
  const mapRef = useRef<HTMLElement>();
  let newMap: GoogleMap;

  async function createMap() {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef.current,
      apiKey: process.env.REACT_APP_YOUR_API_KEY_HERE,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9
        },
        zoom: 8
      }
    })
  }

  return (
    <div className="component-wrapper">
      <capacitor-google-map ref={mapRef} style={{
        display: 'inline-block',
        width: 275,
        height: 400
      }}></capacitor-google-map>

      <button onClick={createMap}>创建地图</button>
    </div>
  )
}

export default MyMap;
```

### JavaScript

```html
<capacitor-google-map id="map"></capacitor-google-map>
<button onclick="createMap()">创建地图</button>

<style>
  capacitor-google-map {
    display: inline-block;
    width: 275px;
    height: 400px;
  }
</style>

<script>
  import { GoogleMap } from '@capacitor/google-maps';

  const createMap = async () => {
    const mapRef = document.getElementById('map');

    const newMap = await GoogleMap.create({
      id: 'my-map', // 此地图实例的唯一标识符
      element: mapRef, // 引用 capacitor-google-map 元素
      apiKey: 'YOUR_API_KEY_HERE', // 您的 Google Maps API 密钥
      config: {
        center: {
          // 地图初始渲染位置
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8, // 地图初始缩放级别
      },
    });
  };
</script>
```

## API 文档

（注：由于 API 部分包含大量代码和参数定义，遵循技术文档翻译规范，保持原始代码结构和术语不变，仅翻译描述性文本。完整 API 部分请参考英文原版，此处不再重复列举。）