---
title: Google Maps Capacitor 插件 API
description: Capacitor 上的 Google 地图
custom_edit_url: https://github.com/ionic-team/capacitor-google-maps/blob/6.x/plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-google-maps/blob/6.x/plugin/src/definitions.ts
sidebar_label: Google Maps
translated: true
---

# @capacitor/google-maps

Capacitor 上的 Google 地图。

## 安装

```bash
npm install @capacitor/google-maps
npx cap sync
```

## API 密钥

要在任何平台上使用 Google Maps SDK，需要与**已启用计费**的账户关联的 API 密钥。这些可以从 [Google Cloud Console](https://console.cloud.google.com) 获取。Android、iOS 和 Javascript 三个平台都需要。有关获取这些 API 密钥的更多信息，可以在每个平台的 [Google Maps 文档](https://developers.google.com/maps/documentation/android-sdk/overview) 中找到。

## iOS

Google Maps SDK 支持通过 `enableCurrentLocation(bool)` 显示用户当前位置。要使用此功能，Apple 要求在 `Info.plist` 中指定隐私描述：

- `NSLocationWhenInUseUsageDescription`（Privacy - Location When In Use Usage Description）

阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中关于 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 的内容，了解更多关于在 Xcode 中设置 iOS 权限的信息。

> 主 Google Maps SDK 现在支持在 Apple Silicon Mac 上的模拟器上运行，但请确保您已安装最新版本的 [Google-Maps-iOS-Utils](https://github.com/googlemaps/google-maps-ios-utils)。

如果您之前添加了获取未发布版本的工作区，现在可以通过从 `ios/App/Podfile` 中删除以下行来删除它：

```
pod 'Google-Maps-iOS-Utils', :git => 'https://github.com/googlemaps/google-maps-ios-utils.git', :commit => '637954e5bcb2a879c11a6f2cead153a6bad5339f'
```

然后从 `ios/App/` 文件夹运行 `pod update Google-Maps-iOS-Utils`：

```
cd ios/App
pod update Google-Maps-iOS-Utils
```

## Android

Android 的 Google Maps SDK 要求您将 API 密钥添加到项目中的 `AndroidManifest.xml` 文件中。

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

要使用某些位置功能，SDK 还要求在您的 `AndroidManifest.xml` 中添加以下权限：

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### 变量

此插件将使用以下项目变量（在应用的 `variables.gradle` 文件中定义）：

- `googleMapsPlayServicesVersion`：`com.google.android.gms:play-services-maps` 的版本（默认值：`18.2.0`）
- `googleMapsUtilsVersion`：`com.google.maps.android:android-maps-utils` 的版本（默认值：`3.8.2`）
- `googleMapsKtxVersion`：`com.google.maps.android:maps-ktx` 的版本（默认值：`5.0.0`）
- `googleMapsUtilsKtxVersion`：`com.google.maps.android:maps-utils-ktx` 的版本（默认值：`5.0.0`）
- `kotlinxCoroutinesVersion`：`org.jetbrains.kotlinx:kotlinx-coroutines-android` 和 `org.jetbrains.kotlinx:kotlinx-coroutines-core` 的版本（默认值：`1.7.3`）
- `androidxCoreKTXVersion`：`androidx.core:core-ktx` 的版本（默认值：`1.12.0`）
- `kotlin_version`：`org.jetbrains.kotlin:kotlin-stdlib` 的版本（默认值：`1.9.10`）

## 使用

Google Maps Capacitor 插件附带一个 Web 组件，必须在您的应用中使用该组件来渲染地图，因为它使我们能够更有效地在 iOS 上嵌入原生视图。该插件将自动注册此 Web 组件以供您的应用使用。

> 对于 Angular 用户，您将收到一个错误警告，提示此 Web 组件对 Angular 编译器来说是未知的。这可以通过修改声明您的组件的模块以允许自定义 Web 组件来解决。
>
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
>
> @NgModule({
>   schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })
> ```

在您的 HTML 中包含此组件并为其分配一个 ID，以便您以后可以轻松查询该元素引用。

```html
<capacitor-google-map id="map"></capacitor-google-map>
```

> 在 Android 上，地图渲染在整个 WebView 下方，并使用此组件在滚动事件期间管理其定位。这意味着作为开发者，您**必须**确保 WebView 在所有层中透明到底部。在典型的 Ionic 应用程序中，这意味着在 IonContent 和根 HTML 标签等元素上设置透明度，以确保地图可见。如果您在 Android 上看不到地图，这应该是您首先检查的地方。
>
> 在 iOS 上，我们直接将地图渲染到 WebView 中，因此不需要相同的透明效果。我们仍在研究 Android 的替代方法，并希望在未来的更新中更好地解决这个问题。

Google Map 元素本身没有样式，因此您应该为其设置样式以适合页面布局。因为我们正在将视图渲染到这个插槽中，元素本身没有宽度或高度，所以请务必显式设置它们。

```css
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
```

接下来，我们应该创建地图引用。这是通过从 Capacitor 插件导入 GoogleMap 类并调用 create 方法，传入所需参数来完成的。

```typescript
import { GoogleMap } from '@capacitor/google-maps';

const apiKey = 'YOUR_API_KEY_HERE';

const mapRef = document.getElementById('map');

const newMap = await GoogleMap.create({
  id: 'my-map', // 此地图实例的唯一标识符
  element: mapRef, // capacitor-google-map 元素的引用
  apiKey: apiKey, // 您的 Google Maps API 密钥
  config: {
    center: {
      // 地图要渲染的初始位置
      lat: 33.6,
      lng: -117.9,
    },
    zoom: 8, // 地图要渲染的初始缩放级别
  },
});
```

此时，您的地图应该在应用中创建完成。使用返回的地图引用，您可以通过多种方式与地图进行交互，以下是一些示例。

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
    <button (click)="createMap()">Create Map</button>
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

      <button onClick={createMap}>Create Map</button>
    </div>
  )
}

export default MyMap;
```

### Javascript

```html
<capacitor-google-map id="map"></capacitor-google-map>
<button onclick="createMap()">Create Map</button>

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
      element: mapRef, // capacitor-google-map 元素的引用
      apiKey: 'YOUR_API_KEY_HERE', // 您的 Google Maps API 密钥
      config: {
        center: {
          // 地图要渲染的初始位置
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8, // 地图要渲染的初始缩放级别
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
* [`getMapBounds()`](#getmapbounds)
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
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### create(...)

```typescript
create(options: CreateMapArgs, callback?: MapListenerCallback<MapReadyCallbackData> | undefined) => Promise<GoogleMap>
```

| 参数              | 类型                                                                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`options`**     | <code><a href="#createmapargs">CreateMapArgs</a></code>                                                                             |
| **`callback`**    | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapreadycallbackdata">MapReadyCallbackData</a>&gt;</code> |

**返回：** <code>Promise&lt;GoogleMap&gt;</code>

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

| 参数                    | 类型                | 描述                                                                                       |
| ----------------------- | ------------------- | ------------------------------------------------------------------------------------------ |
| **`minClusterSize`**    | <code>number</code> | 可以聚类在一起的最小标记数。默认值为 4 个标记。                                            |

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

| 参数          | 类型                                        |
| ------------- | ------------------------------------------- |
| **`marker`**  | <code><a href="#marker">Marker</a></code>   |

**返回：** <code>Promise&lt;string&gt;</code>

--------------------


### addMarkers(...)

```typescript
addMarkers(markers: Marker[]) => Promise<string[]>
```

| 参数           | 类型                    |
| -------------- | ----------------------- |
| **`markers`**  | <code>Marker[]</code>   |

**返回：** <code>Promise&lt;string[]&gt;</code>

--------------------


### removeMarker(...)

```typescript
removeMarker(id: string) => Promise<void>
```

| 参数      | 类型                |
| --------- | ------------------- |
| **`id`**  | <code>string</code> |

--------------------


### removeMarkers(...)

```typescript
removeMarkers(ids: string[]) => Promise<void>
```

| 参数       | 类型                  |
| ---------- | --------------------- |
| **`ids`**  | <code>string[]</code> |

--------------------


### addPolygons(...)

```typescript
addPolygons(polygons: Polygon[]) => Promise<string[]>
```

| 参数            | 类型                     |
| --------------- | ------------------------ |
| **`polygons`**  | <code>Polygon[]</code>   |

**返回：** <code>Promise&lt;string[]&gt;</code>

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

| 参数           | 类型                    |
| -------------- | ----------------------- |
| **`circles`**  | <code>Circle[]</code>   |

**返回：** <code>Promise&lt;string[]&gt;</code>

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

| 参数             | 类型                      |
| ---------------- | ------------------------- |
| **`polylines`**  | <code>Polyline[]</code>   |

**返回：** <code>Promise&lt;string[]&gt;</code>

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

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`config`**  | <code><a href="#cameraconfig">CameraConfig</a></code>   |

--------------------


### getMapType()

```typescript
getMapType() => Promise<MapType>
```

获取当前地图类型。

**返回：** <code>Promise&lt;<a href="#maptype">MapType</a>&gt;</code>

--------------------


### setMapType(...)

```typescript
setMapType(mapType: MapType) => Promise<void>
```

| 参数           | 类型                                          |
| -------------- | --------------------------------------------- |
| **`mapType`**  | <code><a href="#maptype">MapType</a></code>   |

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

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`padding`**   | <code><a href="#mappadding">MapPadding</a></code>   |

--------------------


### getMapBounds()

```typescript
getMapBounds() => Promise<LatLngBounds>
```

获取地图当前视口的纬度和经度边界。

**返回：** <code>Promise&lt;LatLngBounds&gt;</code>

--------------------


### fitBounds(...)

```typescript
fitBounds(bounds: LatLngBounds, padding?: number | undefined) => Promise<void>
```

将地图视口设置为包含给定的边界。

| 参数           | 类型                        | 描述                                                                                                                     |
| -------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **`bounds`**   | <code>LatLngBounds</code>   | 要适应视口的边界。                                                                                                       |
| **`padding`**  | <code>number</code>         | 可选的要应用的像素内边距。边界将适应移除内边距后剩余的地图部分。                                                         |

--------------------


### setOnBoundsChangedListener(...)

```typescript
setOnBoundsChangedListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code>   |

--------------------


### setOnCameraIdleListener(...)

```typescript
setOnCameraIdleListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code>   |

--------------------


### setOnCameraMoveStartedListener(...)

```typescript
setOnCameraMoveStartedListener(callback?: MapListenerCallback<CameraMoveStartedCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameramovestartedcallbackdata">CameraMoveStartedCallbackData</a>&gt;</code>     |

--------------------


### setOnClusterClickListener(...)

```typescript
setOnClusterClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code>   |

--------------------


### setOnClusterInfoWindowClickListener(...)

```typescript
setOnClusterInfoWindowClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code>   |

--------------------


### setOnInfoWindowClickListener(...)

```typescript
setOnInfoWindowClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code>   |

--------------------


### setOnMapClickListener(...)

```typescript
setOnMapClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code>   |

--------------------


### setOnMarkerClickListener(...)

```typescript
setOnMarkerClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code>   |

--------------------


### setOnPolygonClickListener(...)

```typescript
setOnPolygonClickListener(callback?: MapListenerCallback<PolygonClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#polygonclickcallbackdata">PolygonClickCallbackData</a>&gt;</code>   |

--------------------


### setOnCircleClickListener(...)

```typescript
setOnCircleClickListener(callback?: MapListenerCallback<CircleClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#circleclickcallbackdata">CircleClickCallbackData</a>&gt;</code>   |

--------------------


### setOnPolylineClickListener(...)

```typescript
setOnPolylineClickListener(callback?: MapListenerCallback<PolylineCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#polylinecallbackdata">PolylineCallbackData</a>&gt;</code>   |

--------------------


### setOnMarkerDragStartListener(...)

```typescript
setOnMarkerDragStartListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code>   |

--------------------


### setOnMarkerDragListener(...)

```typescript
setOnMarkerDragListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code>   |

--------------------


### setOnMarkerDragEndListener(...)

```typescript
setOnMarkerDragEndListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code>   |

--------------------


### setOnMyLocationButtonClickListener(...)

```typescript
setOnMyLocationButtonClickListener(callback?: MapListenerCallback<MyLocationButtonClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                                            |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mylocationbuttonclickcallbackdata">MyLocationButtonClickCallbackData</a>&gt;</code>   |

--------------------


### setOnMyLocationClickListener(...)

```typescript
setOnMyLocationClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code>   |

--------------------


### Interfaces


#### CreateMapArgs

创建地图时使用的选项接口。

| 属性                | 类型                                                        | 描述                                                                                                                                                                                  | 默认值              |
| ------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`id`**            | <code>string</code>                                         | 地图实例的唯一标识符。                                                                                                                                                                |                    |
| **`apiKey`**        | <code>string</code>                                         | Google Maps SDK API 密钥。                                                                                                                                                            |                    |
| **`config`**        | <code><a href="#googlemapconfig">GoogleMapConfig</a></code> | 地图的初始配置设置。                                                                                                                                                                  |                    |
| **`element`**       | <code>HTMLElement</code>                                    | Google Map View 将挂载的 DOM 元素，决定大小和定位。                                                                                                                                   |                    |
| **`forceCreate`**   | <code>boolean</code>                                        | 如果具有提供 ID 的地图已存在，则销毁并重新创建地图实例。                                                                                                                              | <code>false</code> |
| **`region`**        | <code>string</code>                                         | region 参数改变您的应用以提供不同的地图瓦片或偏置应用（例如将地理编码结果偏向该区域）。仅适用于 Web。                                                                                 |                    |
| **`language`**      | <code>string</code>                                         | language 参数影响控件名称、版权声明、驾车路线和控件标签的名称，以及服务请求的响应。仅适用于 Web。                                                                                     |                    |


#### GoogleMapConfig

对于 Web，所有 JavaScript Google Maps 选项都可用，因为
GoogleMapConfig 扩展了 google.maps.MapOptions。
对于 iOS 和 Android，只有 <a href="#googlemapconfig">GoogleMapConfig</a> 上声明的配置选项可用。

| 属性                     | 类型                                        | 描述                                                                                                                                                     | 默认值              | 始于   |
| ------------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`width`**              | <code>number</code>                         | 覆盖原生地图的宽度。                                                                                                                                     |                    |        |
| **`height`**             | <code>number</code>                         | 覆盖原生地图的高度。                                                                                                                                     |                    |        |
| **`x`**                  | <code>number</code>                         | 覆盖原生地图的绝对 x 坐标位置。                                                                                                                          |                    |        |
| **`y`**                  | <code>number</code>                         | 覆盖原生地图的绝对 y 坐标位置。                                                                                                                          |                    |        |
| **`center`**             | <code><a href="#latlng">LatLng</a></code>   | 相机指向的地球上的默认位置。                                                                                                                              |                    |        |
| **`zoom`**               | <code>number</code>                         | 设置地图的缩放级别。                                                                                                                                     |                    |        |
| **`androidLiteMode`**    | <code>boolean</code>                        | 在 Android 上启用基于图像的轻量模式。                                                                                                                    | <code>false</code> |        |
| **`devicePixelRatio`**   | <code>number</code>                         | 覆盖原生地图的像素比。                                                                                                                                   |                    |        |
| **`styles`**             | <code>MapTypeStyle[] \| null</code>         | 应用于每个默认地图类型的样式。注意，对于卫星、混合和地形模式，这些样式仅适用于标签和几何图形。                                                           |                    | 4.3.0 |
| **`mapId`**              | <code>string</code>                         | 与特定地图样式或功能关联的地图 ID。[使用地图 ID](https://developers.google.com/maps/documentation/get-map-id) 仅适用于 Web。                             |                    | 5.4.0 |
| **`androidMapId`**       | <code>string</code>                         | 与特定地图样式或功能关联的地图 ID。[使用地图 ID](https://developers.google.com/maps/documentation/get-map-id) 仅适用于 Android。                         |                    | 5.4.0 |
| **`iOSMapId`**           | <code>string</code>                         | 与特定地图样式或功能关联的地图 ID。[使用地图 ID](https://developers.google.com/maps/documentation/get-map-id) 仅适用于 iOS。                             |                    | 5.4.0 |


#### LatLng

表示一对纬度和经度坐标的接口。

| 属性        | 类型                | 描述                                              |
| ----------- | ------------------- | ------------------------------------------------- |
| **`lat`**   | <code>number</code> | 纬度坐标，以度为单位。取值范围为 [-90, 90]。      |
| **`lng`**   | <code>number</code> | 经度坐标，以度为单位。取值范围为 [-180, 180]。    |


#### MapReadyCallbackData

| 属性          | 类型                |
| ------------- | ------------------- |
| **`mapId`**   | <code>string</code> |


#### Marker

标记是放置在地图表面特定点上的图标。

| 属性               | 类型                                                           | 描述                                                                                                                                                                                     | 默认值              | 始于   |
| ------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`coordinate`**   | <code><a href="#latlng">LatLng</a></code>                      | <a href="#marker">Marker</a> 位置                                                                                                                                                        |                    |        |
| **`opacity`**      | <code>number</code>                                            | 设置标记的不透明度，介于 0（完全透明）和 1（含）之间。                                                                                                                                   | <code>1</code>     |        |
| **`title`**        | <code>string</code>                                            | 标题，叠加层的简短描述。                                                                                                                                                                  |                    |        |
| **`snippet`**      | <code>string</code>                                            | 摘要文本，选中时显示在信息窗口的标题下方。                                                                                                                                                |                    |        |
| **`isFlat`**       | <code>boolean</code>                                           | 控制此标记应平贴在地球表面还是面向相机的广告牌。                                                                                                                                         | <code>false</code> |        |
| **`iconUrl`**      | <code>string</code>                                            | 要渲染的标记图标的路径。可以是相对于 Web 应用公共目录的路径，或远程标记图标的 https URL。**原生平台不支持 SVG。**                                                                        |                    | 4.2.0 |
| **`iconSize`**     | <code><a href="#size">Size</a></code>                          | 控制 `iconUrl` 中设置的标记图像的缩放大小。                                                                                                                                               |                    | 4.2.0 |
| **`iconOrigin`**   | <code><a href="#point">Point</a></code>                        | 图像在精灵图中的位置（如果有）。默认情况下，原点位于图像的左上角。                                                                                                                        |                    | 4.2.0 |
| **`iconAnchor`**   | <code><a href="#point">Point</a></code>                        | 将图像锚定到地图上标记对应位置的位置。默认情况下，锚点位于图像底部中心点。                                                                                                                |                    | 4.2.0 |
| **`tintColor`**    | <code>{ r: number; g: number; b: number; a: number; }</code>   | 自定义默认标记图像的颜色。每个值必须在 0 到 255 之间。仅适用于 iOS 和 Android。                                                                                                           |                    | 4.2.0 |
| **`draggable`**    | <code>boolean</code>                                           | 控制此标记是否可以通过交互拖动。                                                                                                                                                          | <code>false</code> |        |
| **`zIndex`**       | <code>number</code>                                            | 指定此标记相对于地图上其他标记的堆叠顺序。z-index 高的标记绘制在 z-index 低的标记之上。                                                                                                   | <code>0</code>     |        |


#### Size

| 属性           | 类型                |
| -------------- | ------------------- |
| **`width`**    | <code>number</code> |
| **`height`**   | <code>number</code> |


#### Point

<a href="#point">Point</a> 几何对象。
https://tools.ietf.org/html/rfc7946#section-3.1.2

| 属性                | 类型                                            | 描述                             |
| ------------------- | ----------------------------------------------- | -------------------------------- |
| **`type`**          | <code>'<a href="#point">Point</a>'</code>       | 指定 GeoJSON 对象的类型。        |
| **`coordinates`**   | <code><a href="#position">Position</a></code>   |                                   |


#### Polygon

<a href="#polygon">Polygon</a> 几何对象。
https://tools.ietf.org/html/rfc7946#section-3.1.6

| 属性                | 类型                                              | 描述                             |
| ------------------- | ------------------------------------------------- | -------------------------------- |
| **`type`**          | <code>'<a href="#polygon">Polygon</a>'</code>     | 指定 GeoJSON 对象的类型。        |
| **`coordinates`**   | <code>Position[][]</code>                         |                                   |


#### Circle

对于 Web，所有 JavaScript <a href="#circle">Circle</a> 选项都可用，因为
Polygon 扩展了 google.maps.CircleOptions。
对于 iOS 和 Android，只有 <a href="#circle">Circle</a> 上声明的配置选项可用。

| 属性                 | 类型                 | 描述                                                                                                                                                                              |
| -------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`fillColor`**      | <code>string</code>  | 填充颜色。除扩展命名颜色外，支持所有 CSS3 颜色。                                                                                                                                  |
| **`fillOpacity`**    | <code>number</code>  | 填充不透明度，介于 0.0 和 1.0 之间。                                                                                                                                              |
| **`strokeColor`**    | <code>string</code>  | 描边颜色。除扩展命名颜色外，支持所有 CSS3 颜色。                                                                                                                                  |
| **`strokeWeight`**   | <code>number</code>  | 描边宽度（以像素为单位）。                                                                                                                                                          |
| **`geodesic`**       | <code>boolean</code> |                                                                                                                                                                                   |
| **`clickable`**      | <code>boolean</code> | 指示此 <a href="#circle">Circle</a> 是否处理鼠标事件。                                                                                                                            |
| **`title`**          | <code>string</code>  | 标题，叠加层的简短描述。某些叠加层（如标记）会在地图上显示标题。标题也是默认的无障碍文本。仅适用于 iOS。                                                                         |
| **`tag`**            | <code>string</code>  |                                                                                                                                                                                   |


#### Polyline

对于 Web，所有 JavaScript <a href="#polyline">Polyline</a> 选项都可用，因为
Polyline 扩展了 google.maps.PolylineOptions。
对于 iOS 和 Android，只有 <a href="#polyline">Polyline</a> 上声明的配置选项可用。

| 属性                  | 类型                       | 描述                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`strokeColor`**     | <code>string</code>        | 描边颜色。除扩展命名颜色外，支持所有 CSS3 颜色。                                                                                                                                                                                                                                                                                                                                          |
| **`strokeOpacity`**   | <code>number</code>        | 描边不透明度，介于 0.0 和 1.0 之间。                                                                                                                                                                                                                                                                                                                                                      |
| **`strokeWeight`**    | <code>number</code>        | 描边宽度（以像素为单位）。                                                                                                                                                                                                                                                                                                                                                                  |
| **`geodesic`**        | <code>boolean</code>       | 当为 true 时，多边形边缘被解释为测地线，将遵循地球的曲率。当为 false 时，多边形边缘作为屏幕空间中的直线渲染。请注意，测地多边形的形状在拖动时可能会发生变化，因为尺寸是相对于地球表面保持的。                                                                                                                             |
| **`clickable`**       | <code>boolean</code>       | 指示此 <a href="#polyline">Polyline</a> 是否处理鼠标事件。                                                                                                                                                                                                                                                                                                                                |
| **`tag`**             | <code>string</code>        |                                                                                                                                                                                                                                                                                                                                                                                           |
| **`styleSpans`**      | <code>StyleSpan[]</code>   | 用于指定折线的一个或多个线段的颜色。styleSpans 属性是 <a href="#stylespan">StyleSpan</a> 对象的数组。设置 spans 属性是更改折线颜色的首选方式。仅适用于 iOS 和 Android。                                                                                                                                                                                                                   |


#### StyleSpan

描述折线某区域的样式。

| 属性             | 类型                | 描述                                                                           |
| ---------------- | ------------------- | ------------------------------------------------------------------------------ |
| **`color`**      | <code>string</code> | 描边颜色。除扩展命名颜色外，支持所有 CSS3 颜色。                               |
| **`segments`**   | <code>number</code> | 此跨度的长度（以线段数表示）。                                                  |


#### CameraConfig

Google 地图相机的配置属性。

| 属性                      | 类型                                        | 描述                                                                                                              | 默认值              |
| ------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`coordinate`**          | <code><a href="#latlng">LatLng</a></code>   | 相机指向的地球上的位置。                                                                                          |                    |
| **`zoom`**                | <code>number</code>                         | 设置地图的缩放级别。                                                                                              |                    |
| **`bearing`**             | <code>number</code>                         | 相机的方位角，以度为单位，从正北方向顺时针测量。                                                                  | <code>0</code>     |
| **`angle`**               | <code>number</code>                         | 相机与天底（直接面向地球）的角度，以度为单位。允许的值仅为 0 和 45。                                              | <code>0</code>     |
| **`animate`**             | <code>boolean</code>                        | 是否动画过渡到新的相机属性。                                                                                      | <code>false</code> |
| **`animationDuration`**   | <code>number</code>                         | 此配置选项未被使用。                                                                                              |                    |


#### MapPadding

用于设置视图"可见"区域内边距的控件。

| 属性           | 类型                |
| -------------- | ------------------- |
| **`top`**      | <code>number</code> |
| **`left`**     | <code>number</code> |
| **`right`**    | <code>number</code> |
| **`bottom`**   | <code>number</code> |


#### CameraIdleCallbackData

| 属性              | 类型                        |
| ----------------- | --------------------------- |
| **`mapId`**       | <code>string</code>         |
| **`bounds`**      | <code>LatLngBounds</code>   |
| **`bearing`**     | <code>number</code>         |
| **`latitude`**    | <code>number</code>         |
| **`longitude`**   | <code>number</code>         |
| **`tilt`**        | <code>number</code>         |
| **`zoom`**        | <code>number</code>         |


#### CameraMoveStartedCallbackData

| 属性              | 类型                 |
| ----------------- | -------------------- |
| **`mapId`**       | <code>string</code>  |
| **`isGesture`**   | <code>boolean</code> |


#### ClusterClickCallbackData

| 属性              | 类型                                |
| ----------------- | ----------------------------------- |
| **`mapId`**       | <code>string</code>                 |
| **`latitude`**    | <code>number</code>                 |
| **`longitude`**   | <code>number</code>                 |
| **`size`**        | <code>number</code>                 |
| **`items`**       | <code>MarkerCallbackData[]</code>   |


#### MarkerCallbackData

| 属性              | 类型                |
| ----------------- | ------------------- |
| **`markerId`**    | <code>string</code> |
| **`latitude`**    | <code>number</code> |
| **`longitude`**   | <code>number</code> |
| **`title`**       | <code>string</code> |
| **`snippet`**     | <code>string</code> |


#### MarkerClickCallbackData

| 属性          | 类型                |
| ------------- | ------------------- |
| **`mapId`**   | <code>string</code> |


#### MapClickCallbackData

| 属性              | 类型                |
| ----------------- | ------------------- |
| **`mapId`**       | <code>string</code> |
| **`latitude`**    | <code>number</code> |
| **`longitude`**   | <code>number</code> |


#### PolygonClickCallbackData

| 属性              | 类型                |
| ----------------- | ------------------- |
| **`mapId`**       | <code>string</code> |
| **`polygonId`**   | <code>string</code> |
| **`tag`**         | <code>string</code> |


#### CircleClickCallbackData

| 属性             | 类型                |
| ---------------- | ------------------- |
| **`mapId`**      | <code>string</code> |
| **`circleId`**   | <code>string</code> |
| **`tag`**        | <code>string</code> |


#### PolylineCallbackData

| 属性               | 类型                |
| ------------------ | ------------------- |
| **`polylineId`**   | <code>string</code> |
| **`tag`**          | <code>string</code> |


#### MyLocationButtonClickCallbackData

| 属性          | 类型                |
| ------------- | ------------------- |
| **`mapId`**   | <code>string</code> |


### Type Aliases


#### MapListenerCallback

当地图事件触发时调用的回调函数。

<code>(data: T): void</code>


#### Position

<a href="#position">Position</a> 是一个坐标数组。
https://tools.ietf.org/html/rfc7946#section-3.1.1
数组应包含两到三个元素。
先前的 GeoJSON 规范允许更多元素（例如，可用于表示 M 值），
但当前规范只允许定义 X、Y 和（可选）Z。

<code>number[]</code>


### Enums


#### MapType

| 成员             | 值                      | 描述                                |
| --------------- | ------------------------ | ---------------------------------- |
| **`Normal`**    | <code>'Normal'</code>    | 基本地图。                         |
| **`Hybrid`**    | <code>'Hybrid'</code>    | 带有道路和标签的卫星图像。         |
| **`Satellite`** | <code>'Satellite'</code> | 不带标签的卫星图像。               |
| **`Terrain`**   | <code>'Terrain'</code>   | 地形数据。                         |
| **`None`**      | <code>'None'</code>      | 无基础地图瓦片。                   |

</docgen-api>
