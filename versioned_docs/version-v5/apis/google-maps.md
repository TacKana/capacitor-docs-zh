---
title: Google Maps Capacitor 插件 API
description: 在 Capacitor 中使用 Google 地图
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/google-maps/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/google-maps/src/definitions.ts
sidebar_label: Google Maps
---

# @capacitor/google-maps

在 Capacitor 中使用 Google 地图

## 安装

```bash
npm install @capacitor/google-maps
npx cap sync
```

## API 密钥

要在任何平台上使用 Google Maps SDK，都需要使用关联了**已启用结算功能**账户的 API 密钥。这些密钥可从 [Google Cloud Console](https://console.cloud.google.com) 获取。Android、iOS 和 JavaScript 三个平台都需要此密钥。关于获取这些 API 密钥的更多信息，可在各平台的 [Google Maps 文档](https://developers.google.com/maps/documentation/android-sdk/overview) 中找到。

## iOS

Google Maps SDK 支持通过 `enableCurrentLocation(bool)` 显示用户的当前位置。使用此功能时，苹果要求必须在 `Info.plist` 中指定隐私描述：

- `NSLocationAlwaysUsageDescription` (`隐私 - 始终使用位置描述`)
- `NSLocationWhenInUseUsageDescription` (`隐私 - 使用时使用位置描述`)

阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 部分，了解如何在 Xcode 中设置 iOS 权限的更多信息。

> 主 Google Maps SDK 现在支持在 Apple Silicon Mac 的模拟器上运行，但请确保已安装最新版本的 [Google-Maps-iOS-Utils](https://github.com/googlemaps/google-maps-ios-utils)。

如果之前添加过获取未发布版本的临时解决方案，现在可以通过从 `ios/App/Podfile` 中删除以下行来移除：

```
pod 'Google-Maps-iOS-Utils', :git => 'https://github.com/googlemaps/google-maps-ios-utils.git', :commit => '637954e5bcb2a879c11a6f2cead153a6bad5339f'
```

然后从 `ios/App/` 文件夹运行 `pod update Google-Maps-iOS-Utils`：

```
cd ios/App
pod update Google-Maps-iOS-Utils
```

## Android

Android 版的 Google Maps SDK 要求将 API 密钥添加到项目的 AndroidManifest.xml 文件中。

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

要使用某些定位功能，SDK 还要求在 AndroidManifest.xml 中添加以下权限：

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### 变量

本插件将使用以下项目变量（定义在应用的 `variables.gradle` 文件中）：

- `googleMapsPlayServicesVersion`: `com.google.android.gms:play-services-maps` 版本（默认：`18.1.0`）
- `googleMapsUtilsVersion`: `com.google.maps.android:android-maps-utils` 版本（默认：`3.4.0`）
- `googleMapsKtxVersion`: `com.google.maps.android:maps-ktx` 版本（默认：`3.4.0`）
- `googleMapsUtilsKtxVersion`: `com.google.maps.android:maps-utils-ktx` 版本（默认：`3.4.0`）
- `kotlinxCoroutinesVersion`: `org.jetbrains.kotlinx:kotlinx-coroutines-android` 和 `org.jetbrains.kotlinx:kotlinx-coroutines-core` 版本（默认：`1.6.4`）
- `androidxCoreKTXVersion`: `androidx.core:core-ktx` 版本（默认：`1.10.0`）
- `kotlin_version`: `org.jetbrains.kotlin:kotlin-stdlib` 版本（默认：`1.8.20`）


## 使用说明

Google Maps Capacitor 插件附带了一个 Web 组件，必须使用该组件在应用中渲染地图，因为它能让我们在 iOS 上更有效地嵌入原生视图。插件会自动注册这个 Web 组件以便在应用中使用。

> 对于 Angular 用户，会收到一个错误警告，提示 Angular 编译器不认识此 Web 组件。通过修改声明组件的模块以允许自定义 Web 组件可以解决此问题。
>
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
>
> @NgModule({
>   schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })
> ```

在 HTML 中包含此组件并分配一个 ID，以便稍后可以轻松查询该元素引用。

```html
<capacitor-google-map id="map"></capacitor-google-map>
```

> 在 Android 上，地图渲染在整个 WebView 下方，并使用此组件在滚动事件期间管理其定位。这意味着开发者**必须**确保 WebView 从各层到底部完全透明。在典型的 Ionic 应用中，这意味着在 IonContent 和根 HTML 标签等元素上设置透明度以确保地图可见。如果在 Android 上看不到地图，这应该是首要检查的事项。
>
> 在 iOS 上，我们直接将地图渲染到 WebView 中，因此不需要相同的透明度效果。我们仍在研究 Android 的替代方法，希望在未来的更新中更好地解决此问题。

Google Map 元素本身是无样式的，因此应设置其样式以适应页面布局结构。因为我们正在向此插槽渲染视图，元素本身没有宽度或高度，所以请务必显式设置这些属性。

```css
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
```

接下来，我们应该创建地图引用。这是通过从 Capacitor 插件导入 GoogleMap 类并调用 create 方法，传入所需参数来实现的。

```typescript
import { GoogleMap } from '@capacitor/google-maps';

const apiKey = 'YOUR_API_KEY_HERE';

const mapRef = document.getElementById('map');

const newMap = await GoogleMap.create({
  id: 'my-map', // 此地图实例的唯一标识符
  element: mapRef, // 对 capacitor-google-map 元素的引用
  apiKey: apiKey, // 你的 Google Maps API Key
  config: {
    center: {
      // 地图初始渲染的位置
      lat: 33.6,
      lng: -117.9,
    },
    zoom: 8, // 地图初始渲染的缩放级别
  },
});
```

此时，地图应该已在应用中创建。使用返回的地图引用，可以通过多种方式轻松地与地图交互，这里展示几种方式。

```typescript
const newMap = await GoogleMap.create({...});

// 向地图添加标记点
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

// 启用标记点聚类
await newMap.enableClustering();

// 处理标记点点击
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
      element: mapRef, // 对 capacitor-google-map 元素的引用
      apiKey: 'YOUR_API_KEY_HERE', // 你的 Google Maps API Key
      config: {
        center: {
          // 地图初始渲染的位置
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8, // 地图初始渲染的缩放级别
      },
    });
  };
</script>
```

（后续 API 文档部分保持原样，不进行翻译）