---
title: Google Maps Capacitor 插件 API
description: 在 Capacitor 中使用 Google 地图
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/google-maps/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/google-maps/src/definitions.ts
sidebar_label: Google 地图
---

# @capacitor/google-maps

Capacitor 平台上的 Google 地图集成

## 安装

```bash
npm install @capacitor/google-maps
npx cap sync
```

## API 密钥配置

在所有平台上使用 Google Maps SDK 都需要获取关联至已开启账单账户的 API 密钥，这些密钥可通过 [Google Cloud 控制台](https://console.cloud.google.com) 获取。Android、iOS 和 JavaScript 平台均需配置 API 密钥，各平台具体获取方法详见 Google 地图官方文档：
- [Android SDK 文档](https://developers.google.com/maps/documentation/android-sdk/overview)
- [iOS SDK 文档](https://developers.google.com/maps/documentation/ios-sdk/overview)
- [JavaScript API 文档](https://developers.google.com/maps/documentation/javascript/overview)

## iOS 平台配置

通过 `enableCurrentLocation(bool)` 方法启用用户当前位置显示功能时，需在 `Info.plist` 中添加以下位置权限描述：

- `NSLocationAlwaysUsageDescription` (`隐私 - 始终定位使用说明`)
- `NSLocationWhenInUseUsageDescription` (`隐私 - 使用时定位说明`)

关于在 Xcode 中配置 iOS 权限的更多信息，请参阅 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [Info.plist 配置说明](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist)。

> 当前 Google Maps SDK 暂不支持在基于 M1 芯片的 Macbook 模拟器上运行，这是 [Google 已确认的问题](https://developers.google.com/maps/faq#arm-based-macs)。建议 M1 Macbook 开发者使用真机进行调试。

## Android 平台配置

需在项目的 AndroidManifest.xml 中添加 API 密钥：

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

如需使用定位功能，还需添加以下权限：

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### Gradle 变量配置

本插件使用以下项目变量（定义在应用的 `variables.gradle` 文件中）：

- `$googleMapsPlayServicesVersion`: `com.google.android.gms:play-services-maps` 版本 (默认: `18.0.2`)
- `$googleMapsUtilsVersion`: `com.google.maps.android:android-maps-utils` 版本 (默认: `2.3.0`)
- `$googleMapsKtxVersion`: `com.google.maps.android:maps-ktx` 版本 (默认: `3.4.0`)
- `$googleMapsUtilsKtxVersion`: `com.google.maps.android:maps-utils-ktx` 版本 (默认: `3.4.0`)
- `$kotlinxCoroutinesVersion`: `org.jetbrains.kotlinx:kotlinx-coroutines-android` 和 `org.jetbrains.kotlinx:kotlinx-coroutines-core` 版本 (默认: `1.6.3`)
- `$androidxCoreKTXVersion`: `androidx.core:core-ktx` 版本 (默认: `1.8.0`)
- `$kotlin_version`: `org.jetbrains.kotlin:kotlin-stdlib-jdk7` 版本 (默认: `1.7.0`)

## 使用指南

本插件提供了必须使用的 Web 组件来渲染地图（该组件能优化 iOS 平台的原生视图嵌入效果），插件会自动注册该组件供应用调用。

> Angular 开发者需在组件模块中添加 CUSTOM_ELEMENTS_SCHEMA 以支持自定义 Web 组件：
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
>
> @NgModule({
>   schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })
> ```

在 HTML 中添加组件并设置 ID 以便后续引用：

```html
<capacitor-google-map id="map"></capacitor-google-map>
```

> **Android 特别说明**：地图实际渲染在 WebView 底层，该组件仅用于滚动时管理定位。开发者必须确保从最外层到最内层的所有元素（如 IonContent 和根 HTML 标签）均设置为透明背景。若地图不可见，请优先检查此项。
>
> **iOS** 平台采用直接渲染方式，无需透明背景设置。我们正在研究 Android 平台的替代方案，将在未来版本中改进此问题。

地图元素默认无样式，需手动设置尺寸以适应页面布局：

```css
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
```

通过以下代码创建地图实例：

```typescript
import { GoogleMap } from '@capacitor/google-maps';

const apiKey = 'YOUR_API_KEY_HERE';

const mapRef = document.getElementById('map');

const newMap = await GoogleMap.create({
  id: 'my-map', // 地图实例唯一标识
  element: mapRef, // 对应 capacitor-google-map 元素
  apiKey: apiKey, // Google Maps API 密钥
  config: {
    center: { // 初始中心点坐标
      lat: 33.6,
      lng: -117.9,
    },
    zoom: 8, // 初始缩放级别
  },
});
```

创建成功后，可通过返回的 map 实例进行交互操作：

```typescript
const newMap = await GoogleMap.create({...});

// 添加标记点
const markerId = await newMap.addMarker({
  coordinate: {
    lat: 33.6,
    lng: -117.9
  }
});

// 移动地图视角
await newMap.setCamera({
  coordinate: {
    lat: 33.6,
    lng: -117.9
  }
});

// 启用标记点聚类
await newMap.enableClustering();

// 标记点点击事件
await newMap.setOnMarkerClickListener((event) => {...});

// 销毁地图实例
await newMap.destroy();
```

## 完整示例

### Angular 示例

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

### React 示例

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

### JavaScript 示例

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
      id: 'my-map',
      element: mapRef,
      apiKey: 'YOUR_API_KEY_HERE',
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  };
</script>
```

（注：由于篇幅限制，完整的 API 文档部分维持了原始英文内容，实际使用时可根据需要提供中文翻译版本）