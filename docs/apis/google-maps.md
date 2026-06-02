---
title: Google Maps Capacitor 插件 API
description: Capacitor 上的 Google 地图
translated: true
custom_edit_url: https://github.com/ionic-team/capacitor-google-maps/blob/main/plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-google-maps/blob/main/plugin/src/definitions.ts
sidebar_label: 谷歌地图
source_hash: 43bb8b4c
---

# @capacitor/google-maps

Capacitor 上的 Google 地图

## 安装

```bash
npm install @capacitor/google-maps
npx cap sync
```

## API 密钥

要在任何平台上使用 Google Maps SDK，需要关联已启用计费功能的账户的 API 密钥。这些密钥可以从 [Google Cloud Console](https://console.cloud.google.com) 获取。Android、iOS 和 Javascript 三个平台都需要此操作。关于获取这些 API 密钥的更多信息，可以在每个平台的 [Google Maps 文档](https://developers.google.com/maps/documentation/android-sdk/overview) 中找到。

## iOS

Google Maps SDK 支持通过 `enableCurrentLocation(bool)` 显示用户当前位置。为此，Apple 要求在 `Info.plist` 中指定隐私描述：

- `NSLocationWhenInUseUsageDescription`（使用期间的定位权限描述）

请阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 章节，了解有关在 Xcode 中设置 iOS 权限的更多信息。

### TypeScript 配置

你的项目还需要在 `tsconfig.json` 中将 `skipLibCheck` 设置为 `true`。

### 从旧版本迁移
> 主 Google Maps SDK 现在支持在 Apple Silicon Mac 的模拟器上运行，但请确保你已安装最新版本的 [Google-Maps-iOS-Utils](https://github.com/googlemaps/google-maps-ios-utils)。

如果你之前添加了获取未发布版本的临时解决方案，现在可以通过从 `ios/App/Podfile` 中删除以下行来移除它：

```
pod 'Google-Maps-iOS-Utils', :git => 'https://github.com/googlemaps/google-maps-ios-utils.git', :commit => '637954e5bcb2a879c11a6f2cead153a6bad5339f'
```

然后在 `ios/App/` 文件夹中运行 `pod update Google-Maps-iOS-Utils`：

```
cd ios/App
pod update Google-Maps-iOS-Utils
```

## Android

Android 的 Google Maps SDK 要求你将 API 密钥添加到项目的 AndroidManifest.xml 文件中。

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

要使用某些位置功能，SDK 还需要在 AndroidManifest.xml 中添加以下权限：

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### 变量

此插件将使用以下项目变量（定义在你的应用的 `variables.gradle` 文件中）：

- `googleMapsPlayServicesVersion`：`com.google.android.gms:play-services-maps` 的版本（默认值：`19.2.0`）
- `googleMapsUtilsVersion`：`com.google.maps.android:android-maps-utils` 的版本（默认值：`3.19.1`）
- `googleMapsKtxVersion`：`com.google.maps.android:maps-ktx` 的版本（默认值：`5.2.1`）
- `googleMapsUtilsKtxVersion`：`com.google.maps.android:maps-utils-ktx` 的版本（默认值：`5.2.1`）
- `kotlinxCoroutinesVersion`：`org.jetbrains.kotlinx:kotlinx-coroutines-android` 和 `org.jetbrains.kotlinx:kotlinx-coroutines-core` 的版本（默认值：`1.10.2`）
- `androidxCoreKTXVersion`：`androidx.core:core-ktx` 的版本（默认值：`1.17.0`）
- `kotlin_version`：`org.jetbrains.kotlin:kotlin-stdlib` 的版本（默认值：`2.2.20`）

## 使用

Google Maps Capacitor 插件附带一个 Web 组件，必须在应用中用于渲染地图，因为它能更有效地在 iOS 上嵌入原生视图。插件会自动注册此 Web 组件供你的应用使用。

> 对于 Angular 用户，你会收到一个警告，提示此 Web 组件对 Angular 编译器是未知的。可以通过修改声明组件的模块以允许自定义 Web 组件来解决。
>
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
>
> @NgModule({
>   schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })
> ```

在 HTML 中包含此组件并为其分配一个 ID，以便稍后可以轻松查询该元素引用。

```html
<capacitor-google-map id="map"></capacitor-google-map>
```

> 在 Android 上，地图在 WebView 下方渲染，并使用此组件在滚动事件期间管理其定位。这意味着作为开发者，你 _必须_ 确保 WebView 在各层中都是透明的，直至最底层。在典型的 Ionic 应用中，这意味着在 IonContent 和根 HTML 标签等元素上设置透明度，以确保地图可见。如果在 Android 上看不到地图，这应该是你首先检查的地方。
>
> 在 iOS 上，我们直接将地图渲染到 WebView 中，因此不需要相同的透明效果。我们仍在研究 Android 的替代方法，希望在未来的更新中更好地解决这个问题。

Google Map 元素本身没有样式，因此你应该为其设置样式以适配页面布局。由于我们在此插槽中渲染视图，元素本身没有宽度或高度，请务必显式设置它们。

```css
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
```

接下来，我们应该创建地图引用。这需要从 Capacitor 插件导入 GoogleMap 类并调用 create 方法，传入所需参数。

```typescript
import { GoogleMap } from '@capacitor/google-maps';

const apiKey = 'YOUR_API_KEY_HERE';

const mapRef = document.getElementById('map');

const newMap = await GoogleMap.create({
  id: 'my-map', // 此地图实例的唯一标识符
  element: mapRef, // capacitor-google-map 元素的引用
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

此时，你的地图应该已经在应用中创建完成。使用返回的地图引用，你可以通过多种方式与地图进行交互，这里展示其中几种。

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

确保你需要启用 [识别原生自定义元素](https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue)，例如：

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
      id: 'my-map', // 此地图实例的唯一标识符
      element: mapRef, // capacitor-google-map 元素的引用
      apiKey: 'YOUR_API_KEY_HERE', // 你的 Google Maps API 密钥
      config: {
        center: {
          // 地图渲染的初始位置
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8, // 地图渲染的初始缩放级别
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
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### create(...)

```typescript
create(options: CreateMapArgs, callback?: MapListenerCallback<MapReadyCallbackData> | undefined) => Promise<GoogleMap>
```

| Param          | Type                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#createmapargs">CreateMapArgs</a></code>                                                                             |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapreadycallbackdata">MapReadyCallbackData</a>&gt;</code> |

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

| Param                | Type                | Description                                              |
| -------------------- | ------------------- | -------------------------------------------------------- |
| **`minClusterSize`** | <code>number</code> | 可以聚类在一起的最小标记数量。默认值为 4 个标记。 |

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

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`tileOverlay`** | <code><a href="#tileoverlay">TileOverlay</a></code> |

**返回：** <code>Promise&lt;{ id: string; }&gt;</code>

--------------------


### removeTileOverlay(...)

```typescript
removeTileOverlay(id: string) => Promise<void>
```

| Param    | Type                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

--------------------


### addMarker(...)

```typescript
addMarker(marker: Marker) => Promise<string>
```

| Param        | Type                                      |
| ------------ | ----------------------------------------- |
| **`marker`** | <code><a href="#marker">Marker</a></code> |

**返回：** <code>Promise&lt;string&gt;</code>

--------------------


### addMarkers(...)

```typescript
addMarkers(markers: Marker[]) => Promise<string[]>
```

| Param         | Type                  |
| ------------- | --------------------- |
| **`markers`** | <code>Marker[]</code> |

**返回：** <code>Promise&lt;string[]&gt;</code>

--------------------


### removeMarker(...)

```typescript
removeMarker(id: string) => Promise<void>
```

| Param    | Type                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

--------------------


### removeMarkers(...)

```typescript
removeMarkers(ids: string[]) => Promise<void>
```

| Param     | Type                  |
| --------- | --------------------- |
| **`ids`** | <code>string[]</code> |

--------------------


### addPolygons(...)

```typescript
addPolygons(polygons: Polygon[]) => Promise<string[]>
```

| Param          | Type                   |
| -------------- | ---------------------- |
| **`polygons`** | <code>Polygon[]</code> |

**返回：** <code>Promise&lt;string[]&gt;</code>

--------------------


### removePolygons(...)

```typescript
removePolygons(ids: string[]) => Promise<void>
```

| Param     | Type                  |
| --------- | --------------------- |
| **`ids`** | <code>string[]</code> |

--------------------


### addCircles(...)

```typescript
addCircles(circles: Circle[]) => Promise<string[]>
```

| Param         | Type                  |
| ------------- | --------------------- |
| **`circles`** | <code>Circle[]</code> |

**返回：** <code>Promise&lt;string[]&gt;</code>

--------------------


### removeCircles(...)

```typescript
removeCircles(ids: string[]) => Promise<void>
```

| Param     | Type                  |
| --------- | --------------------- |
| **`ids`** | <code>string[]</code> |

--------------------


### addPolylines(...)

```typescript
addPolylines(polylines: Polyline[]) => Promise<string[]>
```

| Param           | Type                    |
| --------------- | ----------------------- |
| **`polylines`** | <code>Polyline[]</code> |

**返回：** <code>Promise&lt;string[]&gt;</code>

--------------------


### removePolylines(...)

```typescript
removePolylines(ids: string[]) => Promise<void>
```

| Param     | Type                  |
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

| Param        | Type                                                  |
| ------------ | ----------------------------------------------------- |
| **`config`** | <code><a href="#cameraconfig">CameraConfig</a></code> |

--------------------


### getMapType()

```typescript
getMapType() => Promise<MapType>
```

获取当前地图类型

**返回：** <code>Promise&lt;<a href="#maptype">MapType</a>&gt;</code>

--------------------


### setMapType(...)

```typescript
setMapType(mapType: MapType) => Promise<void>
```

| Param         | Type                                        |
| ------------- | ------------------------------------------- |
| **`mapType`** | <code><a href="#maptype">MapType</a></code> |

--------------------


### enableIndoorMaps(...)

```typescript
enableIndoorMaps(enabled: boolean) => Promise<void>
```

| Param         | Type                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### enableTrafficLayer(...)

```typescript
enableTrafficLayer(enabled: boolean) => Promise<void>
```

| Param         | Type                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### enableAccessibilityElements(...)

```typescript
enableAccessibilityElements(enabled: boolean) => Promise<void>
```

| Param         | Type                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### enableCurrentLocation(...)

```typescript
enableCurrentLocation(enabled: boolean) => Promise<void>
```

| Param         | Type                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### setPadding(...)

```typescript
setPadding(padding: MapPadding) => Promise<void>
```

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`padding`** | <code><a href="#mappadding">MapPadding</a></code> |

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

设置地图视口以包含给定的边界。

| Param         | Type                      | Description                                                                    |
| ------------- | ------------------------- | ------------------------------------------------------------------------------ |
| **`bounds`**  | <code>LatLngBounds</code> | 要适配到视口中的边界。                                                     |
| **`padding`** | <code>number</code>       | 可选的内边距（像素）。边界将适配到移除内边距后剩余的地图部分。 |

--------------------


### setOnBoundsChangedListener(...)

```typescript
setOnBoundsChangedListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code> |

--------------------


### setOnCameraIdleListener(...)

```typescript
setOnCameraIdleListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code> |

--------------------


### setOnCameraMoveStartedListener(...)

```typescript
setOnCameraMoveStartedListener(callback?: MapListenerCallback<CameraMoveStartedCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameramovestartedcallbackdata">CameraMoveStartedCallbackData</a>&gt;</code> |

--------------------


### setOnClusterClickListener(...)

```typescript
setOnClusterClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code> |

--------------------


### setOnClusterInfoWindowClickListener(...)

```typescript
setOnClusterInfoWindowClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code> |

--------------------


### setOnInfoWindowClickListener(...)

```typescript
setOnInfoWindowClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMapClickListener(...)

```typescript
setOnMapClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerClickListener(...)

```typescript
setOnMarkerClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnPolygonClickListener(...)

```typescript
setOnPolygonClickListener(callback?: MapListenerCallback<PolygonClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#polygonclickcallbackdata">PolygonClickCallbackData</a>&gt;</code> |

--------------------


### setOnCircleClickListener(...)

```typescript
setOnCircleClickListener(callback?: MapListenerCallback<CircleClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#circleclickcallbackdata">CircleClickCallbackData</a>&gt;</code> |

--------------------


### setOnPolylineClickListener(...)

```typescript
setOnPolylineClickListener(callback?: MapListenerCallback<PolylineCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#polylinecallbackdata">PolylineCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerDragStartListener(...)

```typescript
setOnMarkerDragStartListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerDragListener(...)

```typescript
setOnMarkerDragListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerDragEndListener(...)

```typescript
setOnMarkerDragEndListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMyLocationButtonClickListener(...)

```typescript
setOnMyLocationButtonClickListener(callback?: MapListenerCallback<MyLocationButtonClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mylocationbuttonclickcallbackdata">MyLocationButtonClickCallbackData</a>&gt;</code> |

--------------------


### setOnMyLocationClickListener(...)

```typescript
setOnMyLocationClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code> |

--------------------


### Interfaces


#### CreateMapArgs

创建地图时使用的选项接口。

| Prop              | Type                                                        | Description                                                                                                                                                                | Default            |
| ----------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`id`**          | <code>string</code>                                         | 地图实例的唯一标识符。                                                                                                                                                  |                    |
| **`apiKey`**      | <code>string</code>                                         | Google Maps SDK API 密钥。                                                                                                                                               |                    |
| **`config`**      | <code><a href="#googlemapconfig">GoogleMapConfig</a></code> | 地图的初始配置设置。                                                                                                                                                        |                    |
| **`element`**     | <code>HTMLElement</code>                                    | Google Map 视图将要挂载的 DOM 元素，决定其大小和定位。                                                                                                                 |                    |
| **`forceCreate`** | <code>boolean</code>                                        | 如果具有相同 id 的地图已存在，则销毁并重新创建地图实例                                                                                                                | <code>false</code> |
| **`region`**      | <code>string</code>                                         | region 参数会更改你的应用以提供不同的地图瓦片或偏置应用（例如将地理编码结果偏置到该区域）。仅 Web 平台可用。                                                          |                    |
| **`language`**    | <code>string</code>                                         | language 参数会影响控件名称、版权声明、驾驶路线和控件标签，以及服务请求的响应。仅 Web 平台可用。                                                                     |                    |


#### GoogleMapConfig

对于 Web，所有 javascript Google Maps 选项都可用，因为
GoogleMapConfig 继承了 google.maps.MapOptions。
对于 iOS 和 Android，只有 <a href="#googlemapconfig">GoogleMapConfig</a> 上声明的配置选项可用。

| Prop                   | Type                                      | Description                                                                                                                                                                                                                                                                                                                                                   | Default            | Since |
| ---------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`width`**            | <code>number</code>                       | 覆盖原生地图的宽度。                                                                                                                                                                                                                                                                                                                                        |                    |       |
| **`height`**           | <code>number</code>                       | 覆盖原生地图的高度。                                                                                                                                                                                                                                                                                                                                        |                    |       |
| **`x`**                | <code>number</code>                       | 覆盖原生地图的绝对 x 坐标位置。                                                                                                                                                                                                                                                                                                                            |                    |       |
| **`y`**                | <code>number</code>                       | 覆盖原生地图的绝对 y 坐标位置。                                                                                                                                                                                                                                                                                                                            |                    |       |
| **`center`**           | <code><a href="#latlng">LatLng</a></code> | 相机指向的地球上的默认位置。                                                                                                                                                                                                                                                                                                                                |                    |       |
| **`zoom`**             | <code>number</code>                       | 设置地图的缩放级别。                                                                                                                                                                                                                                                                                                                                          |                    |       |
| **`androidLiteMode`**  | <code>boolean</code>                      | 在 Android 上启用基于图像的轻量模式。                                                                                                                                                                                                                                                                                                                     | <code>false</code> |       |
| **`devicePixelRatio`** | <code>number</code>                       | 覆盖原生地图的像素比。                                                                                                                                                                                                                                                                                                                                      |                    |       |
| **`styles`**           | <code>MapTypeStyle[] \| null</code>       | 应用于每个默认地图类型的样式。请注意，对于卫星图、混合图和地形图，这些样式仅适用于标签和几何图形。                                                                                                                                                                                                                         |                    | 4.3.0 |
| **`mapId`**            | <code>string</code>                       | 与特定地图样式或功能关联的地图 ID。[使用地图 ID](https://developers.google.com/maps/documentation/get-map-id) 仅 Web 平台。                                                                                                                                                                                                                             |                    | 5.4.0 |
| **`androidMapId`**     | <code>string</code>                       | 与特定地图样式或功能关联的地图 ID。[使用地图 ID](https://developers.google.com/maps/documentation/get-map-id) 仅 Android 平台。                                                                                                                                                                                                                         |                    | 5.4.0 |
| **`iOSMapId`**         | <code>string</code>                       | 与特定地图样式或功能关联的地图 ID。[使用地图 ID](https://developers.google.com/maps/documentation/get-map-id) 仅 iOS 平台。                                                                                                                                                                                                                             |                    | 5.4.0 |
| **`maxZoom`**          | <code>number \| null</code>               | 地图上显示的最大缩放级别。如果省略或设置为 &lt;code&gt;null&lt;/code&gt;，则使用当前地图类型的最大缩放级别。有效的缩放值是从 0 到支持的 &lt;a href="https://developers.google.com/maps/documentation/javascript/maxzoom"&gt;最大缩放级别&lt;/a&gt; 的数字。                                                                                             |                    |       |
| **`minZoom`**          | <code>number \| null</code>               | 地图上显示的最小缩放级别。如果省略或设置为 &lt;code&gt;null&lt;/code&gt;，则使用当前地图类型的最小缩放级别。有效的缩放值是从 0 到支持的 &lt;a href="https://developers.google.com/maps/documentation/javascript/maxzoom"&gt;最大缩放级别&lt;/a&gt; 的数字。                                                                                             |                    |       |
| **`mapTypeId`**        | <code>string \| null</code>               | 初始地图 mapTypeId。默认为 &lt;code&gt;ROADMAP&lt;/code&gt;。                                                                                                                                                                                                                                                                                                |                    |       |
| **`heading`**          | <code>number \| null</code>               | 航拍图像的方位角，以度数表示，从正北方向顺时针测量。航向会就近对齐到可用的最近角度。                                                                                                                                                                                                                                                               |                    |       |
| **`restriction`**      | <code>MapRestriction \| null</code>       | 定义限制用户访问地图区域的边界。设置后，用户只能在相机视图保持在边界范围内时进行平移和缩放。                                                                                                                                                                                                                                              |                    |       |


#### LatLng

表示纬度和经度坐标对的接口。

| Prop      | Type                | Description                                                   |
| --------- | ------------------- | ------------------------------------------------------------- |
| **`lat`** | <code>number</code> | 坐标纬度，以度为单位。该值在 [-90, 90] 范围内。        |
| **`lng`** | <code>number</code> | 坐标经度，以度为单位。该值在 [-180, 180] 范围内。 |


#### MapReadyCallbackData

| Prop        | Type                |
| ----------- | ------------------- |
| **`mapId`** | <code>string</code> |


#### TileOverlay

瓦片叠加层是放置在地图上方特定缩放级别的图像。适用于 iOS、Android 和 Web。

| Prop          | Type                 | Description                                                                                                                               | Default                |
| ------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| **`url`**     | <code>string</code>  | 表示瓦片 URL 的字符串。应包含 `{x}`、`{y}` 和 `{z}`，以便它们可以被实际的 x、y 和缩放值替换。适用于 iOS、Android 和 Web。              |                        |
| **`opacity`** | <code>number</code>  | 瓦片叠加层的透明度，介于 0（完全透明）和 1（不透明）之间。适用于 iOS、Android 和 Web。                                                 | <code>undefined</code> |
| **`visible`** | <code>boolean</code> | 控制此瓦片叠加层是否应可见。仅适用于 Android。                                                                                           | <code>undefined</code> |
| **`zIndex`**  | <code>number</code>  | 瓦片叠加层的 zIndex。适用于 iOS 和 Android。                                                                                        | <code>undefined</code> |


#### Marker

标记是放置在地图表面上特定位置的图标。

| Prop             | Type                                                         | Description                                                                                                                                                                                   | Default            | Since |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`coordinate`** | <code><a href="#latlng">LatLng</a></code>                    | <a href="#marker">标记</a> 位置                                                                                                                                                             |                    |       |
| **`opacity`**    | <code>number</code>                                          | 设置标记的透明度，介于 0（完全透明）和 1（不透明）之间。                                                                                                                           | <code>1</code>     |       |
| **`title`**      | <code>string</code>                                          | 标题，叠加层的简短描述。                                                                                                                                                                    |                    |       |
| **`snippet`**    | <code>string</code>                                          | 摘要文本，选中时显示在信息窗口的标题下方。                                                                                                                                                     |                    |       |
| **`isFlat`**     | <code>boolean</code>                                         | 控制此标记应平贴在地球表面还是作为面向相机的广告牌。                                                                                                                                         | <code>false</code> |       |
| **`iconUrl`**    | <code>string</code>                                          | 要渲染的标记图标的路径。可以是相对于 Web 应用公共目录的路径，或远程标记图标的 https URL。**原生平台不支持 SVG。**                                                                  |                    | 4.2.0 |
| **`iconSize`**   | <code><a href="#size">Size</a></code>                        | 控制 `iconUrl` 中设置的标记图像的缩放尺寸。                                                                                                                                                |                    | 4.2.0 |
| **`iconOrigin`** | <code><a href="#point">Point</a></code>                      | 图像在精灵图中的位置（如果有）。默认情况下，原点位于图像的左上角。                                                                                                                            |                    | 4.2.0 |
| **`iconAnchor`** | <code><a href="#point">Point</a></code>                      | 锚定图像相对于地图上标记位置的位置。默认情况下，锚点位于图像底部中心点。                                                                                                                     |                    | 4.2.0 |
| **`tintColor`**  | <code>{ r: number; g: number; b: number; a: number; }</code> | 自定义默认标记图像的颜色。每个值必须在 0 到 255 之间。仅适用于 iOS 和 Android。                                                                                                             |                    | 4.2.0 |
| **`draggable`**  | <code>boolean</code>                                         | 控制此标记是否可以交互式拖动                                                                                                                                                                 | <code>false</code> |       |
| **`zIndex`**     | <code>number</code>                                          | 指定此标记相对于地图上其他标记的堆叠顺序。z-index 高的标记绘制在 z-index 低的标记之上                                                                                              | <code>0</code>     |       |


#### Size

| Prop         | Type                |
| ------------ | ------------------- |
| **`width`**  | <code>number</code> |
| **`height`** | <code>number</code> |


#### Point

| Prop    | Type                |
| ------- | ------------------- |
| **`x`** | <code>number</code> |
| **`y`** | <code>number</code> |


#### Polygon

对于 Web，所有 javascript <a href="#polygon">Polygon</a> 选项都可用，因为
Polygon 继承了 google.maps.PolygonOptions。
对于 iOS 和 Android，只有 <a href="#polygon">Polygon</a> 上声明的配置选项可用。

| Prop                | Type                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`paths`**         | <code>any[] \| MVCArray&lt;any&gt;</code> | 指定闭合循环的有序坐标序列。与折线不同，多边形可能由一条或多条路径组成。因此，paths 属性可以指定一个或多个 &lt;code&gt;<a href="#latlng">LatLng</a>&lt;/code&gt; 坐标数组。路径会自动闭合；不要重复路径的第一个顶点作为最后一个顶点。简单多边形可以使用单个 &lt;code&gt;<a href="#latlng">LatLng</a>&lt;/code&gt; 数组定义。更复杂的多边形可以指定一个数组的数组。任何简单数组都会被转换为 &lt;code&gt;&lt;a href="#MVCArray"&gt;MVCArray&lt;/a&gt;&lt;/code&gt;。从 &lt;code&gt;MVCArray&lt;/code&gt; 中插入或删除 &lt;code&gt;<a href="#latlng">LatLng</a>&lt;/code&gt; 将自动更新地图上的多边形。 |
| **`strokeColor`**   | <code>string</code>                       | 描边颜色。支持所有 CSS3 颜色，除了扩展命名颜色。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **`strokeOpacity`** | <code>number</code>                       | 描边透明度，介于 0.0 和 1.0 之间。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **`strokeWeight`**  | <code>number</code>                       | 描边宽度，以像素为单位。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **`fillColor`**     | <code>string</code>                       | 填充颜色。支持所有 CSS3 颜色，除了扩展命名颜色。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **`fillOpacity`**   | <code>number</code>                       | 填充透明度，介于 0.0 和 1.0 之间。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **`geodesic`**      | <code>boolean</code>                      | 当 &lt;code&gt;true&lt;/code&gt; 时，多边形的边被解释为测地线，将遵循地球的曲率。当 &lt;code&gt;false&lt;/code&gt; 时，多边形的边在屏幕空间中被渲染为直线。请注意，测地线多边形的形状在被拖动时可能会看起来发生变化，因为其尺寸是相对于地球表面保持的。                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **`clickable`**     | <code>boolean</code>                      | 指示此 &lt;code&gt;<a href="#polygon">Polygon</a>&lt;/code&gt; 是否处理鼠标事件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **`title`**         | <code>string</code>                       | 标题，叠加层的简短描述。某些叠加层（如标记）会在地图上显示标题。标题也是默认的无障碍文本。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **`tag`**           | <code>string</code>                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |


#### Circle

对于 Web，所有 javascript <a href="#circle">Circle</a> 选项都可用，因为
Circle 继承了 google.maps.CircleOptions。
对于 iOS 和 Android，只有 <a href="#circle">Circle</a> 上声明的配置选项可用。

| Prop               | Type                 | Description                                                                                                                                                                            |
| ------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`fillColor`**    | <code>string</code>  | 填充颜色。支持所有 CSS3 颜色，除了扩展命名颜色。                                                                                                                                    |
| **`fillOpacity`**  | <code>number</code>  | 填充透明度，介于 0.0 和 1.0 之间。                                                                                                                                                  |
| **`strokeColor`**  | <code>string</code>  | 描边颜色。支持所有 CSS3 颜色，除了扩展命名颜色。                                                                                                                                      |
| **`strokeWeight`** | <code>number</code>  | 描边宽度，以像素为单位。                                                                                                                                                            |
| **`geodesic`**     | <code>boolean</code> |                                                                                                                                                                                        |
| **`clickable`**    | <code>boolean</code> | 指示此 &lt;code&gt;<a href="#circle">Circle</a>&lt;/code&gt; 是否处理鼠标事件。                                                                                                     |
| **`title`**        | <code>string</code>  | 标题，叠加层的简短描述。某些叠加层（如标记）会在地图上显示标题。标题也是默认的无障碍文本。仅适用于 iOS。 |
| **`tag`**          | <code>string</code>  |                                                                                                                                                                                        |


#### Polyline

对于 Web，所有 javascript <a href="#polyline">Polyline</a> 选项都可用，因为
Polyline 继承了 google.maps.PolylineOptions。
对于 iOS 和 Android，只有 <a href="#polyline">Polyline</a> 上声明的配置选项可用。

| Prop                | Type                     | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`strokeColor`**   | <code>string</code>      | 描边颜色。支持所有 CSS3 颜色，除了扩展命名颜色。                                                                                                                                                                                                                                                                                                              |
| **`strokeOpacity`** | <code>number</code>      | 描边透明度，介于 0.0 和 1.0 之间。                                                                                                                                                                                                                                                                                                                                                        |
| **`strokeWeight`**  | <code>number</code>      | 描边宽度，以像素为单位。                                                                                                                                                                                                                                                                                                                                                                    |
| **`geodesic`**      | <code>boolean</code>     | 当 &lt;code&gt;true&lt;/code&gt; 时，多边形的边被解释为测地线，将遵循地球的曲率。当 &lt;code&gt;false&lt;/code&gt; 时，多边形的边在屏幕空间中被渲染为直线。请注意，测地线多边形的形状在被拖动时可能会看起来发生变化，因为其尺寸是相对于地球表面保持的。 |
| **`clickable`**     | <code>boolean</code>     | 指示此 &lt;code&gt;<a href="#polyline">Polyline</a>&lt;/code&gt; 是否处理鼠标事件。                                                                                                                                                                                                                                                                                         |
| **`tag`**           | <code>string</code>      |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`styleSpans`**    | <code>StyleSpan[]</code> | 用于指定折线的一个或多个段的颜色。styleSpans 属性是一个 <a href="#stylespan">StyleSpan</a> 对象数组。设置 spans 属性是更改折线颜色的首选方式。仅适用于 iOS 和 Android。                                                                                                                                |


#### StyleSpan

描述折线某个区域的样式。

| Prop           | Type                | Description                                                                           |
| -------------- | ------------------- | ------------------------------------------------------------------------------------- |
| **`color`**    | <code>string</code> | 描边颜色。支持所有 CSS3 颜色，除了扩展命名颜色。 |
| **`segments`** | <code>number</code> | 此跨度的长度，以段数表示。                                    |


#### CameraConfig

Google 地图相机的配置属性。

| Prop                    | Type                                      | Description                                                                                                                | Default            |
| ----------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`coordinate`**        | <code><a href="#latlng">LatLng</a></code> | 相机指向的地球上的位置。                                                                                                     |                    |
| **`zoom`**              | <code>number</code>                       | 设置地图的缩放级别。                                                                                                      |                    |
| **`bearing`**           | <code>number</code>                       | 相机的方位角，以度数表示，从正北方向顺时针测量。                                                                               | <code>0</code>     |
| **`angle`**             | <code>number</code>                       | 相机从天底（正对地球）的角度，以度为单位。只允许使用 0 和 45。                                                             | <code>0</code>     |
| **`animate`**           | <code>boolean</code>                      | 是否动画过渡到新的相机属性。                                                                                               | <code>false</code> |
| **`animationDuration`** | <code>number</code>                       | 此配置选项未使用。                                                                                                           |                    |


#### MapPadding

控制视图"可见"区域的内边距设置。

| Prop         | Type                |
| ------------ | ------------------- |
| **`top`**    | <code>number</code> |
| **`left`**   | <code>number</code> |
| **`right`**  | <code>number</code> |
| **`bottom`** | <code>number</code> |


#### CameraIdleCallbackData

| Prop            | Type                      |
| --------------- | ------------------------- |
| **`mapId`**     | <code>string</code>       |
| **`bounds`**    | <code>LatLngBounds</code> |
| **`bearing`**   | <code>number</code>       |
| **`latitude`**  | <code>number</code>       |
| **`longitude`** | <code>number</code>       |
| **`tilt`**      | <code>number</code>       |
| **`zoom`**      | <code>number</code>       |


#### CameraMoveStartedCallbackData

| Prop            | Type                 |
| --------------- | -------------------- |
| **`mapId`**     | <code>string</code>  |
| **`isGesture`** | <code>boolean</code> |


#### ClusterClickCallbackData

| Prop            | Type                              |
| --------------- | --------------------------------- |
| **`mapId`**     | <code>string</code>               |
| **`latitude`**  | <code>number</code>               |
| **`longitude`** | <code>number</code>               |
| **`size`**      | <code>number</code>               |
| **`items`**     | <code>MarkerCallbackData[]</code> |


#### MarkerCallbackData

| Prop            | Type                |
| --------------- | ------------------- |
| **`markerId`**  | <code>string</code> |
| **`latitude`**  | <code>number</code> |
| **`longitude`** | <code>number</code> |
| **`title`**     | <code>string</code> |
| **`snippet`**   | <code>string</code> |


#### MarkerClickCallbackData

| Prop        | Type                |
| ----------- | ------------------- |
| **`mapId`** | <code>string</code> |


#### MapClickCallbackData

| Prop            | Type                |
| --------------- | ------------------- |
| **`mapId`**     | <code>string</code> |
| **`latitude`**  | <code>number</code> |
| **`longitude`** | <code>number</code> |


#### PolygonClickCallbackData

| Prop            | Type                |
| --------------- | ------------------- |
| **`mapId`**     | <code>string</code> |
| **`polygonId`** | <code>string</code> |
| **`tag`**       | <code>string</code> |


#### CircleClickCallbackData

| Prop           | Type                |
| -------------- | ------------------- |
| **`mapId`**    | <code>string</code> |
| **`circleId`** | <code>string</code> |
| **`tag`**      | <code>string</code> |


#### PolylineCallbackData

| Prop             | Type                |
| ---------------- | ------------------- |
| **`polylineId`** | <code>string</code> |
| **`tag`**        | <code>string</code> |


#### MyLocationButtonClickCallbackData

| Prop        | Type                |
| ----------- | ------------------- |
| **`mapId`** | <code>string</code> |


### Type Aliases


#### MapListenerCallback

地图事件触发时调用的回调函数。

<code>(data: T): void</code>


#### Marker

支持"legacy"（传统）或"advanced"（高级）类型的标记。

<code>google.maps.<a href="#marker">Marker</a> | google.maps.marker.AdvancedMarkerElement</code>


### Enums


#### MapType

| Members         | Value                    | Description                              |
| --------------- | ------------------------ | ---------------------------------------- |
| **`Normal`**    | <code>'Normal'</code>    | 基本地图。                               |
| **`Hybrid`**    | <code>'Hybrid'</code>    | 带有道路和标签的卫星图像。 |
| **`Satellite`** | <code>'Satellite'</code> | 不带标签的卫星图像。        |
| **`Terrain`**   | <code>'Terrain'</code>   | 地形数据。                        |
| **`None`**      | <code>'None'</code>      | 无底图瓦片。                       |

</docgen-api>
