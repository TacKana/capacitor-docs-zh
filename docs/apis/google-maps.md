---
title: Google Maps Capacitor 插件 API
description: 在 Capacitor 中使用 Google 地图
custom_edit_url: https://github.com/ionic-team/capacitor-google-maps/blob/main/plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-google-maps/blob/main/plugin/src/definitions.ts
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

要在任何平台上使用 Google Maps SDK，都需要获取与**启用了结算功能的账户**相关联的 API 密钥。这些密钥可以从 [Google Cloud Console](https://console.cloud.google.com) 获取。这对于所有三个平台（Android、iOS 和 Javascript）都是必需的。有关获取这些 API 密钥的更多信息，可以在每个平台的 [Google Maps 文档](https://developers.google.com/maps/documentation/android-sdk/overview) 中找到。

## iOS

Google Maps SDK 支持通过 `enableCurrentLocation(bool)` 显示用户的当前位置。要使用此功能，Apple 要求在 `Info.plist` 中指定隐私描述：

- `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

有关在 Xcode 中设置 iOS 权限的更多信息，请阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist)。

### Typescript 配置

你的项目还需要在 `tsconfig.json` 中将 `skipLibCheck` 设置为 `true`。

### 从旧版本迁移
> 目前主要的 Google Maps SDK 已支持在 Apple Silicon Mac 的模拟器上运行，但请确保你已安装最新版本的 [Google-Maps-iOS-Utils](https://github.com/googlemaps/google-maps-ios-utils)。

如果你之前添加了获取未发布版本的工作区设置，现在可以通过从 `ios/App/Podfile` 中删除以下行来移除它：

```
pod 'Google-Maps-iOS-Utils', :git => 'https://github.com/googlemaps/google-maps-ios-utils.git', :commit => '637954e5bcb2a879c11a6f2cead153a6bad5339f'
```

然后从 `ios/App/` 文件夹运行 `pod update Google-Maps-iOS-Utils` 命令：

```
cd ios/App
pod update Google-Maps-iOS-Utils
```

## Android

适用于 Android 的 Google Maps SDK 要求你将 API 密钥添加到项目中的 AndroidManifest.xml 文件。

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

要使用某些位置功能，SDK 还要求将以下权限添加到你的 AndroidManifest.xml：

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### 变量

本插件将使用以下项目变量（定义在应用的 `variables.gradle` 文件中）：

- `googleMapsPlayServicesVersion`: `com.google.android.gms:play-services-maps` 的版本（默认：`19.2.0`）
- `googleMapsUtilsVersion`: `com.google.maps.android:android-maps-utils` 的版本（默认：`3.19.1`）
- `googleMapsKtxVersion`: `com.google.maps.android:maps-ktx` 的版本（默认：`5.2.1`）
- `googleMapsUtilsKtxVersion`: `com.google.maps.android:maps-utils-ktx` 的版本（默认：`5.2.1`）
- `kotlinxCoroutinesVersion`: `org.jetbrains.kotlinx:kotlinx-coroutines-android` 和 `org.jetbrains.kotlinx:kotlinx-coroutines-core` 的版本（默认：`1.10.2`）
- `androidxCoreKTXVersion`: `androidx.core:core-ktx` 的版本（默认：`1.17.0`）
- `kotlin_version`: `org.jetbrains.kotlin:kotlin-stdlib` 的版本（默认：`2.2.20`）

## 使用

Google Maps Capacitor 插件附带了一个 Web 组件，必须在你的应用程序中使用该组件来渲染地图，因为它使我们能够在 iOS 上更有效地嵌入原生视图。插件将自动注册此 Web 组件供你在应用中使用。

> 对于 Angular 用户，你会收到一个警告错误，提示 Angular 编译器不认识这个 Web 组件。可以通过修改声明组件的模块来允许自定义 Web 组件来解决此问题。
>
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
>
> @NgModule({
>   schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })
> ```

在你的 HTML 中包含此组件，并为其分配一个 ID，以便稍后可以轻松查询该元素引用。

```html
<capacitor-google-map id="map"></capacitor-google-map>
```

> 在 Android 上，地图渲染在整个 WebView 下方，并使用此组件在滚动事件期间管理其定位。这意味着作为开发者，你**必须**确保 WebView 从各层到底部完全透明。在典型的 Ionic 应用中，这意味着在 IonContent 和根 HTML 标签等元素上设置透明度，以确保可以看到地图。如果在 Android 上看不到地图，这应该是你首先检查的事项。
>
> 在 iOS 上，我们直接将地图渲染到 WebView 中，因此不需要相同的透明度效果。我们仍在研究 Android 的替代方法，并希望在未来的更新中更好地解决此问题。

Google 地图元素本身没有样式，因此你应该为其设置样式以适合页面的布局结构。由于我们正在向此插槽渲染一个视图，元素本身没有宽度或高度，因此请务必显式设置这些值。

```css
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
```

接下来，我们应该创建地图引用。这是通过从 Capacitor 插件导入 GoogleMap 类并调用 create 方法，并传入必需的参数来完成的。

```typescript
import { GoogleMap } from '@capacitor/google-maps';

const apiKey = 'YOUR_API_KEY_HERE';

const mapRef = document.getElementById('map');

const newMap = await GoogleMap.create({
  id: 'my-map', // 此地图实例的唯一标识符
  element: mapRef, // 对 capacitor-google-map 元素的引用
  apiKey: apiKey, // 你的 Google Maps API 密钥
  config: {
    center: {
      // 地图渲染的初始位置
      lat: 33.6,
      lng: -117.9,
    },
    zoom: 8, // 地图渲染的初始缩放级别
  },
});
```

至此，你的地图应该已在应用程序中创建。使用返回的地图引用，你可以通过多种方式轻松地与地图交互，这里展示了其中几种。

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

// 启用标记聚合
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

你可能需要在 React 中为自定义元素创建一个 `*.d.ts` 文件：

```ts
// custom-elements.d.ts

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "capacitor-google-map": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export {};
```

### Vue

```vue
<script lang="ts" setup>
import { ref, shallowRef, useTemplateRef } from 'vue'
import { GoogleMap } from '@capacitor/google-maps'

const mapRef = useTemplateRef<HTMLElement>('mapRef')
const newMap = shallowRef<GoogleMap>()

async function createMap() {
  if (!mapRef.value) return

  newMap.value = await GoogleMap.create({
    id: 'my-cool-map',
    element: mapRef.value,
    apiKey: import.meta.env.VITE_YOUR_API_KEY_HERE,
    config: {
      center: {
        lat: 33.6,
        lng: -117.9,
      },
      zoom: 8,
    },
  })
}
</script>

<template>
  <capacitor-google-map
    ref="mapRef"
    style="display: inline-block; width: 275px; height: 400px"
  ></capacitor-google-map>
  <button @click="createMap()">创建地图</button>
</template>

```

请确保启用[识别原生自定义元素](https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue)功能，例如：

```ts
// vite.config.mts > plugins
Vue({
  template: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('capacitor-')
    },
  },
}),
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

## API

<docgen-index>

* [`create(...)`](#create)
* [`enableTouch()`](#enabletouch)
* [`disableTouch()`](#disabletouch)
* [`enableClustering(...)`](#enableclustering)
* [`disableClustering()`](#disableclustering)
* [`addTileOverlay(...)`](#addtileoverlay)
* [`removeTileOverlay(...)`](#removetileoverlay)
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

| 参数             | 类型                                                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`options`**    | <code><a href="#createmapargs">CreateMapArgs</a></code>                                                                             |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapreadycallbackdata">MapReadyCallbackData</a>&gt;</code> |

**返回值：** <code>Promise&lt;GoogleMap&gt;</code>

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

| 参数                | 类型                | 描述                                                                          |
| -------------------- | ------------------- | ---------------------------------------------------------------------------- |
| **`minClusterSize`** | <code>number</code> | 能够聚集在一起的最小标记数量，默认值为 4 个标记。                               |

--------------------

### disableClustering()

```typescript
disableClustering() => Promise<void>
```

--------------------

### addTileOverlay(...)

```typescript
addTileOverlay(tileOverlay: TileOverlay) => Promise<{ id: string; }>
```

| 参数             | 类型                                                |
| ----------------- | --------------------------------------------------- |
| **`tileOverlay`** | <code><a href="#tileoverlay">TileOverlay</a></code> |

**返回值:** <code>Promise&lt;{ id: string; }&gt;</code>

--------------------

### removeTileOverlay(...)

```typescript
removeTileOverlay(id: string) => Promise<void>
```

| 参数    | 类型                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

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

| 参数     | 类型                  |
| --------- | --------------------- |
| **`ids`** | <code>string[]</code> |

--------------------

### addCircles(...)

```typescript
addCircles(circles: Circle[]) => Promise<string[]>
```

| 参数         | 类型                  |
| ------------- | --------------------- |
| **`circles`** | <code>Circle[]</code> |

**返回值:** <code>Promise&lt;string[]&gt;</code>

--------------------

### removeCircles(...)

```typescript
removeCircles(ids: string[]) => Promise<void>
```

| 参数     | 类型                  |
| --------- | --------------------- |
| **`ids`** | <code>string[]</code> |

--------------------

### addPolylines(...)

```typescript
addPolylines(polylines: Polyline[]) => Promise<string[]>
```

| 参数           | 类型                    |
| --------------- | ----------------------- |
| **`polylines`** | <code>Polyline[]</code> |

**返回值:** <code>Promise&lt;string[]&gt;</code>

--------------------

### removePolylines(...)

```typescript
removePolylines(ids: string[]) => Promise<void>
```

| 参数     | 类型                  |
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

| 参数        | 类型                                                  |
| ------------ | ----------------------------------------------------- |
| **`config`** | <code><a href="#cameraconfig">CameraConfig</a></code> |

--------------------

### getMapType()

```typescript
getMapType() => Promise<MapType>
```

获取当前的地图类型。

**返回值:** <code>Promise&lt;<a href="#maptype">MapType</a>&gt;</code>

--------------------

### setMapType(...)

```typescript
setMapType(mapType: MapType) => Promise<void>
```

| 参数         | 类型                                        |
| ------------- | ------------------------------------------- |
| **`mapType`** | <code><a href="#maptype">MapType</a></code> |

--------------------

### enableIndoorMaps(...)

```typescript
enableIndoorMaps(enabled: boolean) => Promise<void>
```

| 参数         | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------

### enableTrafficLayer(...)

```typescript
enableTrafficLayer(enabled: boolean) => Promise<void>
```

| 参数         | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------

### enableAccessibilityElements(...)

```typescript
enableAccessibilityElements(enabled: boolean) => Promise<void>
```

| 参数         | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------

### enableCurrentLocation(...)

```typescript
enableCurrentLocation(enabled: boolean) => Promise<void>
```

| 参数         | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------

### setPadding(...)

```typescript
setPadding(padding: MapPadding) => Promise<void>
```

| 参数         | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`padding`** | <code><a href="#mappadding">MapPadding</a></code> |

--------------------

### getMapBounds()

```typescript
getMapBounds() => Promise<LatLngBounds>
```

获取地图当前视口的经纬度边界。

**返回值:** <code>Promise&lt;LatLngBounds&gt;</code>

--------------------

### fitBounds(...)

```typescript
fitBounds(bounds: LatLngBounds, padding?: number | undefined) => Promise<void>
```

将地图视口调整至包含给定的边界范围。

| 参数           | 类型                      | 描述                                                                                                                               |
| -------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **`bounds`**   | <code>LatLngBounds</code> | 需要适配到视口中的边界范围。                                                                                                       |
| **`padding`**  | <code>number</code>       | 可选的内边距（以像素为单位）。在减去内边距后剩余的地图区域内适配边界范围。                                                           |

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

### setOnPolygonClickListener(...)

```typescript
setOnPolygonClickListener(callback?: MapListenerCallback<PolygonClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#polygonclickcallbackdata">PolygonClickCallbackData</a>&gt;</code> |

--------------------

### setOnCircleClickListener(...)

```typescript
setOnCircleClickListener(callback?: MapListenerCallback<CircleClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#circleclickcallbackdata">CircleClickCallbackData</a>&gt;</code> |

--------------------


### setOnPolylineClickListener(...)

```typescript
setOnPolylineClickListener(callback?: MapListenerCallback<PolylineCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#polylinecallbackdata">PolylineCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerDragStartListener(...)

```typescript
setOnMarkerDragStartListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerDragListener(...)

```typescript
setOnMarkerDragListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerDragEndListener(...)

```typescript
setOnMarkerDragEndListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMyLocationButtonClickListener(...)

```typescript
setOnMyLocationButtonClickListener(callback?: MapListenerCallback<MyLocationButtonClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mylocationbuttonclickcallbackdata">MyLocationButtonClickCallbackData</a>&gt;</code> |

--------------------


### setOnMyLocationClickListener(...)

```typescript
setOnMyLocationClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code> |

--------------------


### 接口

#### CreateMapArgs

一个包含创建地图时所用选项的接口。

| 属性              | 类型                                                        | 描述                                                                                                                                                                            | 默认值             |
| ----------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`id`**          | <code>string</code>                                         | 地图实例的唯一标识符。                                                                                                                                              |                    |
| **`apiKey`**      | <code>string</code>                                         | Google Maps SDK API 密钥。                                                                                                                                                           |                    |
| **`config`**      | <code><a href="#googlemapconfig">GoogleMapConfig</a></code> | 地图的初始配置设置。                                                                                                                                        |                    |
| **`element`**     | <code>HTMLElement</code>                                    | Google 地图视图将挂载的 DOM 元素，它决定了地图的大小和定位。                                                                                     |                    |
| **`forceCreate`** | <code>boolean</code>                                        | 如果已存在具有所提供 id 的地图实例，则销毁并重新创建它。                                                                                                    | <code>false</code> |
| **`region`**      | <code>string</code>                                         | 区域参数会更改您的应用以提供不同的地图图块或使应用产生偏向（例如，使地理编码结果偏向该区域）。仅适用于 Web 平台。      |                    |
| **`language`**    | <code>string</code>                                         | 语言参数会影响控件名称、版权声明、驾驶路线、控件标签的显示，以及服务请求的响应。仅适用于 Web 平台。 |                    |

#### GoogleMapConfig

在 Web 端，所有 JavaScript 版本的 Google Maps 选项都可用，因为 GoogleMapConfig 扩展了 `google.maps.MapOptions`。
在 iOS 和 Android 端，只有 <a href="#googlemapconfig">GoogleMapConfig</a> 上声明的配置选项可用。| 属性                   | 类型                                      | 描述                                                                                                                                                                                                                                                                                                                                                             | 默认值             | 引入版本 |
| ---------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------- |
| **`width`**            | <code>number</code>                       | 覆盖原生地图的宽度。                                                                                                                                                                                                                                                                                                                                              |                    |          |
| **`height`**           | <code>number</code>                       | 覆盖原生地图的高度。                                                                                                                                                                                                                                                                                                                                             |                    |          |
| **`x`**                | <code>number</code>                       | 覆盖原生地图的绝对 X 坐标位置。                                                                                                                                                                                                                                                                                                                                   |                    |          |
| **`y`**                | <code>number</code>                       | 覆盖原生地图的绝对 Y 坐标位置。                                                                                                                                                                                                                                                                                                                                   |                    |          |
| **`center`**           | <code><a href="#latlng">LatLng</a></code> | 地图摄像机指向的地球上的默认位置。                                                                                                                                                                                                                                                                                                                                |                    |          |
| **`zoom`**             | <code>number</code>                       | 设置地图的缩放级别。                                                                                                                                                                                                                                                                                                                                             |                    |          |
| **`androidLiteMode`**  | <code>boolean</code>                      | 在 Android 上启用基于图像的轻量模式。                                                                                                                                                                                                                                                                                                                            | <code>false</code> |          |
| **`devicePixelRatio`** | <code>number</code>                       | 覆盖原生地图的像素比率。                                                                                                                                                                                                                                                                                                                                         |                    |          |
| **`styles`**           | <code>MapTypeStyle[] \| null</code>       | 应用于每个默认地图类型的样式。注意：对于卫星、混合和地形模式，这些样式仅适用于标签和几何图形。                                                                                                                                                                                                                                                                    |                    | 4.3.0    |
| **`mapId`**            | <code>string</code>                       | 与特定地图样式或功能关联的地图 ID。 [使用地图 ID](https://developers.google.com/maps/documentation/get-map-id) 仅适用于 Web。                                                                                                                                                                                                                                   |                    | 5.4.0    |
| **`androidMapId`**     | <code>string</code>                       | 与特定地图样式或功能关联的地图 ID。 [使用地图 ID](https://developers.google.com/maps/documentation/get-map-id) 仅适用于 Android。                                                                                                                                                                                                                               |                    | 5.4.0    |
| **`iOSMapId`**         | <code>string</code>                       | 与特定地图样式或功能关联的地图 ID。 [使用地图 ID](https://developers.google.com/maps/documentation/get-map-id) 仅适用于 iOS。                                                                                                                                                                                                                                   |                    | 5.4.0    |
| **`maxZoom`**          | <code>number \| null</code>               | 地图上显示的最大缩放级别。如果省略或设置为 &lt;code&gt;null&lt;/code&gt;，则使用当前地图类型的最大缩放级别。有效的缩放值是从零到支持的 &lt;a href="https://developers.google.com/maps/documentation/javascript/maxzoom"&gt;最大缩放级别&lt;/a&gt; 的数字。                                                                                                                                 |                    |          |
| **`minZoom`**          | <code>number \| null</code>               | 地图上显示的最小缩放级别。如果省略或设置为 &lt;code&gt;null&lt;/code&gt;，则使用当前地图类型的最小缩放级别。有效的缩放值是从零到支持的 &lt;a href="https://developers.google.com/maps/documentation/javascript/maxzoom"&gt;最大缩放级别&lt;/a&gt; 的数字。                                                                                                                                 |                    |          |
| **`mapTypeId`**        | <code>string \| null</code>               | 初始地图的 mapTypeId。默认为 &lt;code&gt;ROADMAP&lt;/code&gt;。                                                                                                                                                                                                                                                                                               |                    |          || **`heading`**          | <code>number \| null</code>               | 航拍影像的朝向，以正北方向为基准，按顺时针方向以度数表示。朝向会自动捕捉到有可用影像的最接近角度。                                                                                                                                                                                           |                    |       |
| **`restriction`**      | <code>MapRestriction \| null</code>       | 定义限制用户可访问地图区域的边界。设置后，用户只能在相机视图保持在边界限制范围内时进行平移和缩放操作。                                                                                                                                                                                       |                    |       |

#### LatLng

表示一对经纬度坐标的接口。

| 属性        | 类型                | 描述                                                               |
| ----------- | ------------------- | ------------------------------------------------------------------ |
| **`lat`**   | <code>number</code> | 纬度坐标，单位度。取值范围为 [-90, 90]。                           |
| **`lng`**   | <code>number</code> | 经度坐标，单位度。取值范围为 [-180, 180]。                         |

#### MapReadyCallbackData

| 属性          | 类型                |
| ------------- | ------------------- |
| **`mapId`**   | <code>string</code> |

#### TileOverlay

瓦片覆盖层是在特定缩放级别下放置在地图顶部的图像。支持 iOS、Android 和 Web 平台。

| 属性            | 类型                 | 描述                                                                                                                                                               | 默认值                 |
| --------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| **`url`**       | <code>string</code>  | 表示瓦片 URL 的字符串。应包含 `{x}`、`{y}` 和 `{z}` 以便替换为实际的 x、y 和缩放值。支持 iOS、Android 和 Web 平台。                                               |                        |
| **`opacity`**   | <code>number</code>  | 瓦片覆盖层的不透明度，介于 0（完全透明）到 1（含）之间。支持 iOS、Android 和 Web 平台。                                                                             | <code>undefined</code> |
| **`visible`**   | <code>boolean</code> | 控制此瓦片覆盖层是否可见。仅支持 Android 平台。                                                                                                                    | <code>undefined</code> |
| **`zIndex`**    | <code>number</code>  | 瓦片覆盖层的 z 轴索引。支持 iOS 和 Android 平台。                                                                                                                  | <code>undefined</code> |

#### Marker

标记是放置在地图表面特定点的图标。

| 属性              | 类型                                                         | 描述                                                                                                                                                                               | 默认值                 | 自版本 |
| ----------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------ |
| **`coordinate`**  | <code><a href="#latlng">LatLng</a></code>                    | <a href="#marker">标记</a>的位置                                                                                                                                                   |                        |        |
| **`opacity`**     | <code>number</code>                                          | 设置标记的不透明度，介于 0（完全透明）到 1（含）之间。                                                                                                                             | <code>1</code>         |        |
| **`title`**       | <code>string</code>                                          | 标题，覆盖层的简短描述。                                                                                                                                                           |                        |        |
| **`snippet`**     | <code>string</code>                                          | 摘要文本，在选中时显示在信息窗口的标题下方。                                                                                                                                       |                        |        |
| **`isFlat`**      | <code>boolean</code>                                         | 控制此标记是否应平贴在地球表面，或是面向相机的广告牌形式。                                                                                                                         | <code>false</code>     |        |
| **`iconUrl`**     | <code>string</code>                                          | 要渲染的标记图标路径。可以是相对于 Web 应用公共目录的路径，也可以是指向远程标记图标的 https URL。**原生平台不支持 SVG 格式。**                                                      |                        | 4.2.0  |
| **`iconSize`**    | <code><a href="#size">Size</a></code>                        | 控制 `iconUrl` 中设置的标记图像的缩放大小。                                                                                                                                        |                        | 4.2.0  |
| **`iconOrigin`**  | <code><a href="#point">Point</a></code>                      | 图像在雪碧图（如果有）中的位置。默认情况下，原点位于图像的左上角。                                                                                                                 |                        | 4.2.0  |
| **`iconAnchor`**  | <code><a href="#point">Point</a></code>                      | 相对于地图上标记位置固定图像的锚点位置。默认情况下，锚点位于图像底部的中心点。                                                                                                     |                        | 4.2.0  |
| **`tintColor`**   | <code>{ r: number; g: number; b: number; a: number; }</code> | 自定义默认标记图像的颜色。每个值必须在 0 到 255 之间。仅支持 iOS 和 Android 平台。                                                                                                |                        | 4.2.0  |
| **`draggable`**   | <code>boolean</code>                                         | 控制此标记是否可以通过交互拖动。                                                                                                                                                   | <code>false</code>     |        |
| **`zIndex`**      | <code>number</code>                                          | 指定此标记相对于地图上其他标记的堆叠顺序。具有较高 z-index 的标记会绘制在具有较低 z-index 的标记之上。                                                                             | <code>0</code>         |        |

#### Size

| 属性            | 类型                |
| --------------- | ------------------- |
| **`width`**     | <code>number</code> |
| **`height`**    | <code>number</code> |

#### Point

| 属性      | 类型                |
| --------- | ------------------- |
| **`x`**   | <code>number</code> |
| **`y`**   | <code>number</code> |

#### 多边形 {#polygon}

在网页端，所有 JavaScript <a href="#polygon">Polygon</a> 选项均可使用，
因为 Polygon 扩展了 google.maps.PolygonOptions。
在 iOS 和 Android 平台，只有 <a href="#polygon">Polygon</a> 上声明的配置选项可用。| 属性                | 类型                                      | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`paths`**         | <code>any[] \| MVCArray&lt;any&gt;</code> | 定义闭合环的有序坐标序列。与折线不同，多边形可以包含一个或多个路径。因此，paths 属性可以指定一个或多个 &lt;code&gt;<a href="#latlng">LatLng</a>&lt;/code&gt; 坐标数组。路径会自动闭合；无需将路径的第一个顶点重复作为最后一个顶点。简单多边形可以使用单个 &lt;code&gt;<a href="#latlng">LatLng</a>&lt;/code&gt; 数组定义。更复杂的多边形可以指定数组的数组。任何简单数组都会被转换为 &lt;code&gt;&lt;a href="#MVCArray"&gt;MVCArray&lt;/a&gt;&lt;/code&gt;。从 &lt;code&gt;MVCArray&lt;/code&gt; 中插入或删除 &lt;code&gt;<a href="#latlng">LatLng</a>&lt;/code&gt; 坐标会自动更新地图上的多边形。 |
| **`strokeColor`**   | <code>string</code>                       | 描边颜色。支持所有 CSS3 颜色，但不包括扩展命名颜色。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **`strokeOpacity`** | <code>number</code>                       | 描边的不透明度，取值范围为 0.0 到 1.0。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **`strokeWeight`**  | <code>number</code>                       | 描边的宽度，单位为像素。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`fillColor`**     | <code>string</code>                       | 填充颜色。支持所有 CSS3 颜色，但不包括扩展命名颜色。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **`fillOpacity`**   | <code>number</code>                       | 填充的不透明度，取值范围为 0.0 到 1.0。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          || **`geodesic`**      | <code>boolean</code>                      | 当设为 &lt;code&gt;true&lt;/code&gt; 时，多边形的边将被解释为测地线并会沿着地球的曲率延伸。当设为 &lt;code&gt;false&lt;/code&gt; 时，多边形的边将在屏幕空间中以直线渲染。请注意，拖动时测地线多边形的形状可能会发生变化，因为其尺寸是相对于地球表面保持的。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **`clickable`**     | <code>boolean</code>                      | 指示此 &lt;code&gt;<a href="#polygon">Polygon</a>&lt;/code&gt; 是否处理鼠标事件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **`title`**         | <code>string</code>                       | 标题，即覆盖物的简短描述。某些覆盖物（例如标记）会在地图上显示标题。标题也是默认的无障碍访问文本。仅 iOS 可用。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **`tag`**           | <code>string</code>                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

#### 圆形 {#circle}

在 Web 端，所有 JavaScript <a href="#circle">Circle</a> 选项均可用，因为 Circle 继承了 google.maps.CircleOptions。
在 iOS 和 Android 端，仅支持 <a href="#circle">Circle</a> 上声明的配置选项。

| 属性               | 类型                  | 描述                                                                                                                                                                            |
| ------------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`fillColor`**    | <code>string</code>   | 填充颜色。支持所有 CSS3 颜色，但不包括扩展的命名颜色。                                                                                                        |
| **`fillOpacity`**  | <code>number</code>   | 填充不透明度，取值范围在 0.0 到 1.0 之间。                                                                                                                                                  |
| **`strokeColor`**  | <code>string</code>   | 描边颜色。支持所有 CSS3 颜色，但不包括扩展的命名颜色。                                                                                                      |
| **`strokeWeight`** | <code>number</code>   | 描边宽度（以像素为单位）。                                                                                                                                                            |
| **`geodesic`**     | <code>boolean</code>  |                                                                                                                                                                                        |
| **`clickable`**    | <code>boolean</code>  | 指示此 &lt;code&gt;<a href="#circle">Circle</a>&lt;/code&gt; 是否处理鼠标事件。                                                                                     |
| **`title`**        | <code>string</code>   | 标题，即叠加层的简短描述。某些叠加层（例如标记）会在地图上显示标题。标题也是默认的无障碍文本。仅限 iOS 平台。 |
| **`tag`**          | <code>string</code>   |                                                                                                                                                                                        |


#### 折线 {#polyline}

在 Web 端，所有 JavaScript <a href="#polyline">Polyline</a> 选项均可用，因为 Polyline 继承了 google.maps.PolylineOptions。
在 iOS 和 Android 端，仅支持 <a href="#polyline">Polyline</a> 上声明的配置选项。

| 属性                | 类型                      | 描述                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`strokeColor`**   | <code>string</code>       | 描边颜色。支持所有 CSS3 颜色，但不包括扩展的命名颜色。                                                                                                                                                                                                                                                                                                              |
| **`strokeOpacity`** | <code>number</code>       | 描边不透明度，取值范围在 0.0 到 1.0 之间。                                                                                                                                                                                                                                                                                                                                                        |
| **`strokeWeight`**  | <code>number</code>       | 描边宽度（以像素为单位）。                                                                                                                                                                                                                                                                                                                                                                    |
| **`geodesic`**      | <code>boolean</code>      | 当为 &lt;code&gt;true&lt;/code&gt; 时，多边形的边将被解释为测地线并遵循地球曲率。当为 &lt;code&gt;false&lt;/code&gt; 时，多边形的边在屏幕空间中将呈现为直线。请注意，测地线多边形的形状在被拖动时可能会发生变化，因为其尺寸会相对于地球表面保持不变。 |
| **`clickable`**     | <code>boolean</code>      | 指示此 &lt;code&gt;<a href="#polyline">Polyline</a>&lt;/code&gt; 是否处理鼠标事件。                                                                                                                                                                                                                                                                                         |
| **`tag`**           | <code>string</code>       |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`styleSpans`**    | <code>StyleSpan[]</code>  | 用于指定折线一个或多个线段的颜色。styleSpans 属性是一个 <a href="#stylespan">StyleSpan</a> 对象数组。设置 spans 属性是更改折线颜色的推荐方式。仅在 iOS 和 Android 平台可用。                                                                                                                                |


#### 样式跨度（StyleSpan） {#stylespan}

描述折线某一部分的样式。

| 属性           | 类型                | 描述                                                                       |
| -------------- | ------------------- | --------------------------------------------------------------------------------- |
| **`color`**    | <code>string</code> | 描边颜色。支持所有 CSS3 颜色，但不包括扩展的命名颜色。 |
| **`segments`** | <code>number</code> | 此跨度所包含的线段数量。                                    |

#### CameraConfig

Google 地图摄像头的配置属性

| 属性                    | 类型                                      | 说明                                                                                                            | 默认值            |
| ----------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`coordinate`**        | <code><a href="#latlng">LatLng</a></code> | 摄像头指向的地球位置。                                                                 |                    |
| **`zoom`**              | <code>number</code>                       | 设置地图的缩放级别。                                                                                              |                    |
| **`bearing`**           | <code>number</code>                       | 摄像头的方位角，以正北方向为基准顺时针计算的度数。                                                           | <code>0</code>     |
| **`angle`**             | <code>number</code>                       | 摄像头与天底点（垂直指向地球）的角度，单位为度。仅允许的值为 0 和 45。 | <code>0</code>     |
| **`animate`**           | <code>boolean</code>                      | 是否以动画方式过渡到新的摄像头属性。                                                                   | <code>false</code> |
| **`animationDuration`** | <code>number</code>                       | 此配置选项暂未使用。                                                                           |                    |


#### MapPadding

用于设置视图“可见”区域的内边距控件。

| 属性         | 类型                |
| ------------ | ------------------- |
| **`top`**    | <code>number</code> |
| **`left`**   | <code>number</code> |
| **`right`**  | <code>number</code> |
| **`bottom`** | <code>number</code> |


#### CameraIdleCallbackData

| 属性            | 类型                      |
| --------------- | ------------------------- |
| **`mapId`**     | <code>string</code>       |
| **`bounds`**    | <code>LatLngBounds</code> |
| **`bearing`**   | <code>number</code>       |
| **`latitude`**  | <code>number</code>       |
| **`longitude`** | <code>number</code>       |
| **`tilt`**      | <code>number</code>       |
| **`zoom`**      | <code>number</code>       |


#### CameraMoveStartedCallbackData

| 属性            | 类型                 |
| --------------- | -------------------- |
| **`mapId`**     | <code>string</code>  |
| **`isGesture`** | <code>boolean</code> |


#### ClusterClickCallbackData

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


#### PolygonClickCallbackData

| 属性            | 类型                |
| --------------- | ------------------- |
| **`mapId`**     | <code>string</code> |
| **`polygonId`** | <code>string</code> |
| **`tag`**       | <code>string</code> |


#### CircleClickCallbackData

| 属性           | 类型                |
| -------------- | ------------------- |
| **`mapId`**    | <code>string</code> |
| **`circleId`** | <code>string</code> |
| **`tag`**      | <code>string</code> |


#### PolylineCallbackData

| 属性             | 类型                |
| ---------------- | ------------------- |
| **`polylineId`** | <code>string</code> |
| **`tag`**        | <code>string</code> |


#### MyLocationButtonClickCallbackData

| 属性        | 类型                |
| ----------- | ------------------- |
| **`mapId`** | <code>string</code> |


### 类型别名


#### MapListenerCallback

地图事件触发时要调用的回调函数。

<code>(data: T): void</code>


#### Marker

支持“传统”或“高级”类型的标记。

<code>google.maps.<a href="#marker">Marker</a> | google.maps.marker.AdvancedMarkerElement</code>


### 枚举


#### MapType

| 成员         | 值                    | 说明                              |
| --------------- | ------------------------ | ---------------------------------------- |
| **`Normal`**    | <code>'Normal'</code>    | 基础地图。                               |
| **`Hybrid`**    | <code>'Hybrid'</code>    | 卫星图像附带道路和标签。 |
| **`Satellite`** | <code>'Satellite'</code> | 卫星图像，无标签。        |
| **`Terrain`**   | <code>'Terrain'</code>   | 地形数据。                        |
| **`None`**      | <code>'None'</code>      | 无底图图块。                       |

<span id="cameraconfig"></span>
<span id="circle"></span>
<span id="createmapargs"></span>
<span id="enableclustering"></span>
<span id="fitbounds"></span>
<span id="googlemapconfig"></span>
<span id="latlng"></span>
<span id="polygon"></span>
<span id="polyline"></span>
<span id="setoncircleclicklistener"></span>
<span id="stylespan"></span>
<span id="cameraconfig"></span>
<span id="circle"></span>
<span id="createmapargs"></span>
<span id="enableclustering"></span>
<span id="fitbounds"></span>
<span id="googlemapconfig"></span>
<span id="latlng"></span>
<span id="polygon"></span>
<span id="polyline"></span>
<span id="setoncircleclicklistener"></span>
<span id="stylespan"></span>
<span id="cameraconfig"></span>
<span id="circle"></span>
<span id="createmapargs"></span>
<span id="enableclustering"></span>
<span id="fitbounds"></span>
<span id="googlemapconfig"></span>
<span id="latlng"></span>
<span id="polygon"></span>
<span id="polyline"></span>
<span id="setoncircleclicklistener"></span>
<span id="stylespan"></span>
<span id="cameraconfig"></span>
<span id="circle"></span>
<span id="createmapargs"></span>
<span id="enableclustering"></span>
<span id="fitbounds"></span>
<span id="googlemapconfig"></span>
<span id="latlng"></span>
<span id="polygon"></span>
<span id="polyline"></span>
<span id="setoncircleclicklistener"></span>
<span id="stylespan"></span>
<span id="cameraconfig"></span>
<span id="circle"></span>
<span id="createmapargs"></span>
<span id="enableclustering"></span>
<span id="fitbounds"></span>
<span id="googlemapconfig"></span>
<span id="latlng"></span>
<span id="polygon"></span>
<span id="polyline"></span>
<span id="setoncircleclicklistener"></span>
<span id="stylespan"></span>
</docgen-api>