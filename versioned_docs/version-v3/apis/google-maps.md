---
title: Google Maps Capacitor Plugin API
description: 在 Capacitor 中使用 Google 地图
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/google-maps/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/google-maps/src/definitions.ts
sidebar_label: Google Maps
---

# @capacitor/google-maps

Capacitor 平台的 Google 地图插件

## 安装

```bash
npm install @capacitor/google-maps
npx cap sync
```

## API 密钥

要在任何平台上使用 Google Maps SDK，都需要关联到 _已启用结算功能_ 账户的 API 密钥。这些密钥可以从 [Google 云控制台](https://console.cloud.google.com) 获取。Android、iOS 和 JavaScript 三大平台均需此密钥。各平台获取 API 密钥的更多信息，请参阅 Google 地图的 [平台专属文档](https://developers.google.com/maps/documentation/android-sdk/overview)。

## iOS 平台

Google Maps SDK 支持通过 `enableCurrentLocation(bool)` 显示用户当前位置。使用此功能时，Apple 要求必须在 `Info.plist` 中指定隐私描述：

- `NSLocationAlwaysUsageDescription` （隐私 - 始终使用位置描述）
- `NSLocationWhenInUseUsageDescription` （隐私 - 使用时使用位置描述）

关于在 Xcode 中设置 iOS 权限的更多信息，请参阅 [iOS 指南](https://capacitorjs.com/docs/v3/ios) 中的 [配置 Info.plist](https://capacitorjs.com/docs/v3/ios/configuration#configuring-infoplist) 部分。

> 当前 Google Maps SDK 不支持在基于 M1 芯片的 Macbook 模拟器上运行。这是 [Google 已知并确认的问题](https://developers.google.com/maps/faq#arm-based-macs)，需要等待 Google 修复。如果您使用 M1 Macbook 开发，建议通过物理设备进行构建和运行。

## Android 平台

Android 版的 Google Maps SDK 要求将 API 密钥添加到项目的 AndroidManifest.xml 文件中：

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

如需使用某些定位功能，还需在 AndroidManifest.xml 中添加以下权限：

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

## 使用指南

Google Maps Capacitor 插件附带了一个必须用于渲染地图的 Web 组件，这能帮助我们在 iOS 上更高效地嵌入原生视图。插件会自动注册该组件供应用使用。

> 对于 Angular 用户，编译器会警告该 Web 组件未知。可通过修改组件声明模块以允许自定义 Web 组件来解决：
>
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
>
> @NgModule({
>   schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })
> ```

在 HTML 中包含此组件并分配一个 ID，以便后续轻松获取元素引用：

```html
<capacitor-google-map id="map"></capacitor-google-map>
```

> 在 Android 上，地图会渲染在整个 WebView 下方，并利用此组件管理滚动时的定位。这意味着开发者 _必须_ 确保从最上层到最底层的 WebView 完全透明。典型的 Ionic 应用中，需要为 IonContent 和根 HTML 标签等元素设置透明背景。如果在 Android 上看不到地图，应首先检查此项设置。
>
> 在 iOS 上，地图直接渲染到 WebView 中，因此不需要相同的透明效果。我们仍在研究 Android 平台的替代方案，希望在未来更新中改进此问题。

Google 地图元素默认无样式，您需要为其设计适合页面布局的样式。由于我们是在该元素内渲染视图，元素本身没有宽度和高度，请务必显式设置这些属性：

```css
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
```

接下来创建地图引用。通过从 Capacitor 插件导入 GoogleMap 类并调用 create 方法，传入必要参数：

```typescript
import { GoogleMap } from '@capacitor/google-maps';

const apiKey = 'YOUR_API_KEY_HERE';

const mapRef = document.getElementById('map');

const newMap = await GoogleMap.create({
  id: 'my-map', // 地图实例的唯一标识符
  element: mapRef, // 指向 capacitor-google-map 元素的引用
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

至此，您的地图应已在应用中创建完成。利用返回的地图引用，可以通过多种方式与地图交互，以下展示部分功能：

```typescript
const newMap = await GoogleMap.create({...});

// 添加标记点到地图
const markerId = await newMap.addMarker({
  coordinate: {
    lat: 33.6,
    lng: -117.9
  }
});

// 编程方式移动地图
await newMap.setCamera({
  coordinate: {
    lat: 33.6,
    lng: -117.9
  }
});

// 启用标记点聚类
await newMap.enableClustering();

// 处理标记点点击事件
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
    <capacitor-google-maps #map></capacitor-google-maps>
    <button (click)="createMap()">创建地图</button>
  `,
  styles: [
    `
      capacitor-google-maps {
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
      id: 'my-map', // 地图实例的唯一标识符
      element: mapRef, // 指向 capacitor-google-map 元素的引用
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

<docgen-index>

* [`create(...)`](#create)
* [`enableClustering()`](#enableclustering)
* [`disableClustering()`](#disableclustering)
* [`addMarker(...)`](#addmarker)
* [`addMarkers(...)`](#addmarkers)
* [`removeMarker(...)`](#removemarker)
* [`removeMarkers(...)`](#removemarkers)
* [`destroy()`](#destroy)
* [`setCamera(...)`](#setcamera)
* [`setMapType(...)`](#setmaptype)
* [`enableIndoorMaps(...)`](#enableindoormaps)
* [`enableTrafficLayer(...)`](#enabletrafficlayer)
* [`enableAccessibilityElements(...)`](#enableaccessibilityelements)
* [`enableCurrentLocation(...)`](#enablecurrentlocation)
* [`setPadding(...)`](#setpadding)
* [`setOnBoundsChangedListener(...)`](#setonboundschangedlistener)
* [`setOnCameraIdleListener(...)`](#setoncameraidlelistener)
* [`setOnCameraMoveStartedListener(...)`](#setoncameramovestartedlistener)
* [`setOnClusterClickListener(...)`](#setonclusterclicklistener)
* [`setOnClusterInfoWindowClickListener(...)`](#setonclusterinfowindowclicklistener)
* [`setOnInfoWindowClickListener(...)`](#setoninfowindowclicklistener)
* [`setOnMapClickListener(...)`](#setonmapclicklistener)
* [`setOnMarkerClickListener(...)`](#setonmarkerclicklistener)
* [`setOnMyLocationButtonClickListener(...)`](#setonmylocationbuttonclicklistener)
* [`setOnMyLocationClickListener(...)`](#setonmylocationclicklistener)
* [接口](#interfaces)
* [类型别名](#type-aliases)
* [枚举](#enums)

</docgen-index>

<docgen-api>


### create(...)

```typescript
create(options: CreateMapArgs, callback?: MapListenerCallback<MapReadyCallbackData> | undefined) => Promise<GoogleMap>
```

| 参数           | 类型                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#createmapargs">CreateMapArgs</a></code>                                                                             |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapreadycallbackdata">MapReadyCallbackData</a>&gt;</code> |

**返回值:** <code>Promise&lt;GoogleMap&gt;</code>

--------------------


### enableClustering()

```typescript
enableClustering() => Promise<void>
```

--------------------


### disableClustering()

```typescript
disableClustering() => Promise<void>
```

--------------------


### addMarker(...)

```typescript
addMarker(marker: Marker) => Promise<string>
```

| 参数         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`marker`** | <code><a href="#marker">Marker</a></code> |

**返回值:** <code>Promise&lt;string&gt;</code>

--------------------


### addMarkers(...)

```typescript
addMarkers(markers: Marker[]) => Promise<string[]>
```

| 参数          | 类型                  |
| ------------- | --------------------- |
| **`markers`** | <code>Marker[]</code> |

**返回值:** <code>Promise&lt;string[]&gt;</code>

--------------------


### removeMarker(...)

```typescript
removeMarker(id: string) => Promise<void>
```

| 参数      | 类型                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

--------------------


### removeMarkers(...)

```typescript
removeMarkers(ids: string[]) => Promise<void>
```

| 参数       | 类型                  |
| --------- | --------------------- |
| **`ids`** | <code>string[]</code> |

--------------------


### destroy()

```typescript
destroy() => Promise<void>
```

--------------------


### setCamera(...)

```typescript
setCamera(config: CameraConfig) => Promise<void>
```

| 参数         | 类型                                                  |
| ------------ | ----------------------------------------------------- |
| **`config`** | <code><a href="#cameraconfig">CameraConfig</a></code> |

--------------------


### setMapType(...)

```typescript
setMapType(mapType: MapType) => Promise<void>
```

| 参数          | 类型                                        |
| ------------- | ------------------------------------------- |
| **`mapType`** | <code><a href="#maptype">MapType</a></code> |

--------------------


### enableIndoorMaps(...)

```typescript
enableIndoorMaps(enabled: boolean) => Promise<void>
```

| 参数          | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### enableTrafficLayer(...)

```typescript
enableTrafficLayer(enabled: boolean) => Promise<void>
```

| 参数          | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### enableAccessibilityElements(...)

```typescript
enableAccessibilityElements(enabled: boolean) => Promise<void>
```

| 参数          | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### enableCurrentLocation(...)

```typescript
enableCurrentLocation(enabled: boolean) => Promise<void>
```

| 参数          | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### setPadding(...)

```typescript
setPadding(padding: MapPadding) => Promise<void>
```

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`padding`** | <code><a href="#mappadding">MapPadding</a></code> |

--------------------


### setOnBoundsChangedListener(...)

```typescript
setOnBoundsChangedListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code> |

--------------------


### setOnCameraIdleListener(...)

```typescript
setOnCameraIdleListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code> |

--------------------


### setOnCameraMoveStartedListener(...)

```typescript
setOnCameraMoveStartedListener(callback?: MapListenerCallback<CameraMoveStartedCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameramovestartedcallbackdata">CameraMoveStartedCallbackData</a>&gt;</code> |

--------------------


### setOnClusterClickListener(...)

```typescript
setOnClusterClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code> |

--------------------


### setOnClusterInfoWindowClickListener(...)

```typescript
setOnClusterInfoWindowClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code> |

--------------------


### setOnInfoWindowClickListener(...)

```typescript
setOnInfoWindowClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMapClickListener(...)

```typescript
setOnMapClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerClickListener(...)

```typescript
setOnMarkerClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> |