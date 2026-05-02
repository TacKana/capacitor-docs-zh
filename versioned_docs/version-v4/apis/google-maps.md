---
title: Google Maps Capacitor Plugin API
description: 在 Capacitor 中使用 Google 地图
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/google-maps/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/google-maps/src/definitions.ts
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

要在任何平台上使用 Google Maps SDK，都需要关联到**已启用计费**账户的 API 密钥。这些密钥可以从 [Google Cloud Console](https://console.cloud.google.com) 获取。Android、iOS 和 JavaScript 这三个平台都需要此步骤。关于如何获取这些 API 密钥的更多信息，可以在每个平台的 [Google Maps 文档](https://developers.google.com/maps/documentation/android-sdk/overview) 中找到。

## iOS

Google Maps SDK 支持通过 `enableCurrentLocation(bool)` 显示用户的当前位置。要使用此功能，Apple 要求在 `Info.plist` 中指定隐私描述：

- `NSLocationAlwaysUsageDescription` (`隐私 - 始终使用位置`)
- `NSLocationWhenInUseUsageDescription` (`隐私 - 使用时使用位置`)

请阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 部分，了解更多关于在 Xcode 中设置 iOS 权限的信息。

> 目前，Google Maps SDK 不支持在使用新款 M1 芯片的 Macbook 上使用模拟器运行。这是一个 [已知且已被确认的问题](https://developers.google.com/maps/faq#arm-based-macs)，需要 Google 方面提供修复。如果您正在使用 M1 Macbook 进行开发，仍然支持在物理设备上构建和运行，这也是推荐的做法。

## Android

适用于 Android 的 Google Maps SDK 要求您将 API 密钥添加到项目中的 AndroidManifest.xml 文件。

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

为了使用某些位置功能，SDK 还要求将以下权限添加到您的 AndroidManifest.xml：

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### 变量

此插件将使用以下项目变量（在您应用的 `variables.gradle` 文件中定义）：

- `$googleMapsPlayServicesVersion`：`com.google.android.gms:play-services-maps` 版本（默认：`18.0.2`）
- `$googleMapsUtilsVersion`：`com.google.maps.android:android-maps-utils` 版本（默认：`2.3.0`）
- `$googleMapsKtxVersion`：`com.google.maps.android:maps-ktx` 版本（默认：`3.4.0`）
- `$googleMapsUtilsKtxVersion`：`com.google.maps.android:maps-utils-ktx` 版本（默认：`3.4.0`）
- `$kotlinxCoroutinesVersion`：`org.jetbrains.kotlinx:kotlinx-coroutines-android` 和 `org.jetbrains.kotlinx:kotlinx-coroutines-core` 版本（默认：`1.6.3`）
- `$androidxCoreKTXVersion`：`androidx.core:core-ktx` 版本（默认：`1.8.0`）
- `$kotlin_version`：`org.jetbrains.kotlin:kotlin-stdlib-jdk7` 版本（默认：`1.7.0`）

## 使用

Google Maps Capacitor 插件附带了一个 Web 组件，必须在您的应用程序中使用它来渲染地图，因为它使我们能够在 iOS 上更有效地嵌入原生视图。该插件会自动注册此 Web 组件供您的应用程序使用。

> 对于 Angular 用户，您会收到一个错误警告，提示 Angular 编译器不知道此 Web 组件。这可以通过修改声明组件的模块以允许自定义 Web 组件来解决。
>
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
>
> @NgModule({
>   schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })
> ```

在您的 HTML 中包含此组件，并为其分配一个 ID，以便稍后轻松查询该元素引用。

```html
<capacitor-google-map id="map"></capacitor-google-map>
```

> 在 Android 上，地图是在整个 WebView 下方渲染的，并利用此组件在滚动事件期间管理其定位。这意味着作为开发者，您**必须**确保 WebView 从上到下的所有层都是透明的。在典型的 Ionic 应用中，这需要为 IonContent 和根 HTML 标签等元素设置透明属性，以确保地图可见。如果您在 Android 上看不到地图，这应该是您首先检查的地方。
>
> 在 iOS 上，我们将地图直接渲染到 WebView 中，因此不需要相同的透明效果。我们仍在研究 Android 上的替代方法，并希望在未来的更新中更好地解决这个问题。

Google Map 元素本身没有样式，因此您应该为其设置样式以适配页面布局。由于我们正在向此插槽渲染视图，该元素本身没有宽度或高度，所以请务必显式设置这些属性。

```css
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
```

接下来，我们应该创建地图引用。这需要从 Capacitor 插件导入 GoogleMap 类并调用 create 方法，同时传入所需的参数。

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

至此，您的地图应该在应用程序中创建完成。使用返回的地图引用，您可以通过多种方式轻松与地图交互，这里展示了其中几种。

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

// 处理标记点击事件
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
```### React

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
      apiKey: 'YOUR_API_KEY_HERE', // 你的 Google Maps API 密钥
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

| 参数           | 类型                                                                                                                              |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#createmapargs">CreateMapArgs</a></code>                                                                           |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapreadycallbackdata">MapReadyCallbackData</a>&gt;</code> |

**返回值:** <code>Promise&lt;GoogleMap&gt;</code>

--------------------


### enableClustering(...)

```typescript
enableClustering(minClusterSize?: number | undefined) => Promise<void>
```

| 参数                 | 类型                | 描述                                                                                  |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------- |
| **`minClusterSize`** | <code>number</code> | 可以聚合在一起的标记的最小数量。默认为 4 个标记。 |

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
| ------------ | ----------------------------------------- |
| **`marker`** | <code><a href="#marker">Marker</a></code> |

**返回值:** <code>Promise&lt;string&gt;</code>

--------------------


### addMarkers(...)

```typescript
addMarkers(markers: Marker[]) => Promise<string[]>
```

| 参数           | 类型                  |
| ------------- | --------------------- |
| **`markers`** | <code>Marker[]</code> |

**返回值:** <code>Promise&lt;string[]&gt;</code>

--------------------


### removeMarker(...)

```typescript
removeMarker(id: string) => Promise<void>
```

| 参数     | 类型                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

--------------------


### removeMarkers(...)

```typescript
removeMarkers(ids: string[]) => Promise<void>
```

| 参数      | 类型                  |
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

| 参数          | 类型                                                  |
| ------------ | ----------------------------------------------------- |
| **`config`** | <code><a href="#cameraconfig">CameraConfig</a></code> |

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
| ------------- | ------------------------------------------- |
| **`mapType`** | <code><a href="#maptype">MapType</a></code> |

--------------------


### enableIndoorMaps(...)

```typescript
enableIndoorMaps(enabled: boolean) => Promise<void>
```

| 参数           | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------### enableTrafficLayer(...)

```typescript
enableTrafficLayer(enabled: boolean) => Promise<void>
```

| 参数           | 类型                   |
| -------------- | ---------------------- |
| **`enabled`**  | <code>boolean</code>   |

--------------------


### enableAccessibilityElements(...)

```typescript
enableAccessibilityElements(enabled: boolean) => Promise<void>
```

| 参数           | 类型                   |
| -------------- | ---------------------- |
| **`enabled`**  | <code>boolean</code>   |

--------------------


### enableCurrentLocation(...)

```typescript
enableCurrentLocation(enabled: boolean) => Promise<void>
```

| 参数           | 类型                   |
| -------------- | ---------------------- |
| **`enabled`**  | <code>boolean</code>   |

--------------------


### setPadding(...)

```typescript
setPadding(padding: MapPadding) => Promise<void>
```

| 参数            | 类型                                                      |
| --------------- | --------------------------------------------------------- |
| **`padding`**   | <code><a href="#mappadding">MapPadding</a></code>         |

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

--------------------### setOnMarkerDragStartListener(...)

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

| 参数             | 类型                                                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mylocationbuttonclickcallbackdata">MyLocationButtonClickCallbackData</a>&gt;</code> |

--------------------


### setOnMyLocationClickListener(...)

```typescript
setOnMyLocationClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code> |

--------------------


### 接口


#### CreateMapArgs

一个接口，包含创建地图时使用的选项。

| 属性               | 类型                                                        | 描述                                                                                       | 默认值               |
| ------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------- |
| **`id`**           | <code>string</code>                                         | 地图实例的唯一标识符。                                                                     |                      |
| **`apiKey`**       | <code>string</code>                                         | Google Maps SDK API 密钥。                                                                 |                      |
| **`config`**       | <code><a href="#googlemapconfig">GoogleMapConfig</a></code> | 地图的初始配置设置。                                                                       |                      |
| **`element`**      | <code>HTMLElement</code>                                    | 用于挂载 Google Map 视图的 DOM 元素，它决定了地图的大小和位置。                            |                      |
| **`forceCreate`**  | <code>boolean</code>                                        | 如果提供的 id 已存在对应的地图实例，是否强制销毁并重新创建它。                              | <code>false</code>   |#### GoogleMapConfig

在 Web 平台上，所有 JavaScript Google Maps 选项均可用，因为 GoogleMapConfig 继承了 google.maps.MapOptions。
在 iOS 和 Android 平台上，只有 <a href="#googlemapconfig">GoogleMapConfig</a> 中声明的配置选项可用。

| 属性                    | 类型                                        | 描述                                                                                                                                               | 默认值                 | 始于 |
| ----------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ---- |
| **`width`**            | <code>number</code>                       | 覆盖原生地图的宽度。                                                                                                                              |                      |      |
| **`height`**           | <code>number</code>                       | 覆盖原生地图的高度。                                                                                                                              |                      |      |
| **`x`**                | <code>number</code>                       | 覆盖原生地图的绝对 X 坐标位置。                                                                                                                   |                      |      |
| **`y`**                | <code>number</code>                       | 覆盖原生地图的绝对 Y 坐标位置。                                                                                                                   |                      |      |
| **`center`**           | <code><a href="#latlng">LatLng</a></code> | 相机默认指向的地球位置。                                                                                                                          |                      |      |
| **`zoom`**             | <code>number</code>                       | 设置地图的缩放级别。                                                                                                                              |                      |      |
| **`androidLiteMode`**  | <code>boolean</code>                      | 在 Android 上启用基于图像的轻量模式。                                                                                                             | <code>false</code> |      |
| **`devicePixelRatio`** | <code>number</code>                       | 覆盖原生地图的像素比。                                                                                                                            |                      |      |
| **`styles`**           | <code>MapTypeStyle[] \| null</code>       | 应用于每种默认地图类型的样式。请注意，对于卫星、混合和地形模式，这些样式仅适用于标签和几何图形。                                                |                      | 4.3.0 |


#### LatLng

一个表示纬度和经度坐标对的接口。

| 属性      | 类型                | 描述                                                                 |
| --------- | ------------------- | -------------------------------------------------------------------- |
| **`lat`** | <code>number</code> | 纬度坐标，以度为单位。该值在 [-90, 90] 范围内。                     |
| **`lng`** | <code>number</code> | 经度坐标，以度为单位。该值在 [-180, 180] 范围内。                   |


#### MapReadyCallbackData

| 属性        | 类型                |
| ----------- | ------------------- |
| **`mapId`** | <code>string</code> |#### 标记点

标记点是放置在地图表面特定位置的图标。

| 属性               | 类型                                                                 | 描述                                                                                                                                                                              | 默认值               | 引入版本 |
| ------------------ | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------- |
| **`coordinate`**   | <code><a href="#latlng">LatLng</a></code>                            | <a href="#marker">标记点</a>的位置                                                                                                                                                 |                      |          |
| **`opacity`**      | <code>number</code>                                                  | 设置标记点的不透明度，取值范围为 0（完全透明）到 1（完全不透明）。                                                                                                                 | <code>1</code>       |          |
| **`title`**        | <code>string</code>                                                  | 标题，即叠加层的简短描述。                                                                                                                                                        |                      |          |
| **`snippet`**      | <code>string</code>                                                  | 片段文本，在选中标记点时显示在信息窗口的标题下方。                                                                                                                                 |                      |          |
| **`isFlat`**       | <code>boolean</code>                                                 | 控制此标记点是平贴于地球表面，还是作为面向相机的广告牌显示。                                                                                                                      | <code>false</code>   |          |
| **`iconUrl`**      | <code>string</code>                                                  | 要渲染的标记点图标的路径。可以是相对于 Web 应用公共目录的路径，也可以是远程图标资源的 https URL。**注意：SVG 格式在原生平台上不受支持。**                                          |                      | 4.2.0    |
| **`iconSize`**     | <code><a href="#size">Size</a></code>                                | 控制通过 `iconUrl` 设置的标记点图像缩放后的大小。                                                                                                                                 |                      | 4.2.0    |
| **`iconOrigin`**   | <code><a href="#point">Point</a></code>                              | 图像在精灵图（如果存在）中的位置。默认情况下，原点位于图像的左上角。                                                                                                              |                      | 4.2.0    |
| **`iconAnchor`**   | <code><a href="#point">Point</a></code>                              | 图像相对于标记点在地图上的位置的锚点位置。默认情况下，锚点位于图像底边的中心点。                                                                                                  |                      | 4.2.0    |
| **`tintColor`**    | `{ r: number; g: number; b: number; a: number; }`                    | 自定义默认标记点图像的颜色。每个值必须在 0 到 255 之间。仅适用于 iOS 和 Android。                                                                                                 |                      | 4.2.0    |
| **`draggable`**    | <code>boolean</code>                                                 | 控制此标记点是否可以通过交互拖动。                                                                                                                                                | <code>false</code>   |          |


#### 尺寸

| 属性           | 类型                |
| -------------- | ------------------- |
| **`width`**    | <code>number</code> |
| **`height`**   | <code>number</code> |


#### 点

<a href="#point">点</a>几何对象。
https://tools.ietf.org/html/rfc7946#section-3.1.2

| 属性                | 类型                                              | 描述                         |
| ------------------- | ------------------------------------------------- | ---------------------------- |
| **`type`**          | <code>'<a href="#point">Point</a>'</code>         | 指定 GeoJSON 对象的类型。    |
| **`coordinates`**   | <code><a href="#position">Position</a></code>     |                              |


#### 相机配置

Google 地图相机的配置属性

| 属性                      | 类型                                      | 描述                                                                                                             | 默认值               |
| ------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------- |
| **`coordinate`**          | <code><a href="#latlng">LatLng</a></code> | 相机指向的地球上的位置。                                                                                         |                      |
| **`zoom`**                | <code>number</code>                       | 设置地图的缩放级别。                                                                                             |                      |
| **`bearing`**             | <code>number</code>                       | 相机的方位角，以真北为基准顺时针方向的度数。                                                                     | <code>0</code>       |
| **`angle`**               | <code>number</code>                       | 相机与天底（垂直向下指向地球）之间的角度（单位：度）。唯一允许的值为 0 和 45。                                   | <code>0</code>       |
| **`animate`**             | <code>boolean</code>                      | 是否以动画形式过渡到新的相机属性。                                                                               | <code>false</code>   |
| **`animationDuration`**   | <code>number</code>                       | 此配置选项当前未使用。                                                                                           |                      |


#### 地图内边距

用于设置视图“可见”区域的内边距控制项。

| 属性           | 类型                |
| -------------- | ------------------- |
| **`top`**      | <code>number</code> |
| **`left`**     | <code>number</code> |
| **`right`**    | <code>number</code> |
| **`bottom`**   | <code>number</code> |


#### 相机空闲回调数据

| 属性              | 类型                      |
| ----------------- | ------------------------- |
| **`mapId`**       | <code>string</code>       |
| **`bounds`**      | <code>LatLngBounds</code> |
| **`bearing`**     | <code>number</code>       |
| **`latitude`**    | <code>number</code>       |
| **`longitude`**   | <code>number</code>       |
| **`tilt`**        | <code>number</code>       |
| **`zoom`**        | <code>number</code>       |


#### 相机移动开始回调数据

| 属性              | 类型                 |
| ----------------- | -------------------- |
| **`mapId`**       | <code>string</code>  |
| **`isGesture`**   | <code>boolean</code> |#### ClusterClickCallbackData

| 属性            | 类型                              |
| --------------- | --------------------------------- |
| **`mapId`**     | <code>string</code>               |
| **`latitude`**  | <code>number</code>               |
| **`longitude`** | <code>number</code>               |
| **`size`**      | <code>number</code>               |
| **`items`**     | <code>MarkerCallbackData[]</code> |


#### MarkerCallbackData

| 属性            | 类型                |
| --------------- | ------------------- |
| **`markerId`**  | <code>string</code> |
| **`latitude`**  | <code>number</code> |
| **`longitude`** | <code>number</code> |
| **`title`**     | <code>string</code> |
| **`snippet`**   | <code>string</code> |


#### MarkerClickCallbackData

| 属性        | 类型                |
| ----------- | ------------------- |
| **`mapId`** | <code>string</code> |


#### MapClickCallbackData

| 属性            | 类型                |
| --------------- | ------------------- |
| **`mapId`**     | <code>string</code> |
| **`latitude`**  | <code>number</code> |
| **`longitude`** | <code>number</code> |


#### MyLocationButtonClickCallbackData

| 属性        | 类型                |
| ----------- | ------------------- |
| **`mapId`** | <code>string</code> |


### 类型别名


#### MapListenerCallback

当地图事件触发时调用的回调函数。

<code>(data: T): void</code>


#### Position

<a href="#position">Position</a> 是一个坐标数组。
https://tools.ietf.org/html/rfc7946#section-3.1.1
数组应包含两到三个元素。
之前的 GeoJSON 规范允许更多元素（例如，可以用来表示 M 值），
但当前规范仅允许定义 X、Y 和（可选）Z。

<code>number[]</code>


### 枚举


#### MapType

| 成员             | 值                         | 描述                               |
| --------------- | -------------------------- | ---------------------------------- |
| **`Normal`**    | <code>'Normal'</code>      | 基础地图。                           |
| **`Hybrid`**    | <code>'Hybrid'</code>      | 卫星影像叠加道路和标签。             |
| **`Satellite`** | <code>'Satellite'</code>   | 无标签的卫星影像。                   |
| **`Terrain`**   | <code>'Terrain'</code>     | 地形数据。                           |
| **`None`**      | <code>'None'</code>        | 无底图瓦片。                         |

</docgen-api>