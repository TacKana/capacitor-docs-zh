---
title: Google Maps Capacitor 插件 API
description: Capacitor 上的谷歌地图
translated: true
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/google-maps/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/google-maps/src/definitions.ts
sidebar_label: Google Maps
---

# @capacitor/google-maps

Capacitor 上的谷歌地图。

## 安装

```bash
npm install @capacitor/google-maps
npx cap sync
```

## API 密钥

要在任何平台上使用 Google Maps SDK，需要将 API 密钥关联到已启用结算功能的账户。这些密钥可以从 [Google Cloud Console](https://console.cloud.google.com) 获取。所有三个平台（Android、iOS 和 JavaScript）都需要此操作。有关获取这些 API 密钥的更多信息，可以在每个平台的 [Google Maps 文档](https://developers.google.com/maps/documentation/android-sdk/overview) 中找到。

## iOS

Google Maps SDK 支持通过 `enableCurrentLocation(bool)` 显示用户的当前位置。要使用此功能，Apple 要求在 `Info.plist` 中指定隐私说明：

- `NSLocationAlwaysUsageDescription`（隐私 - 始终使用位置说明）
- `NSLocationWhenInUseUsageDescription`（隐私 - 使用时使用位置说明）

阅读 [iOS 指南](https://capacitorjs.com/docs/ios)中的[配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 以获取有关在 Xcode 中设置 iOS 权限的更多信息。

> Google Maps SDK 目前不支持在基于新 M1 芯片的 Macbook 上的模拟器中运行。这是一个[已知且已被确认的问题](https://developers.google.com/maps/faq#arm-based-macs)，需要 Google 提供修复。如果您在 M1 Macbook 上进行开发，仍然支持在真机上构建和运行，这也是推荐的方法。

## Android

适用于 Android 的 Google Maps SDK 要求您将 API 密钥添加到项目的 AndroidManifest.xml 文件中。

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

要使用某些位置功能，SDK 还要求在您的 AndroidManifest.xml 中添加以下权限：

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### 变量

该插件将使用以下项目变量（在应用的 `variables.gradle` 文件中定义）：

- `$googleMapsPlayServicesVersion`：`com.google.android.gms:play-services-maps` 的版本（默认值：`18.0.2`）
- `$googleMapsUtilsVersion`：`com.google.maps.android:android-maps-utils` 的版本（默认值：`2.3.0`）
- `$googleMapsKtxVersion`：`com.google.maps.android:maps-ktx` 的版本（默认值：`3.4.0`）
- `$googleMapsUtilsKtxVersion`：`com.google.maps.android:maps-utils-ktx` 的版本（默认值：`3.4.0`）
- `$kotlinxCoroutinesVersion`：`org.jetbrains.kotlinx:kotlinx-coroutines-android` 和 `org.jetbrains.kotlinx:kotlinx-coroutines-core` 的版本（默认值：`1.6.3`）
- `$androidxCoreKTXVersion`：`androidx.core:core-ktx` 的版本（默认值：`1.8.0`）
- `$kotlin_version`：`org.jetbrains.kotlin:kotlin-stdlib-jdk7` 的版本（默认值：`1.7.0`）


## 使用方法

Google Maps Capacitor 插件附带一个 Web 组件，必须在您的应用程序中使用该组件来渲染地图，因为它使我们能够更有效地在 iOS 上嵌入原生视图。插件会自动注册此 Web 组件以供您的应用程序使用。

> 对于 Angular 用户，您将收到一个错误，警告此 Web 组件对 Angular 编译器是未知的。这可以通过修改声明组件的模块以允许自定义 Web 组件来解决。
>
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
>
> @NgModule({
>   schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })
> ```

将此组件包含在您的 HTML 中并为其分配一个 ID，以便稍后可以轻松查询该元素引用。

```html
<capacitor-google-map id="map"></capacitor-google-map>
```

> 在 Android 上，地图渲染在整个 WebView 的下方，并使用此组件在滚动事件期间管理定位。这意味着作为开发者，您*必须*确保 WebView 在所有图层中完全透明到底部。在典型的 Ionic 应用程序中，这意味着在诸如 IonContent 和根 HTML 标签等元素上设置透明度，以确保地图可见。如果您在 Android 上看不到地图，这应该是您首先要检查的事情。
>
> 在 iOS 上，我们将地图直接渲染到 WebView 中，因此不需要相同的透明度效果。我们仍在为 Android 研究替代方法，并希望在将来的更新中更好地解决这个问题。

Google Map 元素本身没有样式，因此您应该为其设置样式以适合页面布局。因为我们是将视图渲染到此插槽中，元素本身没有宽度或高度，所以请确保显式设置它们。

```css
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
```

接下来，我们应该创建地图引用。这可以通过从 Capacitor 插件导入 GoogleMap 类并调用 create 方法，传入所需参数来完成。

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

此时，您的地图应该已在应用程序中创建。使用返回的地图引用，您可以通过多种方式轻松与地图交互，以下是其中一些示例。

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
* [`enableClustering(...)`](#enableclustering)
* [`disableClustering()`](#disableclustering)
* [`addMarker(...)`](#addmarker)
* [`addMarkers(...)`](#addmarkers)
* [`removeMarker(...)`](#removemarker)
* [`removeMarkers(...)`](#removemarkers)
* [`destroy()`](#destroy)
* [`setCamera(...)`](#setcamera)
* [`getMapType()`](#getmaptype)
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


### create(...)

```typescript
create(options: CreateMapArgs, callback?: MapListenerCallback<MapReadyCallbackData> | undefined) => Promise<GoogleMap>
```

| 参数            | 类型                                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`options`**   | <code><a href="#createmapargs">CreateMapArgs</a></code>                                                                             |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapreadycallbackdata">MapReadyCallbackData</a>&gt;</code> |

**返回：** <code>Promise&lt;GoogleMap&gt;</code>

--------------------


### enableClustering(...)

```typescript
enableClustering(minClusterSize?: number | undefined) => Promise<void>
```

| 参数                  | 类型                | 描述                                                                             |
| --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| **`minClusterSize`**  | <code>number</code> | 可以聚类在一起的最小标记数量。默认为 4 个标记。                                    |

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

| 参数          | 类型                                      |
| ------------- | ----------------------------------------- |
| **`marker`**  | <code><a href="#marker">Marker</a></code> |

**返回：** <code>Promise&lt;string&gt;</code>

--------------------


### addMarkers(...)

```typescript
addMarkers(markers: Marker[]) => Promise<string[]>
```

| 参数           | 类型                  |
| -------------- | --------------------- |
| **`markers`**  | <code>Marker[]</code> |

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

获取当前地图类型。

**返回：** <code>Promise&lt;<a href="#maptype">MapType</a>&gt;</code>

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


### setOnBoundsChangedListener(...)

```typescript
setOnBoundsChangedListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                    |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code> |

--------------------


### setOnCameraIdleListener(...)

```typescript
setOnCameraIdleListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                    |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code> |

--------------------


### setOnCameraMoveStartedListener(...)

```typescript
setOnCameraMoveStartedListener(callback?: MapListenerCallback<CameraMoveStartedCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameramovestartedcallbackdata">CameraMoveStartedCallbackData</a>&gt;</code> |

--------------------


### setOnClusterClickListener(...)

```typescript
setOnClusterClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code> |

--------------------


### setOnClusterInfoWindowClickListener(...)

```typescript
setOnClusterInfoWindowClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code> |

--------------------


### setOnInfoWindowClickListener(...)

```typescript
setOnInfoWindowClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMapClickListener(...)

```typescript
setOnMapClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerClickListener(...)

```typescript
setOnMarkerClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerDragStartListener(...)

```typescript
setOnMarkerDragStartListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerDragListener(...)

```typescript
setOnMarkerDragListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerDragEndListener(...)

```typescript
setOnMarkerDragEndListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMyLocationButtonClickListener(...)

```typescript
setOnMyLocationButtonClickListener(callback?: MapListenerCallback<MyLocationButtonClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mylocationbuttonclickcallbackdata">MyLocationButtonClickCallbackData</a>&gt;</code> |

--------------------


### setOnMyLocationClickListener(...)

```typescript
setOnMyLocationClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code> |

--------------------


### 接口


#### CreateMapArgs

创建地图时使用的选项的接口。

| 属性                | 类型                                                        | 描述                                                                                        | 默认值              |
| ------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------- |
| **`id`**            | <code>string</code>                                         | 地图实例的唯一标识符。                                                                       |                     |
| **`apiKey`**        | <code>string</code>                                         | Google Maps SDK API 密钥。                                                                   |                     |
| **`config`**        | <code><a href="#googlemapconfig">GoogleMapConfig</a></code> | 地图的初始配置设置。                                                                         |                     |
| **`element`**       | <code>HTMLElement</code>                                    | Google Map View 将挂载到的 DOM 元素，决定大小和定位。                                         |                     |
| **`forceCreate`**   | <code>boolean</code>                                        | 如果具有提供的 id 的地图实例已存在，则销毁并重新创建                                          | <code>false</code>  |


#### GoogleMapConfig

对于 Web，所有 JavaScript Google Maps 选项都可用，因为 GoogleMapConfig 扩展了 google.maps.MapOptions。
对于 iOS 和 Android，只有 <a href="#googlemapconfig">GoogleMapConfig</a> 上声明的配置选项可用。

| 属性                     | 类型                                      | 描述                                                                                                                                               | 默认值              | 自从   |
| ------------------------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------ |
| **`width`**              | <code>number</code>                       | 覆盖原生地图的宽度。                                                                                                                                |                     |       |
| **`height`**             | <code>number</code>                       | 覆盖原生地图的高度。                                                                                                                                |                     |       |
| **`x`**                  | <code>number</code>                       | 覆盖原生地图的绝对 x 坐标位置。                                                                                                                      |                     |       |
| **`y`**                  | <code>number</code>                       | 覆盖原生地图的绝对 y 坐标位置。                                                                                                                      |                     |       |
| **`center`**             | <code><a href="#latlng">LatLng</a></code> | 相机指向的地球上的默认位置。                                                                                                                         |                     |       |
| **`zoom`**               | <code>number</code>                       | 设置地图的缩放级别。                                                                                                                                 |                     |       |
| **`androidLiteMode**    | <code>boolean</code>                      | 在 Android 上启用基于图像的轻量模式。                                                                                                                | <code>false</code>  |       |
| **`devicePixelRatio**   | <code>number</code>                       | 覆盖原生地图的像素比。                                                                                                                                |                     |       |
| **`styles`**             | <code>MapTypeStyle[] \| null</code>       | 应用于每个默认地图类型的样式。请注意，对于卫星、混合和地形模式，这些样式仅适用于标签和几何图形。                                                      |                     | 4.3.0 |


#### LatLng

表示纬度和经度坐标对的接口。

| 属性        | 类型                | 描述                                                               |
| ----------- | ------------------- | ------------------------------------------------------------------ |
| **`lat`**   | <code>number</code> | 坐标纬度，以度为单位。该值在 [-90, 90] 范围内。                      |
| **`lng`**   | <code>number</code> | 坐标经度，以度为单位。该值在 [-180, 180] 范围内。                    |


#### MapReadyCallbackData

| 属性          | 类型                |
| ------------- | ------------------- |
| **`mapId`**   | <code>string</code> |


#### Marker

标记是放置在地图表面上特定点的图标。

| 属性               | 类型                                                         | 描述                                                                                                                                                                               | 默认值              | 自从   |
| ------------------ | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------ |
| **`coordinate`**   | <code><a href="#latlng">LatLng</a></code>                    | <a href="#marker">Marker</a> 位置。                                                                                                                                                 |                     |       |
| **`opacity`**      | <code>number</code>                                          | 设置标记的不透明度，介于 0（完全透明）和 1（含）之间。                                                                                                                               | <code>1</code>      |       |
| **`title`**        | <code>string</code>                                          | 标题，叠加层的简短描述。                                                                                                                                                            |                     |       |
| **`snippet`**      | <code>string</code>                                          | 摘要文本，在选择时信息窗口中的标题下方显示。                                                                                                                                         |                     |       |
| **`isFlat`**       | <code>boolean</code>                                         | 控制此标记应平贴在地球表面还是作为面向相机的广告牌。                                                                                                                                 | <code>false</code>  |       |
| **`iconUrl`**      | <code>string</code>                                          | 要渲染的标记图标的路径。可以是相对于 Web 应用公共目录的路径，或远程标记图标的 https URL。**原生平台不支持 SVG。**                                                                   |                     | 4.2.0 |
| **`iconSize**      | <code><a href="#size">Size</a></code>                        | 控制 `iconUrl` 中设置的标记图像的缩放大小。                                                                                                                                          |                     | 4.2.0 |
| **`iconOrigin**    | <code><a href="#point">Point</a></code>                      | 图像在精灵中的位置（如果有）。默认情况下，原点位于图像的左上角。                                                                                                                    |                     | 4.2.0 |
| **`iconAnchor**    | <code><a href="#point">Point</a></code>                      | 锚定图像的位置，对应于地图上标记的位置。默认情况下，锚点位于图像底部中心点。                                                                                                         |                     | 4.2.0 |
| **`tintColor**     | `{ r: number; g: number; b: number; a: number; }` | 自定义默认标记图像的颜色。每个值必须在 0 到 255 之间。仅适用于 iOS 和 Android。                                                                                                     |                     | 4.2.0 |
| **`draggable**     | <code>boolean</code>                                         | 控制此标记是否可以交互式拖动。                                                                                                                                                       | <code>false</code>  |       |


#### Size

| 属性           | 类型                |
| -------------- | ------------------- |
| **`width`**    | <code>number</code> |
| **`height`**   | <code>number</code> |


#### Point

<a href="#point">Point</a> 几何对象。
https://tools.ietf.org/html/rfc7946#section-3.1.2

| 属性                | 类型                                          | 描述                           |
| ------------------- | --------------------------------------------- | ------------------------------ |
| **`type`**          | <code>'<a href="#point">Point</a>'</code>     | 指定 GeoJSON 对象的类型。       |
| **`coordinates`**   | <code><a href="#position">Position</a></code> |                                |


#### CameraConfig

Google 地图相机的配置属性。

| 属性                      | 类型                                      | 描述                                                                                                            | 默认值              |
| ------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------- |
| **`coordinate`**          | <code><a href="#latlng">LatLng</a></code> | 相机指向的地球上的位置。                                                                                         |                     |
| **`zoom`**                | <code>number</code>                       | 设置地图的缩放级别。                                                                                             |                     |
| **`bearing`**             | <code>number</code>                       | 相机的方位角，以度为单位，从正北方向顺时针计算。                                                                   | <code>0</code>      |
| **`angle`**               | <code>number</code>                       | 相机从天底（直接面向地球）的角度，以度为单位。唯一允许的值是 0 和 45。                                            | <code>0</code>      |
| **`animate`**             | <code>boolean</code>                      | 是否动画过渡到新的相机属性。                                                                                      | <code>false</code>  |
| **`animationDuration**    | <code>number</code>                       | 此配置选项未被使用。                                                                                             |                     |


#### MapPadding

控制视图"可见"区域的内边距。

| 属性           | 类型                |
| -------------- | ------------------- |
| **`top`**      | <code>number</code> |
| **`left`**     | <code>number</code> |
| **`right`**    | <code>number</code> |
| **`bottom`**   | <code>number</code> |


#### CameraIdleCallbackData

| 属性              | 类型                      |
| ----------------- | ------------------------- |
| **`mapId`**       | <code>string</code>       |
| **`bounds`**      | <code>LatLngBounds</code> |
| **`bearing`**     | <code>number</code>       |
| **`latitude`**    | <code>number</code>       |
| **`longitude`**   | <code>number</code>       |
| **`tilt`**        | <code>number</code>       |
| **`zoom`**        | <code>number</code>       |


#### CameraMoveStartedCallbackData

| 属性              | 类型                 |
| ----------------- | -------------------- |
| **`mapId`**       | <code>string</code>  |
| **`isGesture`**   | <code>boolean</code> |


#### ClusterClickCallbackData

| 属性              | 类型                              |
| ----------------- | --------------------------------- |
| **`mapId`**       | <code>string</code>               |
| **`latitude`**    | <code>number</code>               |
| **`longitude`**   | <code>number</code>               |
| **`size`**        | <code>number</code>               |
| **`items**        | <code>MarkerCallbackData[]</code> |


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


#### MyLocationButtonClickCallbackData

| 属性          | 类型                |
| ------------- | ------------------- |
| **`mapId`**   | <code>string</code> |


### 类型别名


#### MapListenerCallback

触发地图事件时调用的回调函数。

<code>(data: T): void</code>


#### Position

<a href="#position">Position</a> 是一个坐标数组。
https://tools.ietf.org/html/rfc7946#section-3.1.1
数组应包含两到三个元素。
之前的 GeoJSON 规范允许更多元素（例如，可用于表示 M 值），
但当前规范只允许定义 X、Y 和（可选）Z。

<code>number[]</code>


### 枚举


#### MapType

| 成员           | 值                      | 描述                              |
| -------------- | ----------------------- | --------------------------------- |
| **`Normal`**   | <code>'Normal'</code>   | 基本地图。                         |
| **`Hybrid`**   | <code>'Hybrid'</code>   | 带有道路和标签的卫星图像。          |
| **`Satellite`**| <code>'Satellite'</code>| 没有标签的卫星图像。               |
| **`Terrain`**  | <code>'Terrain'</code>  | 地形数据。                         |
| **`None`**     | <code>'None'</code>     | 没有基础地图瓦片。                  |

</docgen-api>
