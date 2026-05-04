---
title: Google Maps Capacitor 插件 API
description: Capacitor 上的 Google 地图
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/google-maps/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/google-maps/src/definitions.ts
sidebar_label: Google Maps
---

# @capacitor/google-maps

Capacitor 上的 Google 地图

## 安装

```bash
npm install @capacitor/google-maps
npx cap sync
```

## API 密钥

要在任何平台上使用 Google Maps SDK，都需要获取与**启用了结算功能**的帐户相关联的 API 密钥。这些密钥可以从 [Google Cloud Console](https://console.cloud.google.com) 获取。这对于 Android、iOS 和 JavaScript 所有三个平台都是必需的。有关获取这些 API 密钥的更多信息，可以在每个平台的 [Google Maps 文档](https://developers.google.com/maps/documentation/android-sdk/overview) 中找到。

## iOS

Google Maps SDK 支持通过 `enableCurrentLocation(bool)` 显示用户的当前位置。要使用此功能，Apple 要求在 `Info.plist` 中指定隐私描述：

- `NSLocationAlwaysUsageDescription` (`隐私 - 始终使用位置说明`)
- `NSLocationWhenInUseUsageDescription` (`隐私 - 使用时使用位置说明`)

在 [iOS 指南](https://capacitorjs.com/docs/ios) 中阅读有关 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 的更多信息，了解如何在 Xcode 中设置 iOS 权限。

> 主 Google Maps SDK 现在支持在 Apple Silicon Mac 的模拟器上运行，但请确保安装了最新版本的 [Google-Maps-iOS-Utils](https://github.com/googlemaps/google-maps-ios-utils)。

如果您之前为获取未发布版本添加了变通方法，现在可以通过从 `ios/App/Podfile` 中删除以下行来移除它：

```
pod 'Google-Maps-iOS-Utils', :git => 'https://github.com/googlemaps/google-maps-ios-utils.git', :commit => '637954e5bcb2a879c11a6f2cead153a6bad5339f'
```

然后从 `ios/App/` 文件夹运行 `pod update Google-Maps-iOS-Utils`：

```
cd ios/App
pod update Google-Maps-iOS-Utils
```

## Android

适用于 Android 的 Google Maps SDK 要求您将 API 密钥添加到项目中的 AndroidManifest.xml 文件。

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

要使用某些定位功能，SDK 还要求将以下权限添加到您的 AndroidManifest.xml：

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### 变量

此插件将使用以下项目变量（定义在您应用的 `variables.gradle` 文件中）：

- `googleMapsPlayServicesVersion`: `com.google.android.gms:play-services-maps` 的版本（默认：`18.1.0`）
- `googleMapsUtilsVersion`: `com.google.maps.android:android-maps-utils` 的版本（默认：`3.4.0`）
- `googleMapsKtxVersion`: `com.google.maps.android:maps-ktx` 的版本（默认：`3.4.0`）
- `googleMapsUtilsKtxVersion`: `com.google.maps.android:maps-utils-ktx` 的版本（默认：`3.4.0`）
- `kotlinxCoroutinesVersion`: `org.jetbrains.kotlinx:kotlinx-coroutines-android` 和 `org.jetbrains.kotlinx:kotlinx-coroutines-core` 的版本（默认：`1.6.4`）
- `androidxCoreKTXVersion`: `androidx.core:core-ktx` 的版本（默认：`1.10.0`）
- `kotlin_version`: `org.jetbrains.kotlin:kotlin-stdlib` 的版本（默认：`1.8.20`）

## 使用

Google Maps Capacitor 插件附带一个 Web 组件，必须在您的应用程序中使用它来渲染地图，因为它使我们能够在 iOS 上更有效地嵌入原生视图。该插件将自动注册此 Web 组件以供您的应用程序使用。

> 对于 Angular 用户，您会收到一个错误警告，提示 Angular 编译器不认识此 Web 组件。通过修改声明组件的模块以允许自定义 Web 组件可以解决此问题。
>
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
>
> @NgModule({
>   schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })
> ```

在您的 HTML 中包含此组件，并为其分配一个 ID，以便稍后可以轻松查询该元素引用。

```html
<capacitor-google-map id="map"></capacitor-google-map>
```

> 在 Android 上，地图渲染在整个 WebView 下方，并使用此组件在滚动事件期间管理其定位。这意味着作为开发者，您**必须**确保 WebView 从各层一直到最底部都是透明的。在典型的 Ionic 应用程序中，这意味着在诸如 IonContent 和根 HTML 标签等元素上设置透明度，以确保可以看见地图。如果在 Android 上看不到您的地图，这应该是您首先检查的事项。
>
> 在 iOS 上，我们直接将地图渲染到 WebView 中，因此不需要相同的透明度效果。我们仍在研究 Android 的替代方法，并希望在未来的更新中更好地解决此问题。

Google Map 元素本身没有样式，因此您应该设置其样式以适合页面结构的布局。因为我们正在向此插槽渲染一个视图，所以元素本身没有宽度或高度，请务必显式设置它们。

```css
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
```

接下来，我们应该创建地图引用。这是通过从 Capacitor 插件导入 GoogleMap 类并调用 create 方法，并传入所需的参数来完成的。

```typescript
import { GoogleMap } from '@capacitor/google-maps';

const apiKey = 'YOUR_API_KEY_HERE';

const mapRef = document.getElementById('map');

const newMap = await GoogleMap.create({
  id: 'my-map', // 此地图实例的唯一标识符
  element: mapRef, // 对 capacitor-google-map 元素的引用
  apiKey: apiKey, // 您的 Google Maps API 密钥
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

此时，您的地图应该在您的应用程序中创建完成。使用返回的地图引用，您可以以多种方式轻松地与地图交互，这里展示了其中几种。

```typescript
const newMap = await GoogleMap.create({...});

// 向地图添加标记
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

### Javascript

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
      apiKey: 'YOUR_API_KEY_HERE', // 你的 Google Maps API 密钥
      config: {
        center: {
          // 地图初始渲染的中心位置
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8, // 地图初始渲染的缩放级别
      },
    });
  };
</script>
```

## API

<docgen-index>

* [`create(...)`](#create)
* [`enableTouch()`](#enabletouch)
* [`disableTouch()`](#disabletouch)
* [`enableClustering(...)`](#enableclustering)
* [`disableClustering()`](#disableclustering)
* [`addMarker(...)`](#addmarker)
* [`addMarkers(...)`](#addmarkers)
* [`removeMarker(...)`](#removemarker)
* [`removeMarkers(...)`](#removemarkers)
* [`addPolygons(...)`](#addpolygons)
* [`removePolygons(...)`](#removepolygons)
* [`addCircles(...)`](#addcircles)
* [`removeCircles(...)`](#removecircles)
* [`addPolylines(...)`](#addpolylines)
* [`removePolylines(...)`](#removepolylines)
* [`destroy()`](#destroy)
* [`setCamera(...)`](#setcamera)
* [`getMapType()`](#getmaptype)
* [`setMapType(...)`](#setmaptype)
* [`enableIndoorMaps(...)`](#enableindoormaps)
* [`enableTrafficLayer(...)`](#enabletrafficlayer)
* [`enableAccessibilityElements(...)`](#enableaccessibilityelements)
* [`enableCurrentLocation(...)`](#enablecurrentlocation)
* [`setPadding(...)`](#setpadding)
* [`fitBounds(...)`](#fitbounds)
* [`setOnBoundsChangedListener(...)`](#setonboundschangedlistener)
* [`setOnCameraIdleListener(...)`](#setoncameraidlelistener)
* [`setOnCameraMoveStartedListener(...)`](#setoncameramovestartedlistener)
* [`setOnClusterClickListener(...)`](#setonclusterclicklistener)
* [`setOnClusterInfoWindowClickListener(...)`](#setonclusterinfowindowclicklistener)
* [`setOnInfoWindowClickListener(...)`](#setoninfowindowclicklistener)
* [`setOnMapClickListener(...)`](#setonmapclicklistener)
* [`setOnMarkerClickListener(...)`](#setonmarkerclicklistener)
* [`setOnPolygonClickListener(...)`](#setonpolygonclicklistener)
* [`setOnCircleClickListener(...)`](#setoncircleclicklistener)
* [`setOnPolylineClickListener(...)`](#setonpolylineclicklistener)
* [`setOnMarkerDragStartListener(...)`](#setonmarkerdragstartlistener)
* [`setOnMarkerDragListener(...)`](#setonmarkerdraglistener)
* [`setOnMarkerDragEndListener(...)`](#setonmarkerdragendlistener)
* [`setOnMyLocationButtonClickListener(...)`](#setonmylocationbuttonclicklistener)
* [`setOnMyLocationClickListener(...)`](#setonmylocationclicklistener)
* [接口](#接口)
* [类型别名](#类型别名)
* [枚举](#枚举)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### create(...)

```typescript
create(options: CreateMapArgs, callback?: MapListenerCallback<MapReadyCallbackData> | undefined) => Promise<GoogleMap>
```

| 参数            | 类型                                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`options`**   | <code><a href="#createmapargs">CreateMapArgs</a></code>                                                                             |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapreadycallbackdata">MapReadyCallbackData</a>&gt;</code> |

**返回值:** <code>Promise&lt;GoogleMap&gt;</code>

--------------------


### enableTouch()

```typescript
enableTouch() => Promise<void>
```

--------------------


### disableTouch()

```typescript
disableTouch() => Promise<void>
```

--------------------


### enableClustering(...)

```typescript
enableClustering(minClusterSize?: number | undefined) => Promise<void>
```

| 参数                | 类型                | 描述                                                                             |
| ------------------- | ------------------- | --------------------------------------------------------------------------------------- |
| **`minClusterSize`** | <code>number</code> | 可以聚合成一个标记簇的最小标记数量。默认值为 4 个标记。 |

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

| 参数        | 类型                                      |
| ------------ | ----------------------------------------- |
| **`marker`** | <code><a href="#marker">Marker</a></code> |

**返回值:** <code>Promise&lt;string&gt;</code>

--------------------


### addMarkers(...)

```typescript
addMarkers(markers: Marker[]) => Promise<string[]>
```

| 参数         | 类型                  |
| ------------- | --------------------- |
| **`markers`** | <code>Marker[]</code> |

**返回值:** <code>Promise&lt;string[]&gt;</code>

--------------------


### removeMarker(...)

```typescript
removeMarker(id: string) => Promise<void>
```

| 参数    | 类型                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

--------------------


### removeMarkers(...)

```typescript
removeMarkers(ids: string[]) => Promise<void>
```

| 参数     | 类型                  |
| --------- | --------------------- |
| **`ids`** | <code>string[]</code> |

--------------------


### addPolygons(...)

```typescript
addPolygons(polygons: Polygon[]) => Promise<string[]>
```

| 参数          | 类型                   |
| -------------- | ---------------------- |
| **`polygons`** | <code>Polygon[]</code> |

**返回值:** <code>Promise&lt;string[]&gt;</code>

--------------------

### removePolygons(...)

```typescript
removePolygons(ids: string[]) => Promise<void>
```

| 参数       | 类型                  |
| ---------- | --------------------- |
| **`ids`**  | <code>string[]</code> |

--------------------


### addCircles(...)

```typescript
addCircles(circles: Circle[]) => Promise<string[]>
```

| 参数           | 类型                  |
| -------------- | --------------------- |
| **`circles`**  | <code>Circle[]</code> |

**返回值:** <code>Promise&lt;string[]&gt;</code>

--------------------


### removeCircles(...)

```typescript
removeCircles(ids: string[]) => Promise<void>
```

| 参数       | 类型                  |
| ---------- | --------------------- |
| **`ids`**  | <code>string[]</code> |

--------------------


### addPolylines(...)

```typescript
addPolylines(polylines: Polyline[]) => Promise<string[]>
```

| 参数             | 类型                    |
| ---------------- | ----------------------- |
| **`polylines`**  | <code>Polyline[]</code> |

**返回值:** <code>Promise&lt;string[]&gt;</code>

--------------------


### removePolylines(...)

```typescript
removePolylines(ids: string[]) => Promise<void>
```

| 参数       | 类型                  |
| ---------- | --------------------- |
| **`ids`**  | <code>string[]</code> |

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

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`config`**  | <code><a href="#cameraconfig">CameraConfig</a></code> |

--------------------


### getMapType()

```typescript
getMapType() => Promise<MapType>
```

获取当前地图类型

**返回值:** <code>Promise&lt;<a href="#maptype">MapType</a>&gt;</code>

--------------------


### setMapType(...)

```typescript
setMapType(mapType: MapType) => Promise<void>
```

| 参数           | 类型                                        |
| -------------- | ------------------------------------------- |
| **`mapType`**  | <code><a href="#maptype">MapType</a></code> |

--------------------


### enableIndoorMaps(...)

```typescript
enableIndoorMaps(enabled: boolean) => Promise<void>
```

| 参数           | 类型                 |
| -------------- | -------------------- |
| **`enabled`**  | <code>boolean</code> |

--------------------


### enableTrafficLayer(...)

```typescript
enableTrafficLayer(enabled: boolean) => Promise<void>
```

| 参数           | 类型                 |
| -------------- | -------------------- |
| **`enabled`**  | <code>boolean</code> |

--------------------


### enableAccessibilityElements(...)

```typescript
enableAccessibilityElements(enabled: boolean) => Promise<void>
```

| 参数           | 类型                 |
| -------------- | -------------------- |
| **`enabled`**  | <code>boolean</code> |

--------------------


### enableCurrentLocation(...)

```typescript
enableCurrentLocation(enabled: boolean) => Promise<void>
```

| 参数           | 类型                 |
| -------------- | -------------------- |
| **`enabled`**  | <code>boolean</code> |

--------------------


### setPadding(...)

```typescript
setPadding(padding: MapPadding) => Promise<void>
```

| 参数           | 类型                                              |
| -------------- | ------------------------------------------------- |
| **`padding`**  | <code><a href="#mappadding">MapPadding</a></code> |

--------------------


### fitBounds(...)

```typescript
fitBounds(bounds: LatLngBounds, padding?: number | undefined) => Promise<void>
```

设置地图视口以包含给定的边界区域。

| 参数           | 类型                      | 描述                                                                                       |
| -------------- | ------------------------- | ------------------------------------------------------------------------------------------ |
| **`bounds`**   | <code>LatLngBounds</code> | 要适配到视口中的边界区域。                                                                 |
| **`padding`**  | <code>number</code>       | 可选，以像素为单位的边距。边界区域将被适配到地图去除边距后剩余的区域内。                   |

--------------------


### setOnBoundsChangedListener(...)

```typescript
setOnBoundsChangedListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code> |

--------------------


### setOnCameraIdleListener(...)

```typescript
setOnCameraIdleListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code> |

--------------------


### setOnCameraMoveStartedListener(...)

```typescript
setOnCameraMoveStartedListener(callback?: MapListenerCallback<CameraMoveStartedCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameramovestartedcallbackdata">CameraMoveStartedCallbackData</a>&gt;</code> |

--------------------


### setOnClusterClickListener(...)

```typescript
setOnClusterClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code> |

--------------------

### setOnClusterInfoWindowClickListener(...)

```typescript
setOnClusterInfoWindowClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code> |

--------------------


### setOnInfoWindowClickListener(...)

```typescript
setOnInfoWindowClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMapClickListener(...)

```typescript
setOnMapClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerClickListener(...)

```typescript
setOnMarkerClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnPolygonClickListener(...)

```typescript
setOnPolygonClickListener(callback?: MapListenerCallback<PolygonClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#polygonclickcallbackdata">PolygonClickCallbackData</a>&gt;</code> |

--------------------


### setOnCircleClickListener(...)

```typescript
setOnCircleClickListener(callback?: MapListenerCallback<CircleClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#circleclickcallbackdata">CircleClickCallbackData</a>&gt;</code> |

--------------------


### setOnPolylineClickListener(...)

```typescript
setOnPolylineClickListener(callback?: MapListenerCallback<PolylineCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#polylinecallbackdata">PolylineCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerDragStartListener(...)

```typescript
setOnMarkerDragStartListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerDragListener(...)

```typescript
setOnMarkerDragListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerDragEndListener(...)

```typescript
setOnMarkerDragEndListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------

### setOnMyLocationButtonClickListener(...)

```typescript
setOnMyLocationButtonClickListener(callback?: MapListenerCallback<MyLocationButtonClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mylocationbuttonclickcallbackdata">MyLocationButtonClickCallbackData</a>&gt;</code> |

--------------------


### setOnMyLocationClickListener(...)

```typescript
setOnMyLocationClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code> |

--------------------


### 接口


#### CreateMapArgs

一个包含创建地图时所用选项的接口。

| 属性              | 类型                                                        | 说明                                                                                                                                                                            | 默认值               |
| ----------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`id`**          | <code>string</code>                                         | 地图实例的唯一标识符。                                                                                                                                              |                    |
| **`apiKey`**      | <code>string</code>                                         | Google Maps SDK API 密钥。                                                                                                                                                           |                    |
| **`config`**      | <code><a href="#googlemapconfig">GoogleMapConfig</a></code> | 地图的初始配置设置。                                                                                                                                        |                    |
| **`element`**     | <code>HTMLElement</code>                                    | Google 地图视图将挂载的 DOM 元素，它决定了地图的大小和位置。                                                                                     |                    |
| **`forceCreate`** | <code>boolean</code>                                        | 如果已存在具有所提供 id 的地图实例，则销毁并重新创建它。                                                                                                    | <code>false</code> |
| **`region`**      | <code>string</code>                                         | `region` 参数会改变您的应用程序，以提供不同的地图图块或使应用程序产生偏好（例如，将地理编码结果偏向于该区域）。仅适用于 Web 平台。      |                    |
| **`language`**    | <code>string</code>                                         | `language` 参数会影响控件名称、版权声明、驾驶路线和控制标签的显示语言，以及服务请求的响应语言。仅适用于 Web 平台。 |                    |

#### GoogleMapConfig

在网页端，所有 JavaScript 的 Google Maps 选项都可用，因为 GoogleMapConfig 扩展了 google.maps.MapOptions。
在 iOS 和 Android 上，只有 <a href="#googlemapconfig">GoogleMapConfig</a> 中声明的配置选项可用。

| 属性                   | 类型                                      | 描述                                                                                                                                               | 默认值            | 起始版本 |
| ---------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`width`**            | <code>number</code>                       | 覆盖原生地图的宽度。                                                                                                                            |                    |       |
| **`height`**           | <code>number</code>                       | 覆盖原生地图的高度。                                                                                                                           |                    |       |
| **`x`**                | <code>number</code>                       | 覆盖原生地图的绝对 X 坐标位置。                                                                                                   |                    |       |
| **`y`**                | <code>number</code>                       | 覆盖原生地图的绝对 Y 坐标位置。                                                                                                   |                    |       |
| **`center`**           | <code><a href="#latlng">LatLng</a></code> | 相机指向的地球上的默认位置。                                                                                            |                    |       |
| **`zoom`**             | <code>number</code>                       | 设置地图的缩放级别。                                                                                                                                 |                    |       |
| **`androidLiteMode`**  | <code>boolean</code>                      | 在 Android 上启用基于图像的轻量模式。                                                                                                                 | <code>false</code> |       |
| **`devicePixelRatio`** | <code>number</code>                       | 覆盖原生地图的像素比。                                                                                                                      |                    |       |
| **`styles`**           | <code>MapTypeStyle[] \| null</code>       | 应用于每种默认地图类型的样式。请注意，对于卫星、混合和地形模式，这些样式仅适用于标签和几何图形。 |                    | 4.3.0 |
| **`mapId`**            | <code>string</code>                       | 与特定地图样式或功能关联的地图 ID。[使用地图 ID](https://developers.google.com/maps/documentation/get-map-id) 仅适用于网页。        |                    | 5.4.0 |
| **`androidMapId`**     | <code>string</code>                       | 与特定地图样式或功能关联的地图 ID。[使用地图 ID](https://developers.google.com/maps/documentation/get-map-id) 仅适用于 Android。    |                    | 5.4.0 |
| **`iOSMapId`**         | <code>string</code>                       | 与特定地图样式或功能关联的地图 ID。[使用地图 ID](https://developers.google.com/maps/documentation/get-map-id) 仅适用于 iOS。        |                    | 5.4.0 |


#### LatLng

一个表示经纬度坐标对的接口。

| 属性      | 类型                | 描述                                                               |
| --------- | ------------------- | ------------------------------------------------------------------------- |
| **`lat`** | <code>number</code> | 坐标纬度，单位为度。该值在范围 [-90, 90] 内。    |
| **`lng`** | <code>number</code> | 坐标经度，单位为度。该值在范围 [-180, 180] 内。 |


#### MapReadyCallbackData

| 属性        | 类型                |
| ----------- | ------------------- |
| **`mapId`** | <code>string</code> |

#### 标记点 {#marker}

标记点是在地图表面特定位置放置的图标。

| 属性             | 类型                                                         | 描述                                                                                                                                                                               | 默认值             | 引入版本 |
| ---------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`coordinate`** | <code><a href="#latlng">LatLng</a></code>                    | <a href="#marker">标记点</a>的位置                                                                                                                                                     |                    |       |
| **`opacity`**    | <code>number</code>                                          | 设置标记点的透明度，范围在 0（完全透明）到 1 之间。                                                                                                       | <code>1</code>     |       |
| **`title`**      | <code>string</code>                                          | 标题，覆盖物的简短描述。                                                                                                                                                |                    |       |
| **`snippet`**    | <code>string</code>                                          | 片段文本，在选中时显示在信息窗口的标题下方。                                                                                                                   |                    |       |
| **`isFlat`**     | <code>boolean</code>                                         | 控制此标记点是否应平贴于地球表面，或是作为面向相机的广告牌。                                                                                 | <code>false</code> |       |
| **`iconUrl`**    | <code>string</code>                                          | 要渲染的标记点图标路径。可以是相对于 Web 应用公共目录的路径，也可以是远程标记点图标的 https URL。**原生平台不支持 SVG 格式。**              |                    | 4.2.0 |
| **`iconSize`**   | <code><a href="#size">Size</a></code>                        | 控制通过 `iconUrl` 设置的标记点图像的缩放尺寸。                                                                                                                            |                    | 4.2.0 |
| **`iconOrigin`** | <code><a href="#point">Point</a></code>                      | 图像在雪碧图中的位置（如果有）。默认情况下，原点位于图像的左上角。                                                                |                    | 4.2.0 |
| **`iconAnchor`** | <code><a href="#point">Point</a></code>                      | 图像相对于地图上标记点位置的锚点位置。默认情况下，锚点位于图像底部中心点。 |                    | 4.2.0 |
| **`tintColor`**  | <code>{ r: number; g: number; b: number; a: number; }</code> | 自定义默认标记点图像的颜色。每个值必须在 0 到 255 之间。仅适用于 iOS 和 Android。                                                                         |                    | 4.2.0 |
| **`draggable`**  | <code>boolean</code>                                         | 控制此标记点是否可以通过交互方式拖动                                                                                                                                 | <code>false</code> |       |
| **`zIndex`**     | <code>number</code>                                          | 指定此标记点相对于地图上其他标记点的堆叠顺序。具有较高 z-index 的标记点会绘制在具有较低 z-index 的标记点之上。                              | <code>0</code>     |       |


#### 尺寸 {#size}

| 属性         | 类型                |
| ------------ | ------------------- |
| **`width`**  | <code>number</code> |
| **`height`** | <code>number</code> |


#### 点 {#point}

<a href="#point">点</a> 几何对象。
https://tools.ietf.org/html/rfc7946#section-3.1.2

| 属性              | 类型                                          | 描述                          |
| ----------------- | --------------------------------------------- | ---------------------------- |
| **`type`**        | <code>'<a href="#point">Point</a>'</code>     | 指定 GeoJSON 对象的类型。 |
| **`coordinates`** | <code><a href="#position">Position</a></code> |                                       |


#### 多边形 {#polygon}

<a href="#polygon">多边形</a> 几何对象。
https://tools.ietf.org/html/rfc7946#section-3.1.6

| 属性              | 类型                                          | 描述                           |
| ----------------- | --------------------------------------------- | ------------------------------------- |
| **`type`**        | <code>'<a href="#polygon">Polygon</a>'</code> | 指定 GeoJSON 对象的类型。 |
| **`coordinates`** | <code>Position[][]</code>                     |                                       |

#### 圆形 {#circle}

在网页端，所有 JavaScript <a href="#circle">Circle</a> 选项都可用，因为 Polygon 继承自 google.maps.CircleOptions。
在 iOS 和 Android 上，只有 <a href="#circle">Circle</a> 中声明的配置选项可用。

| 属性               | 类型                  | 描述                                                                                                                                                                            |
| ------------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`fillColor`**    | <code>string</code>   | 填充颜色，支持所有 CSS3 颜色（扩展命名颜色除外）。                                                                                                        |
| **`fillOpacity`**  | <code>number</code>   | 填充不透明度，取值范围为 0.0 到 1.0。                                                                                                                                                  |
| **`strokeColor`**  | <code>string</code>   | 描边颜色，支持所有 CSS3 颜色（扩展命名颜色除外）。                                                                                                      |
| **`strokeWeight`** | <code>number</code>   | 描边宽度（以像素为单位）。                                                                                                                                                            |
| **`geodesic`**     | <code>boolean</code>  |                                                                                                                                                                                        |
| **`clickable`**    | <code>boolean</code>  | 指示此 &lt;code&gt;<a href="#circle">Circle</a>&lt;/code&gt; 是否处理鼠标事件。                                                                                     |
| **`title`**        | <code>string</code>   | 标题，即覆盖层的简短描述。某些覆盖层（例如标记）会在地图上显示标题。标题也是默认的无障碍阅读文本。仅 iOS 上可用。 |
| **`tag`**          | <code>string</code>   |                                                                                                                                                                                        |


#### 折线 {#polyline}

在网页端，所有 JavaScript <a href="#polyline">Polyline</a> 选项都可用，因为 Polyline 继承自 google.maps.PolylineOptions。
在 iOS 和 Android 上，只有 <a href="#polyline">Polyline</a> 中声明的配置选项可用。

| 属性                | 类型                      | 描述                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`strokeColor`**   | <code>string</code>       | 描边颜色，支持所有 CSS3 颜色（扩展命名颜色除外）。                                                                                                                                                                                                                                                                                                              |
| **`strokeOpacity`** | <code>number</code>       | 描边不透明度，取值范围为 0.0 到 1.0。                                                                                                                                                                                                                                                                                                                                                        |
| **`strokeWeight`**  | <code>number</code>       | 描边宽度（以像素为单位）。                                                                                                                                                                                                                                                                                                                                                                    |
| **`geodesic`**      | <code>boolean</code>      | 当设置为 &lt;code&gt;true&lt;/code&gt; 时，多边形的边将被解释为测地线并会跟随地球曲率。当设置为 &lt;code&gt;false&lt;/code&gt; 时，多边形的边将在屏幕空间中渲染为直线。请注意，测地多边形的形状在拖动时可能会发生变化，因为其尺寸会相对于地球表面保持。 |
| **`clickable`**     | <code>boolean</code>      | 指示此 &lt;code&gt;<a href="#polyline">Polyline</a>&lt;/code&gt; 是否处理鼠标事件。                                                                                                                                                                                                                                                                                         |
| **`tag`**           | <code>string</code>       |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`styleSpans`**    | <code>StyleSpan[]</code>  | 用于指定折线一个或多个线段的颜色。styleSpans 属性是一个 <a href="#stylespan">StyleSpan</a> 对象数组。设置 spans 属性是更改折线颜色的首选方法。仅 iOS 和 Android 上可用。                                                                                                                                |


#### StyleSpan

描述折线某一部分的样式。

| 属性           | 类型                 | 描述                                                                       |
| -------------- | -------------------- | --------------------------------------------------------------------------------- |
| **`color`**    | <code>string</code>  | 描边颜色，支持所有 CSS3 颜色（扩展命名颜色除外）。 |
| **`segments`** | <code>number</code>  | 此样式跨度所覆盖的线段数量。                                    |

#### CameraConfig

Google 地图摄像头的配置属性

| 属性                     | 类型                                      | 说明                                                                                                    | 默认值               |
| ------------------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------- |
| **`coordinate`**         | <code><a href="#latlng">LatLng</a></code> | 相机指向的地球位置                                                                                      |                      |
| **`zoom`**               | <code>number</code>                       | 设置地图的缩放级别                                                                                      |                      |
| **`bearing`**            | <code>number</code>                       | 相机的方向，以正北方向为基准顺时针旋转的度数                                                            | <code>0</code>       |
| **`angle`**              | <code>number</code>                       | 相机与垂直向下方向（正对地球）之间的角度，单位：度。仅允许 0 和 45 两个值                               | <code>0</code>       |
| **`animate`**            | <code>boolean</code>                      | 是否以动画方式过渡到新的相机属性                                                                        | <code>false</code>   |
| **`animationDuration`**  | <code>number</code>                       | 此配置选项当前未使用                                                                                    |                      |

#### MapPadding

控制地图视图“可见区域”的边距设置。

| 属性          | 类型                |
| ------------- | ------------------- |
| **`top`**     | <code>number</code> |
| **`left`**    | <code>number</code> |
| **`right`**   | <code>number</code> |
| **`bottom`**  | <code>number</code> |

#### CameraIdleCallbackData

| 属性             | 类型                      |
| ---------------- | ------------------------- |
| **`mapId`**      | <code>string</code>       |
| **`bounds`**     | <code>LatLngBounds</code> |
| **`bearing`**    | <code>number</code>       |
| **`latitude`**   | <code>number</code>       |
| **`longitude`**  | <code>number</code>       |
| **`tilt`**       | <code>number</code>       |
| **`zoom`**       | <code>number</code>       |

#### CameraMoveStartedCallbackData

| 属性             | Type                 |
| ---------------- | -------------------- |
| **`mapId`**      | <code>string</code>  |
| **`isGesture`**  | <code>boolean</code> |

#### ClusterClickCallbackData

| 属性             | 类型                              |
| ---------------- | --------------------------------- |
| **`mapId`**      | <code>string</code>               |
| **`latitude`**   | <code>number</code>               |
| **`longitude`**  | <code>number</code>               |
| **`size`**       | <code>number</code>               |
| **`items`**      | <code>MarkerCallbackData[]</code> |

#### MarkerCallbackData

| 属性             | 类型                |
| ---------------- | ------------------- |
| **`markerId`**   | <code>string</code> |
| **`latitude`**   | <code>number</code> |
| **`longitude`**  | <code>number</code> |
| **`title`**      | <code>string</code> |
| **`snippet`**    | <code>string</code> |

#### MarkerClickCallbackData

| 属性         | 类型                |
| ------------ | ------------------- |
| **`mapId`**  | <code>string</code> |

#### MapClickCallbackData

| 属性             | 类型                |
| ---------------- | ------------------- |
| **`mapId`**      | <code>string</code> |
| **`latitude`**   | <code>number</code> |
| **`longitude`**  | <code>number</code> |

#### PolygonClickCallbackData

| 属性             | 类型                |
| ---------------- | ------------------- |
| **`mapId`**      | <code>string</code> |
| **`polygonId`**  | <code>string</code> |
| **`tag`**        | <code>string</code> |

#### CircleClickCallbackData

| 属性            | 类型                |
| --------------- | ------------------- |
| **`mapId`**     | <code>string</code> |
| **`circleId`**  | <code>string</code> |
| **`tag`**       | <code>string</code> |

#### PolylineCallbackData

| 属性               | 类型                |
| ------------------ | ------------------- |
| **`polylineId`**   | <code>string</code> |
| **`tag`**          | <code>string</code> |

#### MyLocationButtonClickCallbackData

| 属性         | 类型                |
| ------------ | ------------------- |
| **`mapId`**  | <code>string</code> |

### 类型别名

#### MapListenerCallback

地图事件触发时的回调函数。

<code>(data: T): void</code>

#### Position

一个 <a href="#position">Position</a> 是一个坐标数组。
参考：https://tools.ietf.org/html/rfc7946#section-3.1.1
数组应包含 2 到 3 个元素。
之前的 GeoJSON 规范允许更多元素（例如可用于表示 M 值），但当前规范仅允许定义 X、Y 和（可选）Z。

<code>number[]</code>

### 枚举

#### MapType

| 成员             | 值                        | 说明                         |
| ---------------- | ------------------------- | ---------------------------- |
| **`Normal`**     | <code>'Normal'</code>     | 基础地图                     |
| **`Hybrid`**     | <code>'Hybrid'</code>     | 卫星影像，附带道路和标签     |
| **`Satellite`**  | <code>'Satellite'</code>  | 卫星影像，无标签             |
| **`Terrain`**    | <code>'Terrain'</code>    | 地形数据                     |
| **`None`**       | <code>'None'</code>       | 无底图瓦片                   |

</docgen-api>